"use client";

import { useState } from "react";
import { motion } from "motion/react";
import TiltCard from "@/components/TiltCard";
import Money from "@/components/Money";
import { type Period, PRICING_TIERS } from "@/data/pricing";
import { trackEvent } from "@/lib/analytics";
import { PLAY_STORE_URL } from "@/lib/links";

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-mint shrink-0"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const pricingNotes = [
  "무료로 시작",
  "Premium 연 ₩35,000",
  "크레딧은 1회 충전",
];

export default function Pricing() {
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-b border-[#111513]/10 bg-[#f8fbf8] px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
      style={{ perspective: "1200px" }}
      aria-label="가격"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(15,159,143,0.12),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(240,106,78,0.09),transparent_30%)]"
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-mint">
            Pricing
          </div>
          <h2 className="text-4xl font-black leading-[1.05] text-[#111513] [word-break:keep-all] sm:text-6xl">
            필요한 만큼만 쓰고,
            <br />
            필요해질 때 바꿉니다.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#52645b] [word-break:keep-all] sm:text-lg">
            커플·부부 돈 관리는 처음부터 큰 구독을 고르는 일이 아닙니다. 기본 기능으로 시작하고,
            AI 분석과 OCR 한도가 더 필요할 때만 넓히면 됩니다.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {pricingNotes.map((note) => (
              <span
                key={note}
                className="rounded-full border border-[#111513]/10 bg-white/72 px-3 py-1.5 text-xs font-bold text-[#33423b] shadow-[0_10px_24px_rgba(17,21,19,0.05)]"
              >
                {note}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-10 flex items-center justify-center gap-3 sm:mb-16"
        >
          <button
            type="button"
            onClick={() => setPeriod("monthly")}
            aria-pressed={period === "monthly"}
            className={cx(
              "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              period === "monthly"
                ? "bg-mint text-white shadow-[0_8px_24px_-8px_rgba(14,165,160,0.5)]"
                : "glass border border-border-app text-fg-muted hover:text-fg",
            )}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            월간
          </button>
          <button
            type="button"
            onClick={() => setPeriod("yearly")}
            aria-pressed={period === "yearly"}
            className={cx(
              "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              period === "yearly"
                ? "bg-mint text-white shadow-[0_8px_24px_-8px_rgba(14,165,160,0.5)]"
                : "glass border border-border-app text-fg-muted hover:text-fg",
            )}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            연간 <span className="ml-1 text-xs opacity-80">25% 할인</span>
          </button>
        </motion.div>

        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_TIERS.map((tier, i) => {
            const isCredits = tier.name === "Credits";

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transform: tier.highlighted ? "translateZ(40px) scale(1.04)" : "translateZ(0)",
                  zIndex: tier.highlighted ? 10 : 1,
                }}
              >
                <TiltCard
                  className={cx(
                    "relative flex h-full flex-col rounded-3xl p-6 sm:p-8",
                    tier.highlighted
                      ? "border border-mint/40 bg-gradient-to-b from-mint-bg to-bg-surface shadow-[0_60px_120px_-30px_rgba(14,165,160,0.5)]"
                      : "glass border border-border-app transition-colors duration-300 hover:border-mint/30",
                  )}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mint px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_8px_20px_-4px_rgba(14,165,160,0.6)]">
                      {tier.badge}
                    </div>
                  )}

                  {isCredits && (
                    <div className="mb-4 w-fit rounded-full bg-[#fff7ed] px-3 py-1 text-[11px] font-bold text-[#c05621]">
                      구독과 무관한 1회 충전
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-fg-muted">
                      {tier.name}
                    </h3>
                    <div className="mb-3 flex flex-wrap items-baseline gap-2">
                      <motion.span
                        key={period}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                        className="text-4xl font-extrabold tracking-normal text-fg sm:text-5xl"
                      >
                        <Money value={tier.price[period]} />
                      </motion.span>
                      <motion.span
                        key={`period-${period}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="text-sm text-fg-muted"
                      >
                        {tier.period[period]}
                      </motion.span>
                    </div>
                    <p className="text-sm leading-7 text-fg-secondary [word-break:keep-all]">
                      {tier.description}
                    </p>
                  </div>

                  <ul className="mb-8 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check />
                        <span className="leading-6 text-fg-secondary [word-break:keep-all]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("cta_click", {
                        location: "pricing",
                        label: tier.name,
                        period,
                      })
                    }
                    className={cx(
                      "inline-flex h-12 items-center justify-center rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                      tier.highlighted
                        ? "bg-mint text-white hover:scale-[1.02] hover:shadow-[0_12px_30px_-6px_rgba(14,165,160,0.6)]"
                        : "border border-mint/40 bg-mint-bg text-mint hover:border-mint hover:bg-mint-bg-strong",
                    )}
                  >
                    {tier.cta}
                  </a>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-xs leading-6 text-fg-muted [word-break:keep-all]">
          모든 가격은 부가세 포함. 현재 Android 결제 기준이며, iOS 는 준비 중입니다.
        </p>
      </div>
    </section>
  );
}
