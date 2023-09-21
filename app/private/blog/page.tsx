import styles from '@/styles/app/private/page.module.css'
import { Button, Card, Typography } from '@/components/tailwind/client-components'
import Link from 'next/link'
import { fetchBlogs } from '@/api/caller'

const cardClassName = "h-full w-full overflow-scroll"
const tableClassName = "w-full min-w-max table-auto text-left"
const thClassName = "border-b border-blue-gray-100 bg-blue-gray-50 p-4"
const thTypographyClassName = "font-normal leading-none opacity-70"

export default async function Blog() {
	const posts = await fetchBlogs();

	return <div className={styles.wrapper}>
		<Typography variant="h1">Blog</Typography>
		<Link href="/private/blog/new">
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
				{posts.map((post, index) => {
					return <tr key={index}>
						<td>
							<Typography variant="small" color="blue-gray" className="font-normal">
								{post.id}
							</Typography>
						</td>
						<td>
							<Typography variant="small" color="blue-gray" className="font-normal">
								{post.title}
							</Typography>
						</td>
						<td>
							<Typography variant="small" color="blue-gray" className="font-normal">
								{post.createdDate}
							</Typography>
						</td>
						<td>
							<Link href={`/private/blog/${post.id}`}>
								<Button>Edit</Button>
							</Link>
						</td>
					</tr>;
				})}
				</tbody>
			</table>
		</Card>
	</div>;
}

