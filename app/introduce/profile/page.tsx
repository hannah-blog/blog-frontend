import styles from '@/styles/app/introduce/profile/page.module.css'
import ProgressBar from '@/components/motion/progress-bar'
import Link from 'next/link'
import {
  Chip,
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
          <li><Typography variant="h4">각 요소들이 균형있고 조화롭게 결합되어 있는 작품을 그리고 만드는, 예술가와 같은 개발자가 되는 것이 목표입니다.</Typography></li>
        </ul>
      </div>
      <div className={styles.section}>
        <Typography variant="h2">Introduce.</Typography>
				<div className={styles.introduce}>
          <span>
            21년 8월부터 현재까지 3년차 백엔드 개발자로 일하고 있습니다. 주로 Java, Spring, TypeScript, NestJS를 사용하여 개발합니다.
          </span>
          <span>
            Software 직무에 가장 필요한 역량은 스펀지같이 기술을 습득하는 능력이 중요하다고 생각합니다.
            변화하는 웹 개발, 더 나아가 IT 분야에서는 새로운 기술뿐 아니라 여러 기술 스택을 쌓아 적재적소에 알맞은 기술을 적용하는 것이 중요합니다.
            때문에 기술을 잘 활용하기 위해선 기술의 특징과 어떻게 활용할 수 있는지 알아야 합니다.
            그래서 저는 여러 프로젝트를 경험하며 여러 기술 스택을 쌓기 위해 노력했습니다.
          </span>
          <span>
            저에게는 특이한 이력이 있습니다.
            저는 개발 일을 하기 전, 외식업 회사의 직원으로 들어가서 홍대에 있는 매장을 돌아다니며 근무를 했었습니다.
            홍대에 위치한 매장에서 근무하면서 다른 음식점을 방문하여 그들의 운영 시스템, 메뉴 구성, 분위기 등을 관찰하고 분석하여 매장 환경을 개선하고 매출을 증대시켰습니다.
            <br />
            이 경험을 통해 기술적인 측면에서의 장단점을 이해하고, 현실적인 문제를 해결하는 방법을 익혔습니다.
            <br />
            또한 시스템 개발 과정에서 사용자 경험을 개선하고, 실제 사용 환경에서 발생할 수 있는 문제를 예측하고 대비할 수 있습니다.
            다양한 관점에서의 문제 해결 능력을 갖추어 효율적인 솔루션을 제시할 수 있습니다.
          </span>
        </div>
        <Typography variant="h2">Career.</Typography>
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
                      <li>메이크샵 노코드 디자인 에디터 프로젝트입니다.</li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">What I did</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>
                        <Link className={styles.link} href="https://www.notion.so/log-hannah/NestJS-5c2534cc77664698b30a70199d92417c">
                          NestJS 학습 및 휴리스틱 공유
                        </Link>
                      </li>
                      <li>NestJS API 개발 (인증, 마이그레이션 등)</li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolios/1">기술 스택 조사 및 선정 (Spring boot)</Link>
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
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolios/2">Spring Package 구조 설계</Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolios/3">Java Exception 가이드 작성 및 프로젝트 내부의 공통 Exception 구조 개발</Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolios/4">HTTP 응답 형태 설계 및 프로젝트 내부의 API Response 공통 처리기 개발</Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolios/5">Spring 테스트 가이드 작성 및 공통된 테스트 환경 구축</Link>
                      </li>
                      <li>코드 리뷰 문화를 꾸리기 위한 Gitlab Merge Request Template 적용</li>
                      <li>Spring DB 마이그레이션 flyway 적용</li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">Stack</Typography>
                  <div className={styles.chipBox}>
                    <Chip variant="outlined" size="sm" value="TypeScript" />
                    <Chip variant="outlined" size="sm" value="NestJS" />
                    <Chip variant="outlined" size="sm" value="Java 17" />
                    <Chip variant="outlined" size="sm" value="Spring Boot 3" />
                    <Chip variant="outlined" size="sm" value="MySQL" />
                    <Chip variant="outlined" size="sm" value="Docker" />
                  </div>
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
                        <Link className={styles.link} href="https://www.nalbang.tv/">Live-Commerce 플랫폼입니다.</Link> 신규 기능 개발, 유지보수 업무를 담당하였습니다.
                      </li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">What I did</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolios/6">Youtube 동시 송출 서비스 개발</Link>
                      </li>
                      <li>비디오 트랜스코딩 작업 개발 (가변 비트레이트)</li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolios/7">날방 Open API 개발</Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolios/8">방문자 통계(성별, 나이) 서비스 개발</Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolios/9">경매 서비스 시스템 구축 및 개발</Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolios/12/">레거시 short url 프로젝트 스팩 개선 및 구조, 프로세스 재설계</Link>
                      </li>
                      <li>
                        <Link className={styles.link} href="https://www.hannah-log.site/portfolios/13/">레거시 프로젝트 이미지 기능 - 테스트 서버, 실서버의 분리</Link>
                      </li>
                      <li>입점 신청 Discord WebHook</li>
                      <li>AntMedia 송출 서버 구축</li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">Stack</Typography>
                  <div className={styles.chipBox}>
                    <Chip variant="outlined" size="sm" value="Java 11" />
                    <Chip variant="outlined" size="sm" value="Spring Boot 2" />
                    <Chip variant="outlined" size="sm" value="MariaDB" />
                    <Chip variant="outlined" size="sm" value="Redis" />
                    <Chip variant="outlined" size="sm" value="Socket.io" />
                    <Chip variant="outlined" size="sm" value="Docker" />
                  </div>
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
                        <Link className={styles.link} href="https://www.g-justgo.com/">강원도 숙박 서비스앱입니다.</Link> 주로 반복 작업을 최소화 시키는 작업이나 리뉴얼 개발 참여, 유지보수 업무를 담당하였습니다.
                      </li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">What I did</Typography>
                  <Typography>
                    <ul className={styles.list}>
                      <li>사용자 경험 개선을 위한 쿼리 튜닝 5-6s -&gt; 0.1s / 페이지 로드 시간 7-8s -> 1-2s</li>
                      <li>일별 매출 현황(표) 가시성 개선을 위한 월별 매출 현황(그래프) 서비스 개발 - chart.js</li>
                      <li>주기적으로 요청오던 데이터 수집 업무를 최소화하기 위해 KSNET 정산 결제 데이터 조회 서비스 개발</li>
                      <li>서비스 리뉴얼 참여 - 할인 민박 순위 API, 팜케이션 작성을 위한 에디터(naver smart editor2) 적용</li>
                    </ul>
                  </Typography>
                  <Typography variant="lead">Stack</Typography>
                  <div className={styles.chipBox}>
                    <Chip variant="outlined" size="sm" value="Java 11" />
                    <Chip variant="outlined" size="sm" value="Spring Boot 2" />
                    <Chip variant="outlined" size="sm" value="MariaDB" />
                    <Chip variant="outlined" size="sm" value="Thymeleaf" />
                    <Chip variant="outlined" size="sm" value="MyBatis" />
                  </div>
                </TimelineBody>
              </TimelineItem>
              {/*<TimelineItem>*/}
              {/*  <TimelineConnector/>*/}
              {/*  <TimelineHeader className="h-3">*/}
              {/*    <TimelineIcon/>*/}
              {/*    <Typography variant="h4">잇톡</Typography>*/}
              {/*  </TimelineHeader>*/}
              {/*  <TimelineBody className="m-2">*/}
              {/*    <Typography variant="lead">Description</Typography>*/}
              {/*    <Typography>*/}
              {/*      <ul className={styles.list}>*/}
              {/*        <li>상품을 실시간으로 반응하고 참여할 수 있는 서비스입니다.(미오픈)</li>*/}
              {/*      </ul>*/}
              {/*    </Typography>*/}
              {/*    <Typography variant="lead">What I did</Typography>*/}
              {/*    <Typography>*/}
              {/*      <ul className={styles.list}>*/}
              {/*        <li>쿠버네티스 환경의 오토 스케일링 클라우드 서버 구축</li>*/}
              {/*      </ul>*/}
              {/*    </Typography>*/}
              {/*    <Typography variant="lead">Stack</Typography>*/}
              {/*    <Typography>*/}
              {/*      <ul className={styles.list}>*/}
              {/*        <li>Java 17, Spring Boot 3, Kubernetes, Docker, Cloud...</li>*/}
              {/*      </ul>*/}
              {/*    </Typography>*/}
              {/*  </TimelineBody>*/}
              {/*</TimelineItem>*/}
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
                  <div className={styles.chipBox}>
                    <Chip variant="outlined" size="sm" value="Spring Framework" />
                    <Chip variant="outlined" size="sm" value="MyBatis" />
                    <Chip variant="outlined" size="sm" value="EGov(전자정부프레임워크)" />
                    <Chip variant="outlined" size="sm" value="SVN" />
                    <Chip variant="outlined" size="sm" value="JSP" />
                    <Chip variant="outlined" size="sm" value="JQuery" />
                  </div>
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
                  <div className={styles.chipBox}>
                    <Chip variant="outlined" size="sm" value="Spring Framework" />
                    <Chip variant="outlined" size="sm" value="MyBatis" />
                    <Chip variant="outlined" size="sm" value="EGov(전자정부프레임워크)" />
                    <Chip variant="outlined" size="sm" value="SVN" />
                    <Chip variant="outlined" size="sm" value="JSP" />
                    <Chip variant="outlined" size="sm" value="JQuery" />
                  </div>
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
        <Typography variant="h2">Side Project.</Typography>
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
                    <li>AntMedia 오픈 소스를 활용한 WebRTC 송출 서버 구축</li>
                    <li>hls.js 라이브러리를 활용한 HLS 영상 재생 기능 개발</li>
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
                      <Link className={styles.link} href="https://www.hannah-log.site/portfolios/10">LivePulse 발표 자료</Link>
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
                <div className={styles.chipBox}>
                  <Chip variant="outlined" size="sm" value="Kotlin" />
                  <Chip variant="outlined" size="sm" value="Spring Boot 3" />
                  <Chip variant="outlined" size="sm" value="TypeScript" />
                  <Chip variant="outlined" size="sm" value="NestJS" />
                  <Chip variant="outlined" size="sm" value="Docker" />
                  <Chip variant="outlined" size="sm" value="Github Actions" />
                  <Chip variant="outlined" size="sm" value="NextJS" />
                  <Chip variant="outlined" size="sm" value="his.js" />
                </div>
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
                    <li>유명한 강의 플랫폼인 인프런은 동영상 위주로 강의를 수강합니다. 인프런에서 강의를 보다가 다른 블로그나 문서처럼 글로 설명된 형식의 강의가 있었으면 좋겠다라는 생각이 들어서 프로젝트를 진행하게 되었습니다.</li>
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
                      <Link className={styles.link} href="https://www.hannah-log.site/portfolios/11/">Education 프로젝트 발표 자료</Link>
                    </li>
                    <li className={styles.inline}>
                      <Link className={styles.link} href="https://www.hannah-log.site/develop/blog/10/">Spring Boot - 메일 인증 구현하기</Link>
                    </li>
                  </ul>
                </Typography>
                <Typography variant="lead">Stack</Typography>
                <div className={styles.chipBox}>
                  <Chip variant="outlined" size="sm" value="Kotlin" />
                  <Chip variant="outlined" size="sm" value="Spring Boot 3" />
                  <Chip variant="outlined" size="sm" value="Spring Data JPA" />
                  <Chip variant="outlined" size="sm" value="QueryDSL" />
                  <Chip variant="outlined" size="sm" value="AWS S3" />
                  <Chip variant="outlined" size="sm" value="AWS EC2" />
                  <Chip variant="outlined" size="sm" value="React 16" />
                </div>
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
                <div className={styles.chipBox}>
                  <Chip variant="outlined" size="sm" value="Kotlin" />
                  <Chip variant="outlined" size="sm" value="Spring Boot" />
                  <Chip variant="outlined" size="sm" value="JDA" />
                </div>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
      <hr className="my-8 border-blue-gray-50"/>
      <div className={styles.section}>
        <Typography variant="h2">Contact.</Typography>
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
      <hr className="my-8 border-blue-gray-50"/>
      <Typography>
        자세한 포트폴리오는 <Link className={styles.link} href={"https://www.hannah-log.site/introduce/profile"}>여기 (https://www.hannah-log.site/introduce/profile)</Link>에서 확인해주세요.
      </Typography>
      {/*<PortfolioModal isOpen={isOpen} handleOpen={handleOpen} portfolioId={portfolioId} />*/}
    </div>
  </div>;
}
