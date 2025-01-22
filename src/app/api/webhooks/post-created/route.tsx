import { basehub } from 'basehub';
import { authenticateWebhook } from 'basehub/workflows';
import { getEvents } from 'basehub/events';
import { Resend } from 'resend';
import { RichText, RichTextProps } from 'basehub/react-rich-text';

export const resend = new Resend(process.env.RESEND_API_KEY);

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
      newsletter: { emails: email },
    },
    {
      waitlist: {
        input: { adminKey },
      },
    },
  ] = await Promise.all([
    basehub().query({
      newsletter: {
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
            content: {
              json: {
                content: true,
                blocks: {
                  on_CalloutBoxComponent: {
                    title: true,
                    __typename: true,
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
          from: 'Acme <onboarding@resend.dev>',
          subject: email.item!.subject,
          react: <></>,
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
