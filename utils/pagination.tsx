import { Dispatch, SetStateAction } from 'react';
import { Button } from '@material-tailwind/react';
import styled from 'styled-components';

interface pageInfo {
  total: number,
  limit: number,
  page: number,
  setPage: Dispatch<SetStateAction<number>>
}

export default function Pagination({total, limit, page, setPage}: pageInfo) {
  const numPages = Math.ceil(total / limit);

  return <PaginationWrap>
    <Button color="teal" variant="text" disabled={ page === 1 } onClick={() => setPage(page - 1)}>&lt;</Button>
    { Array.from({length: numPages}).map((_, i) => (
      <Button
        color="teal"
        variant={ page === i + 1 ? "outlined" : "text"}
        key={i}
        onClick={() => setPage(i + 1)}
      >
        { i + 1}
      </Button>
    ))}
    <Button color="teal" variant="text" disabled={ page === numPages } onClick={() => setPage(page + 1)}>&gt;</Button>
  </PaginationWrap>;
}

const PaginationWrap = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

