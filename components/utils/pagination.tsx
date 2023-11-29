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
    <Button color="blue-gray" variant="text" disabled={ page === 1 } onClick={() => setPage(page - 1)}>
      &lt; Previous
    </Button>
    <div className="flex items-center gap-2">
      { Array.from({length: numPages}).map((_, i) => (
        <IconButton
          color={ page === i + 1 ? "deep-purple" : "blue-gray"}
          variant={ page === i + 1 ? "filled" : "text"}
          key={i}
          onClick={() => setPage(i + 1)}
          className="rounded-full"
        >
          { i + 1 }
        </IconButton>
      ))}
    </div>
    <Button color="blue-gray" variant="text" disabled={ page === numPages } onClick={() => setPage(page + 1)}>
      Next &gt;
    </Button>
  </div>;
}
