import styles from '@/styles/app/private/page.module.css'
import Link from 'next/link'

import { fetchTags } from '@/api/caller'
import { Button, Card, Typography } from '@/components/tailwind/client-components'
import { OnClickButton } from '@/app/private/tag/custom-button'

const cardClassName = "h-full w-full overflow-scroll"
const tableClassName = "w-full min-w-max table-auto text-left"
const thClassName = "border-b border-blue-gray-100 bg-blue-gray-50 p-4"
const thTypographyClassName = "font-normal leading-none opacity-70"

export default async function Tag() {
	const tags = await fetchTags();

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
				{ tags
					? tags.map((it, index) => {
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
								<OnClickButton tagId={it.id} />
							</td>
						</tr>;
					})
					: <Typography variant="h3">No tags</Typography>
				}
				</tbody>
			</table>
		</Card>
	</div>
}
