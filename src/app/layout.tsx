import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from '~/context'
import { Header } from '~/components/header'
import { Toolbar } from 'basehub/next-toolbar'
import { basehub } from 'basehub'
import { Pump } from 'basehub/react-pump'
import { MeshGradientComponent } from '~/components/mesh-gradient'
import '../../basehub.config'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  preload: true,
})

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await basehub().query({
    settings: {
      metadata: {
        titleTemplate: true,
        defaultTitle: true,
        defaultDescription: true,
        favicon: {
          url: true,
        },
        ogImage: {
          url: true,
        },
      },
    },
  })
  return {
    title: {
      template: data.settings.metadata.titleTemplate,
      default: data.settings.metadata.defaultTitle,
    },
    description: data.settings.metadata.defaultDescription,
    openGraph: {
      type: 'website',
      images: [data.settings.metadata.ogImage.url],
    },
    twitter: {
      card: 'summary_large_image',
      images: [data.settings.metadata.ogImage.url],
    },
    icons: [data.settings.metadata.favicon.url],
  }
}

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased max-w-screen min-h-svh bg-slate-1 text-slate-12 opacity-0 duration-75 transition-opacity`}
      >
        <Pump
          queries={[
            {
              settings: {
                defaultTheme: true,
                forcedTheme: true,
                background: {
                  color1: { hex: true },
                  color2: { hex: true },
                  color3: { hex: true },
                  color4: { hex: true },
                  speed: true,
                },
              },
            },
          ]}
        >
          {async ([{ settings }]) => {
            'use server'

            return (
              <Providers
                defaultTheme={settings.defaultTheme || 'system'}
                forcedTheme={settings.forcedTheme}
              >
                <MeshGradientComponent
                  color1={settings.background.color1.hex}
                  color2={settings.background.color2.hex}
                  color3={settings.background.color3.hex}
                  color4={settings.background.color4.hex}
                  speed={settings.background.speed}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
                <div className="max-w-screen-sm mx-auto w-full relative z-[1] flex flex-col min-h-screen">
                  <div className="px-5 gap-8 flex flex-col flex-1 py-[12vh]">
                    <Header />
                    <main className="flex justify-center">{children}</main>
                  </div>
                </div>
              </Providers>
            )
          }}
        </Pump>
        <Toolbar />
      </body>
    </html>
  )
}
