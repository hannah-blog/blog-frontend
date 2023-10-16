'use client'

import styles from '@/styles/app/private/page.module.css'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { fetchPortfolios, Portfolio } from '@/api/caller'
import { Button, Card, Typography } from '@/components/tailwind/client-components'

const cardClassName = "h-full w-full overflow-scroll"
const tableClassName = "w-full min-w-max table-auto text-left"
const thClassName = "border-b border-blue-gray-100 bg-blue-gray-50 p-4"
const thTypographyClassName = "font-normal leading-none opacity-70"

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
		<Card className={cardClassName}>
			<table className={tableClassName}>
				<thead>
				<th className={thClassName}>
					<Typography variant="small" color="blue-gray" className={thTypographyClassName}>
						No.
					</Typography>
				</th>
				<th className={thClassName}>
					<Typography variant="small" color="blue-gray" className={thTypographyClassName}>
						Title
					</Typography>
				</th>
				<th className={thClassName}>
					<Typography variant="small" color="blue-gray" className={thTypographyClassName}>
						Created Date
					</Typography>
				</th>
				<th className={thClassName}>
					<Typography variant="small" color="blue-gray" className={thTypographyClassName}>
						Update
					</Typography>
				</th>
				</thead>
				<tbody>
				{portfolio.map((portfolio, index) => {
					return <tr key={index}>
						<td>
							<Typography variant="small" color="blue-gray" className="font-normal">
								{portfolio.id}
							</Typography>
						</td>
						<td>
							<Typography variant="small" color="blue-gray" className="font-normal">
								{portfolio.title}
							</Typography>
						</td>
						<td>
							<Typography variant="small" color="blue-gray" className="font-normal">
								{portfolio.createdDate}
							</Typography>
						</td>
						<td>
							<Link href={`/private/portfolio/${portfolio.id}`}>
								<Button size="sm">Update</Button>
							</Link>
						</td>
					</tr>;
				})}
				</tbody>
			</table>
		</Card>
	</div>;
}
