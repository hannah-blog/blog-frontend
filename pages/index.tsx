import { MainWrap, TextWrap } from "../components/styles/styleCompnents";
import Timer from "../utils/timer";
import { Typography } from "@material-tailwind/react";
import MainSvg from "../svg/MainSvg";
import styled from "styled-components";

export default function Home() {
  return <MainWrap>
    <TextWrap>
      <Timer />
      <Typography variant="h1">Welcome to Hannah Blog!</Typography>
      <Typography variant="lead">
        Hannah 블로그에 오신 것을 환영합니다!<br />
        쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다.
      </Typography>
    </TextWrap>
    <SvgWrap>
      <MainSvg />
    </SvgWrap>
  </MainWrap>;
}

const SvgWrap = styled.div`
  width: 57%;
`;
