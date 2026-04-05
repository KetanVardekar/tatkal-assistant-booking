// Replace with your actual WhatsApp number (country code + number, no + or spaces)
export const WHATSAPP_NUMBER = "917977120757";

export interface PassengerDetail {
  name: string;
  age: string;
  gender: string;
}

export interface BookingData {
  phone: string;
  from: string;
  to: string;
  date: string;
  train: string;
  passengers: string;
  passengerDetails: PassengerDetail[];
}

export function generateWhatsAppMessage(data: BookingData): string {
  const passengerLines = data.passengerDetails.map(
    (p, i) =>
      `  Passenger ${i + 1}: ${p.name}, Age ${p.age}, ${p.gender}`
  );

  const lines = [
    "Hello, I want Tatkal booking assistance.",
    "",
    `Phone: ${data.phone}`,
    `From: ${data.from}`,
    `To: ${data.to}`,
    `Date: ${data.date}`,
    `Train: ${data.train || "Not specified"}`,
    `Passengers: ${data.passengers}`,
    "",
    "Passenger Details:",
    ...passengerLines,
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
