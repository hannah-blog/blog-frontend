import styles from '@/styles/app/blog/page.module.css'
import { Post } from '@/components/post'
import { formatMetadata } from '@/components/utils/meta-head'
import { fetchBlogsBySeries, Post as PostType } from '@/api/caller'

export async function generateMetadata() {
	return formatMetadata({
		title: "Develop Series",
		description: "Hannah Develop Series"
	});
}

export default async function SeriesBlog({
	params: { id },
}: {
	params: { id: number }
}) {
	const { blogs } = await fetchBlogsBySeries(id);

	return <div className={styles.main}>
		<div className={styles.titleText}>Develop Series</div>
		<div className={styles.blogListBox}>
			{blogs.map((post, idx) => {
				return <Post key={idx} post={post} />;
			})}
		</div>
	</div>;
}
