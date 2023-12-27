import styles from '@/styles/app/blog/id/page.module.css'
import Image from 'next/image'
import HeadMeta from '@/components/utils/meta-head'
import Markdown from '@/components/utils/markdown'
import ProgressBar from '@/components/motion/progress-bar'
import { Portfolio, fetchPortfolio } from '@/api/caller'

export default async function PortfolioDetail({
	params: { id },
}: {
	params: { id: number }
}) {
	const portfolio: Portfolio = await fetchPortfolio(id);

	return <>
		<HeadMeta
			title={portfolio.title}
			description={portfolio.content.substring(0, 100)}
			image={portfolio.thumbnailUrl}
			url={"/portfolio/" + portfolio.id}
		/>
		<div className={styles.blogWrapper}>
			<ProgressBar/>
			<div className={styles.titleText}>{portfolio.title}</div>
			<div className={styles.dateWrapper}>
			</div>
			<Image
				className={styles.thumbnail}
				src={portfolio.thumbnailUrl}
				alt={`${portfolio.id}-thumbnail-image`}
				width={500}
				height={500}
			/>
			<div className={styles.postWrapper}>
				<Markdown content={portfolio.content}/>
			</div>
		</div>
	</>;
}
