'use client'

import styles from '@/styles/app/private/page.module.css'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { fetchPortfolios, Portfolio } from '@/api/caller'
import { Button, Typography } from '@/components/tailwind/client-components'
import { Table } from '@/components/utils/table'

export default function Portfolio() {
	const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

	useEffect(() => {
		fetchPortfolios().then(setPortfolio);
	}, []);

	return <div className={styles.wrapper}>
		<Typography variant="h1">Portfolio</Typography>
		<Link href="/private/portfolio/new">
			<Button size="lg">New</Button>
		</Link>
		<Table data={portfolio} detailPath="portfolio" />
	</div>;
}
