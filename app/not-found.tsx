import styles from '@/styles/pages/not-found.module.css'
import Link from 'next/link'
import { Button, Typography } from '@/components/tailwind/client-components'
import { NotFountSvg } from '@/components/svg/svgs'

export default function NotFound() {
  return <div className={styles.main}>
    <div className="px-6">
      <div className={styles.svgWrapper}>
        <NotFountSvg />
      </div>
      <Typography variant="h1" className="text-primary-600 text-2xl md:text-4xl">이런! 원하시는 페이지가 존재하지 않아요.</Typography>
      <Typography variant="h3" className="text-primary-600 mt-2 text-lg md:text-2xl">홈으로 이동할까요?</Typography>
      <Link href="/">
        <Button variant="outlined" className="rounded-full mt-4 border-primary-600 text-primary-600 hover:bg-primary-50">Home</Button>
      </Link>
    </div>
  </div>;
}
