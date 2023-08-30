'use client'

import HeadMeta from '../utils/headMeta';
import Timer from '../utils/timer';
import { Typography } from '../components/tailwind/components';
import { MainSvg } from '../svg/svgs';
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
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  margin-top: 11%;
`;

const TextWrap = styled.div`
  width: 43%;
`;

const SvgWrap = styled.div`
  width: 57%;
`;
