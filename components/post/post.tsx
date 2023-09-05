import styles from '@/styles/components/post/post.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Post as PostType } from '@/data/post-data'
import { CardBody, CardFooter, CardHeader, Chip, Typography } from '@/components/tailwind/client-components'

export default function Post({ post, idx }: { post: PostType, idx: number }) {
  return (
    <Link href={`/develop/blog/${post.id}`}>
      <div className={styles.card}>
        <CardHeader color="indigo" className="relative h-56">
          <Image
            src={post.thumbnailUrl}
            alt="thumbnail-url"
            width={500}
            height={500}
          />
        </CardHeader>
        <CardBody className="text-center">{post.title}</CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="small">
            <div className={styles.tagWrapper}>
              {post.tags.map((tag, idx) => {
                return <Chip className="mr-1" color="indigo" value={`#${tag.name}`} key={idx} />;
              })}
            </div>
          </Typography>
          <Typography variant="small" color="gray" className="flex gap-1">
            <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
            {post.createdDate}
          </Typography>
        </CardFooter>
      </div>
    </Link>
  );
}