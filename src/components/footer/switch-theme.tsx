'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

export function ThemeSwitcher({
  lightIcon,
  darkIcon,
  systemIcon,
  className,
}: {
  lightIcon?: React.ReactNode;
  darkIcon?: React.ReactNode;
  systemIcon?: React.ReactNode;
  className?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = React.useState<string>();

  React.useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  return (
    <div className={clsx(className, 'flex gap-[3px] border-slate-4 border rounded-full py-0.5 p-[3px] bg-slate-2')}>
      <SwitchButton selectedTheme={selectedTheme} setTheme={setTheme} theme="light">
        {lightIcon}
      </SwitchButton>
      <SwitchButton selectedTheme={selectedTheme} setTheme={setTheme} theme="system">
        {systemIcon}
      </SwitchButton>
      <SwitchButton selectedTheme={selectedTheme} setTheme={setTheme} theme="dark">
        {darkIcon}
      </SwitchButton>
    </div>
  );
}

function SwitchButton({
  selectedTheme,
  theme,
  setTheme,
  children,
}: {
  selectedTheme?: string;
  theme: string;
  setTheme: (theme: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      aria-label={`${theme} theme`}
      className={clsx(
        '!size-[23x] p-[3px] !flex items-center justify-center rounded-full text-slate-8 cursor-default',
        "data-[selected='true']:bg-slate-5 data-[selected='true']:text-slate-12",
        'hover:bg-slate-4'
      )}
      data-selected={selectedTheme === theme}
      onClick={() => setTheme(theme)}
    >
      {children}
    </button>
  );
}
