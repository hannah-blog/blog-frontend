import styles from '@/styles/app/private/page.module.css'
import { Button } from '@/components/tailwind/client-components'
import Link from 'next/link'

export default function Private() {
	return <div className={styles.wrapper}>
		<Link href="/private/blog"><Button size="lg">블로그</Button></Link>
		<Link href="/private/serise"><Button size="lg">시리즈</Button></Link>
		<Link href="/private/tag"><Button size="lg">태그</Button></Link>
	</div>

}
