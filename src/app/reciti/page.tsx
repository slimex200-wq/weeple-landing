import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './reciti.module.css'
import { recitiFeatures, recitiPublicUrls, recitiUrls } from './content'

export const metadata: Metadata = {
  title: 'RECITI - receipt anything',
  description: '회식 영수증 사진으로 OCR 보고서와 엑셀 공유를 만드는 앱',
  keywords: ['RECITI', 'receipt anything', '영수증 OCR', '회식 영수증', '경비 보고서', '엑셀 보고서'],
  alternates: {
    canonical: recitiPublicUrls.home,
  },
  openGraph: {
    title: 'RECITI - receipt anything',
    description: '회식 영수증 사진으로 OCR 보고서와 엑셀 공유를 만드는 앱',
    url: recitiPublicUrls.home,
    type: 'website',
    siteName: 'RECITI',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: 'RECITI - receipt anything',
    description: '회식 영수증 사진으로 OCR 보고서와 엑셀 공유를 만드는 앱',
  },
}

export default function RecitiHome() {
  return (
    <main>
      <section className={styles.wrap}>
        <div className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>receipt anything</p>
            <h1 className={styles.title}>RECITI</h1>
            <p className={styles.subtitle}>receipt anything</p>
            <h2 className={styles.headline}>회식 영수증, 한 번에 끝</h2>
            <p className={styles.lead}>
              <span className={styles.line}>영수증 사진 한 장으로 항목·날짜·금액을 정리하고,</span>
              <span className={styles.line}>참석자·결제수단·메모까지 보고서로 관리합니다.</span>
            </p>
            <ul className={styles.featureList}>
              {recitiFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className={styles.receipt} aria-label="RECITI receipt preview">
            <div className={styles.receiptTop}>
              <span>RECITI REPORT</span>
              <span>READY</span>
            </div>
            <div className={styles.receiptRows}>
              <div className={styles.receiptRow}>
                <span>회식 영수증 OCR</span>
                <strong>자동 추출</strong>
              </div>
              <div className={styles.receiptRow}>
                <span>참석자·법인카드</span>
                <strong>편집 가능</strong>
              </div>
              <div className={styles.receiptRow}>
                <span>엑셀 보고서</span>
                <strong>공유 준비</strong>
              </div>
              <div className={styles.receiptRow}>
                <span>공유 링크</span>
                <strong>24시간</strong>
              </div>
            </div>
            <div className={styles.barcode} aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.body}`}>
          <h2>RECITI가 정리하는 것</h2>
          <p>
            RECITI는 회사 식사, 회식, 외근 지출처럼 영수증과 보고서가 함께 필요한 상황을 위해 만들어진
            영수증 OCR 보고서 앱입니다. 촬영하거나 앨범에서 선택한 영수증을 바탕으로 내역을 정리하고,
            사용자가 확인한 뒤 엑셀 보고서와 공유 링크로 전달할 수 있습니다.
          </p>
          <p>
            OCR 결과는 자동으로 채워지지만 항상 사용자가 검토하고 수정할 수 있습니다. 결제수단과 카드 종류,
            참석자, 메모, 정산 사유는 보고서 화면에서 함께 관리됩니다.
          </p>
          <p>
            <Link href={recitiUrls.privacy}>개인정보처리방침</Link>, <Link href={recitiUrls.terms}>이용약관</Link>,{' '}
            <Link href={recitiUrls.support}>고객지원</Link> 페이지에서 RECITI의 데이터 처리와 문의 방법을 확인할 수 있습니다.
          </p>
        </div>
      </section>
    </main>
  )
}
