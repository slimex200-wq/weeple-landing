import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../reciti.module.css'
import { recitiEffectiveDate, recitiOperator, recitiPublicUrls, recitiSupportEmail, recitiUrls } from '../content'

export const metadata: Metadata = {
  title: 'RECITI 개인정보처리방침',
  description: 'RECITI 앱의 개인정보 수집, 이용, 보관 및 삭제 기준',
  keywords: ['RECITI', '개인정보처리방침', '영수증 OCR 개인정보', 'receipt anything'],
  alternates: {
    canonical: recitiPublicUrls.privacy,
  },
  openGraph: {
    title: 'RECITI 개인정보처리방침',
    description: 'RECITI 앱의 개인정보 수집, 이용, 보관 및 삭제 기준',
    url: recitiPublicUrls.privacy,
    type: 'website',
    siteName: 'RECITI',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: 'RECITI 개인정보처리방침',
    description: 'RECITI 앱의 개인정보 수집, 이용, 보관 및 삭제 기준',
  },
}

export default function RecitiPrivacyPage() {
  return (
    <main className={styles.section}>
      <article className={`${styles.wrap} ${styles.body}`}>
        <h1>RECITI 개인정보처리방침</h1>
        <p>시행일: {recitiEffectiveDate}</p>

        <h2>서비스명 / 운영자</h2>
        <p>
          본 개인정보처리방침은 영수증 OCR 보고서 앱 RECITI에 적용됩니다. RECITI는 {recitiOperator}가 운영하며,
          개인정보 관련 문의는 <a href={`mailto:${recitiSupportEmail}`}>{recitiSupportEmail}</a>로 접수합니다.
        </p>

        <h2>수집하는 정보</h2>
        <p>RECITI는 서비스 제공에 필요한 범위에서 다음 정보를 수집하거나 생성할 수 있습니다.</p>
        <ul>
          <li>Apple, Google, Kakao 로그인 과정에서 제공되는 OAuth 식별자, 이메일 주소, 표시 이름</li>
          <li>사용자가 촬영하거나 앨범에서 선택해 업로드한 영수증 이미지</li>
          <li>OCR로 추출된 영수증 텍스트, 날짜, 금액, 항목, 카테고리 데이터</li>
          <li>보고서 메타데이터: 참석자, 결제수단, 카드 종류, 메모, 정산 사유</li>
          <li>엑셀 내보내기 및 24시간 공유 링크 생성을 위한 파일·링크 메타데이터</li>
          <li>구독 및 결제 검증 상태, OCR 사용량, 플랜 권한 정보</li>
          <li>푸시 알림 기능이 활성화된 경우 기기 푸시 토큰</li>
          <li>보안, 오류 분석, 부정 사용 방지를 위한 기본 기술 로그</li>
        </ul>
        <p>
          RECITI는 사용자의 전체 카드번호나 결제 카드 상세 정보를 저장하지 않습니다. 구독 및 결제 처리는 App Store,
          Google Play 등 결제 제공자가 수행하며, RECITI는 서비스 권한 확인에 필요한 검증 결과와 권한 상태만 저장할 수 있습니다.
        </p>

        <h2>수집 목적</h2>
        <ul>
          <li>회원 식별, 로그인 유지, 계정 관리</li>
          <li>영수증 OCR 처리, 보고서 생성, 엑셀 내보내기, 공유 링크 제공</li>
          <li>월간 OCR 사용량 및 구독 권한 관리</li>
          <li>오류 대응, 보안 유지, 서비스 남용 방지</li>
          <li>고객 문의 처리 및 계정 삭제 요청 대응</li>
        </ul>

        <h2>보관 및 삭제</h2>
        <p>
          RECITI는 서비스 제공에 필요한 기간 동안 개인정보와 사용자 생성 데이터를 보관합니다. 사용자가 앱 내 설정에서
          계정 삭제를 실행하면 RECITI 계정과 연결된 프로필, 보고서, 영수증, OCR 결과, 공유 링크 관련 데이터가 삭제됩니다.
          법령 준수, 분쟁 대응, 결제 검증 이력 보관이 필요한 일부 기록은 필요한 범위에서 분리 보관되거나 비식별 처리될 수 있습니다.
        </p>
        <p>
          App Store 또는 Google Play에서 관리되는 구독은 계정 삭제와 별도로 각 스토어 계정 설정에서 취소해야 할 수 있습니다.
        </p>

        <h2>제3자 제공 및 처리 위탁</h2>
        <p>
          RECITI는 원칙적으로 사용자의 개인정보를 제3자에게 판매하지 않습니다. 다만 서비스 제공을 위해 다음과 같은 외부
          서비스가 사용될 수 있습니다.
        </p>
        <ul>
          <li>Supabase: 인증, 데이터베이스, 스토리지, Edge Functions 운영</li>
          <li>OCR/AI 처리 서비스: 영수증 이미지와 텍스트 추출 처리</li>
          <li>Apple, Google, Kakao: 로그인 및 결제·구독 검증</li>
          <li>푸시 알림 제공자: 알림 발송이 활성화된 경우</li>
        </ul>

        <h2>사용자의 권리</h2>
        <p>
          사용자는 본인의 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 계정 삭제는 RECITI 앱의 설정 화면에서
          직접 실행할 수 있으며, 앱 접근이 어려운 경우 <a href={`mailto:${recitiSupportEmail}`}>{recitiSupportEmail}</a>로 문의할 수 있습니다.
        </p>

        <h2>문의처</h2>
        <p>
          RECITI 개인정보 문의: <a href={`mailto:${recitiSupportEmail}`}>{recitiSupportEmail}</a>
        </p>
        <p>
          고객지원 안내는 <Link href={recitiUrls.support}>RECITI 고객지원</Link> 페이지에서 확인할 수 있습니다.
        </p>
      </article>
    </main>
  )
}
