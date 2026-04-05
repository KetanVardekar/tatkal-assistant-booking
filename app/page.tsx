import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BookingForm from "@/components/BookingForm";
import HowItWorks from "@/components/HowItWorks";
import TatkalTiming from "@/components/TatkalTiming";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Policies from "@/components/Policies";
import Disclaimer from "@/components/Disclaimer";
import BookingDateCalculator from "@/components/BookingDateCalculator";
import BookingSectionHeader from "@/components/BookingSectionHeader";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileBookingCTA from "@/components/MobileBookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <Header />
      <Hero />

      {/* Tatkal Date Calculator */}
      <BookingDateCalculator />

      {/* Booking Form */}
      <section id="book" className="py-20 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <BookingSectionHeader />
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
