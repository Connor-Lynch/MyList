import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './ui/globals.css'
import Header from './ui/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MyList',
  description: 'Simple list manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
