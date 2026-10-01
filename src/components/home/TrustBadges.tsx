export function TrustBadges() {
  const badges = [
    {
      icon: "✈️",
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure checkout"
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Dedicated assistance"
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      description: "30-day return policy"
    }
  ];

  return (
    <section className="py-12 border-b border-brand-gray-50 bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4">
              <span className="text-3xl mb-3">{badge.icon}</span>
              <h3 className="font-heading font-semibold text-brand-black mb-1">{badge.title}</h3>
              <p className="text-sm font-body text-brand-gray-500">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
