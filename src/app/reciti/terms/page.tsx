import type { Metadata } from 'next'
import styles from '../reciti.module.css'
import { recitiEffectiveDate, recitiOperator, recitiPublicUrls, recitiSupportEmail } from '../content'

export const metadata: Metadata = {
  title: 'RECITI 이용약관',
  description: 'RECITI 앱 이용 조건 및 사용자 책임',
  keywords: ['RECITI', '이용약관', '영수증 OCR 약관', 'receipt anything'],
  alternates: {
    canonical: recitiPublicUrls.terms,
  },
  openGraph: {
    title: 'RECITI 이용약관',
    description: 'RECITI 앱 이용 조건 및 사용자 책임',
    url: recitiPublicUrls.terms,
    type: 'website',
    siteName: 'RECITI',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: 'RECITI 이용약관',
    description: 'RECITI 앱 이용 조건 및 사용자 책임',
  },
}

export default function RecitiTermsPage() {
  return (
    <main className={styles.section}>
      <article className={`${styles.wrap} ${styles.body}`}>
        <h1>RECITI 이용약관</h1>
        <p>시행일: {recitiEffectiveDate}</p>

        <h2>서비스 목적</h2>
        <p>
          RECITI는 영수증 사진을 기반으로 OCR 결과를 정리하고, 참석자·결제수단·메모 등을 포함한 보고서와 엑셀 파일
          생성을 돕는 모바일 앱입니다. 본 약관은 RECITI 서비스 이용과 관련한 이용자와 {recitiOperator} 사이의 권리,
          의무, 책임사항을 정합니다.
        </p>

        <h2>계정 및 로그인</h2>
        <p>
          RECITI는 Apple, Google, Kakao 등 외부 인증 제공자를 통한 로그인을 지원할 수 있습니다. 이용자는 본인의 계정을
          안전하게 관리해야 하며, 타인의 계정을 무단으로 사용해서는 안 됩니다.
        </p>

        <h2>영수증/OCR 결과의 정확성</h2>
        <p>
          OCR 결과는 영수증 상태, 촬영 환경, 글자 인식 품질에 따라 부정확할 수 있습니다. RECITI는 OCR 결과의 완전한
          정확성이나 회계·세무·법무상 적합성을 보장하지 않습니다.
        </p>

        <h2>사용자 책임</h2>
        <p>
          이용자는 보고서 제출, 공유, 엑셀 내보내기 전에 OCR 결과와 금액, 날짜, 참석자, 결제수단, 메모 등 모든 내용을
          직접 검토하고 필요한 경우 수정해야 합니다. 이용자가 확인하지 않은 정보로 인해 발생한 업무상 불이익이나 정산
          오류에 대한 책임은 이용자에게 있습니다.
        </p>

        <h2>구독/결제/환불</h2>
        <p>
          RECITI Pro 및 Max 플랜은 OCR 사용량과 보고서 관련 기능을 확장하는 유료 구독으로 제공될 수 있습니다. 앱 내
          구입, 구독 관리, 취소, 환불은 App Store 또는 Google Play 정책과 각 스토어 계정 설정을 따릅니다.
        </p>
        <p>
          RECITI는 결제 제공자로부터 전달되는 검증 결과를 바탕으로 서비스 권한을 부여하며, 사용자의 전체 결제 카드 정보는
          저장하지 않습니다.
        </p>

        <h2>금지 행위</h2>
        <ul>
          <li>타인의 계정 또는 영수증 데이터를 무단으로 이용하는 행위</li>
          <li>허위 또는 불법 지출 증빙을 만들기 위해 서비스를 악용하는 행위</li>
          <li>서비스 보안, OCR 처리, 결제 검증 시스템을 우회하거나 방해하는 행위</li>
          <li>관련 법령이나 회사 정책을 위반하는 행위</li>
        </ul>

        <h2>서비스 변경/중단</h2>
        <p>
          RECITI는 기능 개선, 보안 조치, 외부 서비스 정책 변경, 운영상 필요에 따라 서비스 일부를 변경하거나 일시 중단할
          수 있습니다. 중요한 변경 사항은 가능한 범위에서 앱 또는 웹페이지를 통해 안내합니다.
        </p>

        <h2>면책</h2>
        <p>
          RECITI는 안정적인 서비스 제공을 위해 노력하지만, 네트워크 장애, 외부 OCR/인증/결제 제공자의 장애, 이용자 기기
          환경, 불가항력으로 인한 손해에 대해 법령상 허용되는 범위 내에서 책임을 제한합니다.
        </p>

        <h2>문의처</h2>
        <p>
          서비스 관련 문의: <a href={`mailto:${recitiSupportEmail}`}>{recitiSupportEmail}</a>
        </p>
      </article>
    </main>
  )
}
