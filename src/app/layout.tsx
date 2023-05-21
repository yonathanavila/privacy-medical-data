import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Provider from './Provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Electronic Health Records - #FVMDataverse',
  description: 'FVM Dataverse Hackathon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
