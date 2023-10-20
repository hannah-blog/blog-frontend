'use client'

import styles from '@/styles/app/private/page.module.css'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { fetchDeleteTag, fetchTags, Tag } from '@/api/caller'
import { Button, Card, Typography } from '@/components/tailwind/client-components'

const cardClassName = "h-full w-full overflow-scroll"
const tableClassName = "w-full min-w-max table-auto text-left"
const thClassName = "border-b border-blue-gray-100 bg-blue-gray-50 p-4"
const thTypographyClassName = "font-normal leading-none opacity-70"

export default function Tag() {
	const [tags, setTags] = useState<Tag[]>([]);

	useEffect(() => {
		fetchTags().then(setTags);
	}, []);

	const tagDelete = async (id: number) => {
		fetchDeleteTag(id)
			.then(() => {
				alert('성공');
			});
	}

	return <div className={styles.wrapper}>
		<Typography variant="h1">Tags</Typography>
		<Link href="/private/tag/new">
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
						Delete
					</Typography>
				</th>
				</thead>
				<tbody>
				{tags.map((it, index) => {
					return <tr key={index}>
						<td>
							<Typography variant="small" color="blue-gray" className="font-normal">
								{it.id}
							</Typography>
						</td>
						<td>
							<Typography variant="small" color="blue-gray" className="font-normal">
								{it.name}
							</Typography>
						</td>
						<td>
							<Button onClick={() => tagDelete(it.id)} size="sm">Delete</Button>
						</td>
					</tr>;
				})}
				</tbody>
			</table>
		</Card>
	</div>
}
