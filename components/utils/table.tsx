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
const thClassName = "border-b border-slate-100 bg-slate-50 p-4"
const thTypographyClassName = "font-normal leading-none opacity-70"

export function Table({ data, detailPath }: TableProps) {
	return <Card className={cardClassName}>
		<table className={tableClassName}>
			<thead>
			<th className={thClassName}>
				<Typography variant="small" className={`text-slate-600 ${thTypographyClassName}`}>
					No.
				</Typography>
			</th>
			<th className={thClassName}>
				<Typography variant="small" className={`text-slate-600 ${thTypographyClassName}`}>
					Title
				</Typography>
			</th>
			<th className={thClassName}>
				<Typography variant="small" className={`text-slate-600 ${thTypographyClassName}`}>
					Created Date
				</Typography>
			</th>
			<th className={thClassName}>
				<Typography variant="small" className={`text-slate-600 ${thTypographyClassName}`}>
					Update
				</Typography>
			</th>
			</thead>
			<tbody>
			{data.map((it, index) => {
				return <tr key={index}>
					<td>
						<Typography variant="small" className="text-slate-600 font-normal">
							{it.id}
						</Typography>
					</td>
					<td>
						<Typography variant="small" className="text-slate-600 font-normal">
							{it.title}
						</Typography>
					</td>
					<td>
						<Typography variant="small" className="text-slate-600 font-normal">
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
