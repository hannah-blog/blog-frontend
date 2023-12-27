import { fetchBlogs } from '@/api/caller'
import Post from '@/components/post/post'
import styles from '@/styles/components/post/post-list.module.css'

export default async function PostList() {
  const posts = await fetchBlogs();

  return <div className={styles.blogListBox}>
    {posts.map((post, idx) => {
      return <Post key={idx} post={post} />;
    })}
  </div>;
}
