import { ClipboardList, Clock, IndianRupee } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Submit Your Request",
    description:
      "Fill in your travel details — stations, date, passengers. Your request reaches us on WhatsApp instantly.",
    accent: "text-blue-400",
    iconBg: "bg-blue-500/15 border-blue-500/20",
  },
  {
    num: "02",
    icon: Clock,
    title: "We Attempt the Booking",
    description:
      "Our team logs in precisely at 10 AM (AC) or 11 AM (SL/2S) to attempt your Tatkal booking.",
    accent: "text-amber-400",
    iconBg: "bg-amber-500/15 border-amber-500/20",
  },
  {
    num: "03",
    icon: IndianRupee,
    title: "Pay Only on Success",
    description:
      "Confirmed or RAC? Pay ₹100/passenger. Got waitlisted? We charge absolutely nothing.",
    accent: "text-emerald-400",
    iconBg: "bg-emerald-500/15 border-emerald-500/20",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4 bg-[#060c1f] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-60" />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-white/8 border border-white/10 text-white/60 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Three steps — and you never have to fight the Tatkal rush yourself
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-blue-500/30 via-amber-500/30 to-emerald-500/30" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-white/4 backdrop-blur-sm border border-white/8 rounded-2xl p-7 hover:bg-white/6 hover:border-white/12 transition-all duration-300"
              >
                {/* Step number */}
                <div className="absolute -top-3 left-6">
                  <span className={`text-xs font-extrabold tracking-widest ${step.accent} bg-[#060c1f] px-2`}>
                    STEP {step.num}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl border ${step.iconBg} flex items-center justify-center mb-5`}
                >
                  <Icon className={`w-6 h-6 ${step.accent}`} />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="#book"
            className="btn-cta inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold"
          >
            Start Your Booking
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
