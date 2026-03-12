import './globals.css'
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
      <body className={inter.className}>
        <Navbar />
        <main className="pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
