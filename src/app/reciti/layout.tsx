import Link from 'next/link'
import styles from './reciti.module.css'
import { recitiSupportEmail, recitiUrls } from './content'

export default function RecitiLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${styles.shell} ko-keep`}>
      <div className={styles.wrap}>
        <header className={styles.nav}>
          <Link className={styles.brand} href={recitiUrls.home}>
            RECITI
          </Link>
          <nav className={styles.navLinks} aria-label="RECITI">
            <Link href={recitiUrls.privacy}>개인정보처리방침</Link>
            <Link href={recitiUrls.terms}>이용약관</Link>
            <Link href={recitiUrls.support}>고객지원</Link>
          </nav>
        </header>
      </div>
      {children}
      <div className={styles.wrap}>
        <footer className={styles.footer}>
          <span>RECITI · receipt anything</span>
          <div className={styles.footerLinks}>
            <Link href={recitiUrls.privacy}>개인정보처리방침</Link>
            <Link href={recitiUrls.terms}>이용약관</Link>
            <Link href={recitiUrls.support}>고객지원</Link>
            <a href={`mailto:${recitiSupportEmail}`}>{recitiSupportEmail}</a>
          </div>
        </footer>
      </div>
    </div>
  )
}
