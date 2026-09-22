"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function HazratganjFaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "bg-white/[0.04] border-brand-accent/30 shadow-[0_0_30px_rgba(199,255,61,0.05)]"
                : "bg-white/[0.02] border-white/5 hover:border-white/15"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="font-semibold text-white text-sm sm:text-base leading-snug pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-brand-accent shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`faq-answer-${i}`}
              className="grid transition-all duration-300 ease-in-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                  <div className="h-px bg-white/5 mb-4" />
                  <p className="text-sm text-white/65 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
