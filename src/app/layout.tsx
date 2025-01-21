import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Providers } from '~/context';
import { Header } from '~/components/header';
import { Toolbar } from 'basehub/next-toolbar';
import { GradientBackground } from '~/components/gradient';
import { basehub } from 'basehub';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await basehub().query({
    settings: {
      metadata: {
        ogImage: {
          url: true,
        },
      },
    },
  });
  return {
    openGraph: {
      type: 'website',
      images: [data.settings.metadata.ogImage.url],
    },
  };
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body
        className={`${geistSans.className} antialiased max-w-screen min-h-svh bg-slate-1 text-slate-12 opacity-0 duration-75 transition-opacity`}
      >
        <Providers>
          <GradientBackground>
            <canvas id="gradient-canvas" className="fixed top-0 left-0 w-full h-full -z-1" data-transition-in />
          </GradientBackground>
          <div className="max-w-screen-sm mx-auto w-full relative z-[1] flex flex-col min-h-screen">
            <div className="px-5 gap-8 flex flex-col flex-1 pt-[270px]">
              <Header />
              <main className="flex justify-center">{children}</main>
            </div>
          </div>
          <Toolbar />
        </Providers>
      </body>
    </html>
  );
}
