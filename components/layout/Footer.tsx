import Link from 'next/link'
import { navData } from '@/data/nav-data'
import { logo } from '@/components/font/google'

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-900 text-white mt-24">
      <div className="max-w-6xl mx-auto px-5 py-16 md:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Brand */}
          <div className="shrink-0">
            <Link href="/" className="inline-flex items-center gap-2 no-underline">
              <img
                src="https://avatars.githubusercontent.com/u/57277976?v=4"
                alt="profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-surface-700"
              />
              <span style={logo.style} className="text-2xl font-bold text-white">Hannah</span>
            </Link>
            <p className="mt-3 text-sm text-surface-400 max-w-xs leading-relaxed">
              개발하며 배운 것들을 기록하는 개인 블로그입니다.
            </p>
          </div>

          {/* Nav links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {navData.map(({ mainTitle, link, children }, key) => (
              <div key={key}>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-surface-500">{mainTitle}</span>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {children.map(({ title, cLink }, cKey) => (
                    <Link key={key + cKey} href={link + cLink}
                      className="text-sm text-surface-400 hover:text-white transition-colors">
                      {title}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-surface-800 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs text-surface-500">
            &copy; {year} Hannah. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/HongChaeMin" className="text-surface-500 hover:text-white transition-colors text-xs">
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/hannah-linkdin/" className="text-surface-500 hover:text-white transition-colors text-xs">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
