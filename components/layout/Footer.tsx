import Link from 'next/link'
import { navData } from '@/data/nav-data'
import { logo } from '@/components/font/google'

export default function Footer() {
  const year = new Date().getFullYear();

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
  );
}
