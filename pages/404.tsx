import '@/app/globals.css'

import { Inter } from 'next/font/google'
import styles from '@/styles/pages/not-found.module.css'
import Link from 'next/link'
import { Button, Typography } from '@/components/tailwind/client-components'
import { NotFountSvg } from '@/components/svg/svgs'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function NotFound() {
  return <body className={inter.className}>
    <Navbar />
    <div className={styles.main}>
      <div>
        <div className={styles.svgWrapper}>
          <NotFountSvg />
        </div>
        <Typography variant="h1" color="indigo">이런! 원하시는 페이지가 존재하지 않아요.</Typography>
        <Typography variant="h3" color="indigo">홈으로 이동할까요?</Typography>
        <Link href="/">
          <Button variant="outlined" color="indigo" className="rounded-full">Home</Button>
        </Link>
      </div>
    </div>
    <Footer />
  </body>;
}
