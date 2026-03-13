import styles from '@/styles/components/series/series.module.css'
import Image from 'next/image'
import { dateFormat } from '@/components/utils/dateUtils'
import type { Series } from '@/api/caller'

export default function Series({ series }: { series: Series }) {
	return <article className={`${styles.series} group shadow-sm shadow-surface-200/50 hover:shadow-xl hover:shadow-surface-300/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-surface-100`}>
		<div className={styles.seriesHeader}>
			<div className={styles.seriesThumbnail}>
				<Image
					src={series.thumbnailUrl}
					alt={series.title}
					fill
					className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
				/>
			</div>
			<div className={styles.headerGradient} />
		</div>
		<div className={styles.seriesBody}>
			<h2 className={styles.seriesTitle}>{series.title}</h2>
			<p className={styles.seriesDate}>{dateFormat(series.createdDate)}</p>
		</div>
	</article>
}
