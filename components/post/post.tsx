import styles from '@/styles/components/post/post.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Post as PostType } from '@/data/post-data'
import { CardBody, CardFooter, CardHeader, Chip } from '@/components/tailwind/client-components'
import { dateFormat } from '@/components/utils/dateUtils'

export default function Post({ post }: { post: PostType }) {
  return (
    <Link href={`/develop/blog/${post.id}`}>
      <div className={styles.card}>
        <CardHeader color="indigo" className="relative h-56">
          <Image
            src={post.thumbnailUrl}
            alt="thumbnail-url"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </CardHeader>
        <CardBody className="text-center">{post.title}</CardBody>
        <CardFooter divider className={styles.tagWrapper}>
          <div className={styles.tagList}>
            {post.tags.map((tag, idx) => {
              return <Chip className="mr-1 font-sans font-light" color="indigo" value={`#${tag.name}`} key={idx} />;
            })}
          </div>
          <div className={styles.date}>
            {dateFormat(post.createdDate)}
          </div>
        </CardFooter>
      </div>
    </Link>
  );
}
