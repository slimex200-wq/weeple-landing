export type Period = "monthly" | "yearly";

export type Tier = {
  name: string;
  price: {
    monthly: string;
    yearly: string;
  };
  period: {
    monthly: string;
    yearly: string;
  };
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
};

export const PRICING_TIERS: Tier[] = [
  {
    name: "Free",
    price: { monthly: "₩0", yearly: "₩0" },
    period: { monthly: "영원히", yearly: "영원히" },
    description: "기본적인 가계부 기능. 개인 사용자에게 충분합니다.",
    features: [
      "자연어 빠른 입력",
      "OCR 스캔 일 1회",
      "AI 분석 1회 / 월",
      "개인 예산 관리",
      "기본 넛지",
    ],
    cta: "앱 다운로드",
  },
  {
    name: "Premium",
    price: { monthly: "₩3,900", yearly: "₩39,000" },
    period: { monthly: "/월", yearly: "/년" },
    description: "대부분 사용자에 충분한 한도. 혼자 또는 커플 모두.",
    features: [
      "Free 의 모든 기능",
      "OCR 스캔 일 50회",
      "AI 멀티모델 분석 월 100회",
      "프리미엄 넛지 전체",
      "실시간 파트너 공유",
      "결제 알림 자동 인식",
    ],
    cta: "프리미엄 시작",
    highlighted: true,
    badge: "가장 인기",
  },
  {
    name: "Couple Plus",
    price: { monthly: "₩4,900", yearly: "₩49,000" },
    period: { monthly: "/월 (2인)", yearly: "/년 (2인)" },
    description: "두 사람이 함께 쓰는 프리미엄. 1인당 약 ₩2,450.",
    features: [
      "Premium 의 모든 기능 × 2",
      "공동 목표 무제한",
      "커플 리포트 PDF",
      "기념일 리마인더",
      "우선 고객지원",
    ],
    cta: "커플로 시작",
  },
];

// JSON-LD 용 numeric 가격 — UI string과 동기화 책임은 여기서 시작
export const PRICING_OFFERS_KRW = [
  { name: "Free", monthly: 0, yearly: 0 },
  { name: "Premium", monthly: 3900, yearly: 39000 },
  { name: "Couple Plus", monthly: 4900, yearly: 49000 },
];
