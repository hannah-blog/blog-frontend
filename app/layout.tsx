import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/tailwind/client-components'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={inter.className}>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  )
}
