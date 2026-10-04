"use client";

import React, { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";

export function Work() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <section
      id="work"
      ref={ref}
      className="py-[clamp(80px,12vh,140px)] px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee]"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono-tag">03 — Selected work</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0d0d0d] mb-12 flex flex-wrap items-baseline gap-2.5">
          <span>Featured</span>
          <span className="font-serif-accent font-normal text-[#77756f]">engineering.</span>
        </h2>

        {/* Desktop Expanding Accordion Gallery */}
        <div className="hidden lg:flex gap-4 h-[min(78svh,620px)] items-stretch">
          {PROJECTS.map((project) => {
            const isOpen = activeId === project.id;

            return (
              <div
                key={project.id}
                onClick={() => setActiveId(project.id)}
                onMouseEnter={() => setActiveId(project.id)}
                className={`relative rounded-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer ${
                  isOpen
                    ? "flex-[8] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-[rgba(13,13,13,0.12)] p-8"
                    : "flex-[1.2] bg-white/60 hover:bg-white border border-[rgba(13,13,13,0.08)] p-6 flex flex-col justify-between items-center"
                }`}
                tabIndex={0}
                role="button"
                aria-expanded={isOpen}
                aria-label={`Project ${project.title}`}
              >
                {!isOpen ? (
                  // Slim Spine State
                  <>
                    <span className="font-mono text-sm font-bold text-[#77756f]">
                      {project.index}
                    </span>
                    <div className="[writing-mode:vertical-rl] rotate-180 font-display font-bold text-lg text-[#0d0d0d] tracking-normal whitespace-nowrap">
                      {project.title}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-[rgba(13,13,13,0.2)] flex items-center justify-center font-mono text-base text-[#0d0d0d] group-hover:rotate-90 transition-transform">
                      +
                    </div>
                  </>
                ) : (
                  // Open Panel State (2 Columns)
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full items-stretch animate-fadeIn">
                    
                    {/* Left: Content */}
                    <div className="flex flex-col justify-between h-full pr-2">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-xs font-bold text-[#77756f]">
                            {project.index}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                          <span className="font-mono text-xs text-[#77756f] uppercase">
                            {project.kicker}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0d0d0d] tracking-normal mb-4 leading-snug">
                          {project.title}
                        </h3>

                        <p className="text-sm sm:text-[15px] text-[#3a3a3a] leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* 2-column feature list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#f4f2ee]/80 border border-[rgba(13,13,13,0.06)]">
                          {project.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="font-mono text-xs text-[#0d0d0d] font-bold">✓</span>
                              <span className="text-xs text-[#3a3a3a]">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech chips with tiny logos */}
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2ee] font-mono text-[11px] text-[#0d0d0d] border border-[rgba(13,13,13,0.08)]"
                            >
                              <TechLogo name={t} size={14} />
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Link */}
                      {project.github && (
                        <div className="pt-6 border-t border-[rgba(13,13,13,0.08)] mt-4">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary text-xs !py-2.5 !px-5 inline-flex"
                          >
                            View on GitHub ↗
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Right: Illustrative Mini-UI */}
                    <div className="relative rounded-2xl bg-[#f4f2ee] p-4 flex flex-col justify-between border border-[rgba(13,13,13,0.08)] overflow-hidden transition-all duration-500 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]">
                      <div className="flex items-center justify-between pb-3 border-b border-[rgba(13,13,13,0.06)] font-mono text-[9px] text-[#77756f]">
                        <span className="flex items-center gap-1.5 text-[#0d0d0d] font-semibold">
                          <span className="w-2 h-2 rounded-full bg-[#0d0d0d] animate-pulse" />
                          LIVE COMPONENT DEMO
                        </span>
                        <span className="uppercase tracking-widest text-[#a9a6a0]">Illustrative UI</span>
                      </div>

                      {/* Mini-UI Rendering */}
                      <div className="my-auto py-2">
                        {renderIllustrativeUI(project.illustrativeType)}
                      </div>

                      <div className="pt-2 text-right">
                        <span className="font-mono text-[8px] text-[#a9a6a0]">
                          SYSTEM ARCHITECTURE SCHEMA · 2024-2025
                        </span>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion */}
        <div className="flex flex-col gap-4 lg:hidden">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="card-quiet p-6 border border-[rgba(13,13,13,0.1)]"
            >
              <div className="flex items-center gap-3 mb-2 font-mono text-xs text-[#77756f]">
                <span>{project.index}</span>
                <span>·</span>
                <span className="uppercase">{project.kicker}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#0d0d0d] mb-3">
                {project.title}
              </h3>
              <p className="text-sm text-[#3a3a3a] mb-4">
                {project.description}
              </p>

              <div className="space-y-2 mb-4 p-3 rounded-xl bg-[#f4f2ee] text-xs">
                {project.features.map((f, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="font-bold">✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-[#f4f2ee] font-mono text-[10px] text-[#0d0d0d] border border-[rgba(13,13,13,0.08)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Mobile Illustrative UI */}
              <div className="p-3 bg-[#f4f2ee] rounded-xl border border-[rgba(13,13,13,0.08)] mb-4">
                <span className="font-mono text-[8px] text-[#a9a6a0] block uppercase mb-2">Illustrative UI</span>
                {renderIllustrativeUI(project.illustrativeType)}
              </div>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-xs w-full text-center"
                >
                  View on GitHub ↗
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function renderIllustrativeUI(type: 'whatsapp' | 'telephony' | 'ecommerce') {
  switch (type) {
    case "whatsapp":
      return (
        <div className="space-y-3 font-sans text-xs">
          <div className="flex justify-end">
            <div className="bg-[#e9e6e0] text-[#0d0d0d] p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%] border border-[rgba(13,13,13,0.06)]">
              <p className="text-xs">Hey Nitish, can you give me a summary of your agent architecture?</p>
              <span className="font-mono text-[8px] text-[#77756f] block text-right mt-1">10:42 AM ✓✓</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white text-[#0d0d0d] p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-[rgba(13,13,13,0.08)]">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#0d0d0d] mb-1">
                <span>🤖 GEMINI AI · 1.5 PRO</span>
              </div>
              <p className="text-xs text-[#3a3a3a]">
                Built with Node.js, Puppeteer session management, and Google Cloud TTS for autonomous voice synthesis.
              </p>
              {/* Audio Note Waveform */}
              <div className="mt-2.5 p-2 bg-[#f4f2ee] rounded-xl flex items-center gap-2 border border-[rgba(13,13,13,0.06)]">
                <button className="w-6 h-6 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center text-[10px]">
                  ▶
                </button>
                <div className="flex-1 flex items-center gap-1 h-3">
                  {[4, 10, 16, 8, 12, 18, 9, 14, 6, 11, 15, 7, 13, 8].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-[#0d0d0d] rounded-full"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[9px] text-[#77756f]">0:14</span>
              </div>
              <span className="font-mono text-[8px] text-[#77756f] block text-right mt-1">10:42 AM</span>
            </div>
          </div>
        </div>
      );
    case "telephony":
      return (
        <div className="p-4 bg-white rounded-2xl border border-[rgba(13,13,13,0.08)] shadow-sm font-mono text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(13,13,13,0.06)]">
            <span className="text-[#0d0d0d] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0d0d0d] animate-pulse" />
              CALL ACTIVE · +91 97948 52980
            </span>
            <span className="bg-[#f4f2ee] px-2 py-0.5 rounded text-[10px] text-[#0d0d0d] border border-[rgba(13,13,13,0.08)]">
              LATENCY: 380ms
            </span>
          </div>
          <div className="space-y-1.5 text-[11px] text-[#3a3a3a]">
            <p><span className="text-[#a9a6a0]">USER:</span> Looking to schedule a system demo.</p>
            <p className="text-[#0d0d0d] font-semibold"><span className="text-[#0d0d0d] font-bold">VAPI AI:</span> I can schedule your developer consultation right now. Which day works best?</p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[rgba(13,13,13,0.06)] text-[9px] text-[#77756f]">
            <span>TWILIO MEDIA STREAM 64KBPS</span>
            <span>STATUS: CONNECTED</span>
          </div>
        </div>
      );
    case "ecommerce":
      return (
        <div className="p-4 bg-white rounded-2xl border border-[rgba(13,13,13,0.08)] shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(13,13,13,0.06)]">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-[#0d0d0d]">
              Curated Catalog
            </span>
            <span className="font-mono text-[10px] text-[#0d0d0d] bg-[#f4f2ee] border border-[rgba(13,13,13,0.1)] px-2 py-0.5 rounded-full">
              99 Performance
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2 bg-[#f4f2ee] rounded-xl border border-[rgba(13,13,13,0.06)]">
              <div className="w-full h-16 bg-[#e9e6e0] rounded-lg mb-2 flex items-center justify-center font-mono text-[9px] text-[#77756f] border border-[rgba(13,13,13,0.04)]">
                WEBP ITEM
              </div>
              <div className="font-bold text-[11px] text-[#0d0d0d]">Handloom Silk Saree</div>
              <div className="font-mono text-[10px] text-[#77756f]">$180.00 · In Stock</div>
            </div>
            <div className="p-2 bg-[#f4f2ee] rounded-xl border border-[rgba(13,13,13,0.06)]">
              <div className="w-full h-16 bg-[#e9e6e0] rounded-lg mb-2 flex items-center justify-center font-mono text-[9px] text-[#77756f] border border-[rgba(13,13,13,0.04)]">
                WEBP ITEM
              </div>
              <div className="font-bold text-[11px] text-[#0d0d0d]">Linen Artisan Drape</div>
              <div className="font-mono text-[10px] text-[#77756f]">$140.00 · In Stock</div>
            </div>
          </div>
        </div>
      );
  }
}
