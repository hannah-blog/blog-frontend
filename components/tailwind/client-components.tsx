'use client'

import React, { useState, useRef, useEffect } from 'react'

// ── Typography ──────────────────────────────────────────────────────────────

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'lead' | 'paragraph' | 'small'
type TypographyColor = 'inherit' | 'current' | 'indigo' | 'blue-gray' | 'red' | 'white' | 'gray'

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
  gray: 'text-slate-500',
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
export function IconButton({ variant: _variant, ripple: _ripple, className = '', children, ...props }: IconButtonProps) {
  return <button className={`inline-flex items-center justify-center rounded-lg p-1 transition-colors hover:bg-slate-100 focus:outline-none ${className}`} {...props}>{children}</button>
}

// ── Card ─────────────────────────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { shadow?: boolean }
export function Card({ className = '', shadow: _shadow, children, ...props }: CardProps) {
  return <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`} {...props}>{children}</div>
}
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { floated?: boolean; shadow?: boolean; color?: string }
export function CardHeader({ className = '', floated: _f, shadow: _s, color: _c, children, ...props }: CardHeaderProps) {
  return <div className={`p-4 border-b border-slate-200 ${className}`} {...props}>{children}</div>
}
export function CardBody({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-4 ${className}`} {...props}>{children}</div>
}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { divider?: boolean }
export function CardFooter({ className = '', divider: _d, children, ...props }: CardFooterProps) {
  return <div className={`p-4 border-t border-slate-200 ${className}`} {...props}>{children}</div>
}

// ── Chip ─────────────────────────────────────────────────────────────────────

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  value?: string
  variant?: 'filled' | 'outlined'
  size?: 'sm' | 'md'
  color?: string
}
export function Chip({ value, variant = 'filled', size = 'md', color: _color, className = '', children, ...props }: ChipProps) {
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
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e)
      setOpen(!open)
    },
  })
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
