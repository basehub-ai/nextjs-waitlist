import { Pump } from 'basehub/react-pump';
import { RichText, RichTextProps } from 'basehub/react-rich-text';
import { sendEvent, parseFormData } from 'basehub/events';
import { Icon } from 'basehub/react-svg';
import clsx from 'clsx';
import { InputForm } from '~/components/waitlist-form';

export const revalidate = 0;

export default function Home() {
  return (
    <Pump
      queries={[
        {
          waitlist: {
            title: true,
            subtitle: {
              json: {
                content: true,
              },
            },
            input: {
              ingestKey: true,
              schema: true,
            },
          },
        },
        {
          settings: {
            logo: true,
          },
        },
      ]}
    >
      {async ([{ waitlist }, { settings }]) => {
        'use server';
        return (
          <div className="w-full mx-auto max-w-[500px] flex justify-center items-center bg-gray-1 border border-gray-3 p-8 rounded-2xl shadow-[0px_0px_100px_70px_rgba(255,_255,_255,_0.05),_0px_0px_200px_120px_#000]">
            <div className="flex flex-col items-center gap-4 flex-1 text-center w-full">
              {/* Logo */}
              <div className="flex justify-center w-32 h-auto items-center mx-auto">
                <Icon content={settings.logo!} />
              </div>
              {/* Body */}
              <div className="flex flex-col items-center gap-10">
                {/* Heading */}
                <div className="space-y-1">
                  <h1 className="text-xl md:text-3xl font-medium text-slate-12 whitespace-pre">{waitlist.title}</h1>
                  {waitlist.subtitle && (
                    <div className="text-gray-8 [&>p]:tracking-tight">
                      <RichText content={waitlist.subtitle.json.content} />
                    </div>
                  )}
                </div>
                {/* Form */}
                <div className="px-1 flex flex-col w-full self-stretch">
                  <InputForm
                    formAction={async (data) => {
                      'use server';
                      const parsedData = parseFormData(waitlist.input.ingestKey, waitlist.input.schema, data);
                      if (!parsedData.success) {
                        console.error(parsedData.errors);
                        return;
                      }
                      await sendEvent(waitlist.input.ingestKey, parsedData.data);
                    }}
                    {...waitlist.input.schema[0]}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Pump>
  );
}
