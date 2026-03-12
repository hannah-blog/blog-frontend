import styles from '@/styles/app/page.module.css'
import CircleAnimation from '@/components/motion/helper/circle-animation'
import { MainSvg } from '@/components/svg/svgs'
import { formatMetadata } from '@/components/utils/meta-head'

export async function generateMetadata() {
  return formatMetadata({
    description: "Welcome to Hannah Blog! Hannah 블로그에 오신 것을 환영합니다! 쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다."
  });
}

export default function Home() {
  return <div className={styles.mainWrapper}>
    <div className={`${styles.contentWrapper} max-w-2xl w-full px-4`}>
      <MainSvg className={styles.indexing} />
      <h1 className={`${styles.indexing} text-3xl md:text-5xl font-bold text-indigo-700`}>
        Welcome to ChaeMin Blog!
      </h1>
      <p className={`${styles.indexing} text-lg md:text-xl text-indigo-600 leading-relaxed`}>
        저의 블로그에 오신 것을 환영합니다!<br />
        쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다.
      </p>
    </div>
    <CircleAnimation />
  </div>;
}
