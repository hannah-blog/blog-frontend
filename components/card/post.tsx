import styles from '@/styles/components/card/post.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { Post as PostType } from '@/data/post-data'
import { CardBody, CardFooter, CardHeader, Chip, Typography } from '@/components/tailwind/client-components'

interface PostProps {
  post: PostType;
  idx?: number;
}

export default function Post(props: PostProps) {
  const showPostData = props.post;
  return (
    <Link href={`/develop/blog/${showPostData.id}`}>
      <div className={styles.card}>
        <CardHeader color="indigo" className="relative h-56">
          <Image
            src={showPostData.thumbnailUrl}
            alt="thumbnail-url"
            width={500}
            height={500}
          />
        </CardHeader>
        <CardBody className="text-center">{showPostData.title}</CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="small">
            <div className={styles.tagWrapper}>
              {showPostData.tags.map((tag, idx) => {
                return <Chip className="mr-1" color="indigo" value={`#${tag.name}`} key={idx} />;
              })}
            </div>
          </Typography>
          <Typography variant="small" color="gray" className="flex gap-1">
            <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
            {showPostData.createdDate}
          </Typography>
        </CardFooter>
      </div>
    </Link>
  );
}
