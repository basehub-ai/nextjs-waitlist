import { Pump } from 'basehub/react-pump';
import { ThemeSwitcher } from './switch-theme';
import { Icon } from 'basehub/react-svg';
import clsx from 'clsx';
import * as React from 'react';

export const Footer = () => {
  return (
    <Pump
      queries={[
        {
          footer: {
            themeSwitcher: {
              sun: true,
              moon: true,
              system: true,
            },
          },
        },
        {
          footer: {
            socialMedia: {
              items: {
                url: true,
                icon: true,
                _title: true,
              },
            },
          },
        },
      ]}
    >
      {async ([
        {
          footer: { themeSwitcher },
        },
        {
          footer: { socialMedia },
        },
      ]) => {
        'use server';
        return (
          <>
            <ThemeSwitcher
              className="fixed bottom-[54px] left-[54px] "
              lightIcon={
                <Icon
                  components={{
                    svg: (props) => <svg {...props} className="!size-[18px]" />,
                  }}
                  content={themeSwitcher.sun}
                />
              }
              darkIcon={
                <Icon
                  components={{
                    svg: (props) => <svg {...props} className="!size-[18px]" />,
                  }}
                  content={themeSwitcher.moon}
                />
              }
              systemIcon={
                <Icon
                  components={{
                    svg: (props) => <svg {...props} className="!size-[18px]" />,
                  }}
                  content={themeSwitcher.system}
                />
              }
            />
            <nav className="inline-flex items-center gap-4 fixed bottom-[54px] right-[54px]">
              {socialMedia.items.map(({ url, icon }) => (
                <React.Fragment key={url}>
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 size-7 text-slate-8 hover:text-slate-11"
                  >
                    <Icon
                      components={{
                        svg: (props) => <svg {...props} className="size-[26px]" />,
                      }}
                      content={icon}
                    />
                  </a>
                  <hr className="bg-slate-8 h-6 w-px last:hidden border-none" />
                </React.Fragment>
              ))}
            </nav>
          </>
        );
      }}
    </Pump>
  );
};
