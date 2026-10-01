'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header */}
      <section className="bg-brand-black text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-heading font-bold mb-4 text-brand-gold">Contact Us</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Have a question or need assistance? We're here to help. Reach out to our dedicated support team.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-heading font-bold mb-8">Send us a message</h2>
          {isSubmitted ? (
            <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200">
              <h3 className="font-bold text-xl mb-2">Thank you!</h3>
              <p>Your message has been received. We will get back to you within 24 hours.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-4 text-sm font-semibold underline text-green-700"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input required type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input required type="email" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all bg-white">
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Returns & Exchanges</option>
                  <option>Product Information</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea required rows={5} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-black text-white py-4 rounded-lg font-bold hover:bg-brand-gold hover:text-brand-black transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Map */}
        <div className="space-y-12">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-brand-gray-50 p-6 rounded-xl">
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-gray-600">support@qxyra.com</p>
              <p className="text-gray-600">press@qxyra.com</p>
            </div>
            <div className="bg-brand-gray-50 p-6 rounded-xl">
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-gray-600">+1 (800) 123-4567</p>
              <p className="text-gray-600">Mon-Fri 9am-6pm EST</p>
            </div>
            <div className="bg-brand-gray-50 p-6 rounded-xl">
              <h3 className="font-bold mb-2">Address</h3>
              <p className="text-gray-600">123 Premium Way<br/>New York, NY 10001<br/>United States</p>
            </div>
            <div className="bg-brand-gray-50 p-6 rounded-xl">
              <h3 className="font-bold mb-2">Business Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9am - 6pm<br/>Saturday: 10am - 4pm<br/>Sunday: Closed</p>
            </div>
          </div>

          <div className="w-full h-64 bg-gradient-to-br from-brand-black to-gray-800 rounded-xl flex items-center justify-center text-brand-gold font-heading text-2xl font-bold shadow-lg">
            Qxyra HQ
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-gray-200">
        <h2 className="text-3xl font-heading font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.' },
            { q: 'What is your return policy?', a: 'We offer a 30-day return window for all unused items in their original packaging.' },
            { q: 'Do you ship internationally?', a: 'Yes, we ship to over 50 countries worldwide. Shipping costs will apply and be added at checkout.' },
            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and Apple Pay.' },
            { q: 'How can I track my order?', a: 'Once your order ships, you will receive an email with a tracking link.' },
          ].map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
