import { FAQ_ITEMS } from "@/data/faq";
import { PRICING_OFFERS_KRW } from "@/data/pricing";

const SITE_URL = "https://weeple.app";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "weeple",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
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
  operatingSystem: "Android",
  url: SITE_URL,
  description:
    "개인부터 커플 공동 예산까지. 자연어 빠른 입력, 영수증 OCR, 실시간 공유, AI 분석이 한 앱에.",
  image: `${SITE_URL}/og-image.png`,
  offers: PRICING_OFFERS_KRW.map((t) => ({
    "@type": "Offer",
    name: t.name,
    price: t.price,
    priceCurrency: "KRW",
    category: t.category,
  })),
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplication),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
