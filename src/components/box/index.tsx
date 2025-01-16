import { Pump } from 'basehub/react-pump';
import { Icon } from 'basehub/react-svg';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface WaitlistWrapperProps {
  children: ReactNode;
}

export function WaitlistWrapper({ children }: WaitlistWrapperProps) {
  return (
    <Pump queries={[{ settings: { logo: true } }]}>
      {async ([
        {
          settings: { logo },
        },
      ]) => {
        'use server';

        return (
          <div
            className={clsx(
              'w-full mx-auto max-w-[500px] flex justify-center items-center bg-gray-1 border border-gray-4 dark:border-gray-3 p-8 rounded-2xl',
              'md:shadow-[0px_197px_55px_0px_rgba(0,_0,_0,_0.05),_0px_126px_51px_0px_rgba(0,_0,_0,_0.05),_0px_71px_43px_0px_rgba(0,_0,_0,_0.05),_0px_32px_32px_0px_rgba(0,_0,_0,_0.1),_0px_8px_17px_0px_rgba(0,_0,_0,_0.1)]',
              'md:dark:shadow-[0px_0px_100px_70px_rgba(255,_255,_255,_0.05),_0px_0px_200px_120px_#000]',
              // mobile shadow (little bit smaller)
              'shadow-lg',
              'dark:shadow-lg'
            )}
          >
            <div className="flex flex-col items-center gap-4 flex-1 text-center w-full">
              {/* Logo */}
              {logo && (
                <div className="flex justify-center w-32 h-auto items-center mx-auto">
                  <Icon content={logo} />
                </div>
              )}
              {/* Body */}
              <div className="flex flex-col items-center gap-10">{children}</div>
            </div>
          </div>
        );
      }}
    </Pump>
  );
}
