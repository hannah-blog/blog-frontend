import styles from '@/styles/app/blog/page.module.css';
import { Post } from '@/components/post';
import { formatMetadata } from '@/components/utils/meta-head';
import { fetchBlogsBySeries } from '@/api/caller';
import { IndexProps } from '@/types/index-type';

export async function generateMetadata() {
	return formatMetadata({
		title: "Develop Series",
		description: "Hannah Develop Series"
	});
}

export default async function SeriesBlog(props: IndexProps) {
	const params = await props.params;
	const { blogs } = await fetchBlogsBySeries(params.id);

	return <div className={styles.main}>
		<div className={styles.titleText}>Develop Series</div>
		<div className={styles.blogListBox}>
			{blogs.map((post, idx) => {
				return <Post key={idx} post={post} />;
			})}
		</div>
	</div>;
}
