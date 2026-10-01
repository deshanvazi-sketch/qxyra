'use client';

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "The quality is simply unmatched. It feels premium and looks stunning. Definitely my favorite brand now.",
      name: "Sarah Jenkins",
      rating: 5,
    },
    {
      id: 2,
      quote: "Exceptional customer service and lightning-fast delivery. The packaging itself is a work of art.",
      name: "Michael Chen",
      rating: 5,
    },
    {
      id: 3,
      quote: "I've bought from many luxury brands, but Qxyra brings a unique modern edge that I haven't found elsewhere.",
      name: "Emma Watson",
      rating: 5,
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-brand-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading text-brand-black font-bold mb-12 text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="p-8 rounded shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-brand-gray-50 bg-white flex flex-col h-full">
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-xl ${i < t.rating ? 'text-brand-gold' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <p className="text-brand-black font-body mb-6 flex-grow italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-black to-zinc-700 flex items-center justify-center text-brand-white font-heading font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-brand-black">{t.name}</h4>
                  <p className="text-sm text-brand-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
