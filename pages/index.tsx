import { MainWrap } from "../components/styles/styleCompnents";
import HeadMeta from "../utils/headMeta";
import WelcomeSection from "../components/mainSection/WelcomeSection";

export default function Home() {
  return <>
    <MainWrap>
      <HeadMeta description="Welcome to Hannah Blog! Hannah 블로그에 오신 것을 환영합니다! 쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다."/>
      <WelcomeSection />
    </MainWrap>
  </>;
}
