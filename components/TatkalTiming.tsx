"use client";

import { Clock, AlertCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TatkalTiming() {
  const { t } = useLanguage();
  const ti = t.timing;

  const timings = [
    {
      emoji: "🏆",
      label: ti.acLabel,
      detail: "1A · 2A · 3A · CC · 3E",
      time: "10:00 AM",
      border: "border-blue-200",
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      timeColor: "text-blue-900",
      labelColor: "text-blue-700",
      badge: "bg-blue-100 text-blue-700 border border-blue-200",
      clockColor: "text-blue-600",
    },
    {
      emoji: "🚂",
      label: ti.slLabel,
      detail: "SL · 2S",
      time: "11:00 AM",
      border: "border-amber-200",
      bg: "bg-gradient-to-br from-amber-50 to-orange-50",
      timeColor: "text-amber-900",
      labelColor: "text-amber-700",
      badge: "bg-amber-100 text-amber-700 border border-amber-200",
      clockColor: "text-amber-600",
    },
  ];

  return (
    <section id="timing" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label mb-4 inline-flex">{ti.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            {ti.title}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">{ti.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {timings.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl border-2 ${item.border} ${item.bg} p-7 relative overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-4xl">{item.emoji}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.badge}`}>
                  {ti.window}
                </span>
              </div>
              <p className={`font-bold text-base mb-0.5 ${item.labelColor}`}>{item.label}</p>
              <p className="text-xs text-gray-400 mb-4">{item.detail}</p>
              <div className="flex items-center gap-2.5">
                <Clock className={`w-5 h-5 ${item.clockColor}`} />
                <span className={`text-4xl font-extrabold tracking-tight ${item.timeColor}`}>
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-900 mb-1">{ti.alertTitle}</p>
            <p className="text-sm text-amber-700">
              {ti.alertDesc.split(ti.alertStrong)[0]}
              <strong>{ti.alertStrong}</strong>
              {ti.alertDesc.split(ti.alertStrong)[1]}
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="#book"
            className="inline-flex items-center gap-2 text-blue-700 font-semibold text-sm hover:text-blue-900 transition-colors"
          >
            {ti.cta}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
