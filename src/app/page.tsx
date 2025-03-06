import { Pump } from 'basehub/react-pump'
import { RichText } from 'basehub/react-rich-text'
import { sendEvent, parseFormData } from 'basehub/events'
import { InputForm } from '~/components/waitlist-form'
import { WaitlistWrapper } from '~/components/box'

export const dynamic = 'force-static'

export default async function Home() {
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
            button: {
              idleCopy: true,
              successCopy: true,
              submittingCopy: true,
            },
          },
        },
      ]}
    >
      {async ([{ waitlist }]) => {
        'use server'

        const emailInput = waitlist.input.schema[0]
        if (!emailInput) {
          console.warn('No email input found')
        }
        return (
          <WaitlistWrapper>
            {/* Heading */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-medium text-slate-12 whitespace-pre-wrap text-pretty">
                {waitlist.title}
              </h1>
              {waitlist.subtitle && (
                <div className="text-slate-10 [&>p]:tracking-tight text-pretty">
                  <RichText content={waitlist.subtitle.json.content} />
                </div>
              )}
            </div>
            {/* Form */}
            <div className="px-1 flex flex-col w-full self-stretch">
              {emailInput && (
                <InputForm
                  buttonCopy={{
                    idle: waitlist.button.idleCopy,
                    success: waitlist.button.successCopy,
                    loading: waitlist.button.submittingCopy,
                  }}
                  formAction={async (data) => {
                    'use server'
                    try {
                      const parsedData = parseFormData(
                        waitlist.input.ingestKey,
                        waitlist.input.schema,
                        data
                      )
                      if (!parsedData.success) {
                        console.error(parsedData.errors)
                        return {
                          success: false,
                          error:
                            parsedData.errors[emailInput.name] ||
                            Object.values(parsedData.errors)[0] ||
                            'Unknown error',
                        }
                      }
                      await sendEvent(waitlist.input.ingestKey, parsedData.data)
                      return { success: true }
                    } catch (error) {
                      console.error(error)
                      return {
                        success: false,
                        error: 'There was an error while submitting the form',
                      }
                    }
                  }}
                  {...emailInput}
                />
              )}
            </div>
          </WaitlistWrapper>
        )
      }}
    </Pump>
  )
}
