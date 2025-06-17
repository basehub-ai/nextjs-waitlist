import { ThemeProvider } from 'next-themes'
import { Settings } from '../../basehub'

export function Providers({
  children,
  defaultTheme,
  forcedTheme,
}: {
  children: React.ReactNode
  defaultTheme: Settings['defaultTheme']
  forcedTheme: Settings['forcedTheme']
}) {
  return (
    <ThemeProvider
      enableSystem
      disableTransitionOnChange
      attribute="class"
      defaultTheme={defaultTheme || 'system'}
      forcedTheme={forcedTheme || undefined}
    >
      {children}
    </ThemeProvider>
  )
}
