import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingActionButton from '@/components/FloatingActionButton'

export const metadata: Metadata = {
  title: 'Hobbipedia',
  description: 'Your comprehensive guide to hobbies, interests, and specialized terminology',
  keywords: 'hobbies, sports, terminology, dictionary, definitions',
  authors: [{ name: 'Hobbipedia Team' }],
  manifest: '/manifest.json',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3B82F6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <FloatingActionButton />
        <Footer />
      </body>
    </html>
  )
}