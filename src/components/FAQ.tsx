"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQ_ITEMS } from "@/data/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-b border-[#111513]/10 bg-[#eef6f2] px-5 py-20 sm:px-8 sm:py-28 lg:px-10"
      aria-label="자주 묻는 질문"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:sticky lg:top-28"
        >
          <div className="mb-5 inline-flex items-center gap-2 border-y border-[#111513] py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#111513]">
            <span className="h-2 w-2 rounded-full bg-[#f06a4e]" aria-hidden />
            FAQ
          </div>
          <h2 className="max-w-lg text-4xl font-black leading-[1.03] text-[#111513] [word-break:keep-all] sm:text-6xl">
            쓰기 전에 걸리는 것들을 먼저 답합니다.
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-[#52645b] [word-break:keep-all] sm:text-lg">
            개인으로 먼저 써도 되는지, 언제 파트너를 초대하는지, 어떤 기록이 공유되는지부터
            실제로 망설이게 되는 질문만 남겼습니다.
          </p>
        </motion.div>

        <div className="border-t border-[#111513]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.04 * i,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="border-b border-[#111513]/15"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 text-left transition-colors hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:grid-cols-[4rem_1fr_auto] sm:py-7"
                >
                  <span className="num text-sm font-black text-[#f06a4e]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-black leading-snug text-[#111513] [word-break:keep-all] sm:text-2xl">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#111513]/15 bg-white/55 text-[#0f9f8f]"
                    aria-hidden
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pl-[2.5rem] pr-2 text-base leading-8 text-[#52645b] [word-break:keep-all] sm:pl-[4rem]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
