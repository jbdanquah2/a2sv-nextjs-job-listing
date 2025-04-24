import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import Navbar from '../components/Navbar/Navbar'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job Listing',
  description: 'Job Listing App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
