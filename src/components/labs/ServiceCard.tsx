'use client';

import Link from 'next/link';
import { ServicePackage } from '@/types/labs';

interface ServiceCardProps {
  pkg: ServicePackage;
}

export function ServiceCard({ pkg }: ServiceCardProps) {
  return (
    <div className={`p-8 rounded-3xl flex flex-col justify-between space-y-8 transition-all duration-300 relative overflow-hidden ${
      pkg.isPopular 
        ? 'bg-gradient-to-b from-[#141C33] via-[#0E1527] to-[#0A0F1D] border-2 border-blue-500/60 shadow-2xl shadow-blue-950/40' 
        : 'bg-[#0E1422] border border-gray-800 hover:border-blue-500/40 shadow-xl'
    }`}>
      {pkg.isPopular && (
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-mono bg-blue-500 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            Most Popular
          </span>
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-2">
          {pkg.badge && !pkg.isPopular && (
            <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 rounded-full uppercase">
              {pkg.badge}
            </span>
          )}
          <h3 className="font-heading text-2xl font-semibold text-white">
            {pkg.name}
          </h3>
          <p className="text-xs text-blue-300/80 font-medium">
            {pkg.tagline}
          </p>
          <p className="text-xs text-gray-400 leading-relaxed pt-1">
            {pkg.description}
          </p>
        </div>

        {/* Pricing & Turnaround */}
        <div className="p-4 rounded-2xl bg-black/40 border border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-mono">Starting From</span>
            <span className="text-2xl font-bold text-white font-mono">
              ${pkg.startingPrice}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-500 block uppercase font-mono">Est. Timeline</span>
            <span className="text-xs font-semibold text-blue-400 font-mono">
              {pkg.deliveryTime}
            </span>
          </div>
        </div>

        {/* Features list */}
        <div className="space-y-3 pt-2">
          <span className="text-[11px] font-mono uppercase text-gray-400 tracking-wider block">
            What&apos;s Included:
          </span>
          <ul className="space-y-2.5">
            {pkg.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                <span className="text-blue-400 mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack tags */}
        <div className="pt-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono block mb-2">Technologies</span>
          <div className="flex flex-wrap gap-1.5">
            {pkg.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-800">
        <Link
          href={`/labs/quote?package=${pkg.slug}`}
          className={`w-full py-3.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            pkg.isPopular
              ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/25'
              : 'bg-black/50 hover:bg-blue-500 text-gray-200 hover:text-white border border-gray-700 hover:border-blue-400'
          }`}
        >
          <span>Choose {pkg.name}</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
