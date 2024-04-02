import styles from '@/styles/app/blog/id/page.module.css'
import Image from 'next/image'
import ProgressBar from '@/components/motion/progress-bar'
import Markdown from '@/components/utils/markdown'
import HeadMeta from '@/components/utils/meta-head'
import { Typography } from '@/components/tailwind/client-components'
import { fetchBlog, Post } from '@/api/caller'
import { dateKoFormat, timeFormat } from '@/components/utils/dateUtils'
import { IdxBox, TagBox } from '@/components/post/index'

export default async function BlogDetail({
  params: { id },
}: {
	params: { id: number }
}) {
	const post: Post = await fetchBlog(id);

	return <>
		<HeadMeta
			title={post.title}
			description={post.content.substring(0, 100)}
			image={post.thumbnailUrl}
			url={"/develop/blogs/" + post.id}
			tags={post.tags.map(tag => tag.name)}
		/>
		<IdxBox id={id} content={post.content} url={"develop/blogs"} />
		<TagBox tags={post.tags} />
		<div className={styles.blogWrapper}>
			<ProgressBar/>
			<div className={styles.titleText}>{post.title}</div>
			<div className={styles.dateWrapper}>
				<Typography>{dateKoFormat(post.createdDate)} {timeFormat(post.createdDate)}</Typography>
			</div>
			<Image
				className={styles.thumbnail}
				src={post.thumbnailUrl}
				alt={`${post.id}-thumbnail-image`}
				width={300}
				height={200}
			/>
			<div className={styles.postWrapper}>
				<Markdown content={post.content}/>
			</div>
		</div>
	</>;
}
