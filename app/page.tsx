import styles from '@/styles/app/page.module.css'
import CircleAnimation from '@/components/motion/circle-animation'
import { Typography } from '@/components/tailwind/client-components'
import { MainSvg } from '@/components/svg/svgs'
import { formatMetadata } from '@/components/utils/meta-head'

export async function generateMetadata() {
  return formatMetadata({
    description: "Welcome to Hannah Blog! Hannah 블로그에 오신 것을 환영합니다! 쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다."
  });
}

export default function Home() {
  return <div className={styles.mainWrapper}>
    <div className={styles.contentWrapper}>
      <MainSvg className={styles.indexing} />
      <Typography className={styles.indexing} variant="h1" color="indigo">Welcome to ChaeMin Blog!</Typography>
      <Typography className={styles.indexing} variant="lead" color="indigo">
        저의 블로그에 오신 것을 환영합니다!<br />
        쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다.
      </Typography>
    </div>
    <CircleAnimation />
  </div>;
}
