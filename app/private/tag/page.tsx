'use client'

import styles from '@/styles/app/private/page.module.css'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { fetchTags, Tag } from '@/api/caller'
import { Button, Typography } from '@/components/tailwind/client-components'
import { Table } from '@/components/utils/table'

interface Props {
	id: number;
	title: string;
}

export default function Tag() {
	const [tags, setTags] = useState<Props[]>([]);

	useEffect(() => {
		fetchTags().then((data) => {
			setTags(data.map((it) => {
				return {
					id: it.id,
					title: it.name,
				}
			}));
		});
	}, []);

	return <div className={styles.wrapper}>
		<Typography variant="h1">Tags</Typography>
		<Link href="/private/tag/new">
			<Button size="lg">New</Button>
		</Link>
		<Table
			data={tags}
			detailPath="tag"
		/>
	</div>
}
