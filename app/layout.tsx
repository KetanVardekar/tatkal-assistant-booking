import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tatkal Ticket Booking Assistance | Confirmed & RAC Tickets",
  description:
    "Expert Tatkal booking assistance. We book during the Tatkal window so you don't have to. Pay only if you get a Confirmed or RAC ticket.",
  keywords:
    "tatkal booking, IRCTC tatkal, railway ticket booking assistance, confirmed ticket, RAC ticket",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-[var(--font-inter)] bg-white text-gray-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
