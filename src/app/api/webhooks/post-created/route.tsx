import { basehub } from 'basehub';
import { authenticateWebhook } from 'basehub/workflows';
import { getEvents } from 'basehub/events';
import { resend } from '~/lib/resend';
import NewsletterEmail from '../../../../../emails/newsletter';

export const POST = async (request: Request) => {
  'use server';
  const {
    newsletter: {
      emailPost: { webhookSecret },
    },
  } = await basehub().query({
    newsletter: {
      emailPost: {
        webhookSecret: true,
        __scalar: true,
      },
    },
  });

  const parsedRequest = await authenticateWebhook({
    body: request.body,
    secret: webhookSecret,
    signature: request.headers.get('x-basehub-webhook-signature'),
  });

  if (!parsedRequest.success) {
    return new Response(parsedRequest.error, {
      status: 401,
    });
  }

  const [
    {
      newsletter: { emails: email, emailFrom, socialMedia },
      settings: { address },
    },
    {
      waitlist: {
        input: { adminKey },
      },
    },
  ] = await Promise.all([
    basehub().query({
      settings: {
        address: true,
      },
      newsletter: {
        emailFrom: true,
        socialMedia: {
          image: {
            url: true,
          },
          _title: true,
          url: true,
        },
        emails: {
          __args: {
            filter: {
              _sys_id: {
                eq: (parsedRequest.payload as any).data.blockId,
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
    }),
    basehub().query({
      waitlist: {
        input: {
          adminKey: true,
        },
      },
    }),
  ]);

  if (!email.item) {
    return new Response('Post not found', {
      status: 404,
    });
  }

  const recipients = await getEvents(adminKey, {
    type: 'table',
  });

  if (!recipients.success) {
    return new Response(recipients.error, {
      status: 401,
    });
  }
  for (const subsBatch of chunk(
    recipients.data.filter((v) => v.email),
    100
  )) {
    await resend.batch.send(
      subsBatch.map(({ email: emailAddress, id }) => {
        return {
          to: emailAddress!,
          from: emailFrom,
          subject: email.item!.subject,
          react: (
            <NewsletterEmail
              blocks={email.item?.content.json.blocks}
              json={email.item?.content.json.content}
              address={address}
              author={email.item!.author}
              socialLinks={socialMedia}
            />
          ),
        };
      })
    );
  }

  return new Response('Email sent', {
    status: 200,
  });
};

function chunk<T>(arr: T[], size: number): T[][] {
  return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), [] as T[][]);
}
