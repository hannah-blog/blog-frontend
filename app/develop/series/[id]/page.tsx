import Post from '@/components/post/post'
import InfiniteGrid from '@/components/utils/infinite-grid'
import { formatMetadata } from '@/components/utils/meta-head'
import { fetchBlogsBySeries } from '@/api/caller'

export async function generateMetadata() {
	return formatMetadata({
		title: "Develop Series",
		description: "Hannah Develop Series"
	});
}

export default async function SeriesBlog({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const { blogs } = await fetchBlogsBySeries(Number(id));

	return <div className="min-h-screen max-w-6xl mx-auto px-5 py-12 md:px-8 md:py-20">
		<div className="mb-10 md:mb-14">
			<h1 className="text-3xl md:text-4xl font-bold text-surface-900 tracking-tight">Series</h1>
		</div>
		<InfiniteGrid columns={3}>
			{blogs ? blogs.map((post, idx) => (
				<Post key={idx} post={post} />
			)) : []}
		</InfiniteGrid>
	</div>;
}
