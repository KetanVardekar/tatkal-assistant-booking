import { ArrowRight, Shield, Zap, Star } from "lucide-react";

const stats = [
  { value: "500+", label: "Bookings Done" },
  { value: "98%", label: "Success Rate" },
  { value: "4.9★", label: "User Rating" },
];

const trustBadges = [
  { icon: Shield, text: "Pay only on success" },
  { icon: Zap, text: "Expert Tatkal timing" },
  { icon: Star, text: "4.9★ rated service" },
];

export default function Hero() {
  return (
    <section className="relative bg-[#060c1f] text-white overflow-hidden pt-36 pb-24 px-4">
      {/* Rich layered background */}
      <div className="absolute inset-0 bg-dot-pattern" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-[#060c1f] to-indigo-950/60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-700/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-indigo-700/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Live status */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 text-sm shimmer">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-white/90 font-medium">
              Accepting bookings · Only{" "}
              <span className="text-amber-400 font-bold">3 slots</span> remaining today
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center leading-[1.1] tracking-tight mb-6 text-balance">
          Skip the IRCTC Rush.
          <br />
          <span className="gradient-text">Get Your Tatkal Ticket Booked.</span>
        </h1>

        <p className="text-center text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          We book during the{" "}
          <span className="text-white font-semibold">Tatkal window</span> so you don&apos;t
          have to. Confirmed or RAC?{" "}
          <span className="text-amber-400 font-semibold">You pay. Waitlisted? Completely free.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#book"
            className="btn-cta inline-flex items-center justify-center gap-2.5 px-8 py-4 text-lg rounded-xl hover:-translate-y-0.5 transition-transform"
          >
            Book My Ticket
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/14 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all border border-white/12 hover:border-white/20"
          >
            See How It Works
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
