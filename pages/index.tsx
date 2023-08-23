import HeadMeta from '../utils/headMeta';
import Timer from '../utils/timer';
import { Typography } from '@material-tailwind/react';
import MainSvg from '../svg/MainSvg';
import styled from 'styled-components';

export default function Home() {
  return <>
    <HeadMeta description="Welcome to Hannah Blog! Hannah 블로그에 오신 것을 환영합니다! 쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다." />
    <MainWrap>
      <TextWrap>
        <Typography variant="h1" color="indigo">Welcome to ChaeMin Blog!</Typography>
        <Typography variant="lead" color="indigo">
          저 블로그에 오신 것을 환영합니다!<br/>
          쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다.
        </Typography>
        <Timer />
      </TextWrap>
      <SvgWrap>
        <MainSvg />
      </SvgWrap>
    </MainWrap>
  </>;
}

const MainWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 300px;
  width: 100%;
  color: rgb(26 35 126);
  margin-top: 13%;
`;

const TextWrap = styled.div`
  width: 43%;
`;

const SvgWrap = styled.div`
  width: 57%;
`;
