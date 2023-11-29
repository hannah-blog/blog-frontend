import styles from '@/styles/app/private/page.module.css'
import Link from 'next/link'

import { Table } from '@/components/utils/table'
import { Button, Typography } from '@/components/tailwind/client-components'
import { fetchBlogs } from '@/api/caller'

export default async function Blog() {
	const posts = await fetchBlogs();

	return <div className={styles.wrapper}>
		<Typography variant="h1">Blog</Typography>
		<Link href="/private/blog/new">
			<Button size="lg">New</Button>
		</Link>
		{ posts
			? <Table  data={posts} detailPath="blog" />
			: <Typography variant="h3">No posts</Typography>
		}
	</div>;
}

