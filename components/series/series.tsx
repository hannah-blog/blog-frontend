import styles from '@/styles/components/series/series.module.css'
import Image from 'next/image'
import { Card, CardBody, CardHeader, Typography } from '@/components/tailwind/client-components'
import { dateFormat } from '@/components/utils/dateUtils'
import { Series } from '@/api/caller'

export default function Series({ series }: { series: Series }) {
	return <Card shadow={false} className={styles.series}>
		<CardHeader
			floated={false}
			shadow={false}
			color="transparent"
			className={styles.seriesHeader}
		>
			<Image
				src={series.thumbnailUrl}
				alt={series.title}
				layout="fill"
				objectFit="cover"
			/>
			<div className={styles.headerGradient} />
		</CardHeader>
		<CardBody className={styles.seriesBody}>
			<Typography variant="h2" color="white" className={styles.seriesTitle}>
				{series.title}
			</Typography>
			<Typography variant="h5" className={styles.seriesDate}>
				마지막 업데이트 : {dateFormat(series.createdDate)}
			</Typography>
		</CardBody>
	</Card>
}
