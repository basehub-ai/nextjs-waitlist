import { Pump } from 'basehub/react-pump'
import { WaitlistWrapper } from '~/components/box'
import { RichText } from 'basehub/react-rich-text'
import { Alex_Brush } from 'next/font/google'
import clsx from 'clsx'

const font = Alex_Brush({
  variable: '--font-alex-brush',
  subsets: ['latin'],
  weight: '400',
})

export const dynamic = 'force-static'

export default async function Manifesto() {
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
            author: {
              signatureName: true,
              name: true,
              role: true,
            },
          },
        },
      ]}
    >
      {async ([{ manifesto }]) => {
        'use server'
        return (
          <WaitlistWrapper>
            <div className="flex flex-col gap-10">
              <div className="text-slate-11 [&>p]:tracking-tight [&>p]:leading-[1.6] [&>p:not(:last-child)]:mb-3 text-pretty text-start">
                {manifesto.body && (
                  <RichText content={manifesto.body.json.content} />
                )}
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-0.5 items-start">
                  <p
                    className={clsx(
                      'text-slate-12 text-4xl font-medium italic transform -rotate-12',
                      font.className
                    )}
                  >
                    {manifesto.author.signatureName}
                  </p>
                  <p className="text-slate-11 text-sm font-medium">
                    {manifesto.author.name}{' '}
                    <span className="text-slate-10 text-xs">
                      {manifesto.author.role}
                    </span>
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
          </WaitlistWrapper>
        )
      }}
    </Pump>
  )
}
