import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../reciti.module.css'
import { recitiOperator, recitiPublicUrls, recitiSupportEmail, recitiUrls } from '../content'

export const metadata: Metadata = {
  title: 'RECITI 고객지원',
  description: 'RECITI 앱 문의, 오류 신고, 계정 삭제 및 구독 관련 지원',
  keywords: ['RECITI', '고객지원', '영수증 OCR 문의', '구독 복원', '계정 삭제'],
  alternates: {
    canonical: recitiPublicUrls.support,
  },
  openGraph: {
    title: 'RECITI 고객지원',
    description: 'RECITI 앱 문의, 오류 신고, 계정 삭제 및 구독 관련 지원',
    url: recitiPublicUrls.support,
    type: 'website',
    siteName: 'RECITI',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: 'RECITI 고객지원',
    description: 'RECITI 앱 문의, 오류 신고, 계정 삭제 및 구독 관련 지원',
  },
}

const supportTopics = [
  {
    title: '로그인 문제',
    body: '사용한 로그인 제공자와 오류 화면을 함께 보내 주세요.',
  },
  {
    title: 'OCR 결과 문제',
    body: '날짜, 금액, 항목 오류를 알려 주세요.',
  },
  {
    title: '엑셀·공유 링크 문제',
    body: '보고서 이름, 생성 시각, 링크 상태를 알려 주세요.',
  },
  {
    title: '구독·복원 문제',
    body: '스토어 구독 상태를 확인한 뒤 앱의 복원 기능을 먼저 실행해 주세요.',
  },
  {
    title: '계정 삭제',
    body: '앱 설정에서 삭제할 수 있습니다. 앱 접근이 어렵다면 이메일로 문의해 주세요.',
  },
]

export default function RecitiSupportPage() {
  return (
    <main className={styles.section}>
      <article className={`${styles.wrap} ${styles.body}`}>
        <h1>RECITI 고객지원</h1>
        <p>
          <span className={styles.line}>RECITI는 영수증 사진에서 OCR로</span>
          <span className={styles.line}>지출 내역을 정리하는 앱입니다.</span>
          <span className={styles.line}>개인정보, 계정 삭제, 구독 복원 문의는</span>
          <span className={styles.line}>아래 이메일로 연락해 주세요.</span>
        </p>
        <p>
          운영자: {recitiOperator}
          <br />
          지원 이메일: <a href={`mailto:${recitiSupportEmail}`}>{recitiSupportEmail}</a>
          <br />
          <span className={styles.line}>문의는 접수 순서대로 확인하며,</span>
          <span className={styles.line}>필요한 경우 추가 정보를 요청합니다.</span>
        </p>

        <div className={styles.supportGrid}>
          {supportTopics.map((topic) => (
            <section className={styles.supportItem} key={topic.title}>
              <h3>{topic.title}</h3>
              <p>{topic.body}</p>
            </section>
          ))}
        </div>

        <h2>문의 시 포함하면 좋은 정보</h2>
        <ul>
          <li>사용 중인 플랫폼: iOS 또는 Android</li>
          <li>앱 버전과 문제가 발생한 화면</li>
          <li>오류 메시지 또는 재현 순서</li>
          <li>결제 문의의 경우 스토어 영수증 또는 구독 상태 화면</li>
        </ul>

        <h2>관련 문서</h2>
        <ul>
          <li>
            <Link href={recitiUrls.privacy}>개인정보처리방침</Link>
          </li>
          <li>
            <Link href={recitiUrls.terms}>이용약관</Link>
          </li>
        </ul>
      </article>
    </main>
  )
}
