'use client'

import { useEffect, useState } from 'react'
import { Post as PostType } from '@/data/post-data'
import { fetchBlogs } from '@/api/caller'
import Post from '@/components/post/post'
import styles from '@/styles/components/post/post-list.module.css'
import Pagination from '@/components/utils/pagination'
import Load from "@/components/utils/load";

export default function PostList() {
  const [page, setPage] = useState(1);
  const [list, setPost] = useState<PostType[]>([]);

  const offset = (page - 1) * 9;

  useEffect(() => {
    fetchBlogs()
      .then((response) => {
        setPost(response);
      });
  }, []);

  return <>
    {
      list.length !== 0 ?
        <>
          <div className={styles.blogListBox}>
            {list.slice(offset, offset + 9).map((post, idx) => {
              return <Post key={idx} post={post} />;
            })}
          </div>
          <Pagination total={list.length} limit={9} page={page} setPage={setPage} />
        </>
        : <Load />
    }
  </>;
}
