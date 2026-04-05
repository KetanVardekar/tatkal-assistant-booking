import { Train, Phone } from "lucide-react";

const links = [
  { label: "Book Now", href: "#book" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Timing", href: "#timing" },
  { label: "Pricing", href: "#pricing" },
  { label: "Policies", href: "#policies" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#060c1f] text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/8">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
            Ready to book your Tatkal ticket?
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Don&apos;t fight the IRCTC rush. Let us handle it for you.
          </p>
          <a
            href="#book"
            className="btn-cta inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold"
          >
            Book Now — Pay Only on Success
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
            {links.map((link) => (
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
          <p>© {year} TatkalAssist. Not affiliated with IRCTC or Indian Railways.</p>
          <p>Independent booking assistance service only.</p>
        </div>
      </div>
    </footer>
  );
}
