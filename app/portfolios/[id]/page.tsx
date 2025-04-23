import styles from '@/styles/app/blog/id/page.module.css';
import HeadMeta from '@/components/utils/meta-head';
import Markdown from '@/components/utils/markdown';
import ProgressBar from '@/components/motion/progress-bar';
import { Portfolio, fetchPortfolio } from '@/api/caller';
import { IdxBox } from '@/components/post';
import { IndexProps } from '@/types/index-type'

export default async function PortfolioDetail(props: IndexProps) {
	const params = await props.params;
	const portfolio: Portfolio = await fetchPortfolio(params.id);

	return <>
		<HeadMeta
			title={portfolio.title}
			description={portfolio.content.substring(0, 100)}
			image={portfolio.thumbnailUrl}
			url={`/portfolio/${portfolio.id}`}
		/>
		<IdxBox id={params.id} content={portfolio.content} url={"portfolios"} />
		<div className={styles.blogWrapper}>
			<ProgressBar/>
			<div className={styles.titleText}>{portfolio.title}</div>
			<div className={styles.dateWrapper}>
			</div>
			<div className={styles.postWrapper}>
				<Markdown content={portfolio.content}/>
			</div>
		</div>
	</>;
}
