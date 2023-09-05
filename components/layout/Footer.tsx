import styles from '@/styles/components/layout/footer.module.css'
import Link from 'next/link'
import { navData } from '@/data/nav-data'
import { logo } from '@/components/font/google'

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.footerBox}>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className={styles.navWrapper}>
              {navData.map(({ mainTitle, link, children }, key) =>(
                <div className={styles.nav} key={key}>
                  <span className={styles.mainTitle}>{mainTitle}</span>
                  <ul className={styles.linkWrapper}>
                    {children.map(({ title, cLink }, cKey) => (
                      <Link key={key + cKey} href={link + cLink} className="block pb-2 text-sm font-normal text-[#1A237E]/60">
                        {title}
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.copyrightWrapper}>
          <Link href="/" className="text-dark inline-flex items-center font-semibold no-underline">
            <span className="mr-1">Powered by</span>
            <span style={logo.style} className={styles.logo}>Hannah</span>
          </Link>
          <div className={styles.copyrightBox}>
            <div className={styles.copyright}>
              Copyright &copy; {year} Hannah Archiving{" "}
              <Link href="/" className="text-inherit transition-all">
                Pages.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
