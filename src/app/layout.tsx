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
        <Provider>
          <Navbar />
          <main className="flex min-h-screen flex-col font-roboto mt-4">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
