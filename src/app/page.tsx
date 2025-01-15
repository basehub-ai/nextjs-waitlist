import { Pump } from 'basehub/react-pump';
import { sendEvent, parseFormData } from 'basehub/events';
import { Icon } from 'basehub/react-svg';
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
          <div className="w-full bg-gray-1 border border-gray-3 p-8 rounded-xl self-stretch shadow-[0px_0px_100px_70px_rgba(255,_255,_255,_0.05),_0px_0px_200px_120px_#000] max-w-[500px]">
            <div className="space-y-8 text-center">
              {/* Logo */}
              <div className="flex justify-center">
                <Icon content={settings.logo!} />
              </div>
              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-normal text-white">
                  Be the first to try the new Acme
                  <br />
                  Team Chat System
                </h1>
                <p className="text-gray-400">Join the waitlist to be among the first to gain access.</p>
              </div>

              {/* Form */}
              <form
                className="flex gap-2 max-w-md mx-auto"
                onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                  'use server';
                  e.preventDefault();
                  const data = parseFormData(
                    waitlist.input.ingestKey,
                    waitlist.input.schema,
                    new FormData(e.currentTarget)
                  );
                  if (!data.success) {
                    console.error(data.errors);
                    return;
                  }
                  await sendEvent(waitlist.input.ingestKey, data.data);
                }}
              >
                {/* Input */}
                {waitlist.input.schema.map(({ type, placeholder }) => (
                  <input
                    key={type}
                    type={type}
                    placeholder={placeholder}
                    className="flex-1 bg-[#1A1A1A] border-0 text-white placeholder:text-gray-500"
                  />
                ))}
                <button className="bg-white text-black hover:bg-gray-100">Join Waitlist</button>
              </form>
            </div>
          </div>
        );
      }}
    </Pump>
  );
}
