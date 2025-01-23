import { basehub } from 'basehub'
import { authenticateWebhook } from 'basehub/workflows'
import { getEvents } from 'basehub/events'
import { resend } from '~/lib/resend'
import NewsletterEmail from '../../../../../emails/newsletter'

const siteUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`

export const POST = async (request: Request) => {
  'use server'
  const data = await basehub().query({
    newsletter: {
      emailFrom: true,
      emailPost: {
        webhookSecret: true,
      },
      address: true,
      socialMedia: {
        image: {
          url: true,
        },
        _title: true,
        url: true,
      },
    },
    waitlist: {
      input: {
        adminKey: true,
      },
    },
  })

  const parsedRequest = await authenticateWebhook({
    body: request.body,
    secret: data.newsletter.emailPost.webhookSecret,
    signature: request.headers.get('x-basehub-webhook-signature'),
  })

  if (!parsedRequest.success) {
    return new Response(parsedRequest.error, {
      status: 401,
    })
  }

  const emailQuery = await basehub().query({
    newsletter: {
      emails: {
        __args: {
          filter: {
            _sys_id: {
              eq: parsedRequest.payload.data.blockId,
            },
          },
        },
        item: {
          _title: true,
          subject: true,
          author: {
            signatureName: true,
            role: true,
            name: true,
          },
          content: {
            json: {
              content: true,
              blocks: {
                on_CalloutBoxComponent: {
                  _id: true,
                  __typename: true,
                  title: true,
                  content: {
                    json: {
                      content: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  if (!emailQuery.newsletter.emails.item) {
    return new Response('Post not found', {
      status: 404,
    })
  }

  const recipients = await getEvents(data.waitlist.input.adminKey, {
    type: 'table',
  })

  if (!recipients.success) {
    return new Response(recipients.error, {
      status: 401,
    })
  }

  const emailsProcessed = new Set<string>()

  for (const subsBatch of chunk(
    recipients.data.filter((v) => v.email),
    100
  )) {
    await resend.batch.send(
      subsBatch
        .map(({ email, id }) => {
          if (emailsProcessed.has(email)) {
            return null
          }

          emailsProcessed.add(email)

          return {
            to: email,
            from: data.newsletter.emailFrom,
            subject: emailQuery.newsletter.emails.item!.subject,
            react: (
              <NewsletterEmail
                blocks={emailQuery.newsletter.emails.item?.content.json.blocks}
                content={
                  emailQuery.newsletter.emails.item?.content.json.content
                }
                address={data.newsletter.address}
                author={emailQuery.newsletter.emails.item!.author}
                socialLinks={data.newsletter.socialMedia}
                unsubscribeLink={`${siteUrl}/api/email-unsubscribe?event-id=${id}`}
              />
            ),
            headers: {
              'List-Unsubscribe': `<${siteUrl}/api/email-unsubscribe?event-id=${id}>`,
              'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
            },
          }
        })
        .filter((e) => e !== null)
    )
  }

  return new Response('Emails sent', {
    status: 200,
  })
}

function chunk<T>(arr: T[], size: number): T[][] {
  return arr.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    [] as T[][]
  )
}
