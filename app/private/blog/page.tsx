'use client'

import styles from '@/styles/app/private/page.module.css'
import Link from 'next/link'

import { Table } from '@/components/utils/table'
import { Button, Typography } from '@/components/tailwind/client-components'
import { fetchBlogs, Post } from '@/api/caller'
import { useEffect, useState } from 'react'

export default function Blog() {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		fetchBlogs().then(setPosts);
	}, [])

	return <div className={styles.wrapper}>
		<Typography variant="h1">Blog</Typography>
		<Link href="/private/blog/new">
			<Button size="lg">New</Button>
		</Link>
		<Table  data={posts} detailPath="blog" />
	</div>;
}

