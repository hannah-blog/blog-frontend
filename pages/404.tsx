import { Button, Typography } from '@material-tailwind/react';
import { NotFountSvg } from '../svg/svgs';
import styled from 'styled-components';
import Link from 'next/link';

export default function Custom404() {
  return <Wrap>
    <div>
      <Test>
        <NotFountSvg />
      </Test>
      <Typography variant="h1" color="indigo">이런! 원하시는 페이지가 존재하지 않아요.</Typography>
      <Typography variant="h3" color="indigo">홈으로 이동할까요?</Typography>
      <Link href="/">
        <Button variant="outlined" color="indigo" className="rounded-full">Home</Button>
      </Link>
    </div>
  </Wrap>;
}

const Test = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 11%;
`;

const Wrap = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
