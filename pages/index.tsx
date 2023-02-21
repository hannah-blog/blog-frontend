import { MainWrap, TextWrap } from "../components/styles/styleCompnents";
import Timer from "../utils/timer";
import { Typography } from "@material-tailwind/react";
import MainSvg from "../svg/MainSvg";
import styled from "styled-components";
import { motion } from "framer-motion";
import HeadMeta from "../utils/headMeta";

export default function Home() {
  return <motion.div  initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, default: { ease: "linear" } }}
  >
    <MainWrap>
      <HeadMeta description="Welcome to Hannah Blog! Hannah 블로그에 오신 것을 환영합니다! 쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다."/>
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
    </MainWrap>
  </motion.div>;
}

const SvgWrap = styled.div`
  width: 57%;
`;
