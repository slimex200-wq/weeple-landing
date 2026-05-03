"use client";

/**
 * Pricing — weeple 3단 가격 구조.
 *
 * 21st 패턴: 3D tilt 카드 + 추천 카드 translateZ 로 앞으로 튀어나옴.
 * 월/연간 토글 — period 변경 시 price motion.span re-mount 애니메이션.
 * 연간 = 월간 × 10 (2개월 무료, 17% 할인).
 */

import { useState } from "react";
import { motion } from "motion/react";
import TiltCard from "@/components/TiltCard";
import Money from "@/components/Money";
import { type Period, type Tier, PRICING_TIERS } from "@/data/pricing";

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

export default function Pricing() {
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <section
      id="pricing"
      className="relative py-20 sm:py-32 px-6"
      style={{ perspective: "1200px" }}
      aria-label="가격"
    >
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="text-xs font-semibold tracking-wider text-mint uppercase mb-4">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-5">
            필요한 만큼만,
            <br />
            <span className="text-fg-muted">단순하게.</span>
          </h2>
          <p className="text-base sm:text-lg text-fg-secondary leading-relaxed">
            언제든 업그레이드, 언제든 해지. 숨은 비용 없음.
          </p>
        </motion.div>

        {/* 빌링 주기 토글 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex items-center justify-center gap-3 mb-10 sm:mb-16"
        >
          <button
            type="button"
            onClick={() => setPeriod("monthly")}
            aria-pressed={period === "monthly"}
            className={cx(
              "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              period === "monthly"
                ? "bg-mint text-white shadow-[0_8px_24px_-8px_rgba(14,165,160,0.5)]"
                : "glass text-fg-muted border border-border-app hover:text-fg",
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
              "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              period === "yearly"
                ? "bg-mint text-white shadow-[0_8px_24px_-8px_rgba(14,165,160,0.5)]"
                : "glass text-fg-muted border border-border-app hover:text-fg",
            )}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            연간 <span className="text-xs opacity-80 ml-1">17% 할인</span>
          </button>
        </motion.div>

        {/* 카드 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {PRICING_TIERS.map((tier, i) => (
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
                transform: tier.highlighted
                  ? "translateZ(40px) scale(1.04)"
                  : "translateZ(0)",
                zIndex: tier.highlighted ? 10 : 1,
              }}
            >
              <TiltCard
                className={`relative flex flex-col h-full rounded-3xl p-6 sm:p-8 ${
                  tier.highlighted
                    ? "bg-gradient-to-b from-mint-bg to-bg-surface border border-mint/40 shadow-[0_60px_120px_-30px_rgba(14,165,160,0.5)]"
                    : "glass border border-border-app hover:border-mint/30 transition-colors duration-300"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-mint text-white text-[11px] font-bold tracking-wide uppercase shadow-[0_8px_20px_-4px_rgba(14,165,160,0.6)]">
                    {tier.badge}
                  </div>
                )}

                {/* 이름 + 가격 */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-3">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                    <motion.span
                      key={period}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                      className="text-4xl sm:text-5xl font-extrabold tracking-tight text-fg"
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
                  <p className="text-sm text-fg-secondary leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* 기능 */}
                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check />
                      <span className="text-fg-secondary leading-relaxed">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#"
                  className={`inline-flex items-center justify-center h-12 rounded-full text-sm font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                    tier.highlighted
                      ? "bg-mint text-white hover:scale-[1.02] hover:shadow-[0_12px_30px_-6px_rgba(14,165,160,0.6)]"
                      : "border border-mint/40 text-mint bg-mint-bg hover:bg-mint-bg-strong hover:border-mint"
                  }`}
                >
                  {tier.cta}
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-fg-muted">
          모든 가격은 부가세 포함. 현재 Android 결제 기준이며, iOS 는 준비 중입니다.
        </p>
      </div>
    </section>
  );
}
