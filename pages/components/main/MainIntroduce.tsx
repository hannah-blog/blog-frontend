import styled from "styled-components";
import {Typography} from "@material-tailwind/react";
import Timer from "../../utils/timer";
import MainSvg from "../../svg/MainSvg";

export default function MainIntroduce() {
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

const MainWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 300px;
  width: 100%;
  color: rgb(26 35 126);
  margin-top: 7%;
`;

const TextWrap = styled.div`
  width: 43%;
`;

const SvgWrap = styled.div`
  width: 57%;
`;
