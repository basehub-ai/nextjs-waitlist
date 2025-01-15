import { Pump } from 'basehub/react-pump';
import { WaitlistWrapper } from '~/components/box';
import { RichText } from 'basehub/react-rich-text';
import { Alex_Brush } from 'next/font/google';
import clsx from 'clsx';

const font = Alex_Brush({
  variable: '--font-alex-brush',
  subsets: ['latin'],
  weight: '400',
});

export default function Manifesto() {
  return (
    <Pump
      queries={[
        {
          manifesto: {
            body: {
              json: {
                content: true,
              },
            },
            signature: {
              signatureName: true,
              name: true,
              role: true,
            },
          },
        },
      ]}
    >
      {async ([{ manifesto }]) => {
        'use server';
        return (
          <WaitlistWrapper>
            <div className="flex flex-col items-center gap-10">
              <div className="text-slate-9 [&>p]:tracking-tight [&>p]:leading-7">
                {manifesto.body && <RichText content={manifesto.body?.json.content} />}
              </div>
              <div className="flex flex-col items-center gap-10">
                <div className="flex flex-col gap-0.5">
                  <p className={clsx('text-slate-12 text-4xl font-medium italic transform -rotate-12', font.className)}>
                    {manifesto.signature.signatureName}
                  </p>
                  <p className="text-slate-11 text-sm font-medium">{manifesto.signature.name}</p>
                  <p className="text-slate-10 text-xs">{manifesto.signature.role}</p>
                </div>
              </div>
            </div>
          </WaitlistWrapper>
        );
      }}
    </Pump>
  );
}
