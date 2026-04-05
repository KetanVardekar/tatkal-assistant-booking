"use client";

import { useState, useEffect } from "react";
import { Train, Menu, X, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lang } from "@/locales/translations";

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिं" },
  { code: "mr", label: "मरा" },
  { code: "gu", label: "ગુ" },
];

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: t.nav.howItWorks, href: "#how-it-works" },
    { label: t.nav.timing, href: "#timing" },
    { label: t.nav.pricing, href: "#pricing" },
    { label: t.nav.policies, href: "#policies" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClass = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
    : "bg-transparent";
  const navTextClass = scrolled ? "text-gray-500 hover:text-gray-900" : "text-white/80 hover:text-white";
  const logoTextClass = scrolled ? "text-gray-900" : "text-white";
  const mobileButtonClass = scrolled ? "hover:bg-gray-100 text-gray-700" : "hover:bg-white/10 text-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-sm">
            <Train className="w-4 h-4 text-white" />
          </div>
          <span className={`font-extrabold text-lg tracking-tight transition-colors ${logoTextClass}`}>
            Tatkal<span className="text-amber-500">Assist</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${navTextClass}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop right: lang switcher + phone + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <div className={`flex items-center rounded-lg overflow-hidden border ${scrolled ? "border-gray-200" : "border-white/20"}`}>
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => setLang(opt.code)}
                className={`px-2.5 py-1 text-xs font-semibold transition-colors ${
                  lang === opt.code
                    ? "bg-blue-600 text-white"
                    : scrolled
                    ? "text-gray-500 hover:bg-gray-100"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <a
            href="tel:+917977120757"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${navTextClass}`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="flex flex-col leading-tight">
              <span className="text-xs opacity-70">Call Ketan</span>
              <span>+91 7977120757</span>
            </span>
          </a>
          <a href="#book" className="btn-cta px-5 py-2 text-sm rounded-xl">
            {t.nav.bookNow}
          </a>
        </div>

        {/* Mobile: lang switcher + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <div className={`flex items-center rounded-lg overflow-hidden border ${scrolled ? "border-gray-200" : "border-white/20"}`}>
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => setLang(opt.code)}
                className={`px-2 py-1 text-xs font-semibold transition-colors ${
                  lang === opt.code
                    ? "bg-blue-600 text-white"
                    : scrolled
                    ? "text-gray-500 hover:bg-gray-100"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            className={`p-2 rounded-lg transition-colors ${mobileButtonClass}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2.5 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
              <a
                href="tel:+917977120757"
                className="flex items-center gap-2 py-2.5 px-3 text-gray-600 text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>
                  <span className="block text-xs text-gray-400">Call Ketan</span>
                  +91 7977120757
                </span>
              </a>
              <a
                href="#book"
                onClick={() => setIsOpen(false)}
                className="btn-cta block py-3 px-4 text-sm text-center w-full rounded-xl"
              >
                {t.nav.bookNow}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
