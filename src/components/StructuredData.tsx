import { FAQ_ITEMS } from "@/data/faq";
import { PRICING_OFFERS_KRW } from "@/data/pricing";
import { PLAY_STORE_URL } from "@/lib/links";

const SITE_URL = "https://weeple.app";
const SHARE_IMAGE_URL = `${SITE_URL}/opengraph-image-20260510-kakao-mobile.jpg`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "weeple",
  url: SITE_URL,
  logo: SHARE_IMAGE_URL,
  description: "개인으로 시작해 커플 공동 예산까지 이어지는 가계부 + AI 분석 앱",
  sameAs: [
    "https://github.com/slimex200-wq/",
    "https://www.threads.net/@hype.boyo",
    PLAY_STORE_URL,
  ],
};

const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "weeple",
  applicationCategory: "FinanceApplication",
  applicationSubCategory: "Couple budget app",
  operatingSystem: "Android",
  url: PLAY_STORE_URL,
  downloadUrl: PLAY_STORE_URL,
  installUrl: PLAY_STORE_URL,
  identifier: "com.weeple.app",
  description:
    "개인 가계부로 먼저 시작하고, 필요할 때 파트너를 초대해 커플 공동 예산까지 이어지는 가계부 앱입니다. 자연어 빠른 입력, 영수증 OCR, Android 알림 확인 후 저장, AI 분석을 한 앱에서 사용할 수 있습니다.",
  image: SHARE_IMAGE_URL,
  keywords:
    "개인 가계부 앱, 커플 가계부 앱, 공유 가계부 앱, 부부 가계부 앱, AI 가계부 앱, 안드로이드 가계부 앱",
  audience: {
    "@type": "Audience",
    audienceType: "커플, 부부, 동거 가구, 개인 가계부 사용자",
  },
  featureList: [
    "공동 지출과 개인 지출 분리",
    "개인 가계부로 시작 후 파트너 초대",
    "파트너와 함께 보는 공동 예산",
    "자연어 빠른 입력",
    "영수증 OCR",
    "Android 결제 알림 확인 후 저장",
    "AI 월간 지출 분석",
  ],
  offers: PRICING_OFFERS_KRW.map((t) => ({
    "@type": "Offer",
    name: t.name,
    price: t.price,
    priceCurrency: "KRW",
    category: t.category,
  })),
};

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(softwareApplication),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPage) }}
      />
    </>
  );
}
