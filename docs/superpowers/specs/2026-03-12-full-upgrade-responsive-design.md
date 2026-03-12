# Full Upgrade + Responsive Design Spec

**Date:** 2026-03-12
**Status:** Approved

## Overview

전체 패키지 버전업 + 반응형 레이아웃 적용 + 디자인 소폭 개선.
블로그 프론트엔드(Next.js 기반)를 최신 스택으로 마이그레이션하고, 고정 픽셀 너비로 인한 모바일/태블릿 레이아웃 깨짐을 해결한다.

## Decisions

| 항목 | 결정 |
|------|------|
| 업그레이드 방식 | 한번에 전체 (단계적 X) |
| UI 라이브러리 | 순수 Tailwind CSS만 사용 (@material-tailwind 제거) |
| 반응형 기준 | 768px 이상 (md: 태블릿, lg: 데스크탑) |
| 디자인 변경 | 현재 디자인 유지 + 소폭 개선 (간격, 폰트 크기 등) |

## Phase 1 — 패키지 업그레이드

### 제거
- `@material-tailwind/react` — TW v4 미호환
- `tailwindcss@3` 설정 방식 (`tailwind.config.js`, `withMT` 래퍼)
- `framer-motion@10`

### 추가/변경
- `next@15` (현재 14.2.33)
- `react@19`, `react-dom@19` (현재 18)
- `@types/react@19`, `@types/react-dom@19`
- `tailwindcss@4` — `tailwind.config.js` 삭제, CSS `@import "tailwindcss"` 방식으로 전환
- `motion@12` (framer-motion → motion 패키지명 변경)
- `eslint-config-next@15`

### Breaking Changes 처리

**Next.js 15**
- 동적 라우트 `params`가 Promise로 변경 → `await params` 필요
- `cookies()`, `headers()` 비동기 전환
- 영향 파일: `app/develop/blogs/[id]/page.tsx`, `app/develop/series/[id]/page.tsx`, `app/portfolios/[id]/page.tsx`, `app/private/blog/[id]/page.tsx`, `app/private/series/[id]/page.tsx`, `app/private/portfolio/[id]/page.tsx`

**React 19**
- `forwardRef` 불필요 (ref는 일반 prop으로)
- `use()` hook 사용 가능
- 영향: 현재 코드에서 `forwardRef` 사용 최소화되어 있어 영향 적음

**Tailwind v4**
- `tailwind.config.js` 삭제
- `globals.css`에 `@import "tailwindcss"` 추가
- `@layer`, `@theme` 등 v4 문법 적용
- `postcss.config.js` 업데이트 (`@tailwindcss/postcss` 플러그인)

**@material-tailwind 제거**
- `Navbar.tsx`: Material Tailwind 컴포넌트 → 순수 Tailwind + 상태 관리로 재작성
- `withMT` 래퍼 제거

## Phase 2 — 반응형 레이아웃

### 브레이크포인트
- `md`: 768px — 태블릿 세로
- `lg`: 1024px — 데스크탑

### 페이지별 변경

#### 홈페이지 (`app/page.tsx`)
- `width: 750px` 고정 → `max-w-2xl w-full`
- 애니메이션 컨테이너 반응형 조정

#### 블로그 목록 (`app/develop/blogs/page.tsx`)
- `padding: 6rem` → `py-12 md:py-20 px-4 md:px-8`
- `font-size: 3rem` → `text-3xl md:text-5xl`
- 카드 그리드: md:1열, lg:2열

#### 블로그 상세 (`app/develop/blogs/[id]/page.tsx`)
- `width: 800px` 고정 → `max-w-3xl w-full`
- 목차 사이드바(`idx-box`): md 이하 숨김 (`hidden md:block`)
- 썸네일: `width: 50%` → `w-full md:w-1/2`

#### 시리즈 목록 (`app/develop/series/page.tsx`)
- 카드 그리드: md:2열, lg:3열

#### 이력서/프로필 (`app/introduce/profile/page.tsx`)
- `width: 55rem` → `max-w-4xl w-full`
- `.predicate { width: 75% }` → `md:w-3/4`
- md 이하: 단일 컬럼, lg 이상: 2컬럼

#### 포트폴리오 (`app/portfolios/[id]/page.tsx`)
- 모달/상세: 반응형 너비 적용

#### Navbar (`components/layout/Navbar.tsx`)
- @material-tailwind 컴포넌트 제거
- 순수 Tailwind로 재작성
- md 이하: 햄버거 메뉴 + 드롭다운
- lg 이상: 가로 메뉴

#### Footer (`components/layout/Footer.tsx`)
- 커스텀 미디어쿼리 → Tailwind 클래스로 통일
- md: 2열, lg: 3열

#### CSS 모듈 처리
- 반응형 관련 고정값은 Tailwind 클래스로 교체
- CSS 모듈은 레이아웃이 아닌 스타일(색상, 그림자 등)에만 유지
- 단, 대대적인 CSS 모듈 제거는 이번 범위 밖

## Phase 3 — 디자인 소폭 개선

- **패딩**: 전체 페이지 `6rem` 고정 → 반응형 (`py-12 md:py-20`)
- **제목 폰트**: `3rem` 고정 → `text-3xl md:text-5xl`
- **카드 hover**: `transform: scale(1.05)` 통일
- **Navbar**: 배경 blur 효과 (`backdrop-blur-sm bg-white/80`)
- **블로그 목차**: 스크롤 sticky 위치 개선
- **Footer**: Tailwind 클래스로 통일, 링크 hover 색상 추가

## File Inventory

### 패키지 관련
- `package.json`
- `tailwind.config.js` (삭제)
- `postcss.config.js`
- `app/globals.css`

### 레이아웃
- `app/layout.tsx`
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`

### 페이지 (params async 처리)
- `app/develop/blogs/[id]/page.tsx`
- `app/develop/series/[id]/page.tsx`
- `app/portfolios/[id]/page.tsx`
- `app/private/blog/[id]/page.tsx`
- `app/private/series/[id]/page.tsx`
- `app/private/portfolio/[id]/page.tsx`

### 페이지 (반응형)
- `app/page.tsx`
- `app/develop/blogs/page.tsx`
- `app/develop/series/page.tsx`
- `app/introduce/profile/page.tsx`

### 컴포넌트 (반응형)
- `components/post/post.tsx`
- `components/series/series.tsx`
- `components/post/side/idx-box.tsx`
- `components/post/side/tag-box.tsx`
- `components/utils/pagination.tsx`

## Success Criteria

- [ ] `npm run build` 에러 없음
- [ ] 768px(태블릿) 뷰포트에서 레이아웃 깨짐 없음
- [ ] 1280px(데스크탑) 뷰포트에서 기존 디자인 유지
- [ ] @material-tailwind 의존성 없음
- [ ] Next.js 15 dynamic params 모두 async 처리
