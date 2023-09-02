'use client'

import dynamic from 'next/dynamic'
import styles from '@/styles/app/blog/id/page.module.css'
import HeadMeta from '@/components/utils/meta-head'
import Image from 'next/image'
import { Typography } from '@/components/tailwind/client-components'
import { getPostById } from '@/data/post-data'
import { motion, useScroll } from 'framer-motion'
import { MarkdownPreviewProps } from '@uiw/react-markdown-preview'

const MarkdownPreview = dynamic<MarkdownPreviewProps>(() => import("@uiw/react-markdown-preview"), { ssr: false });

export default function BlogDetail({ params: { id } }: { params: { id: number; } }) {
  const post = getPostById(id);
  const { scrollYProgress } = useScroll();

  return <>
    <HeadMeta
      title={post.title}
      description={post.content.substring(0, 100)}
      image={post.thumbnailUrl}
      url={"/develop/blog/" + post.id}
      tags={post.tags.map(tag => tag.name)}
    />
    <div className={styles.progressBar}><motion.div
      className="progress-bar"
      style={{ scaleX: scrollYProgress }}
    /></div>
    <div className={styles.titleText}>{post.title}</div>
    <div className={styles.dateWrapper}>
      <Typography>Created Date {post.createdDate}</Typography>
    </div>
    <Image className={styles.thumbnail} src={post.thumbnailUrl} alt={`${post.id}-thumbnail-image`} width={500} height={500} />
    <div className={styles.postWrapper}>
      <MarkdownPreview source={post.content}/>
    </div>
  </>;
}
