import Series from '@/components/series/series'
import Link from 'next/link'
import InfiniteGrid from '@/components/utils/infinite-grid'
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

	return <div className="min-h-screen max-w-6xl mx-auto px-5 py-12 md:px-8 md:py-20">
		<div className="mb-10 md:mb-14">
			<h1 className="text-3xl md:text-4xl font-bold text-surface-900 tracking-tight">Series</h1>
			<p className="mt-2 text-surface-400">주제별로 묶은 시리즈 글 모음입니다.</p>
		</div>
		<InfiniteGrid columns={2}>
			{series ? series.map((s, idx) => (
				<Link key={idx} href={`/develop/series/${s.id}`}>
					<Series series={s}/>
				</Link>
			)) : []}
		</InfiniteGrid>
	</div>;
}
