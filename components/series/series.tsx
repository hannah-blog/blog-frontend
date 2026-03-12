import styles from '@/styles/components/series/series.module.css'
import Image from 'next/image'
import { dateFormat } from '@/components/utils/dateUtils'
import type { Series } from '@/api/caller'

export default function Series({ series }: { series: Series }) {
	return <div className={`${styles.series} rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer`}>
		<div className={styles.seriesHeader}>
			<div className={styles.seriesThumbnail}>
				<Image
					src={series.thumbnailUrl}
					alt={series.title}
					width={200}
					height={200}
				/>
			</div>
			<div className={styles.headerGradient} />
		</div>
		<div className={styles.seriesBody}>
			<h2 className={`${styles.seriesTitle} text-xl font-bold`}>
				{series.title}
			</h2>
			<p className={styles.seriesDate}>
				마지막 업데이트 : {dateFormat(series.createdDate)}
			</p>
		</div>
	</div>
}
