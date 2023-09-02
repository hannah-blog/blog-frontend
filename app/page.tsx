import styles from '@/styles/app/page.module.css'
import HeadMeta from '@/components/utils/meta-head'
import { Typography } from '@/components/tailwind/client-components'
import { MainSvg } from '@/components/svg/svgs'

export default function Home() {
  return <>
      <HeadMeta description="Welcome to Hannah Blog! Hannah 블로그에 오신 것을 환영합니다! 쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다." />
      <div className={styles.mainWrapper}>
        <div className={styles.contentWrapper}>
          <MainSvg />
          <Typography variant="h1" color="indigo">Welcome to ChaeMin Blog!</Typography>
          <Typography variant="lead" color="indigo">
            저의 블로그에 오신 것을 환영합니다!<br />
            쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다.
          </Typography>
        </div>
      </div>
    </>;
}
