import { TextWrap } from "../styles/styleCompnents";
import { Typography } from "@material-tailwind/react";
import Timer from "../../utils/timer";
import MainSvg from "../../svg/MainSvg";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function WelcomeSection() {
  return <motion.div layoutScroll style={{ overflow: "scroll" }}>
    <TextWrap>
      <Timer/>
      <Typography variant="h1">Welcome to Hannah Blog!</Typography>
      <Typography variant="lead">
        Hannah 블로그에 오신 것을 환영합니다!<br/>
        쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다.
      </Typography>
    </TextWrap>
    <SvgWrap>
      <MainSvg/>
    </SvgWrap>
  </motion.div>
}

const SvgWrap = styled.div`
  width: 57%;
`;
