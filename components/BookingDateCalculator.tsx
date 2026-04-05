"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Zap, Clock, ArrowDown, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Helper ───────────────────────────────────────────────────────────────────

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mmm = MONTHS[date.getMonth()];
  const yyyy = date.getFullYear();
  return `${dd} ${mmm} ${yyyy}`;
}

interface BookingDates {
  generalBooking: string;
  tatkal: string;
}

export function calculateBookingDates(journeyDateStr: string): BookingDates {
  // Parse as local date to avoid UTC-shift surprises
  const [year, month, day] = journeyDateStr.split("-").map(Number);

  const generalDate = new Date(year, month - 1, day - 60); // Journey - 60 days
  const tatkalDate = new Date(year, month - 1, day - 1);   // Journey - 1 day

  return {
    generalBooking: formatDate(generalDate),
    tatkal: formatDate(tatkalDate),
  };
}

// ─── localStorage keys ────────────────────────────────────────────────────────

const CALC_KEY = "tatkal_calc_journey_date";
const BOOKING_KEY = "tatkal_booking_autofill"; // Same key as BookingForm

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookingDateCalculator() {
  const { t } = useLanguage();
  const c = t.calc;
  const [journeyDate, setJourneyDate] = useState("");
  const [result, setResult] = useState<BookingDates | null>(null);
  const [error, setError] = useState("");

  // Restore previously saved date on revisit
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CALC_KEY);
      if (saved) {
        setJourneyDate(saved);
        setResult(calculateBookingDates(saved));
      }
    } catch {
      // localStorage unavailable — silently skip
    }
  }, []);

  // Min date = tomorrow
  const minDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  })();

  function handleCalculate() {
    if (!journeyDate) {
      setError(c.errorNoDate);
      setResult(null);
      return;
    }
    setError("");

    const dates = calculateBookingDates(journeyDate);
    setResult(dates);

    try {
      // Persist selected journey date for this calculator
      localStorage.setItem(CALC_KEY, journeyDate);

      // Auto-fill the booking form's date field
      const existing = localStorage.getItem(BOOKING_KEY);
      const parsed = existing ? JSON.parse(existing) : {};
      localStorage.setItem(BOOKING_KEY, JSON.stringify({ ...parsed, date: journeyDate }));

      // Dispatch a storage event so BookingForm re-reads if already mounted
      window.dispatchEvent(new StorageEvent("storage", { key: BOOKING_KEY }));
    } catch {
      // Silently ignore storage errors
    }
  }

  function scrollToBooking() {
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="date-calculator"
      className="py-16 px-4 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border-b border-white/10"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            {c.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {c.title}
          </h2>
          <p className="mt-2 text-blue-200/70 text-sm">
            {c.subtitle}
          </p>
        </div>

        {/* Input card */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-xl">
          <label
            htmlFor="calc-journey-date"
            className="block text-sm font-medium text-blue-100 mb-1"
          >
            {c.journeyDateLabel} <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
              <input
                id="calc-journey-date"
                type="date"
                value={journeyDate}
                min={minDate}
                onChange={(e) => {
                  setJourneyDate(e.target.value);
                  setError("");
                  setResult(null);
                }}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <button
              onClick={handleCalculate}
              className="btn-cta px-6 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap flex-shrink-0"
            >
              {c.calculateBtn}
            </button>
          </div>

          {/* Inline error */}
          {error && (
            <p className="mt-2 flex items-center gap-1.5 text-red-400 text-xs">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {error}
            </p>
          )}
        </div>

        {/* Results card */}
        {result && (
          <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <div className="bg-emerald-500/10 p-5 flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold uppercase tracking-wide">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {c.generalLabel}
                </span>
                <span className="text-white text-xl font-bold">{result.generalBooking}</span>
                <span className="text-emerald-300/60 text-xs">{c.generalSub}</span>
              </div>
              <div className="bg-blue-500/10 p-5 flex flex-col gap-1">
                <span className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold uppercase tracking-wide">
                  <Zap className="w-3.5 h-3.5" />
                  {c.tatkalLabel}
                </span>
                <span className="text-white text-xl font-bold">{result.tatkal}</span>
                <span className="text-blue-300/60 text-xs">{c.tatkalSub}</span>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-white/5 px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-semibold">10:00 AM</p>
                  <p className="text-blue-200/60 text-xs">{c.acClasses}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-semibold">11:00 AM</p>
                  <p className="text-blue-200/60 text-xs">{c.slClasses}</p>
                </div>
              </div>
            </div>

            {/* Helper tip */}
            <div className="bg-amber-500/10 border-t border-amber-400/20 px-5 py-3 flex items-start gap-2">
              <span className="text-amber-400 text-base leading-none mt-0.5">💡</span>
              <p className="text-amber-200/80 text-xs leading-relaxed">
                {c.tipPrefix} <span className="font-semibold text-amber-300">{c.tipBold}</span> {c.tipSuffix}
              </p>
            </div>

            {/* CTA */}
            <div className="bg-white/5 px-5 py-4 flex flex-col sm:flex-row items-center gap-3">
              <p className="text-blue-200/60 text-xs text-center sm:text-left flex-1">
                {c.autofilled}
              </p>
              <button
                onClick={scrollToBooking}
                className="flex items-center gap-2 btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold w-full sm:w-auto justify-center"
              >
                {c.proceedBtn}
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
