import { ThemeProvider } from 'next-themes';
import { Toolbar } from 'basehub/next-toolbar';
import { BaseHubThemeProvider } from './theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="system">
      <Toolbar />
      {children}
    </ThemeProvider>
  );
}
