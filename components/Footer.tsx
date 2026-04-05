"use client";

import { Train, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  const year = new Date().getFullYear();

  const navLinks = [
    { label: t.footer.bookNow,        href: "#book" },
    { label: t.nav.howItWorks,        href: "#how-it-works" },
    { label: t.nav.timing,            href: "#timing" },
    { label: t.nav.pricing,           href: "#pricing" },
    { label: t.nav.policies,          href: "#policies" },
  ];

  return (
    <footer className="bg-[#060c1f] text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/8">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
            {f.ctaTitle}
          </h3>
          <p className="text-white/50 text-sm mb-6">{f.ctaSubtitle}</p>
          <a
            href="#book"
            className="btn-cta inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold"
          >
            {f.ctaBtn}
          </a>
        </div>
      </div>

      {/* Footer links */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <Train className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight">
              Tatkal<span className="text-amber-500">Assist</span>
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="tel:+917977120757"
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
          >
            <Phone className="w-4 h-4" />
            +91 7977120757
          </a>
        </div>

        <div className="border-t border-white/6 pt-6 text-center text-xs text-white/20 space-y-1">
          <p>{f.copyright.replace("{year}", String(year))}</p>
          <p>{f.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
