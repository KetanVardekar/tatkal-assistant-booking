"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function BookingSectionHeader() {
  const { t } = useLanguage();
  const b = t.bookSection;

  return (
    <div className="text-center mb-10">
      <span className="section-label mb-4 inline-flex">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        {b.badge}
      </span>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
        {b.title}
      </h2>
      <p className="text-gray-500 max-w-lg mx-auto">{b.subtitle}</p>
    </div>
  );
}
