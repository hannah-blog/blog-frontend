'use client'

import styles from '@/styles/app/private/page.module.css'
import Link from 'next/link'

import { Table } from '@/components/utils/table'
import { Button, Typography } from '@/components/tailwind/client-components'
import { useEffect, useState } from 'react'
import { fetchSeries, Series } from '@/api/caller'

export default function Series() {
	const [series, setSeries] = useState<Series[]>([]);

	useEffect(() => {
		fetchSeries().then(setSeries);
	}, []);

	return <div className={styles.wrapper}>
		<Typography variant="h1">Series</Typography>
		<Link href="/private/series/new">
			<Button size="lg">New</Button>
		</Link>
		<Table data={series} detailPath="series" />
	</div>
}

