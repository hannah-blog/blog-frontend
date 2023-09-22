'use client'

import { useState } from 'react'
import { Post as PostType } from '@/data/post-data'
import Post from '@/components/post/post'
import styles from '@/styles/components/post/post-list.module.css'
import Pagination from '@/components/utils/pagination'


export default function PostList({ list }: { list: PostType[] }) {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 9;

  return <>
    <div className={styles.blogListBox}>
      {list.slice(offset, offset + 9).map((post, idx) => {
        return <Post key={idx} post={post} />;
      })}
    </div>
    <Pagination total={list.length} limit={9} page={page} setPage={setPage} />
  </>;
}
