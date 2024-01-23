import styles from '@/styles/app/blog/page.module.css'
import Post from '@/components/post/post'
import { formatMetadata } from '@/components/utils/meta-head'
import { fetchBlogs } from '@/api/caller'

export async function generateMetadata() {
  return formatMetadata({
    title: "Develop Blog",
    description: "Hannah Develop Blog"
  });
}

export default async function Blog() {
  const posts = await fetchBlogs();

  return <div className={styles.main}>
    <div className={styles.titleText}>Develop Blog</div>
    <div className={styles.blogListBox}>
      {posts.map((post, idx) => {
        return <Post key={idx} post={post} />;
      })}
    </div>
  </div>;
}
