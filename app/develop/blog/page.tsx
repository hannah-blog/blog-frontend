import styles from '@/styles/app/blog/page.module.css'
import { postData } from '@/data/post-data'
import { formatMetadata } from '@/components/utils/meta-head'
import PostList from '@/components/post/post-list'

export async function generateMetadata() {
  return formatMetadata({
    title: "Develop Blog",
    description: "Hannah Develop Blog"
  });
}

export default function Blog() {
  return <div className={styles.main}>
    <div className={styles.titleText}>Develop Blog Page</div>
    <PostList list={postData} />
  </div>;
}
