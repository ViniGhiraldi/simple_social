'use client'

import NextAuthSessionProvider from '@/providers/session-provider'
import './globals.css'
import { Roboto } from 'next/font/google'
import { NewPostProvider } from '@/contexts/new-post-context'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.className}`}>
        <NextAuthSessionProvider>
          <NewPostProvider>
            {children}
          </NewPostProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
