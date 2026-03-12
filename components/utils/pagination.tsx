import styles from '@/styles/components/utils/style.module.css'
import { Button, IconButton } from '@/components/tailwind/client-components'
import { Dispatch, SetStateAction } from 'react'

interface pageInfo {
  total: number,
  limit: number,
  page: number,
  setPage: Dispatch<SetStateAction<number>>
}

export default function Pagination({ total, limit, page, setPage }: pageInfo) {
  const numPages = Math.ceil(total / limit);

  return <div className={styles.paginationWrapper}>
    <Button variant="text" className="text-slate-600" disabled={page === 1} onClick={() => setPage(page - 1)}>
      &lt; Previous
    </Button>
    <div className="flex items-center gap-2">
      {Array.from({length: numPages}).map((_, i) => (
        <IconButton
          key={i}
          onClick={() => setPage(i + 1)}
          className={`rounded-full ${page === i + 1 ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          {i + 1}
        </IconButton>
      ))}
    </div>
    <Button variant="text" className="text-slate-600" disabled={page === numPages} onClick={() => setPage(page + 1)}>
      Next &gt;
    </Button>
  </div>;
}
