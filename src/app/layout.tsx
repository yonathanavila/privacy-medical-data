import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Provider from './Provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FVM Dataverse',
  description: 'FVM Dataverse Hackathon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-b from-[#131727] to-[#070816] min-h-screen'>
        <div className="bck"></div>
        <div className="logoBck" style={{ opacity: "65%", transform: "translateY(-50%)" }}></div>
        <div className="dotBck" style={{ transform: "scale(1.1)" }}></div>
        <Provider>
          <Navbar />
          <main className="flex min-h-screen flex-col font-roboto w-full" >
            <div style={{ zIndex: 5 }}>
              {children}
            </div>
          </main>
        </Provider>
      </body>
    </html>
  )
}
