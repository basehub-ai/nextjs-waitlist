import { Pump } from 'basehub/react-pump'
import { RichText } from 'basehub/react-rich-text'
import { sendEvent, parseFormData } from 'basehub/events'
import { InputForm } from '~/components/waitlist-form'
import { WaitlistWrapper } from '~/components/box'
import clsx from 'clsx'

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

        const emailInput = waitlist.input.schema.find(
          (input) => input.type === 'email'
        )
        const numberInput = waitlist.input.schema.find(
          (input) => input.type === 'number'
        )
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
            <div className="px-1 flex flex-col w-full self-stretch gap-2">
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
                >
                  {numberInput && (
                    <input
                      placeholder={numberInput.placeholder}
                      className={clsx(
                        'flex-1 text-sm pl-4 pr-2 py-2 h-11 bg-gray-11/5 cursor-text rounded-full text-gray-12 placeholder:text-gray-9 border border-gray-11/10'
                      )}
                      {...numberInput}
                    />
                  )}
                </InputForm>
              )}
            </div>
          </WaitlistWrapper>
        )
      }}
    </Pump>
  )
}
