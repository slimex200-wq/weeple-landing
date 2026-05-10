import { FAQ_ITEMS } from "@/data/faq";
import { PRICING_OFFERS_KRW } from "@/data/pricing";

const SITE_URL = "https://weeple.app";
const SHARE_IMAGE_URL = `${SITE_URL}/opengraph-image-20260510.png`;

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "weeple",
  url: SITE_URL,
  logo: SHARE_IMAGE_URL,
  description: "커플과 개인을 위한 가계부 + AI 분석 앱",
  sameAs: [
    "https://github.com/slimex200-wq/",
    "https://www.threads.net/@hype.boyo",
  ],
};

const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "weeple",
  applicationCategory: "FinanceApplication",
  applicationSubCategory: "Couple budget app",
  operatingSystem: "Android",
  url: SITE_URL,
  description:
    "개인부터 커플 공동 예산까지. 자연어 빠른 입력, 영수증 OCR, 실시간 공유, AI 분석이 한 앱에.",
  image: SHARE_IMAGE_URL,
  keywords:
    "커플 가계부 앱, 공유 가계부 앱, 부부 가계부 앱, AI 가계부 앱, 안드로이드 가계부 앱",
  audience: {
    "@type": "Audience",
    audienceType: "커플, 부부, 동거 가구, 개인 가계부 사용자",
  },
  featureList: [
    "공동 지출과 개인 지출 분리",
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
