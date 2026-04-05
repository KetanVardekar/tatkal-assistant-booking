// Replace with your actual WhatsApp number (country code + number, no + or spaces)
export const WHATSAPP_NUMBER = "917977120757";

export interface BookingData {
  name: string;
  phone: string;
  from: string;
  to: string;
  date: string;
  train: string;
  passengers: string;
}

export function generateWhatsAppMessage(data: BookingData): string {
  const lines = [
    "Hello, I want Tatkal booking assistance.",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `From: ${data.from}`,
    `To: ${data.to}`,
    `Date: ${data.date}`,
    `Train: ${data.train || "Not specified"}`,
    `Passengers: ${data.passengers}`,
  ];
  return lines.join("\n");
}

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatDateForMessage(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
