import { CheckCircle2, XCircle, Zap } from "lucide-react";

const tiers = [
  {
    status: "Confirmed Ticket",
    dot: "bg-emerald-500",
    fee: "₹100",
    suffix: "/ passenger",
    included: true,
  },
  {
    status: "RAC Ticket",
    dot: "bg-amber-500",
    fee: "₹100",
    suffix: "/ passenger",
    included: true,
  },
  {
    status: "Waitlisted Ticket",
    dot: "bg-gray-300",
    fee: "FREE",
    suffix: "",
    included: false,
  },
];

const examples = [
  { pax: 1, fee: "₹100" },
  { pax: 2, fee: "₹200" },
  { pax: 3, fee: "₹300" },
  { pax: 4, fee: "₹400" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label mb-4 inline-flex">Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            100% Transparent. No Surprises.
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            You pay only when we deliver results. Waitlisted? We charge nothing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Main pricing card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-7 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                  Service Fee
                </span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-extrabold">₹100</span>
                <span className="text-white/50 text-lg mb-1">/passenger</span>
              </div>
              <p className="text-white/40 text-sm mt-2">Minimum ₹50 per booking</p>
            </div>

            {/* Tiers */}
            <div className="p-6 space-y-3">
              {tiers.map((tier) => (
                <div
                  key={tier.status}
                  className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    {tier.included ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-200 flex-shrink-0" />
                    )}
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${tier.dot}`} />
                      <span
                        className={`text-sm font-medium ${tier.included ? "text-gray-800" : "text-gray-400"}`}
                      >
                        {tier.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-bold text-sm ${tier.included ? "text-gray-900" : "text-emerald-600"}`}
                    >
                      {tier.fee}
                    </span>
                    {tier.suffix && (
                      <span className="text-xs text-gray-400">{tier.suffix}</span>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                <p className="text-sm text-emerald-800 font-semibold">
                  🎉 Got waitlisted? You pay ₹0 — guaranteed.
                </p>
              </div>
            </div>
          </div>

          {/* Fee calculator */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h4 className="font-bold text-gray-900 mb-4">Fee Calculator</h4>
              <div className="grid grid-cols-2 gap-3">
                {examples.map((ex) => (
                  <div
                    key={ex.pax}
                    className="bg-slate-50 rounded-xl p-4 text-center border border-gray-100"
                  >
                    <p className="text-xs text-gray-400 mb-1 font-medium">
                      {ex.pax} {ex.pax === 1 ? "Passenger" : "Passengers"}
                    </p>
                    <p className="text-2xl font-extrabold text-blue-700">{ex.fee}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-700 rounded-2xl p-6 text-white text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h4 className="font-bold text-lg mb-2">Our Guarantee</h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                We are{" "}
                <strong className="text-white">100% transparent</strong> about
                our fees. If your ticket is waitlisted, we will never charge you a
                single rupee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
