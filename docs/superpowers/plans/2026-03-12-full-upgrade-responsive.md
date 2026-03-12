# Full Upgrade + Responsive Design Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Next.js 14 → 15, React 18 → 19, Tailwind v3 → v4로 전체 업그레이드하고, @material-tailwind 제거 후 순수 Tailwind로 대체하며, 768px+ 반응형 레이아웃 적용.

**Architecture:** @material-tailwind 컴포넌트를 재export하는 배럴 파일(`client-components.tsx`)을 순수 Tailwind 기반 로컬 컴포넌트로 교체하는 것이 핵심. Tailwind v4는 `tailwind.config.js` 삭제 후 CSS `@import` 방식으로 전환. Next.js 15 dynamic params는 모두 `await` 처리.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS v4, TypeScript 5.9, motion v12 (framer-motion 대체)

---

## Chunk 1: 패키지 업그레이드 + Tailwind v4 설정

### Task 1: package.json 업데이트

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 패키지 업그레이드 명령 실행**

```bash
npm install next@latest react@latest react-dom@latest
npm install --save-dev @types/react@latest @types/react-dom@latest eslint-config-next@latest
npm install motion@latest
npm uninstall @material-tailwind/react framer-motion
```

- [ ] **Step 2: Tailwind v4 설치**

```bash
npm install tailwindcss@latest @tailwindcss/postcss@latest
npm uninstall autoprefixer
```

- [ ] **Step 3: 설치 결과 확인 (버전 + peer 경고)**

```bash
cat package.json | grep -E '"next"|"react"|"tailwindcss"|"motion"|"material"'
npm ls --depth=0 2>&1 | grep -i "warn\|UNMET\|peer"
```

Expected: next@15.x, react@19.x, tailwindcss@4.x, motion@12.x 확인. @material-tailwind 없음. peer 경고 없음.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade next@15, react@19, tailwindcss@4, motion@12; remove @material-tailwind"
```

---

### Task 2: Tailwind v4 설정 전환

**Files:**
- Delete: `tailwind.config.js`
- Modify: `postcss.config.js`
- Modify: `app/globals.css`

- [ ] **Step 1: tailwind.config.js 현재 내용 확인 (삭제 전 필수)**

```bash
cat tailwind.config.js
cat postcss.config.js
cat app/globals.css
```

현재 tailwind.config.js 내용:
```js
const withMT = require('@material-tailwind/react/utils/withMT')
const config = withMT({
  content: [...],
  theme: { extend: {} },
  plugins: [],
})
export default config
```
Note: `theme.extend`가 비어 있으므로 v4 `@theme`에 추가 마이그레이션 불필요. `content` 경로는 v4에서 자동 감지.

현재 globals.css 내용:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Note: 기존 커스텀 스타일 없음 — 전체 교체 안전.

현재 postcss.config.js 내용:
```js
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
```
Note: autoprefixer만 있음 — 추가 플러그인 없으므로 전체 교체 안전.

- [ ] **Step 2: tailwind.config.js 삭제**

```bash
git rm tailwind.config.js
```

- [ ] **Step 3: postcss.config.js 교체**

파일 내용을 아래로 교체:

```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

- [ ] **Step 4: globals.css 교체**

파일 내용을 아래로 교체:

```css
@import "tailwindcss";

@theme {
  --color-indigo-50: #eef2ff;
  --color-indigo-100: #e0e7ff;
  --color-indigo-500: #6366f1;
  --color-indigo-600: #4f46e5;
  --color-indigo-700: #4338ca;
  --color-indigo-900: #312e81;
  --color-slate-50: #f8fafc;
  --color-slate-100: #f1f5f9;
  --color-slate-200: #e2e8f0;
  --color-slate-300: #cbd5e1;
  --color-slate-400: #94a3b8;
  --color-slate-500: #64748b;
  --color-slate-600: #475569;
  --color-slate-700: #334155;
  --color-slate-800: #1e293b;
  --color-slate-900: #0f172a;
}
```

- [ ] **Step 5: 빌드 확인 (에러 있어도 계속 — 아직 MT import 살아있음)**

```bash
npm run build 2>&1 | head -30
```

Expected: Tailwind v4 관련 에러 없음. @material-tailwind 관련 에러는 다음 Task에서 해결.

- [ ] **Step 6: Commit**

```bash
git add postcss.config.js app/globals.css
git commit -m "chore: migrate to Tailwind CSS v4 config"
```

---

## Chunk 2: @material-tailwind 제거 — 로컬 컴포넌트 교체

### Task 3: client-components.tsx 재작성 (배럴 파일 → 로컬 컴포넌트)

**Files:**
- Modify: `components/tailwind/client-components.tsx`

이 파일이 26개 파일의 import 소스이므로, 기존 export 이름을 유지하면서 내부 구현만 순수 Tailwind로 교체한다.

- [ ] **Step 1: client-components.tsx 전체 교체**

```tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'

// ── Typography ──────────────────────────────────────────────────────────────

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'lead' | 'paragraph' | 'small'
type TypographyColor = 'inherit' | 'current' | 'indigo' | 'blue-gray' | 'red' | 'white'

const variantTag: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
  lead: 'p', paragraph: 'p', small: 'small',
}
const variantClass: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold leading-tight',
  h2: 'text-3xl font-bold leading-tight',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
  lead: 'text-xl font-normal leading-relaxed',
  paragraph: 'text-base font-normal leading-relaxed',
  small: 'text-sm font-normal',
}
const colorClass: Record<TypographyColor, string> = {
  inherit: 'text-inherit',
  current: 'text-current',
  indigo: 'text-indigo-700',
  'blue-gray': 'text-slate-700',
  red: 'text-red-600',
  white: 'text-white',
}

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  color?: TypographyColor
  as?: keyof React.JSX.IntrinsicElements
}
export function Typography({ variant = 'paragraph', color = 'inherit', as, className = '', children, ...props }: TypographyProps) {
  const Tag = (as ?? variantTag[variant]) as React.ElementType
  return <Tag className={`${variantClass[variant]} ${colorClass[color]} ${className}`} {...props}>{children}</Tag>
}

// ── Button ───────────────────────────────────────────────────────────────────

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text'
  color?: 'indigo' | 'red' | 'white' | 'blue-gray'
  size?: 'sm' | 'md' | 'lg'
}
export function Button({ variant = 'filled', color = 'indigo', size = 'md', className = '', children, ...props }: ButtonProps) {
  const sizeClass = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' }[size]
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none disabled:opacity-50 cursor-pointer'
  const variants: Record<string, Record<string, string>> = {
    filled: { indigo: 'bg-indigo-600 text-white hover:bg-indigo-700', red: 'bg-red-600 text-white hover:bg-red-700', 'blue-gray': 'bg-slate-600 text-white hover:bg-slate-700', white: 'bg-white text-slate-800 hover:bg-slate-100' },
    outlined: { indigo: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50', red: 'border border-red-600 text-red-600 hover:bg-red-50', 'blue-gray': 'border border-slate-400 text-slate-600 hover:bg-slate-50', white: 'border border-white text-white hover:bg-white/10' },
    text: { indigo: 'text-indigo-600 hover:bg-indigo-50', red: 'text-red-600 hover:bg-red-50', 'blue-gray': 'text-slate-600 hover:bg-slate-50', white: 'text-white hover:bg-white/10' },
  }
  return <button className={`${base} ${sizeClass} ${variants[variant][color] ?? ''} ${className}`} {...props}>{children}</button>
}

// ── IconButton ───────────────────────────────────────────────────────────────

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text'
  ripple?: boolean
}
export function IconButton({ variant = 'text', ripple: _ripple, className = '', children, ...props }: IconButtonProps) {
  return <button className={`inline-flex items-center justify-center rounded-lg p-1 transition-colors hover:bg-slate-100 focus:outline-none ${className}`} {...props}>{children}</button>
}

// ── Card ─────────────────────────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Card({ className = '', children, ...props }: CardProps) {
  return <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`} {...props}>{children}</div>
}
export function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-4 border-b border-slate-200 ${className}`} {...props}>{children}</div>
}
export function CardBody({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-4 ${className}`} {...props}>{children}</div>
}
export function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-4 border-t border-slate-200 ${className}`} {...props}>{children}</div>
}

// ── Chip ─────────────────────────────────────────────────────────────────────

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  value?: string
  variant?: 'filled' | 'outlined'
  size?: 'sm' | 'md'
}
export function Chip({ value, variant = 'filled', size = 'md', className = '', children, ...props }: ChipProps) {
  const sizeClass = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm' }[size]
  const variantClass = variant === 'outlined'
    ? 'border border-slate-400 text-slate-600 bg-transparent'
    : 'bg-slate-100 text-slate-700'
  return <span className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${variantClass} ${className}`} {...props}>{value ?? children}</span>
}

// ── Avatar ───────────────────────────────────────────────────────────────────

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg'
}
export function Avatar({ size = 'md', className = '', alt = '', ...props }: AvatarProps) {
  const sizeClass = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-14 h-14' }[size]
  return <img className={`rounded-full object-cover ${sizeClass} ${className}`} alt={alt} {...props} />
}

