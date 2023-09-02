'use client'

import styles from '@/styles/app/blog/page.module.css'
import { postData, PostList } from '@/data/post-data'
import { useState } from 'react'
import HeadMeta from '@/components/utils/meta-head'
import Post from '@/components/card/post'
import Pagination from '@/components/utils/pagination'

export default function Blog() {
  const [page, setPage] = useState(1);
  const [list, setList] = useState<PostList>(postData);

  const offset = (page - 1) * 9;

  return <div className={styles.main}>
    <HeadMeta title="Develop Blog" description="Hannah Develop Blog" />
    <div className={styles.titleText}>Develop Blog Page</div>
    <div className={styles.blogListBox}>
      {list.slice(offset, offset + 9).map((post, idx) => {
        return <Post key={idx} post={post} idx={idx} />;
      })}
    </div>
    <Pagination total={postData.length} limit={9} page={page} setPage={setPage} />
  </div>;
}
