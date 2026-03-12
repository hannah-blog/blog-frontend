import Series from '@/components/series/series'
import Link from 'next/link'
import { formatMetadata } from '@/components/utils/meta-head'
import { fetchSeries } from '@/api/caller'

export async function generateMetadata() {
	return formatMetadata({
		title: "Develop Series",
		description: "Hannah Develop Series"
	});
}

export default async function DevelopSeries() {
	const series = await fetchSeries();

	return <div className="min-h-screen px-4 py-12 md:px-8 md:py-20">
		<h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 md:mb-12">Develop Series</h1>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{series && series.map((s, idx) => {
				return <Link key={idx} href={`/develop/series/${s.id}`}>
					<Series series={s}/>
				</Link>;
			})}
		</div>
	</div>;
}
