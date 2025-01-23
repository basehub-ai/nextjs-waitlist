import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from '~/context'
import { Header } from '~/components/header'
import { Toolbar } from 'basehub/next-toolbar'
import { GradientBackground } from '~/components/gradient'
import { basehub } from 'basehub'
import { Pump } from 'basehub/react-pump'
import { backgroundFragment } from '~/components/gradient/_fragment'

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
        <Providers>
          <Pump
            queries={[
              {
                settings: {
                  background: { ...backgroundFragment, speed: true },
                },
              },
            ]}
          >
            {async ([{ settings }]) => {
              'use server'
              return (
                <GradientBackground {...settings.background}>
                  <canvas
                    id="gradient-canvas"
                    className="fixed top-0 left-0 w-full h-full -z-1"
                    data-transition-in
                  />
                </GradientBackground>
              )
            }}
          </Pump>
          <div className="max-w-screen-sm mx-auto w-full relative z-[1] flex flex-col min-h-screen">
            <div className="px-5 gap-8 flex flex-col flex-1 py-[12vh]">
              <Header />
              <main className="flex justify-center">{children}</main>
            </div>
          </div>
          <Toolbar />
        </Providers>
      </body>
    </html>
  )
}
