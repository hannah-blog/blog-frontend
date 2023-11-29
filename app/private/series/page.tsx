import styles from '@/styles/app/private/page.module.css'
import Link from 'next/link'

import { Table } from '@/components/utils/table'
import { Button, Typography } from '@/components/tailwind/client-components'
import { fetchSeries } from '@/api/caller'

export default async function Series() {
	const series = await fetchSeries();

	return <div className={styles.wrapper}>
		<Typography variant="h1">Series</Typography>
		<Link href="/private/series/new">
			<Button size="lg">New</Button>
		</Link>
		{ series
			? <Table data={series} detailPath="series" />
			: <Typography variant="h3">No series</Typography>
		}
	</div>
}

