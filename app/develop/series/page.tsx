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

	return <div>Develop Series</div>;
}
