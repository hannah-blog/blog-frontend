import styles from '@/styles/app/blog/page.module.css'
import { formatMetadata } from '@/components/utils/meta-head'
import PostList from '@/components/post/post-list'

export async function generateMetadata() {
  return formatMetadata({
    title: "Develop Blog",
    description: "Hannah Develop Blog"
  });
}

export default async function Blog() {
  return <div className={styles.main}>
    <div className={styles.titleText}>Develop Blog</div>
    <PostList />
  </div>;
}