// ── Collapse ─────────────────────────────────────────────────────────────────

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
}
export function Collapse({ open, className = '', children, ...props }: CollapseProps) {
  return (
    <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} ${className}`} {...props}>
      {children}
    </div>
  )
}

// ── Menu ─────────────────────────────────────────────────────────────────────

interface MenuContextType { open: boolean; setOpen: (v: boolean) => void }
const MenuContext = React.createContext<MenuContextType>({ open: false, setOpen: () => {} })

interface MenuProps { children: React.ReactNode; placement?: string; offset?: number }
export function Menu({ children }: MenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  return (
    <MenuContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className="relative">{children}</div>
    </MenuContext.Provider>
  )
}
export function MenuHandler({ children }: { children: React.ReactElement }) {
  const { setOpen, open } = React.useContext(MenuContext)
  return React.cloneElement(children, { onClick: () => setOpen(!open) })
}
export function MenuList({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { open } = React.useContext(MenuContext)
  if (!open) return null
  return <div className={`absolute z-50 mt-1 min-w-max rounded-lg border border-slate-200 bg-white py-1 shadow-lg ${className}`}>{children}</div>
}
export function MenuItem({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { setOpen } = React.useContext(MenuContext)
  return <div className={`cursor-pointer px-3 py-2 text-sm hover:bg-slate-50 ${className}`} onClick={() => setOpen(false)} {...props}>{children}</div>
}

// ── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}
export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <input className={`rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${className}`} {...props} />
    </div>
  )
}

// ── Tooltip ──────────────────────────────────────────────────────────────────

interface TooltipProps { children: React.ReactElement; content?: React.ReactNode; animate?: unknown }
export function Tooltip({ children, content }: TooltipProps) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && content && (
        <div className="absolute bottom-full left-1/2 z-50 -translate-x-1/2 -translate-y-1 rounded bg-slate-800 px-2 py-1 text-xs text-white whitespace-nowrap">
          {content}
        </div>
      )}
    </div>
  )
}

// ── Timeline ─────────────────────────────────────────────────────────────────

export function Timeline({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex flex-col ${className}`}>{children}</div>
}
export function TimelineItem({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`relative flex gap-4 ${className}`}>{children}</div>
}
export function TimelineConnector({ className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`absolute left-[7px] top-4 h-full w-0.5 bg-slate-200 ${className}`} />
}
export function TimelineHeader({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex items-center gap-3 ${className}`}>{children}</div>
}
export function TimelineIcon({ className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-600 ${className}`} />
}
export function TimelineBody({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`ml-7 ${className}`}>{children}</div>
}

// ── ThemeProvider ─────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

// ── MTNavbar (legacy compat) ──────────────────────────────────────────────────

export function MTNavbar({ children, className = '' }: React.HTMLAttributes<HTMLElement>) {
  return <nav className={`w-full bg-white/80 backdrop-blur-sm border-b border-slate-200 ${className}`}>{children}</nav>
}

// ── Dialog ───────────────────────────────────────────────────────────────────

