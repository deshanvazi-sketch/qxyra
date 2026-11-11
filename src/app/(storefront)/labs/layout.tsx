import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qxyra Labs | Enterprise Software, POS Systems & Web Solutions',
  description: 'Point of sale retail software, multi-channel inventory orchestrators, and high-conversion e-commerce engineering by Qxyra Labs.',
};

export default function LabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#080B10] text-gray-200 min-h-screen">
      {/* Top Labs Indicator Bar */}
      <div className="bg-gradient-to-r from-blue-950/80 via-black to-indigo-950/80 border-b border-blue-500/20 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>Qxyra Labs Engineering Division</span>
          </span>
          <span className="text-gray-400 hidden sm:inline">
            Turnkey POS Systems • Bespoke Web Solutions • Cloud Architecture
          </span>
          <a href="/labs/quote" className="text-blue-300 hover:text-white underline">
            Request Quote →
          </a>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
}
