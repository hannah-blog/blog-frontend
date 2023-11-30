import styles from '@/styles/app/private/page.module.css'
import Link from 'next/link'

import { fetchPortfolios } from '@/api/caller'
import { Button, Typography } from '@/components/tailwind/client-components'
import { Table } from '@/components/utils/table'

export default async function Portfolio() {
	const portfolios = await fetchPortfolios();

	return <div className={styles.wrapper}>
		<Typography variant="h1">Portfolio</Typography>
		<Link href="/private/portfolio/new">
			<Button size="lg">New</Button>
		</Link>
		{ portfolios
			? <Table data={portfolios} detailPath="portfolio"/>
			: <Typography variant="h3">No portfolios</Typography>
		}
	</div>;
}
