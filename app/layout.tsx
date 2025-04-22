import './globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { LoadingProvider } from './providers/LoadingProvider'

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
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  )
}
