'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { navData } from '@/data/nav-data'
import { menuCloseIcon, menuOpenIcon } from '@/components/svg/icons'
import { logo } from '@/components/font/google'
import styles from '@/styles/components/layout/navbar.module.css'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hide, setHide] = useState(false)
  const [pageY, setPageY] = useState(0)
  const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  const handleScroll = useCallback(() => {
    const y = window.scrollY
    setHide(y > 60 && y > pageY)
    setPageY(y)
  }, [pageY])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { handleScroll(); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenuIdx(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className={styles.navWrapper}>
      <nav className={`${hide ? styles.hide : ''} w-full bg-white/80 backdrop-blur-md border-b border-surface-200/50 px-5 lg:px-8 py-3.5 transition-transform duration-300`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <img
              alt="profile"
              src="https://avatars.githubusercontent.com/u/57277976?v=4"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-100 group-hover:ring-primary-300 transition-all"
            />
            <span style={logo.style} className="text-xl font-bold text-primary-950 hidden sm:block">Hannah</span>
          </Link>

          <ul ref={menuRef} className="hidden lg:flex items-center gap-0.5">
            {navData.map((nav, idx) => (
              <li key={idx} className="relative">
                <button
                  className="px-4 py-2 text-sm font-medium text-surface-600 rounded-full hover:text-primary-700 hover:bg-primary-50 transition-all cursor-pointer"
                  onClick={() => setOpenMenuIdx(openMenuIdx === idx ? null : idx)}
                >
                  {nav.mainTitle}
                </button>
                {openMenuIdx === idx && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white border border-surface-100 py-2 shadow-lg shadow-surface-200/50 z-50">
                    {nav.children.map((cNav, cIdx) => (
                      <Link
                        key={cIdx}
                        href={`${nav.link}${cNav.cLink}`}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-600 hover:text-primary-700 hover:bg-primary-50/60 transition-colors"
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

          <button
            className="lg:hidden p-2 rounded-full hover:bg-surface-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? menuCloseIcon : menuOpenIcon}
          </button>
        </div>

        <div className={`overflow-hidden transition-all duration-300 lg:hidden max-w-6xl mx-auto ${mobileOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col gap-1 pb-3">
            {navData.map((nav, idx) => (
              <div key={idx}>
                <div className="px-3 py-1.5 text-[11px] font-semibold text-surface-400 uppercase tracking-widest">{nav.mainTitle}</div>
                {nav.children.map((cNav, cIdx) => (
                  <Link
                    key={cIdx}
                    href={`${nav.link}${cNav.cLink}`}
                    className="block px-3 py-2 text-sm text-surface-700 rounded-xl hover:bg-primary-50 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {cNav.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
