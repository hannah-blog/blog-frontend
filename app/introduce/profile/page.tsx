import styles from '@/styles/app/introduce/profile/page.module.css'
import ProgressBar from '@/components/motion/progress-bar'
import Link from 'next/link'
import {
  Timeline, TimelineBody,
  TimelineConnector,
  TimelineHeader, TimelineIcon,
  TimelineItem,
  Typography
} from '@/components/tailwind/client-components'
import Image from 'next/image'

export default function Profile() {
  // const [isOpen, setIsOpen] = useState(false);
  // const handleOpen = () => setIsOpen(!isOpen);
  //
  // const [portfolioId, setPortfolioId] = useState(0);
  // const handlePortfolioId = (id: number) => setPortfolioId(id);

  return <div className={styles.mainWrapper}>
    <ProgressBar />
    <div className={`${styles.subWrapper} ${styles.indexing}`}>
      <div className={styles.section}>
        <Typography variant="h1">반갑습니다, 저는 홍채민입니다.</Typography>
        <ul className={styles.list}>
          <li><Typography variant="h4">3년차 백엔드 개발자로 일하고 있으며 비지니스 도메인의 가치를 궁극적으로 이해하고 풀어나가는 것을 좋아합니다.</Typography></li>
          <li><Typography variant="h4">각 요소들이 균형있고 조화롭게 결합되어 완성도있는 작품을 그리는 예술가와 같은 개발자가 되는 것이 목표입니다.</Typography></li>
        </ul>
      </div>
      <div className={styles.section}>
        <Typography variant="h2">Career</Typography>
        <div className={`${styles.block} mt-3`}>
          <div className={styles.predicate}>
            <Timeline>
              <TimelineItem className="pb-5">
                <TimelineConnector/>
                <TimelineHeader className="h-3">
                  <TimelineIcon/>
                  <Typography variant="h4">Design Center</Typography>
                </TimelineHeader>
                <TimelineBody className="m-2">
                  <Typography variant="lead">Description</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>메이크샵의 새로운 기능인 노코드 디자인 에디터 프로젝트입니다.</li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">What I did</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>NestJS - 학습 및 휴리스틱 공유</li>
                      <li>NestJS API 개발 (인증, 마이그레이션 등)</li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolio/1">기술 스택 조사 및 선정 (Spring boot)</Link>
                        {/*<div onClick={ () => {*/}
                        {/*  handleOpen();*/}
                        {/*  handlePortfolioId(1);*/}
                        {/*}} className={styles.link}>*/}
                        {/*  기술 스택 조사 및 선정 (Spring boot)*/}
                        {/*</div>*/}
                      </li>
                    </ul>
                  </Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>프로젝트 구조 설계</li>
                      <li className={styles.inline}>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolio/2">Package 구조 제시 및 프로젝트 도입</Link>
                      </li>
                      <li className={styles.inline}>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolio/3">Java Exception의 간소화 가이드 작성 및 프로젝트 내부의 공통 Exception 구조 개발</Link>
                      </li>
                      <li className={styles.inline}>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolio/4">RESTful API의 HTTP 응답 형태 설계 및 프로젝트 내부의 API Response 공통 처리기 개발</Link>
                      </li>
                      <li className={styles.inline}>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolio/5">Spring 테스트의 간소화 가이드 작성 및 공통된 테스트 환경 구축</Link>
                      </li>
                      <li className={styles.inline}>
                        코드 리뷰 문화를 꾸리기 위한 Gitlab Merge Request Template 도입 및 적용
                      </li>
                      <li>DB 마이그레이션 flyway 적용</li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">Stack</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>Java 17, Spring Boot 3, MySQL, JPA, JUnit, TypeScript, NestJS, Gitlab...</li>
                    </ul>
                  </Typography>
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
                  <Typography>
                    <ul className={styles.list}>
                      <li>
                        <Link className={styles.link} href="https://www.nalbang.tv/">Live-Commerce 플랫폼입니다.</Link> 주로 메이크샵 상점들과 연동하여 서비스를 운영하였습니다.
                      </li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">What I did</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolio/6">Youtube 동시 송출 서비스 개발</Link>
                      </li>
                      <li>
                        {/*<Link className={styles.link} href="https://www.hannah-log.site/portfolio/7">비디오 트랜스코딩 작업 개발</Link>*/}
                        비디오 트랜스코딩 작업 개발
                      </li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolio/7">Open API 개발</Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolio/8">방문자 통계 서비스 개발</Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolio/9">경매 서비스 개발</Link>
                      </li>
                      <li>입점 신청 Discord WebHook</li>
                      <li>AntMedia 송출 서버 구축</li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">Stack</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>Java 11, Spring Boot 2, MariaDB, JPA, QueryDSL, Redis, Haproxy, Socket.io, Docker...</li>
                    </ul>
                  </Typography>
                </TimelineBody>
              </TimelineItem>
              <TimelineItem className="pb-5">
                <TimelineConnector/>
                <TimelineHeader className="h-3">
                  <TimelineIcon/>
                  <Typography variant="h4">일단떠나</Typography>
                </TimelineHeader>
                <TimelineBody className="m-2">
                  <Typography variant="lead">Description</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>
                        <Link className={styles.link} href="https://www.g-justgo.com/">강원도 숙박 서비스앱입니다.</Link> 주로 반복 작업을 최소화 시키는 작업이나, 유지보수 업무를 담당하였습니다.
                      </li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">What I did</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>쿼리 튜닝 5-6s -&gt; 0.1s</li>
                      <li>월별 매출 현황 서비스 개발</li>
                      <li>KSNET 정산을 위한 결제 데이터 조회 서비스 개발</li>
                      <li>서비스 리뉴얼 참여 - API, 팜케이션 서비스 에디터 적용</li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">Stack</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>Java 11, Spring Boot 2, MariaDB, Thymeleaf, MyBatis...</li>
                    </ul>
                  </Typography>
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineConnector/>
                <TimelineHeader className="h-3">
                  <TimelineIcon/>
                  <Typography variant="h4">잇톡</Typography>
                </TimelineHeader>
                <TimelineBody className="m-2">
                  <Typography variant="lead">Description</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>상품을 실시간으로 반응하고 참여할 수 있는 서비스입니다.(미오픈)</li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">What I did</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>쿠버네티스 환경의 오토 스케일링 클라우드 서버 구축</li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">Stack</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>Java 17, Spring Boot 3, Kubernetes, Docker, Cloud...</li>
                    </ul>
                  </Typography>
                </TimelineBody>
              </TimelineItem>
            </Timeline>
          </div>
          <div>
            <Typography variant="h4">(주) 커넥트웨이브</Typography>
            <Typography variant="h6">Backend Developer</Typography>
            <Typography variant="h6">2022.01 ~ 현재</Typography>
          </div>
        </div>
        <hr className="my-8 border-blue-gray-50"/>
        <div className={styles.block}>
          <div className={styles.predicate}>
            <Timeline>
              <TimelineItem className="pb-5">
                <TimelineConnector/>
                <TimelineHeader className="h-3">
                  <TimelineIcon/>
                  <Typography variant="h4">SI 프로젝트</Typography>
                </TimelineHeader>
                <TimelineBody className="m-2">
                  <Typography variant="lead">What I did</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>
                        {/*<Link className={styles.link} href="https://koramcoenergyplus.com/">코람코에너지리츠</Link>*/}
                        코람코에너지리츠 - 다국어 지원 개발 (EN)
                      </li>
                      <li>
                        {/*<Link className={styles.link} href="https://koramcoenergyplus.com/">웹 MES 서비스 - 웇가네, 테라에코 등</Link>*/}
                        웹 MES 서비스 - 웇가네, 테라에코 등
                      </li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">Stack</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>Spring Framework, MyBatis, EGov(전자정부프레임워크), SVN, JSP, JQuery...</li>
                    </ul>
                  </Typography>
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
                  <Typography>
                    <ul className={styles.list}>
                      <li>
                        {/*<Link className={styles.link} href="https://www.koem.or.kr/site/koem/main.do">해양환경공단</Link>*/}
                        해양환경공단 - 유지보수 및 웹 접근성 인증
                      </li>
                      <li>
                        {/*<Link className={styles.link} href="https://www.koem.or.kr/site/koem/main.do">문화예술공단</Link>*/}
                        문화예술공단 - 클라우드 이관
                      </li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">Stack</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>Spring Framework, MyBatis, EGov(전자정부프레임워크), SVN, JSP, JQuery...</li>
                    </ul>
                  </Typography>
                </TimelineBody>
              </TimelineItem>
            </Timeline>
          </div>
          <div>
            <Typography variant="h4">(주) 제이플러스</Typography>
            <Typography variant="h6">Web Developer</Typography>
            <Typography variant="h6">2021.08 ~ 2021.12</Typography>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <Typography variant="h2">Side Project</Typography>
        <div className={`${styles.block} mt-3`}>
          <Timeline>
            <TimelineItem className="pb-5">
              <TimelineConnector/>
              <TimelineHeader className="h-3">
                <TimelineIcon/>
                <Typography variant="h4">Live Pulse</Typography>
              </TimelineHeader>
              <TimelineBody className="m-2">
                <Typography variant="lead">Description</Typography>
                <Typography>
                  <ul className={styles.list}>
                    <li><Link className={styles.link} href="https://live-pulse.hannah-log.site/">Live Pulse</Link>는 WebSocket, WebRTC를 이용한 송출 서버 구성 및 HLS 재생 방송 플랫폼입니다.</li>
                    <li>날방 프로젝트를 하며 배웠던 점을 녹여내고 날방에서 경험한 것을 완전히 제 기술을 만들기 위한 프로젝트입니다.</li>
                  </ul>
                </Typography>
                <Typography variant="lead">What I did</Typography>
                <Typography>
                  <ul className={styles.list}>
                    <li>AntMedia 오픈 소스를 활용한 WebRTC 송출</li>
                    <li>hls.js 라이브러리를 활용한 HLS 재생</li>
                    <li>NestJS Socket Gateway 라이브러리를 통한 소켓 서버 구축</li>
                    <li>Redis를 통한 채팅 적재 및 실시간 시청자 수 기능 개발</li>
                    <li>Github Action CI/CD 파이프라인 구축</li>
                    <li>Kotlin + Spring 으로 개인 서버 이미지 Application 구축</li>
                  </ul>
                </Typography>
                <Typography variant="lead">Link</Typography>
                <Typography>
                  <ul className={styles.list}>
                    <li>
                      <Link className={styles.link} href="https://live-pulse.hannah-log.site/">https://live-pulse.hannah-log.site</Link>
                    </li>
                    <li>GitHib</li>
                    <li className={styles.inline}>
                      Frontend Service - <Link className={styles.link} href="https://github.com/live-pulse/user-front">https://github.com/live-pulse/user-front</Link>
                    </li>
                    <li className={styles.inline}>
                      Backend & Socket Service - <Link className={styles.link} href="https://github.com/live-pulse/nestjs-api">https://github.com/live-pulse/nestjs-api</Link>
                    </li>
                    <li className={styles.inline}>
                      Image Service - <Link className={styles.link} href="https://github.com/live-pulse/image-server-api">https://github.com/live-pulse/image-server-api</Link>
                    </li>
                    <li>Blog</li>
                    <li className={styles.inline}>
                      <Link className={styles.link} href="https://www.hannah-log.site/portfolio/10">LivePulse 발표 자료</Link>
                    </li>
                    {/*<li className={styles.inline}>*/}
                    {/*  <Link className={styles.link} href="https://www.hannah-log.site/blog/1">개인 서버로 CDN 서버 구축하기</Link>*/}
                    {/*</li>*/}
                    {/*<li className={styles.inline}>*/}
                    {/*  <Link className={styles.link} href="https://www.hannah-log.site/blog/1">NestJS 시리즈</Link>*/}
                    {/*</li>*/}
                  </ul>
                </Typography>
                <Typography variant="lead">Stack</Typography>
                <Typography>
                  <ul className={styles.list}>
                    <li>Kotlin, Spring Boot3, TypeScript 5, NestJS 9, Docker, Github Actions, NextJS, his.js...</li>
                  </ul>
                </Typography>
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
                <Typography>
                  <ul className={styles.list}>
                    <li>유명한 강의 플랫폼인 인프런은 동영상 위주로 강의를 수강합니다.</li>
                    <li>인프런에서 강의를 보다가 다른 블로그나 문서처럼 글로 설명된 형식의 강의가 있었으면 좋겠다라는 생각이 들어서 프로젝트를 진행하게 되었습니다.</li>
                  </ul>
                </Typography>
                <Typography variant="lead">What I did</Typography>
                <Typography>
                  <ul className={styles.list}>
                    <li>구글 메일 + Redis + Java Mail Sender로 회원가입 인증 메일 구현</li>
                    <li>spring-cloud-starter-aws 라이브러리를 사용해 S3 이미지 업로드 구현</li>
                  </ul>
                </Typography>
                <Typography variant="lead">Link</Typography>
                <Typography>
                  <ul className={styles.list}>
                    <li>GitHib</li>
                    <li className={styles.inline}>
                      Backend - <Link className={styles.link} href="https://github.com/works-hook/hannah-education-backend">https://github.com/works-hook/hannah-education-backend</Link>
                    </li>
                    <li className={styles.inline}>
                      Student Front - <Link className={styles.link} href="https://github.com/works-hook/hannah-education-user-front">https://github.com/works-hook/hannah-education-user-front</Link>
                    </li>
                    <li className={styles.inline}>
                      Teacher Front - <Link className={styles.link} href="https://github.com/works-hook/hannah-education-admin-front">https://github.com/works-hook/hannah-education-admin-front</Link>
                    </li>
                    <li>Blog</li>
                    <li className={styles.inline}>
                      <Link className={styles.link} href="https://www.hannah-log.site/portfolio/11/">Education 프로젝트 발표 자료</Link>
                    </li>
                    <li className={styles.inline}>
                      <Link className={styles.link} href="https://www.hannah-log.site/develop/blog/10/">Spring Boot - 메일 인증 구현하기</Link>
                    </li>
                  </ul>
                </Typography>
                <Typography variant="lead">Stack</Typography>
                <Typography>
                  <ul className={styles.list}>
                    <li>Kotlin, Spring Boot3, JPA, QueryDSL, AWS S3, AWS EC2, React 16...</li>
                  </ul>
                </Typography>
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
                <Typography>
                  <ul className={styles.list}>
                    <li>업무에서 사용하는 메신저로 반복 업무등을 해결하기 위한 도구로써, 웹훅이나 봇을 다루는 기술 향상시키고자 진행한 프로젝트입니다.</li>
                  </ul>
                </Typography>
                <Typography variant="lead">What I did</Typography>
                <Typography>
                  <ul className={styles.list}>
                    <li>Discord - JDA을 활용한 슬래시 주식 봇 개발</li>
                    <li>Slack - WebHook을 활용한 슬래시 주식 봇 개발</li>
                  </ul>
                </Typography>
                <Typography variant="lead">Link</Typography>
                <Typography>
                  <ul className={styles.list}>
                    <li>GitHib</li>
                    <li className={styles.inline}>
                      Discord - <Link className={styles.link} href="https://github.com/works-hook/discord-stock-bot">https://github.com/works-hook/discord-stock-bot</Link>
                    </li>
                    <li className={styles.inline}>
                      Slack - <Link className={styles.link} href="https://github.com/works-hook/spring-works-hook">https://github.com/works-hook/spring-works-hook</Link>
                    </li>
                  </ul>
                </Typography>
                <Typography variant="lead">Stack</Typography>
                <Typography>
                  <ul className={styles.list}>
                    <li>Kotlin, Spring Boot, JDA...</li>
                  </ul>
                </Typography>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
      <hr className="my-8 border-blue-gray-50"/>
      <div className={styles.section}>
        <Typography variant="h2">Contact</Typography>
        <div className={styles.sideBlock}>
          <Image
            className={`${styles.img} rounded-full object-cover object-center shadow-xl shadow-blue-gray-900/50`}
            src="https://cdn.hannah-log.site/cdn/blog/profile.png"
            width={260}
            height={260}
            alt="profile"
          />
          <div className={styles.predicate}>
            <Typography variant="lead" className="p-1">Name. 홍채민</Typography>
            <Typography variant="lead" className="p-1">Brith. 2003.03.29</Typography>
            <Typography variant="lead" className="p-1">H.P. 010-6667-4359</Typography>
            <Typography variant="lead" className="p-1">Email. ghdcoalss33@gmail.com</Typography>
            <Typography variant="lead" className="p-1">LinkedIn. <Link className={styles.link} href="https://www.linkedin.com/in/hannah-linkdin/">https://www.linkedin.com/in/hannah-linkdin/</Link></Typography>
            <Typography variant="lead" className="p-1">Github. <Link className={styles.link} href="https://github.com/HongChaeMin">https://github.com/HongChaeMin</Link></Typography>
            <Typography variant="lead" className="p-1">Blog. <Link className={styles.link} href="https://www.hannah-log.site">https://www.hannah-log.site</Link></Typography>
          </div>
        </div>
      </div>
      {/*<PortfolioModal isOpen={isOpen} handleOpen={handleOpen} portfolioId={portfolioId} />*/}
    </div>
  </div>;
}
