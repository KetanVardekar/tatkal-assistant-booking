"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function MobileBookingCTA() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
      <a
        href="#book"
        className="btn-cta flex items-center justify-center gap-2 py-3.5 text-sm font-bold w-full rounded-xl"
      >
        <span>⚡</span>
        {t.mobileCta.text}
      </a>
    </div>
  );
}
