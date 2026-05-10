"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Money from "@/components/Money";
import { type Period, PRICING_TIERS } from "@/data/pricing";
import { trackEvent } from "@/lib/analytics";

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
  "무료로 시작하고, AI 분석이 더 필요할 때만 업그레이드",
  "구독 없이 크레딧만 따로 충전 가능",
  "현재 Android 결제 기준, iOS는 준비 중",
];

export default function Pricing() {
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <section
      id="pricing"
      className="relative border-b border-[#111513]/10 bg-[#f8fbf8] px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
      aria-label="가격"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border-y border-[#111513] py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#111513]">
              <span className="h-2 w-2 rounded-full bg-[#f06a4e]" aria-hidden />
              Pricing
            </div>
            <h2 className="max-w-2xl text-4xl font-black leading-[1.03] text-[#111513] [word-break:keep-all] sm:text-6xl">
              필요한 만큼만 쓰고, 필요해질 때 바꿉니다.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="text-base leading-8 text-[#52645b] [word-break:keep-all] sm:text-lg">
              커플·부부 돈 관리는 처음부터 큰 구독을 고르는 일이 아닙니다.
              기본 기능으로 시작하고, AI 분석과 OCR 한도가 더 필요할 때만 넓히면 됩니다.
            </p>
            <div className="mt-6 grid gap-px overflow-hidden border-y border-[#111513]/14 bg-[#111513]/14 sm:grid-cols-3">
              {pricingNotes.map((note) => (
                <div
                  key={note}
                  className="bg-[#f8fbf8]/95 px-4 py-3 text-sm font-bold leading-6 text-[#33423b] [word-break:keep-all]"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-12 flex flex-wrap items-center gap-2 border-y border-[#111513]/15 py-3"
        >
          <button
            type="button"
            onClick={() => setPeriod("monthly")}
            aria-pressed={period === "monthly"}
            className={cx(
              "inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              period === "monthly"
                ? "bg-[#111513] text-white"
                : "border border-[#111513]/14 bg-white/55 text-[#52645b] hover:text-[#111513]",
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
              "inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              period === "yearly"
                ? "bg-[#111513] text-white"
                : "border border-[#111513]/14 bg-white/55 text-[#52645b] hover:text-[#111513]",
            )}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            연간 <span className="text-xs opacity-80 ml-1">25% 할인</span>
          </button>
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
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
              className={cx(
                "relative flex min-h-full flex-col rounded-[8px] border p-5 sm:p-6",
                tier.highlighted
                  ? "border-[#111513] bg-[#111513] text-white shadow-[0_34px_100px_rgba(17,21,19,0.18)]"
                  : "border-[#111513]/12 bg-white/68 text-[#111513]",
              )}
            >
              {tier.badge && (
                <div className="mb-4 inline-flex w-fit rounded-full bg-[#dff8f3] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[#0f9f8f]">
                  {tier.badge}
                </div>
              )}

              <div className="border-y border-current/15 py-5">
                <h3
                  className={cx(
                    "text-xs font-black uppercase tracking-[0.18em]",
                    tier.highlighted ? "text-white/70" : "text-[#52645b]",
                  )}
                >
                  {tier.name}
                </h3>
                <div className="mt-4 flex flex-wrap items-baseline gap-2">
                  <motion.span
                    key={period}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    className="text-4xl font-black tracking-normal sm:text-5xl"
                  >
                    <Money value={tier.price[period]} />
                  </motion.span>
                  <motion.span
                    key={`period-${period}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className={cx("text-sm", tier.highlighted ? "text-white/62" : "text-[#607169]")}
                  >
                    {tier.period[period]}
                  </motion.span>
                </div>
                <p
                  className={cx(
                    "mt-4 text-sm leading-7 [word-break:keep-all]",
                    tier.highlighted ? "text-white/74" : "text-[#52645b]",
                  )}
                >
                  {tier.description}
                </p>
              </div>

              <ul className="flex-1 space-y-3 py-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check />
                    <span
                      className={cx(
                        "leading-6 [word-break:keep-all]",
                        tier.highlighted ? "text-white/80" : "text-[#33423b]",
                      )}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#final-cta"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "pricing",
                    label: tier.name,
                    period,
                  })
                }
                className={cx(
                  "inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-black transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2",
                  tier.highlighted
                    ? "bg-[#0f9f8f] text-white focus-visible:ring-offset-[#111513]"
                    : "border border-[#111513]/18 bg-white/70 text-[#111513] hover:border-[#0f9f8f] hover:text-[#0f9f8f] focus-visible:ring-offset-bg",
                )}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-sm leading-6 text-[#607169] [word-break:keep-all]">
          모든 가격은 부가세 포함. 현재 Android 결제 기준이며, iOS 는 준비 중입니다.
        </p>
      </div>
    </section>
  );
}
