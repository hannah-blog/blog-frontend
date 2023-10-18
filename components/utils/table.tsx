import Link from 'next/link'
import { Button, Card, Typography } from '@/components/tailwind/client-components'

interface Data {
	id: number;
	title: string;
	createdDate?: string;
}

interface TableProps {
	data: Data[],
	detailPath: string,
}

const cardClassName = "h-full w-full overflow-scroll"
const tableClassName = "w-full min-w-max table-auto text-left"
const thClassName = "border-b border-blue-gray-100 bg-blue-gray-50 p-4"
const thTypographyClassName = "font-normal leading-none opacity-70"

export function Table({ data, detailPath }: TableProps) {
	return <Card className={cardClassName}>
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
			{data.map((it, index) => {
				return <tr key={index}>
					<td>
						<Typography variant="small" color="blue-gray" className="font-normal">
							{it.id}
						</Typography>
					</td>
					<td>
						<Typography variant="small" color="blue-gray" className="font-normal">
							{it.title}
						</Typography>
					</td>
					<td>
						<Typography variant="small" color="blue-gray" className="font-normal">
							{it.createdDate}
						</Typography>
					</td>
					<td>
						<Link href={`/private/${detailPath}/${it.id}`}>
							<Button size="sm">Update</Button>
						</Link>
					</td>
				</tr>;
			})}
			</tbody>
		</table>
	</Card>;
}
