"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Calendar,
  Train,
  Users,
  User,
  ArrowRight,
  Loader2,
  Lock,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import {
  generateWhatsAppMessage,
  getWhatsAppUrl,
  formatDateForMessage,
  PassengerDetail,
} from "@/utils/whatsapp";

const STORAGE_KEY = "tatkal_booking_autofill";

interface FormData {
  phone: string;
  from: string;
  to: string;
  date: string;
  train: string;
  passengers: string;
  passengerDetails: PassengerDetail[];
}

type PassengerErrors = { name?: string; age?: string; gender?: string };

interface FormErrors {
  phone?: string;
  from?: string;
  to?: string;
  date?: string;
  passengers?: string;
  passengerDetails?: PassengerErrors[];
}

const emptyPassenger = (): PassengerDetail => ({ name: "", age: "", gender: "" });

const defaultForm: FormData = {
  phone: "",
  from: "",
  to: "",
  date: "",
  train: "",
  passengers: "1",
  passengerDetails: [emptyPassenger()],
};

const trustPoints = [
  "We attempt booking exactly during Tatkal window",
  "Pay only if Confirmed or RAC — never for waitlist",
  "We notify you immediately via WhatsApp",
  "Handled by experienced IRCTC users",
];

// ─── Generic field wrapper ────────────────────────────────────────────────────

