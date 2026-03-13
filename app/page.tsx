import styles from '@/styles/app/page.module.css'
import CircleAnimation from '@/components/motion/helper/circle-animation'
import { formatMetadata } from '@/components/utils/meta-head'
import Link from 'next/link'
import { logo } from '@/components/font/google'

export async function generateMetadata() {
  return formatMetadata({
    description: "Welcome to Hannah Blog! Hannah 블로그에 오신 것을 환영합니다! 쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다."
  });
}

export default function Home() {
  return <div className={styles.mainWrapper}>
    <CircleAnimation />
    <div className={`${styles.contentWrapper} max-w-2xl w-full px-6`}>
      <div className={`${styles.indexing} flex items-center gap-3 mb-2`}>
        <img
          src="https://avatars.githubusercontent.com/u/57277976?v=4"
          alt="profile"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
        />
      </div>
      <h1 className={`${styles.indexing} text-4xl md:text-6xl font-bold tracking-tight`}>
        <span className="text-surface-900">안녕하세요,</span><br />
        <span style={logo.style} className="text-primary-600">Hannah</span>
        <span className="text-surface-900">입니다</span>
      </h1>
      <p className={`${styles.indexing} text-lg md:text-xl text-surface-400 leading-relaxed mt-2`}>
        개발하며 배운 것들을 기록하는 블로그입니다.
      </p>
      <div className={`${styles.indexing} flex flex-wrap gap-3 mt-6`}>
        <Link
          href="/develop/blogs"
          className="px-6 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-full hover:bg-primary-700 transition-colors shadow-md shadow-primary-200"
        >
          Blog
        </Link>
        <Link
          href="/introduce/profile"
          className="px-6 py-2.5 bg-white text-surface-700 text-sm font-medium rounded-full hover:bg-surface-50 transition-colors border border-surface-200 shadow-sm"
        >
          About Me
        </Link>
      </div>
    </div>
  </div>;
}
