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
    price: { monthly: "₩3,900", yearly: "₩35,000" },
    period: { monthly: "/월", yearly: "/년" },
    description: "대부분 사용자에 충분한 한도. 혼자 또는 커플 모두.",
    features: [
      "Free 의 모든 기능",
      "OCR 스캔 일 50회",
      "AI 멀티모델 분석 월 100회",
      "프리미엄 넛지 전체",
      "실시간 파트너 공유",
      "Android 결제 알림 확인 후 저장",
    ],
    cta: "프리미엄 시작",
    highlighted: true,
    badge: "가장 인기",
  },
  {
    name: "Credits",
    price: { monthly: "₩1,900부터", yearly: "₩1,900부터" },
    period: { monthly: "필요할 때", yearly: "필요할 때" },
    description: "구독 없이 AI 분석만 더 쓰고 싶을 때 충전합니다.",
    features: [
      "10 크레딧 ₩1,900",
      "30 크레딧 ₩4,900",
      "100 크레딧 ₩12,900",
      "AI 분석 추가 사용",
      "구독과 별도 충전",
    ],
    cta: "크레딧 충전",
  },
];

export const PRICING_OFFERS_KRW = [
  { name: "Free", price: 0, category: "free" },
  { name: "Premium Monthly", price: 3900, category: "subscription" },
  { name: "Premium Yearly", price: 35000, category: "subscription" },
  { name: "10 Credits", price: 1900, category: "one-time" },
  { name: "30 Credits", price: 4900, category: "one-time" },
  { name: "100 Credits", price: 12900, category: "one-time" },
];
