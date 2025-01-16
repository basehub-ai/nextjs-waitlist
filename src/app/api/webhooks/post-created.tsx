import { basehub } from 'basehub';
import { authenticateWebhook } from 'basehub/workflows';
import { getEvents } from 'basehub/events';
import { Resend } from 'resend';
import { RichText, RichTextProps } from 'basehub/react-rich-text';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: Request) => {
  'use server';
  const {
    blog: {
      emailPost: { webhookSecret },
    },
  } = await basehub().query({
    blog: {
      emailPost: {
        webhookSecret: true,
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
      blog: { emails: email },
    },
    {
      waitlist: {
        input: { adminKey },
      },
    },
  ] = await Promise.all([
    basehub({ draft: true }).query({
      blog: {
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
          react: (
            <>
              <RichText
                content={email.item!.content.json.content}
                blocks={email.item!.content.json.blocks}
                components={{
                  ...defaultComponents,
                  CalloutBoxComponent: ({ title, content }) => (
                    <div className="bg-slate-1 rounded-xl p-6 mb-8">
                      <h2 className="text-2xl font-medium mb-4">{title}</h2>
                      <RichText content={content.json.content} components={defaultComponents} />
                    </div>
                  ),
                }}
              />
            </>
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

const defaultComponents: RichTextProps['components'] = {
  h1: ({ children }) => <h1 className="text-4xl font-serif mb-6">{children}</h1>,
  h2: ({ children }) => <h2 className="text-sm text-gray-600 mb-8">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-medium mb-4">{children}</h3>,
  h4: ({ children }) => <h4 className="text-xl font-medium mb-4">{children}</h4>,
  p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
  // Imágenes
  img: ({ src, alt }) => <img src={src} alt={alt} className="rounded-xl w-full object-cover mb-8" />,
  // Links (como los del footer)
  a: ({ href, children }) => (
    <a href={href} className="text-gray-400 hover:text-gray-600 transition-colors">
      {children}
    </a>
  ),
};
