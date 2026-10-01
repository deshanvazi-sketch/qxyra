import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Qxyra',
  description: 'Learn about Qxyra, a premium e-commerce brand delivering world-class products.',
};

export default function AboutPage() {
  return (
    <div className="bg-white pb-20">
      {/* Hero Section */}
      <section className="relative bg-brand-black text-white py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-brand-gold">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-body leading-relaxed">
            Qxyra was born out of a desire to create a premium e-commerce experience. 
            We curate world-class products for modern lifestyles, combining exceptional 
            quality with an unparalleled customer journey. Discover. Desire. Deliver.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="bg-brand-gray-50 p-10 rounded-2xl">
          <h2 className="text-3xl font-heading font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 font-body leading-relaxed">
            To provide discerning customers with access to meticulously crafted products 
            that elevate their everyday lives, backed by a seamless and luxurious shopping experience.
          </p>
        </div>
        <div className="bg-brand-gray-50 p-10 rounded-2xl">
          <h2 className="text-3xl font-heading font-bold mb-4">Our Vision</h2>
          <p className="text-gray-700 font-body leading-relaxed">
            To become the global standard for premium lifestyle e-commerce, recognized 
            for uncompromising quality, innovative design, and community trust.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-brand-black text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-16 text-brand-gold">Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Quality', desc: 'Uncompromising standards in every product we offer.' },
              { title: 'Innovation', desc: 'Continuously pushing boundaries in design and utility.' },
              { title: 'Trust', desc: 'Building lasting relationships through transparency.' },
              { title: 'Community', desc: 'Fostering a global network of lifestyle enthusiasts.' },
            ].map((value, i) => (
              <div key={i} className="text-center p-6 border border-gray-800 rounded-xl hover:border-brand-gold transition-colors">
                <h3 className="text-xl font-bold mb-3 text-brand-gold">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-heading font-bold mb-16">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { name: 'Alex Sterling', role: 'Founder & CEO' },
            { name: 'Jordan Hayes', role: 'Head of Design' },
            { name: 'Taylor Reed', role: 'Chief Operations Officer' },
          ].map((member, i) => (
            <div key={i} className="group">
              <div className="w-48 h-48 mx-auto rounded-full mb-6 bg-gradient-to-tr from-brand-black to-brand-gold flex items-center justify-center text-white text-4xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold">{member.name}</h3>
              <p className="text-brand-gold">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 px-6 bg-brand-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-heading font-bold text-brand-black mb-2">10K+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Customers</div>
          </div>
          <div>
            <div className="text-4xl font-heading font-bold text-brand-black mb-2">500+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Products</div>
          </div>
          <div>
            <div className="text-4xl font-heading font-bold text-brand-black mb-2">50+</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Countries</div>
          </div>
          <div>
            <div className="text-4xl font-heading font-bold text-brand-black mb-2">4.9</div>
            <div className="text-gray-600 text-sm uppercase tracking-wider">Rating</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-heading font-bold mb-8">Ready to Experience Qxyra?</h2>
        <Link href="/shop" className="inline-block bg-brand-black text-white px-8 py-4 rounded-full font-bold hover:bg-brand-gold hover:text-brand-black transition-colors">
          Start Shopping
        </Link>
      </section>
    </div>
  );
}
