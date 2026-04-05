import { Info } from "lucide-react";

const points = [
  <>
    We are{" "}
    <strong className="text-gray-700 font-semibold">not affiliated with IRCTC</strong> or
    Indian Railways. We are an independent booking assistance service.
  </>,
  <>
    Ticket confirmation depends entirely on{" "}
    <strong className="text-gray-700 font-semibold">seat availability during the Tatkal window</strong>.
    We cannot guarantee availability.
  </>,
  <>
    We do not store or share your payment information. All charges are paid
    directly after successful booking.
  </>,
];

export default function Disclaimer() {
  return (
    <section className="py-10 px-4 bg-slate-50 border-t border-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Info className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-3">Disclaimer</h3>
            <ul className="space-y-2.5">
              {points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-500 leading-relaxed"
                >
                  <span className="text-gray-300 mt-1 flex-shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
