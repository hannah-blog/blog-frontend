import './globals.css'
import { ThemeProvider } from '@/components/tailwind/client-components'
import { inter } from '@/components/font/google'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

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
