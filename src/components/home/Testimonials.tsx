'use client';

export function Testimonials() {
  const brandPillars = [
    {
      id: 1,
      title: "Uncompromising Quality",
      description: "Every item in our collection is crafted with peerless attention to detail, using the finest materials sourced globally.",
      icon: "✨"
    },
    {
      id: 2,
      title: "Guaranteed Authenticity",
      description: "Each design undergoes strict verification to uphold the distinctive craftsmanship and aesthetic excellence of Qxyra.",
      icon: "💎"
    },
    {
      id: 3,
      title: "Dedicated Client Concierge",
      description: "Our dedicated support team is available 24/7 to ensure seamless fulfillment, tracked dispatch, and complete satisfaction.",
      icon: "🛡️"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-brand-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-semibold block mb-2">
            The Qxyra Standard
          </span>
          <h2 className="text-3xl md:text-4xl font-heading text-brand-black font-bold">
            Crafted for Distinction
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brandPillars.map((pillar) => (
            <div 
              key={pillar.id} 
              className="p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 bg-white flex flex-col justify-between hover:border-brand-gold/40 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-2xl mb-6">
                  {pillar.icon}
                </div>
                <h3 className="font-heading font-semibold text-xl text-brand-black mb-3">
                  {pillar.title}
                </h3>
                <p className="text-brand-gray-600 text-sm leading-relaxed font-body">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-brand-gold uppercase tracking-wider">
                <span>Verified Standard</span>
                <span>✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
