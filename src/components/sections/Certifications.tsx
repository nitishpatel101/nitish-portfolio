"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";
import { useInView } from "@/lib/hooks";

export function Certifications() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="certifications"
      ref={ref}
      className="py-[clamp(80px,12vh,140px)] px-[var(--gutter)] bg-white border-t border-b border-[rgba(13,13,13,0.08)]"
    >
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
          
          {/* Left Sticky Header */}
          <div className="lg:sticky lg:top-28">
            <span className="font-mono-tag block mb-4">04 — Verified knowledge</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#0d0d0d] mb-4">
              Always <span className="font-serif-accent font-normal text-[#77756f]">learning.</span>
            </h2>
            <p className="font-mono text-xs text-[#77756f] uppercase tracking-wider">
              {CERTIFICATIONS.length < 10 ? `0${CERTIFICATIONS.length}` : CERTIFICATIONS.length} Credentials &amp; Specializations
            </p>
          </div>

          {/* Right Ink-Flood Numbered Rows */}
          <div className="divide-y divide-[rgba(13,13,13,0.08)]">
            {CERTIFICATIONS.map((cert, index) => (
              <a
                key={cert.id}
                href={cert.link || "#"}
                target="_blank"
                rel="noreferrer"
                style={{ "--i": index + 1 } as React.CSSProperties}
                className={`group relative block py-6 sm:py-8 px-4 sm:px-6 transition-all duration-300 overflow-hidden rv ${
                  isInView ? "is-in" : ""
                }`}
              >
                {/* Ink Flood Background Layer */}
                <div
                  className="absolute inset-0 bg-[#0d0d0d] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -z-0"
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-6">
                    <span className="font-mono text-sm font-bold text-[#77756f] group-hover:text-white/60 transition-colors duration-300">
                      {cert.index}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#0d0d0d] group-hover:text-white transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <p className="font-mono text-xs text-[#77756f] group-hover:text-white/80 transition-colors duration-300 mt-1">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="w-8 h-8 rounded-full border border-[rgba(13,13,13,0.15)] group-hover:border-white/40 flex items-center justify-center text-sm font-mono text-[#0d0d0d] group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                      ↗
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
