import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BookingForm from "@/components/BookingForm";
import HowItWorks from "@/components/HowItWorks";
import TatkalTiming from "@/components/TatkalTiming";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Policies from "@/components/Policies";
import Disclaimer from "@/components/Disclaimer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBookingCTA from "@/components/MobileBookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Header />
      <Hero />

      {/* Booking Form */}
      <section id="book" className="py-20 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-label mb-4 inline-flex">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Limited Slots Available Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Submit Your Booking Request
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Fill in your travel details and we&apos;ll attempt your Tatkal booking during the exact window
            </p>
          </div>
          <BookingForm />
        </div>
      </section>

      <HowItWorks />
      <TatkalTiming />
      <Testimonials />
      <Pricing />
      <Policies />
      <Disclaimer />
      <Footer />

      <FloatingWhatsApp />
      <MobileBookingCTA />
    </main>
  );
}
