import './globals.css';
import Script from 'next/script';
import Provider from './Provider';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'File Health - #FVMDataverse',
  description: 'FVM Dataverse Hackathon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-JTMGTW1JXZ" />
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                    window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-JTMGTW1JXZ', {
                        page_path: window.location.pathname,
                      });
            `,
        }}
      />
      <body className='bg-gradient-to-b from-[#131727] to-[#070816] h-max'>
        <div className="bck h-max"></div>
        <div className="dotBck h-max" style={{ transform: "scale(1.1)" }}></div>
        <Provider>
          <Navbar />
          <main className="flex min-h-screen flex-col font-roboto w-full h-max" >
            <div style={{ zIndex: 5 }}>
              {children}
            </div>
          </main>
        </Provider>
      </body>
    </html>
  )
}
