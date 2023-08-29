import {
  Breadcrumbs,
  Timeline, TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography
} from '@material-tailwind/react';
import styled from 'styled-components';
import Link from "next/link";

export default function Profile() {
  return <MainWrap>
    <Section>
      <Typography variant="h1">반갑습니다, 저는 홍채민입니다.</Typography>
      <Typography variant="h4"><List>2년차 백엔드 개발자로 일하고 있으며 비지니스 도메인의 가치를 궁극적으로 이해하고 풀어나가는 것을 좋아합니다.</List></Typography>
      <Typography variant="h4"><List>각 요소들이 균형있고 조화롭게 결합되어 완성도있는 작품을 그리는 예술가와 같은 개발자가 되고 싶습니다.</List></Typography>
    </Section>
    <Section>
      <Typography variant="h2">Career</Typography>
      <Block className="mt-3">
        <Predicate>
          <Timeline>
            <TimelineItem className="pb-5">
              <TimelineConnector/>
              <TimelineHeader className="h-3">
                <TimelineIcon/>
                <Typography variant="h4">Design Center</Typography>
              </TimelineHeader>
              <TimelineBody className="m-2">
                <Typography variant="lead">Description</Typography>
                <Typography><List>메이크샵의 새로운 기능인 노코드 디자인 에디터 프로젝트입니다.</List></Typography>
                <Typography variant="lead">What I did</Typography>
                <Typography><List><Link href="https://www.hannah-log.site/portfolio/1">기술 스택 조사 및 선정 (Spring boot)</Link></List></Typography>
                <Typography>
                  <List>프로젝트 구조 설계</List>
                  <InlineList><Link href="https://www.hannah-log.site/portfolio/2">Package 구조 제시 및 프로젝트 도입</Link></InlineList>
                  <InlineList><Link href="https://www.hannah-log.site/portfolio/3">RESTful API의 HTTP 응답 형태 설계 및 프로젝트 내부의 API Response 공통 처리기 개발</Link></InlineList>
                  <InlineList><Link href="https://www.hannah-log.site/portfolio/4">Java Exception의 간소화 가이드 작성 및 프로젝트 내부의 공통 Exception 구조 개발</Link></InlineList>
                  <InlineList><Link href="https://www.hannah-log.site/portfolio/5">Spring 테스트의 간소화 가이드 작성 및 공통된 테스트 환경 구축</Link></InlineList>
                  <InlineList><Link href="https://www.hannah-log.site/portfolio/5">코드 리뷰 문화를 꾸리기 위한 Gitlab Merge Request Template 도입 및 적용</Link></InlineList>
                </Typography>
                <Typography variant="lead">Stack</Typography>
                <Typography><List>Java 17, Spring Boot 3, MySQL, JPA, JUnit, Gitlab...</List></Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem className="pb-5">
              <TimelineConnector/>
              <TimelineHeader className="h-3">
                <TimelineIcon/>
                <Typography variant="h4">날방TV</Typography>
              </TimelineHeader>
              <TimelineBody className="m-2">
                <Typography variant="lead">Description</Typography>
                <Typography><List><Link href="https://www.nalbang.tv/">Live-Commerce 플랫폼입니다.</Link> 주로 메이크샵 상점들과 연동하여 서비스를 운영하였습니다.</List></Typography>
                <Typography variant="lead">What I did</Typography>
                <Typography><List><Link href="https://www.hannah-log.site/portfolio/6">Youtube 동시 송출 서비스 개발 - 채팅 연동</Link></List></Typography>
                <Typography><List><Link href="https://www.hannah-log.site/portfolio/7">가변 비트레이트 영상을 위한 m3u8 파일 개발</Link></List></Typography>
                <Typography><List><Link href="https://www.hannah-log.site/portfolio/8">Open API - PublicKey, PrivateKey 도입 및 개발</Link></List></Typography>
                <Typography><List><Link href="https://www.hannah-log.site/portfolio/9">방문자 통계 서비스 개발</Link></List></Typography>
                <Typography><List><Link href="https://www.hannah-log.site/portfolio/10">경매 서비스 개발 - 시스템 설계 및 API 개발</Link></List></Typography>
                <Typography><List>입점 신청 Discord WebHook</List></Typography>
                <Typography variant="lead">Stack</Typography>
                <Typography><List>Java 11, Spring Boot 2, MariaDB, JPA, QueryDSL, Redis, Haproxy, Socket.io, Docker...</List></Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineConnector/>
              <TimelineHeader className="h-3">
                <TimelineIcon/>
                <Typography variant="h4">일단떠나</Typography>
              </TimelineHeader>
              <TimelineBody className="m-2">
                <Typography variant="lead">Description</Typography>
                <Typography><List><Link href="https://www.g-justgo.com/">강원도 숙박 서비스앱입니다.</Link> 주로 반복 작업을 최소화 시키는 작업이나, 유지보수 업무를 담당하였습니다.</List></Typography>
                <Typography variant="lead">What I did</Typography>
                <Typography><List><Link href="https://www.hannah-log.site/portfolio/11">월별 매출 현황 서비스 개발</Link></List></Typography>
                <Typography><List>KSNET 정산을 위한 결제 데이터 조회 서비스 개발</List></Typography>
                <Typography><List>서비스 리뉴얼 참여 - API, 팜케이션 서비스 에디터 적용</List></Typography>
                <Typography variant="lead">Stack</Typography>
                <Typography><List>Java 11, Spring Boot 2, MariaDB, Thymeleaf, MyBatis...</List></Typography>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </Predicate>
        <div>
          <Typography variant="h4">(주) 커넥트웨이브</Typography>
          <Typography>Backend Developer</Typography>
          <Typography>2022.01 ~ 현재</Typography>
        </div>
      </Block>
      <hr className="my-8 border-blue-gray-50"/>
      <Block>
        <Predicate>
          <Timeline>
            <TimelineItem className="pb-5">
              <TimelineConnector/>
              <TimelineHeader className="h-3">
                <TimelineIcon/>
                <Typography variant="h4">SI 프로젝트</Typography>
              </TimelineHeader>
              <TimelineBody className="m-2">
                <Typography variant="lead">What I did</Typography>
                <Typography><List><Link href="https://koramcoenergyplus.com/">코람코에너지리츠</Link> - 다국어 지원 개발 (EN)</List></Typography>
                <Typography><List><Link href="https://koramcoenergyplus.com/">웹 MES 서비스 - 웇가네, 테라에코 등</Link></List></Typography>
                <Typography variant="lead">Stack</Typography>
                <Typography><List>Spring Framework, MyBatis, EGov(전자정부프레임워크), SVN, JSP, JQuery...</List></Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineConnector/>
              <TimelineHeader className="h-3">
                <TimelineIcon/>
                <Typography variant="h4">공공기관 프로젝트</Typography>
              </TimelineHeader>
              <TimelineBody className="m-2">
                <Typography variant="lead">What I did</Typography>
                <Typography><List><Link href="https://www.koem.or.kr/site/koem/main.do">해양환경공단</Link> - 유지보수 및 웹 접근성 인증</List></Typography>
                <Typography><List><Link href="https://www.koem.or.kr/site/koem/main.do">문화예술공단</Link> - 클라우드 이관</List></Typography>
                <Typography variant="lead">Stack</Typography>
                <Typography><List>Spring Framework, MyBatis, EGov(전자정부프레임워크), SVN, JSP, JQuery...</List></Typography>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </Predicate>
        <div>
          <Typography variant="h4">(주) 제이플러스</Typography>
          <Typography>Web Developer</Typography>
          <Typography>2021.08 ~ 2021.12</Typography>
        </div>
      </Block>
    </Section>
    <Section>
      <Typography variant="h2">Side Project</Typography>
      <Block className="mt-3">
        <Timeline>
          <TimelineItem className="pb-5">
            <TimelineConnector/>
            <TimelineHeader className="h-3">
              <TimelineIcon/>
              <Typography variant="h4">Live Pulse</Typography>
            </TimelineHeader>
            <TimelineBody className="m-2">
              <Typography variant="lead">Description</Typography>
              <Typography><Link href="https://live-pulse.hannah-log.site/">Live Pulse</Link>는 WebSocket, WebRTC를 이용한 송출 서버 구성 및 HLS 재생 방송 플랫폼입니다.</Typography>
              <Typography>날방 프로젝트를 하며 배웠던 점을 녹여내고 날방에서 경험한 것을 완전히 제 기술을 만들기 위한 프로젝트입니다.</Typography>
              <Typography variant="lead">What I did</Typography>
              <Typography><List>AntMedia 오픈 소스를 활용한 WebRTC 송출</List></Typography>
              <Typography><List>hls.js 오픈 소스를 활용한 HLS 재생</List></Typography>
              <Typography><List>NestJS Socket Gateway 라이브러리를 통한 소켓 서버 구축</List></Typography>
              <Typography><List>Redis를 통한 채팅 적재</List></Typography>
              <Typography><List>Github Action CI/CD 파이프라인 구축</List></Typography>
              <Typography><List>Kotlin + Spring 으로 개인 서버 이미지 API Application 구축</List></Typography>
              <Typography variant="lead">Link</Typography>
              <Typography><List><Link href="https://live-pulse.hannah-log.site/">https://live-pulse.hannah-log.site</Link></List></Typography>
              <Typography><List>GitHib</List></Typography>
              <Typography><InlineList>Frontend Service - <Link href="https://github.com/live-pulse/user-front">https://github.com/live-pulse/user-front</Link></InlineList></Typography>
              <Typography><InlineList>Backend & Socket Service - <Link href="https://github.com/live-pulse/nestjs-api">https://github.com/live-pulse/nestjs-api</Link></InlineList></Typography>
              <Typography><InlineList>Image Service - <Link href="https://github.com/live-pulse/image-server-api">https://github.com/live-pulse/image-server-api</Link></InlineList></Typography>
              <Typography><List>Blog</List></Typography>
              <Typography><InlineList><Link href="https://www.hannah-log.site/blog/1">LivePulse 발표 자료</Link></InlineList></Typography>
              <Typography><InlineList><Link href="https://www.hannah-log.site/blog/1">일반 개인 서버로 CDN 서버 구축하기</Link></InlineList></Typography>
              <Typography><InlineList><Link href="https://www.hannah-log.site/blog/1">NestJS 시리즈</Link></InlineList></Typography>
              <Typography variant="lead">Stack</Typography>
              <Typography><List>Kotlin, Spring Boot3, TypeScript 5, NestJS 9, Docker, Github Actions, NextJS, his.js...</List></Typography>
            </TimelineBody>
          </TimelineItem>
          <TimelineItem className="pb-5">
            <TimelineConnector/>
            <TimelineHeader className="h-3">
              <TimelineIcon/>
              <Typography variant="h4">강의 플랫폼</Typography>
            </TimelineHeader>
            <TimelineBody className="m-2">
              <Typography variant="lead">Description</Typography>
              <Typography>유명한 강의 플랫폼인 인프런은 동영상 위주로 강의를 수강합니다.</Typography>
              <Typography>인프런에서 강의를 보다가 다른 블로그나 문서처럼 글로 설명된 형식의 강의가 있었으면 좋겠다라는 생각이 들어서 프로젝트를 진행하게 되었습니다.</Typography>
              <Typography variant="lead">What I did</Typography>
              <Typography><List>구글 메일 + Redis + Java Mail Sender로 회원가입 인증 메일 구현</List></Typography>
              <Typography><List>spring-cloud-starter-aws 라이브러리를 사용해 S3 이미지 업로드 구현</List></Typography>
              <Typography variant="lead">Link</Typography>
              <Typography><List>GitHib</List></Typography>
              <Typography><InlineList>Backend - <Link href="https://github.com/works-hook/hannah-education-backend">https://github.com/works-hook/hannah-education-backend</Link></InlineList></Typography>
              <Typography><InlineList>Student Front - <Link href="https://github.com/works-hook/hannah-education-user-front">https://github.com/works-hook/hannah-education-user-front</Link></InlineList></Typography>
              <Typography><InlineList>Teacher Front - <Link href="https://github.com/works-hook/hannah-education-admin-front">https://github.com/works-hook/hannah-education-admin-front</Link></InlineList></Typography>
              <Typography><List>Blog</List></Typography>
              <Typography><InlineList><Link href="https://www.hannah-log.site/blog/1">Education 프로젝트 발표 자료</Link></InlineList></Typography>
              <Typography><InlineList><Link href="https://www.hannah-log.site/blog/1">Spring Boot - 메일 인증 구현하기</Link></InlineList></Typography>
              <Typography variant="lead">Stack</Typography>
              <Typography><List>Kotlin, Spring Boot3, JPA, QueryDSL, AWS S3, AWS EC2, React 16...</List></Typography>
            </TimelineBody>
          </TimelineItem>
          <TimelineItem>
            <TimelineConnector/>
            <TimelineHeader className="h-3">
              <TimelineIcon/>
              <Typography variant="h4">Discord 주식 Boot & Slack 주식 Boot</Typography>
            </TimelineHeader>
            <TimelineBody className="m-2">
              <Typography variant="lead">Description</Typography>
              <Typography>업무에서 사용하는 메신저로 반복 업무등을 해결하기 위한 도구로써, 웹훅이나 봇을 다루는 기술 향상시키고자 진행한 프로젝트입니다.</Typography>
              <Typography variant="lead">What I did</Typography>
              <Typography><List>Discord - JDA을 활용한 슬래시 봇 개발</List></Typography>
              <Typography><List>Slack - WebHook을 활용한 슬래시 봇 개발</List></Typography>
              <Typography variant="lead">Link</Typography>
              <Typography><List>GitHib</List></Typography>
              <Typography><InlineList>Discord - <Link href="https://github.com/works-hook/discord-stock-bot">https://github.com/works-hook/discord-stock-bot</Link></InlineList></Typography>
              <Typography><InlineList>Slack - <Link href="https://github.com/works-hook/spring-works-hook">https://github.com/works-hook/spring-works-hook</Link></InlineList></Typography>
              <Typography variant="lead">Stack</Typography>
              <Typography><List>Kotlin, Spring Boot, JDA...</List></Typography>
            </TimelineBody>
          </TimelineItem>
        </Timeline>
      </Block>
    </Section>
    <Section>
      <Typography variant="h2">Contact</Typography>
      <SideBlock>
        <Img
          className="rounded-full object-cover object-center shadow-xl shadow-blue-gray-900/50"
          src="https://cdn.hannah-log.site/cdn/blog/profile.png"
          alt="profile"
        />
        <Predicate>
          <Typography variant="lead" className="p-1">Name. 홍채민</Typography>
          <Typography variant="lead" className="p-1">Brith. 2003.03.29</Typography>
          <Typography variant="lead" className="p-1">H.P. 010-6667-4359</Typography>
          <Typography variant="lead" className="p-1">Email. ghdcoalss33@gmail.com</Typography>
          <Typography variant="lead" className="p-1">LinkedIn. <Link href="https://www.linkedin.com/in/hannah-linkdin/">https://www.linkedin.com/in/hannah-linkdin/</Link></Typography>
          <Typography variant="lead" className="p-1">Github. <Link href="https://github.com/HongChaeMin">https://github.com/HongChaeMin</Link></Typography>
          <Typography variant="lead" className="p-1">Blog. <Link href="https://www.hannah-log.site">https://www.hannah-log.site</Link></Typography>
        </Predicate>
      </SideBlock>
    </Section>
  </MainWrap>;
}

const MainWrap = styled.div`
  width: 70%;
  margin-top: 5%;

  a {
    color: #192178;
    transition: text-decoration-color .3s ease, color .3s ease;
    text-decoration: underline rgba(255, 255, 255, 0);
  }

  a:hover {
    text-decoration-color: #7078d8;
    color: #7078d8;
  }
`;

const Section = styled.div`
  padding: 1.5rem;
  width: 100%;
`;

const Block = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SideBlock = styled.div`
  display: flex;
  align-items: center;
`;

const Predicate = styled.div`
  width: 75%;
`;

const Img = styled.img`
  height: 260px;
  width: 260px;
  margin: 3%
`;

const List = styled.li`
  margin-left: 1.5rem;
  list-style-type: square;
`;

const InlineList = styled.li`
  margin-left: 2.5rem;
  list-style-type: disclosure-closed;
`;

