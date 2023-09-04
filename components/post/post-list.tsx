'use client'

import { useState } from 'react'
import Post from '@/components/post/post'
import styles from '@/styles/components/post/post-list.module.css'
import Pagination from '@/components/utils/pagination'

type Tag = {
  name: string,
}

type PostType = {
  id: number,
  title: string,
  content: string,
  thumbnailUrl: string,
  tags: Tag[],
  createdDate: string,
}

export default function PostList({ list: PostType }) {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 9;

  return <>
    <div className={styles.blogListBox}>
      {this.list.slice(offset, offset + 9).map((post, idx) => {
        return <Post key={idx} post={post} idx={idx} />;
      })}
    </div>
    <Pagination total={this.list.length} limit={9} page={page} setPage={setPage} />
  </>;
}
