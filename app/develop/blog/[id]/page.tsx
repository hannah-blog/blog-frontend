import styles from '@/styles/app/blog/id/page.module.css'
import Image from 'next/image'
import ProgressBar from '@/components/motion/progress-bar'
import Markdown from '@/components/utils/markdown'
import { Typography } from '@/components/tailwind/client-components'
import { formatMetadata, Props } from '@/components/utils/meta-head'
import { fetchBlog } from '@/api/caller'
import { dateFormat, dateKoFormat, timeFormat } from "@/components/utils/dateUtils";

export async function generateMetadata({ params }: Props) {
  const id = Number(params.id);
  const post = await fetchBlog(id);

  return formatMetadata({
    title: post.title,
    description: post.content.substring(0, 100),
    image: post.thumbnailUrl,
    url: "/develop/blog/" + post.id,
    tags: post.tags.map(tag => tag.name)
  });
}

export default async function BlogDetail({
  params: { id },
}: {
  params: { id: number }
}) {
  const post = await fetchBlog(id);

  return <div className={styles.blogWrapper}>
    <ProgressBar />
    <div className={styles.titleText}>{post.title}</div>
    <div className={styles.dateWrapper}>
      <Typography>Created Date {dateKoFormat(post.createdDate)} {timeFormat(post.createdDate)}</Typography>
    </div>
    <Image
      className={styles.thumbnail}
      src={post.thumbnailUrl}
      alt={`${post.id}-thumbnail-image`}
      width={500}
      height={500}
    />
    <div className={styles.postWrapper}>
      <Markdown content={post.content} />
    </div>
  </div>;
}
