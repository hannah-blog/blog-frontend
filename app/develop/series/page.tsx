import styles from '@/styles/app/blog/page.module.css'
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

	return <div className={styles.main}>
		<div className={styles.titleText}>Develop Series</div>
		<div className={styles.blogListBox}>
			{series.map((series, idx) => {
				return <Link key={idx} href={`/develop/series/${series.id}`}>
					<Series key={idx} series={series}/>
				</Link>;
			})}
		</div>
	</div>;
}
