"use client";

import { ArrowRight, Shield, Zap, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const stats = [
    { value: "500+", label: t.hero.statBookings },
    { value: "98%", label: t.hero.statSuccess },
    { value: "4.9★", label: t.hero.statRating },
  ];

  const trustBadges = [
    { icon: Shield, text: t.hero.trustPay },
    { icon: Zap, text: t.hero.trustTiming },
    { icon: Star, text: t.hero.trustRating },
  ];

  const badge = t.hero.badge.replace("{n}", "3");

  return (
    <section className="relative bg-[#060c1f] text-white overflow-hidden pt-36 pb-24 px-4">
      <div className="absolute inset-0 bg-dot-pattern" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-[#060c1f] to-indigo-950/60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-700/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-indigo-700/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Live status */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 text-sm shimmer">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-white/90 font-medium">{badge}</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-[1.1] tracking-tight mb-6 text-balance">
          {t.hero.headline1}
          <br />
          <span className="gradient-text">{t.hero.headline2}</span>
        </h1>

        {/* Subtext — uses simple marker tokens <b> and <amber> */}
        <HeroSubtext raw={t.hero.subtext} />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#book"
            className="btn-cta inline-flex items-center justify-center gap-2.5 px-8 py-4 text-lg rounded-xl hover:-translate-y-0.5 transition-transform"
          >
            {t.hero.bookCta}
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/14 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all border border-white/12 hover:border-white/20"
          >
            {t.hero.howItWorksCta}
          </a>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-1 mb-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex items-center gap-4 px-6 py-3 ${i < stats.length - 1 ? "border-r border-white/10" : ""}`}
            >
              <div className="text-center">
                <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {trustBadges.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-2 text-sm text-white/70"
            >
              <Icon className="w-3.5 h-3.5 text-amber-400" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Renders hero subtext with <b>...</b> and <amber>...</amber> token support
function HeroSubtext({ raw }: { raw: string }) {
  // Split on our custom tokens and render styled spans
  const parts = raw.split(/(<b>.*?<\/b>|<amber>.*?<\/amber>)/g);
  return (
    <p className="text-center text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith("<b>"))
          return <span key={i} className="text-white font-semibold">{part.slice(3, -4)}</span>;
        if (part.startsWith("<amber>"))
          return <span key={i} className="text-amber-400 font-semibold">{part.slice(7, -8)}</span>;
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}
