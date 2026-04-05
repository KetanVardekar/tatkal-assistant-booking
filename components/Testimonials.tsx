const reviews = [
  {
    name: "Priya Mehta",
    route: "Delhi → Patna",
    rating: 5,
    text: "Got a confirmed 2A ticket on Rajdhani Express! Was skeptical at first but they delivered perfectly. Will definitely use again.",
    avatar: "PM",
    color: "bg-blue-600",
  },
  {
    name: "Arun Kumar",
    route: "Chennai → Bangalore",
    rating: 5,
    text: "Tried booking myself for 30 mins and failed. These guys got it in the first attempt. ₹200 well spent for 2 passengers.",
    avatar: "AK",
    color: "bg-indigo-600",
  },
  {
    name: "Sunita Rao",
    route: "Mumbai → Hyderabad",
    rating: 5,
    text: "My train was cancelled and I needed last-minute Tatkal. They responded in under 5 minutes on WhatsApp. Lifesavers!",
    avatar: "SR",
    color: "bg-violet-600",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label mb-4 inline-flex">Traveller Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Trusted by Hundreds of Travellers
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Real stories from real passengers who got their Tatkal tickets booked
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <Stars count={review.rating} />
              <p className="text-gray-700 text-sm leading-relaxed mt-4 mb-5">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div
                  className={`w-9 h-9 rounded-full ${review.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.route}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto">
          <div className="text-center">
            <p className="text-4xl font-extrabold text-gray-900">4.9</p>
            <Stars count={5} />
            <p className="text-xs text-gray-400 mt-1">Overall Rating</p>
          </div>
          <div className="w-px h-12 bg-gray-100" />
          <div className="text-center">
            <p className="text-4xl font-extrabold text-gray-900">500+</p>
            <p className="text-xs text-gray-400 mt-1">Tickets Booked</p>
          </div>
          <div className="w-px h-12 bg-gray-100" />
          <div className="text-center">
            <p className="text-4xl font-extrabold text-gray-900">98%</p>
            <p className="text-xs text-gray-400 mt-1">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
