"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

const PHONE = "917317782998";
const WHATSAPP_TEXT = "Hi Website Walae, I'd like to discuss a project for my business.";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

function track(eventName: string) {
  const w = window as GtagWindow;
  if (typeof w.gtag === "function") {
    w.gtag("event", eventName, { event_category: "lead", page_path: window.location.pathname });
  }
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.43-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.42-9.45 9.42zm8.03-17.45A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.7l6.1-1.6a11.33 11.33 0 0 0 5.35 1.36h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03z" />
    </svg>
  );
}

export default function QuickContact() {
  const pathname = usePathname();
  // Keep the admin dashboard and auth screens clean.
  if (pathname?.startsWith("/nomo") || pathname?.startsWith("/auth")) return null;

  const waHref = `https://wa.me/${PHONE}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] flex flex-col items-end gap-3">
      <a
        href={`tel:+${PHONE}`}
        onClick={() => track("click_call")}
        aria-label="Call Website Walae"
        className="flex sm:hidden items-center justify-center w-12 h-12 rounded-full bg-brand-surface border border-brand-border text-brand-text shadow-lg"
      >
        <Phone className="w-5 h-5" />
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("click_whatsapp")}
        aria-label="Chat with Website Walae on WhatsApp"
        className="group flex items-center gap-2 h-12 sm:h-14 pl-3 pr-3 sm:pr-5 rounded-full bg-[#25D366] text-white font-semibold shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:scale-105 transition-transform"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="hidden sm:inline text-sm">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
