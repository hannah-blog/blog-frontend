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