interface DialogProps {
  open: boolean
  handler: () => void
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  animate?: unknown
}
export function Dialog({ open, handler, children, size = 'md' }: DialogProps) {
  if (!open) return null
  const sizeClass = { sm: 'max-w-sm', md: 'max-w-2xl', lg: 'max-w-4xl' }[size]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handler}>
      <div className="absolute inset-0 bg-black/50" />
      <div className={`relative w-full ${sizeClass} mx-4 rounded-xl bg-white shadow-xl`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
export function DialogHeader({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`border-b border-slate-200 px-6 py-4 text-xl font-semibold ${className}`}>{children}</div>
}
export function DialogBody({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}
export function DialogFooter({ children, className = '' }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`flex items-center justify-end gap-2 border-t border-slate-200 px-6 py-4 ${className}`}>{children}</div>
}
```

- [ ] **Step 2: load.tsx에서 직접 import하는 Spinner를 로컬로 교체**

`components/utils/load.tsx` 교체:

```tsx
import styles from '@/styles/components/utils/style.module.css'

export default function Load() {
  return (
    <div className={styles.loadStyle}>
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
    </div>
  )
}
```

- [ ] **Step 3: portfolio-modal.tsx 직접 MT import 교체**

`components/modal/portfolio-modal.tsx` 현재 `import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'` (직접 MT import)를 아래로 교체:

```tsx
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@/components/tailwind/client-components'
```

- [ ] **Step 4: custom-button.tsx 직접 MT import 교체**

`app/private/tag/custom-button.tsx` 현재 `import { Button } from '@material-tailwind/react'` (직접 MT import)를 아래로 교체:

```tsx
import { Button } from '@/components/tailwind/client-components'
```

- [ ] **Step 5: layout.tsx에서 ThemeProvider html 래퍼 수정**

`app/layout.tsx` 수정 — ThemeProvider가 `<html>` 밖에 있는 구조 정리:

```tsx
import './globals.css'
import { inter } from '@/components/font/google'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 6: blue-gray 클래스 교체 확인**

```bash
grep -r "blue-gray\|deep-purple" --include="*.tsx" --include="*.css" . | grep -v ".next" | grep -v "node_modules"
```

발견된 파일들 고정 수정:

**`components/utils/table.tsx`** — `color="blue-gray"` prop 제거, CSS 클래스 교체:
```tsx
const thClassName = "border-b border-slate-100 bg-slate-50 p-4"

// Typography에서 color prop 제거, className으로 색상 표현
<Typography variant="small" className={`${thTypographyClassName} text-slate-600`}>
```

**`components/utils/pagination.tsx`** — `color` prop 교체, `deep-purple` 제거:
```tsx
<Button variant="text" className="text-slate-600" disabled={page === 1} onClick={() => setPage(page - 1)}>
  &lt; Previous
</Button>
<div className="flex items-center gap-2">
  {Array.from({length: numPages}).map((_, i) => (
    <IconButton
      key={i}
      onClick={() => setPage(i + 1)}
      className={`rounded-full ${page === i + 1 ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
    >
      {i + 1}
    </IconButton>
  ))}
</div>
<Button variant="text" className="text-slate-600" disabled={page === numPages} onClick={() => setPage(page + 1)}>
  Next &gt;
</Button>
```

**`app/introduce/profile/page.tsx`** — `border-blue-gray-50` → `border-slate-100`:
```tsx
<hr className="my-8 border-slate-100"/>
// (파일 내 3개 hr 모두 교체)
```

**`app/introduce/profile/page.tsx`** — `shadow-blue-gray-900/50` → `shadow-slate-900/50`:
```tsx
className={`${styles.img} rounded-full object-cover object-center shadow-xl shadow-slate-900/50`}
```

- [ ] **Step 7: 빌드 확인**

```bash
npm run build 2>&1 | grep -E "error|Error|warning" | head -30
```

Expected: @material-tailwind 관련 에러 없음.

- [ ] **Step 8: Commit**

```bash
git add components/tailwind/client-components.tsx components/utils/load.tsx components/modal/portfolio-modal.tsx app/private/tag/custom-button.tsx app/layout.tsx
git commit -m "feat: replace @material-tailwind with pure Tailwind components"
```

---

## Chunk 3: Navbar 재작성 + Next.js 15 Breaking Changes

### Task 4: Navbar 순수 Tailwind로 재작성

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Navbar.tsx 교체**

```tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { navData } from '@/data/nav-data'
import { menuCloseIcon, menuOpenIcon } from '@/components/svg/icons'
import { logo } from '@/components/font/google'
import styles from '@/styles/components/layout/navbar.module.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hide, setHide] = useState(false)
  const [pageY, setPageY] = useState(0)
  const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null)

  const handleScroll = () => {
    const { pageYOffset } = window
    const deltaY = pageYOffset - pageY
    setHide(pageYOffset !== 0 && deltaY >= 0)
    setPageY(pageYOffset)
  }

  const throttleScroll = throttle(handleScroll, 50)

  useEffect(() => {
    window.addEventListener('scroll', throttleScroll)
    return () => window.removeEventListener('scroll', throttleScroll)
  }, [pageY, throttleScroll])

  const navItemClass = 'flex items-center px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer'

  return (
    <div className={styles.navWrapper}>
      <nav className={`${hide ? styles.hide : ''} w-full bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm px-4 lg:px-6 py-3 transition-transform duration-300`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              alt="Hannah github profile image"
              src="https://avatars.githubusercontent.com/u/57277976?v=4"
              className="w-8 h-8 rounded-full object-cover"
            />
            <h1 style={logo.style} className="text-base font-bold text-slate-800 hidden sm:block">Hannah Blog</h1>
          </Link>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-1 ml-auto">
            {navData.map((nav, idx) => (
              <li key={idx} className="relative">
                <button
                  className={navItemClass}
                  onClick={() => setOpenMenuIdx(openMenuIdx === idx ? null : idx)}
                  onBlur={() => setTimeout(() => setOpenMenuIdx(null), 150)}
                >
                  {nav.icon}
                  <span className="ml-2">{nav.mainTitle}</span>
                </button>
                {openMenuIdx === idx && (
                  <div className="absolute right-0 top-full mt-1 min-w-max rounded-lg border border-slate-200 bg-white py-1 shadow-lg z-50">
                    {nav.children.map((cNav, cIdx) => (
                      <Link
                        key={cIdx}
                        href={`${nav.link}${cNav.cLink}`}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        onClick={() => setOpenMenuIdx(null)}
                      >
                        {cNav.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? menuCloseIcon : menuOpenIcon}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`overflow-hidden transition-all duration-300 lg:hidden ${open ? 'max-h-screen opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
          <ul className="flex flex-col gap-1 pb-2">
            {navData.map((nav, idx) => (
              <li key={idx}>
                <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-2">{nav.mainTitle}</div>
                {nav.children.map((cNav, cIdx) => (
                  <Link
                    key={cIdx}
                    href={`${nav.link}${cNav.cLink}`}
                    className="block px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-slate-100"
                    onClick={() => setOpen(false)}
                  >
                    {cNav.title}
                  </Link>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}

const throttle = (callback: (...args: unknown[]) => void, waitTime: number) => {
  let timerId: NodeJS.Timeout | null = null
  return (...args: unknown[]) => {
    if (timerId) return
    timerId = setTimeout(() => {
      callback(...args)
      timerId = null
    }, waitTime)
  }
}
```

- [ ] **Step 2: 빌드 확인**

```bash
npm run build 2>&1 | grep -E "error|Error" | head -20
```

Expected: Navbar 관련 에러 없음.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: rewrite Navbar with pure Tailwind, add responsive mobile menu"
```

---

### Task 5: Next.js 15 async params 처리

Next.js 15에서 dynamic params는 Promise. **Server Component**는 `await params`, **Client Component**는 React `use(params)` 사용.

**Files:**
- Modify: `app/develop/blogs/[id]/page.tsx` (Server Component)
- Modify: `app/develop/series/[id]/page.tsx` (Server Component)
- Modify: `app/portfolios/[id]/page.tsx` (Server Component)
- Modify: `app/private/blog/[id]/page.tsx` (Client Component — `use()` 필요)
- Modify: `app/private/series/[id]/page.tsx` (Client Component — `use()` 필요)
- Modify: `app/private/portfolio/[id]/page.tsx` (Client Component — `use()` 필요)

- [ ] **Step 1: app/develop/blogs/[id]/page.tsx 수정 (Server Component)**

함수 시그니처와 params 사용 부분 변경:

```tsx
export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post: Post = await fetchBlog(id)
  // ... 나머지 동일
```

- [ ] **Step 2: app/develop/series/[id]/page.tsx 수정 (Server Component)**

```tsx
export default async function SeriesBlog({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { blogs } = await fetchBlogsBySeries(id)
  // ... 나머지 동일
```

- [ ] **Step 3: app/portfolios/[id]/page.tsx 수정 (Server Component)**

```tsx
export default async function PortfolioDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const portfolio: Portfolio = await fetchPortfolio(id)
  // ... 나머지 동일
```

- [ ] **Step 4: app/private/blog/[id]/page.tsx 수정 (Client Component — use() 사용)**

파일 상단에 `import { use } from 'react'` 추가, 함수 시그니처 변경:

```tsx
import { use } from 'react'

export default function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  // ... useEffect 등 나머지 동일, id 타입이 string으로 변경됨
```

- [ ] **Step 5: app/private/series/[id]/page.tsx 수정 (Client Component — use() 사용)**

```tsx
import { use } from 'react'

export default function SeriesDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  // ... 나머지 동일
```

- [ ] **Step 6: app/private/portfolio/[id]/page.tsx 수정 (Client Component — use() 사용)**

```tsx
import { use } from 'react'

export default function PortfolioDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  // ... 나머지 동일
```

- [ ] **Step 7: 빌드 확인**

```bash
npm run build 2>&1 | grep -E "error|Error|warn" | grep -i "param\|async" | head -20
```

Expected: params 관련 에러/경고 없음.

- [ ] **Step 8: Commit**

```bash
git add "app/develop/blogs/[id]/page.tsx" "app/develop/series/[id]/page.tsx" "app/portfolios/[id]/page.tsx" "app/private/blog/[id]/page.tsx" "app/private/series/[id]/page.tsx" "app/private/portfolio/[id]/page.tsx"
git commit -m "fix: await/use params for Next.js 15 async dynamic routes"
```

---

### Task 6: motion v12으로 import 교체

**Files:**
- Modify: `components/motion/progress-bar.tsx`

- [ ] **Step 1: framer-motion import 잔존 파일 전체 확인**

```bash
grep -r "framer-motion" --include="*.tsx" --include="*.ts" . | grep -v ".next" | grep -v "node_modules"
```

Expected: `components/motion/progress-bar.tsx` 1개만 나옴.

- [ ] **Step 2: progress-bar.tsx import를 motion/react로 교체**

파일에서:
```tsx
import { ... } from 'framer-motion'
```
를:
```tsx
import { ... } from 'motion/react'
```
로 교체.

- [ ] **Step 3: 빌드 확인**

```bash
npm run build 2>&1 | grep -E "framer-motion|Cannot find module" | head -10
```

Expected: framer-motion 관련 에러 없음.

- [ ] **Step 4: Commit**

```bash
git add components/motion/progress-bar.tsx
git commit -m "chore: migrate framer-motion to motion/react"
```

---

## Chunk 4: 반응형 레이아웃 적용

### Task 7: 홈페이지 반응형

**Files:**
- Modify: `app/page.tsx`
- Modify: `styles/app/page.module.css` (또는 해당 CSS 파일)

- [ ] **Step 1: 현재 홈페이지 CSS 확인**

```bash
cat styles/app/page.module.css 2>/dev/null || find . -name "page.module.css" -path "*/app/*" | head -5
```

- [ ] **Step 2: app/page.tsx에서 Typography 교체 및 반응형 클래스 적용**

```tsx
import styles from '@/styles/app/page.module.css'
import CircleAnimation from '@/components/motion/helper/circle-animation'
import { MainSvg } from '@/components/svg/svgs'
import { formatMetadata } from '@/components/utils/meta-head'

export async function generateMetadata() {
  return formatMetadata({
    description: "Welcome to Hannah Blog! Hannah 블로그에 오신 것을 환영합니다!"
  })
}

export default function Home() {
  return (
    <div className={styles.mainWrapper}>
      <div className={`${styles.contentWrapper} max-w-2xl w-full px-4`}>
        <MainSvg className={styles.indexing} />
        <h1 className={`${styles.indexing} text-3xl md:text-5xl font-bold text-indigo-700`}>
          Welcome to ChaeMin Blog!
        </h1>
        <p className={`${styles.indexing} text-lg md:text-xl text-indigo-600 leading-relaxed`}>
          저의 블로그에 오신 것을 환영합니다!<br />
          쓰여진 글은 많이 없지만 즐겁게 보시다 가셨으면 좋겠습니다.
        </p>
      </div>
      <CircleAnimation />
    </div>
  )
}
```

- [ ] **Step 3: page.module.css에서 고정 너비/높이 제거**

`styles/app/page.module.css`에서 아래 두 가지 고정값을 제거:
- `.contentWrapper`의 `width: 750px` → 제거 (Tailwind `max-w-2xl`로 대체)
- `.contentWrapper`의 `height: 95vh` → 제거 (고정 높이 제거, 콘텐츠에 맞게 auto)

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: make homepage responsive"
```

---

### Task 8: 블로그/시리즈 목록 반응형

**Files:**
- Modify: `app/develop/blogs/page.tsx`
- Modify: `app/develop/series/page.tsx`
- Modify: 관련 CSS module 파일

- [ ] **Step 1: 현재 CSS 확인**

```bash
cat styles/app/blog/page.module.css 2>/dev/null
```

- [ ] **Step 2: app/develop/blogs/page.tsx 반응형 적용**

```tsx
import Post from '@/components/post/post'
import { formatMetadata } from '@/components/utils/meta-head'
import { fetchBlogs } from '@/api/caller'

export async function generateMetadata() {
  return formatMetadata({ title: "Develop Blog", description: "Hannah Develop Blog" })
}

export default async function Blog() {
  const posts = await fetchBlogs()

  return (
    <div className="min-h-screen px-4 py-12 md:px-8 md:py-20">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 md:mb-12">Develop Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts && posts.map((post, idx) => <Post key={idx} post={post} />)}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: app/develop/series/page.tsx 반응형 적용**

```tsx
import Series from '@/components/series/series'
import Link from 'next/link'
import { formatMetadata } from '@/components/utils/meta-head'
import { fetchSeries } from '@/api/caller'

export async function generateMetadata() {
  return formatMetadata({ title: "Develop Series", description: "Hannah Develop Series" })
}

export default async function DevelopSeries() {
  const series = await fetchSeries()

  return (
    <div className="min-h-screen px-4 py-12 md:px-8 md:py-20">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 md:mb-12">Develop Series</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {series && series.map((s, idx) => (
          <Link key={idx} href={`/develop/series/${s.id}`}>
            <Series series={s} />
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/develop/blogs/page.tsx app/develop/series/page.tsx
git commit -m "feat: make blog/series list pages responsive"
```

---

### Task 9: 블로그 상세 반응형

**Files:**
- Modify: `app/develop/blogs/[id]/page.tsx`
- Modify: `components/post/side/idx-box.tsx`

- [ ] **Step 1: idx-box.tsx 래퍼에 hidden md:block 추가**

`components/post/side/idx-box.tsx` 14번째 줄 수정:

```tsx
// 변경 전:
return <div className={styles.idxWrapper}>
// 변경 후:
return <div className={`${styles.idxWrapper} hidden md:block`}>
```

- [ ] **Step 2: app/develop/blogs/[id]/page.tsx 전체 교체**

Note: Task 5에서 이미 params async 처리를 했으면, 이 파일이 이미 수정되어 있음. 아래는 최종 완성본:

```tsx
import Image from 'next/image'
import ProgressBar from '@/components/motion/progress-bar'
import Markdown from '@/components/utils/markdown'
import HeadMeta from '@/components/utils/meta-head'
import { fetchBlog, Post } from '@/api/caller'
import { dateKoFormat, timeFormat } from '@/components/utils/dateUtils'
import { IdxBox, TagBox } from '@/components/post/index'

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post: Post = await fetchBlog(id)

  return <>
    <HeadMeta
      title={post.title}
      description={post.content.substring(0, 100)}
      image={post.thumbnailUrl}
      url={"/develop/blogs/" + post.id}
      tags={post.tags.map(tag => tag.name)}
    />
    <IdxBox id={Number(id)} content={post.content} url={"develop/blogs"} />
    <TagBox tags={post.tags} />
    <div className="max-w-3xl w-full mx-auto px-4 py-12 md:px-8 md:py-20">
      <ProgressBar/>
      <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">{post.title}</h1>
      <div className="mb-6 text-slate-500 text-sm">
        {dateKoFormat(post.createdDate)} {timeFormat(post.createdDate)}
      </div>
      <Image
        className="w-full md:w-1/2 rounded-xl mb-8"
        src={post.thumbnailUrl}
        alt={`${post.id}-thumbnail-image`}
        width={600}
        height={400}
      />
      <div>
        <Markdown content={post.content}/>
      </div>
    </div>
  </>
}
```

- [ ] **Step 3: Commit**

```bash
git add "app/develop/blogs/[id]/page.tsx" components/post/side/idx-box.tsx
git commit -m "feat: make blog detail page responsive"
```

---

### Task 10: 이력서/프로필 페이지 반응형

**Files:**
- Modify: `app/introduce/profile/page.tsx`
- Modify: 관련 CSS module

- [ ] **Step 1: profile/page.tsx 메인 래퍼 반응형 적용**

`app/introduce/profile/page.tsx` 에서 아래 클래스를 교체. `styles.subWrapper`가 `width: 55rem` 고정값의 원인임 — 이를 Tailwind로 대체:

```tsx
// 변경 전:
<div className={styles.mainWrapper}>
  <ProgressBar />
  <div className={`${styles.subWrapper} ${styles.indexing}`}>

// 변경 후:
<div className="w-full">
  <ProgressBar />
  <div className={`max-w-4xl w-full mx-auto px-4 py-12 md:px-8 md:py-20 ${styles.indexing}`}>
```

- [ ] **Step 2: 2열 레이아웃 블록 반응형 적용**

파일 내 `styles.block`이 사용된 `div` 4곳 모두 교체 (Career, Side Project, Education 섹션):

```tsx
// 변경 전:
<div className={`${styles.block} mt-6`}>
// 변경 후:
<div className="flex flex-col lg:flex-row gap-8 mt-6">

// 변경 전:
<div className={styles.block}>
// 변경 후:
<div className="flex flex-col lg:flex-row gap-8">
```

- [ ] **Step 3: predicate 너비 반응형 적용**

파일 내 `styles.predicate`가 사용된 `div` 모두 교체:

```tsx
// 변경 전:
<div className={styles.predicate}>
// 변경 후:
<div className="w-full lg:w-3/4">
```

- [ ] **Step 4: Contact 섹션 sideBlock 반응형**

```tsx
// 변경 전:
<div className={styles.sideBlock}>
// 변경 후:
<div className="flex flex-col md:flex-row gap-8 items-start">
```

- [ ] **Step 5: hr과 img의 blue-gray 클래스 교체**

```tsx
// 파일 내 3곳의 hr 교체:
<hr className="my-8 border-slate-100"/>

// img 교체:
className={`rounded-full object-cover object-center shadow-xl shadow-slate-900/50 w-40 h-40 md:w-64 md:h-64`}
```

- [ ] **Step 6: Commit**

```bash
git add app/introduce/profile/page.tsx
git commit -m "feat: make profile/resume page responsive"
```

---

### Task 11: 카드 컴포넌트 반응형

**Files:**
- Modify: `components/post/post.tsx`
- Modify: `components/series/series.tsx`
- Modify: `styles/components/post/post.module.css` (고정 너비 제거)

- [ ] **Step 1: post.tsx 전체 교체**

`CardHeader color="indigo"`, `CardFooter divider`, `Chip color="indigo"` 등 MT 전용 prop 제거. 고정 너비는 CSS 모듈(`styles/components/post/post.module.css`)의 `.card { width: 24rem }` 에 있으므로 같이 제거:

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { Post as PostType } from '@/api/caller'
import { Chip } from '@/components/tailwind/client-components'
import { dateFormat } from '@/components/utils/dateUtils'

export default function Post({ post }: { post: PostType }) {
  return (
    <Link href={`/develop/blogs/${post.id}`}>
      <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
        <div className="relative h-56 bg-indigo-100">
          <Image
            src={post.thumbnailUrl}
            alt="thumbnail-url"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 text-center font-medium text-slate-800">{post.title}</div>
        <div className="px-4 pb-4 border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag, idx) => (
              <Chip key={idx} size="sm" className="font-medium" value={`#${tag.name}`} />
            ))}
          </div>
          <div className="text-sm text-slate-500">{dateFormat(post.createdDate)}</div>
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: styles/components/post/post.module.css에서 .card 고정 너비 제거**

`styles/components/post/post.module.css` 파일을 열어 `.card` 클래스의 `width: 24rem` (또는 `width: 384px`) 줄 삭제.

- [ ] **Step 3: series.tsx 전체 교체**

`shadow={false}`, `floated={false}`, `color="transparent"` 등 MT 전용 prop 제거:

```tsx
import styles from '@/styles/components/series/series.module.css'
import Image from 'next/image'
import { dateFormat } from '@/components/utils/dateUtils'
import type { Series } from '@/api/caller'

export default function Series({ series }: { series: Series }) {
  return (
    <div className={`${styles.series} rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer`}>
      <div className={styles.seriesHeader}>
        <div className={styles.seriesThumbnail}>
          <Image
            src={series.thumbnailUrl}
            alt={series.title}
            width={200}
            height={200}
          />
        </div>
        <div className={styles.headerGradient} />
      </div>
      <div className={styles.seriesBody}>
        <h2 className={`${styles.seriesTitle} text-xl font-bold`}>
          {series.title}
        </h2>
        <p className={styles.seriesDate}>
          마지막 업데이트 : {dateFormat(series.createdDate)}
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/post/post.tsx components/series/series.tsx styles/components/post/post.module.css
git commit -m "feat: make card components responsive, remove MT-specific props"
```

---

### Task 12: Footer 반응형 정리

**Files:**
- Modify: `components/layout/Footer.tsx`
- Modify: `styles/components/layout/footer.module.css`

- [ ] **Step 1: Footer.tsx 전체 교체 (import 포함)**

커스텀 미디어쿼리 대신 Tailwind 클래스 적용. 기존 import (`navData`, `logo`, `Link`) 유지:

```tsx
import Link from 'next/link'
import { navData } from '@/data/nav-data'
import { logo } from '@/components/font/google'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-20">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {navData.map(({ mainTitle, link, children }, key) => (
            <div key={key}>
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">{mainTitle}</span>
              <ul className="mt-4 flex flex-col gap-2">
                {children.map(({ title, cLink }, cKey) => (
                  <Link key={key + cKey} href={link + cLink}
                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                    {title}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="my-8 border-slate-200" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-1 font-semibold text-slate-700 no-underline">
            <span>Powered by</span>
            <span style={logo.style} className="text-indigo-600">Hannah</span>
          </Link>
          <div className="text-sm text-slate-400">
            Copyright &copy; {year} Hannah Archiving{" "}
            <Link href="/" className="text-inherit hover:text-slate-600 transition-colors">Pages.</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: rewrite Footer with responsive Tailwind classes"
```

---

## Chunk 5: 최종 검증

### Task 13: 빌드 완전 확인 + @material-tailwind 잔존 체크

**Files:** (read-only 검증)

- [ ] **Step 1: @material-tailwind import 잔존 확인**

```bash
grep -r "@material-tailwind" --include="*.tsx" --include="*.ts" . | grep -v ".next" | grep -v "node_modules"
```

Expected: 결과 없음 (0 matches).

- [ ] **Step 2: blue-gray 클래스 잔존 확인**

```bash
grep -r "blue-gray" --include="*.tsx" --include="*.ts" --include="*.css" . | grep -v ".next" | grep -v "node_modules"
```

Expected: 결과 없음. 있다면 `slate-*`으로 교체.

- [ ] **Step 3: 전체 빌드**

```bash
npm run build
```

Expected: 에러 없이 빌드 완료.

- [ ] **Step 4: 개발 서버로 수동 확인**

```bash
npm run dev
```

브라우저에서 아래 확인:
- [ ] `http://localhost:3000` — 홈페이지 768px에서 정상
- [ ] `http://localhost:3000/develop/blogs` — 목록 2열 그리드
- [ ] `http://localhost:3000/develop/blogs/1` — 본문 max-w-3xl
- [ ] `http://localhost:3000/develop/series` — 시리즈 3열 그리드
- [ ] `http://localhost:3000/introduce/profile` — 이력서 반응형

- [ ] **Step 5: 최종 Commit**

```bash
git add package.json package-lock.json postcss.config.js app/globals.css \
  components/tailwind/client-components.tsx \
  components/utils/load.tsx components/modal/portfolio-modal.tsx \
  app/private/tag/custom-button.tsx app/layout.tsx \
  components/layout/Navbar.tsx components/layout/Footer.tsx \
  components/post/post.tsx components/series/series.tsx \
  components/post/side/idx-box.tsx \
  components/utils/table.tsx components/utils/pagination.tsx \
  components/motion/progress-bar.tsx \
  app/page.tsx app/develop/blogs/page.tsx app/develop/series/page.tsx \
  "app/develop/blogs/[id]/page.tsx" "app/develop/series/[id]/page.tsx" \
  "app/portfolios/[id]/page.tsx" \
  "app/private/blog/[id]/page.tsx" "app/private/series/[id]/page.tsx" \
  "app/private/portfolio/[id]/page.tsx" \
  app/introduce/profile/page.tsx \
  styles/components/post/post.module.css
git commit -m "feat: complete full stack upgrade - Next.js 15, React 19, Tailwind v4, responsive layout"
```