function Field({
  label,
  id,
  icon: Icon,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  id: string;
  icon: React.ElementType;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {hint && <span className="ml-2 text-xs font-normal text-gray-400">{hint}</span>}
      </label>
      <div className="relative">
        <Icon
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10 transition-colors ${
            error ? "text-red-400" : "text-gray-400"
          }`}
        />
        {children}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>(defaultForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const passengerCount = parseInt(formData.passengers) || 1;
  const estimatedFee = passengerCount * 100;

  // ── localStorage helpers ──────────────────────────────────────────────────

  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      setFormData((prev) => ({
        ...prev,
        phone: parsed.phone ?? prev.phone,
        from: parsed.from ?? prev.from,
        to: parsed.to ?? prev.to,
        date: parsed.date ?? prev.date,
        passengers: parsed.passengers ?? prev.passengers,
      }));
    } catch {
      // ignore
    }
  };

  useEffect(() => { loadFromStorage(); }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) loadFromStorage();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // ── Resize passenger detail array when count changes ─────────────────────

  useEffect(() => {
    const count = parseInt(formData.passengers) || 1;
    setFormData((prev) => {
      const current = prev.passengerDetails;
      if (current.length === count) return prev;
      const updated = Array.from({ length: count }, (_, i) => current[i] ?? emptyPassenger());
      return { ...prev, passengerDetails: updated };
    });
  }, [formData.passengers]);

  // ── Change handlers ───────────────────────────────────────────────────────

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePassengerChange = (
    index: number,
    field: keyof PassengerDetail,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = prev.passengerDetails.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      );
      return { ...prev, passengerDetails: updated };
    });
    // Clear that specific passenger's field error
    setErrors((prev) => {
      const pErrors = [...(prev.passengerDetails ?? [])];
      if (pErrors[index]) pErrors[index] = { ...pErrors[index], [field]: undefined };
      return { ...prev, passengerDetails: pErrors };
    });
  };

  // ── Validation ────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const e: FormErrors = {};

    if (!formData.phone.trim()) {
      e.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      e.phone = "Enter a valid 10-digit Indian mobile number";
    }
    if (!formData.from.trim()) e.from = "Departure station is required";
    if (!formData.to.trim()) e.to = "Destination station is required";
    if (!formData.date) e.date = "Journey date is required";

    const pErrors: PassengerErrors[] = formData.passengerDetails.map((p) => {
      const pe: PassengerErrors = {};
      if (!p.name.trim()) pe.name = "Name is required";
      if (!p.age.trim()) {
        pe.age = "Age is required";
      } else if (!/^\d+$/.test(p.age) || parseInt(p.age) < 1 || parseInt(p.age) > 125) {
        pe.age = "Enter a valid age";
      }
      if (!p.gender) pe.gender = "Select gender";
      return pe;
    });

    if (pErrors.some((pe) => Object.keys(pe).length > 0)) {
      e.passengerDetails = pErrors;
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          phone: formData.phone,
          from: formData.from,
          to: formData.to,
          passengers: formData.passengers,
        })
      );
    } catch {
      // ignore
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsRedirecting(true);
      const message = generateWhatsAppMessage({
        ...formData,
        date: formatDateForMessage(formData.date),
      });
      const url = getWhatsAppUrl(message);
      setTimeout(() => {
        window.open(url, "_blank");
        setIsSubmitting(false);
        setIsRedirecting(false);
      }, 1500);
    }, 400);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
      {/* Form card */}
      <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Card header */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-base">Fill Your Booking Details</h3>
              <p className="text-white/50 text-xs mt-0.5">We&apos;ll reach out on WhatsApp within minutes</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-xs font-semibold">Available</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">

          {/* WhatsApp + From/To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="WhatsApp Number" id="phone" icon={Phone} error={errors.phone} required>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                maxLength={10}
                className={errors.phone ? "input-field-error" : "input-field"}
              />
            </Field>

            <Field label="From Station" id="from" icon={MapPin} error={errors.from} required>
              <input
                id="from"
                name="from"
                type="text"
                value={formData.from}
                onChange={handleChange}
                placeholder="New Delhi (NDLS)"
                className={errors.from ? "input-field-error" : "input-field"}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="To Station" id="to" icon={MapPin} error={errors.to} required>
              <input
                id="to"
                name="to"
                type="text"
                value={formData.to}
                onChange={handleChange}
                placeholder="Mumbai CST (CSTM)"
                className={errors.to ? "input-field-error" : "input-field"}
              />
            </Field>

            <Field label="Journey Date" id="date" icon={Calendar} error={errors.date} required>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                min={minDate}
                className={errors.date ? "input-field-error" : "input-field"}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Train Number" id="train" icon={Train} hint="(optional)">
              <input
                id="train"
                name="train"
                type="text"
                value={formData.train}
                onChange={handleChange}
                placeholder="e.g. 12301"
                className="input-field"
              />
            </Field>

            <Field label="Number of Passengers" id="passengers" icon={Users} error={errors.passengers} required>
              <select
                id="passengers"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className={errors.passengers ? "input-field-error" : "input-field"}
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={String(n)}>
                    {n} {n === 1 ? "Passenger" : "Passengers"}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Dynamic passenger detail cards */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Passenger Details <span className="text-red-500">*</span>
            </p>

            {formData.passengerDetails.map((passenger, idx) => {
              const pe = errors.passengerDetails?.[idx] ?? {};
              return (
                <div
                  key={idx}
                  className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-3"
                >
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Passenger {idx + 1}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Name */}
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(idx, "name", e.target.value)}
                        placeholder="Rahul Sharma"
                        className={pe.name ? "input-field-error" : "input-field"}
                      />
                      {pe.name && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <span>⚠</span> {pe.name}
                        </p>
                      )}
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={125}
                        value={passenger.age}
                        onChange={(e) => handlePassengerChange(idx, "age", e.target.value)}
                        placeholder="25"
                        className={pe.age ? "input-field-error" : "input-field"}
                      />
                      {pe.age && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <span>⚠</span> {pe.age}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(idx, "gender", e.target.value)}
                        className={pe.gender ? "input-field-error" : "input-field"}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {pe.gender && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <span>⚠</span> {pe.gender}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fee estimator */}
          <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
            <span className="text-xs text-blue-700 font-medium">
              Estimated service fee (if Confirmed/RAC):
            </span>
            <span className="text-sm font-bold text-blue-800">₹{estimatedFee}</span>
          </div>

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2.5 rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isRedirecting ? "Redirecting to WhatsApp..." : "Processing..."}
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" />
                  Send Booking Request on WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
              <Lock className="w-3 h-3" />
              <span>Your details are kept private and never shared</span>
            </div>
          </div>
        </form>
      </div>

      {/* Trust sidebar */}
      <div className="lg:col-span-2 space-y-4">
        {/* Why choose us */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-5 text-white">
          <h4 className="font-bold text-sm mb-4 text-white/80 uppercase tracking-widest">
            Why Choose Us
          </h4>
          <ul className="space-y-3">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80 leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing snapshot */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h4 className="font-bold text-sm text-gray-500 uppercase tracking-widest mb-4">
            Pricing at a Glance
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                Confirmed ticket
              </span>
              <span className="font-bold text-sm text-gray-900">₹100/person</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                RAC ticket
              </span>
              <span className="font-bold text-sm text-gray-900">₹100/person</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-300 rounded-full" />
                Waitlisted
              </span>
              <span className="font-bold text-sm text-emerald-600">FREE</span>
            </div>
          </div>
        </div>

        {/* Slots warning */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">⚡</span>
          <div>
            <p className="text-sm font-bold text-red-800">Only 3 slots left today</p>
            <p className="text-xs text-red-600 mt-0.5">
              Slots are limited daily. Submit your request early to secure your spot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
