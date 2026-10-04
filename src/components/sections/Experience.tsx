"use client";

import React, { useRef, useEffect, useState } from "react";
import { TIMELINE } from "@/lib/data";
import { useInView } from "@/lib/hooks";

export function Experience() {
  const [inViewRef, isInView] = useInView({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [spineHeight, setSpineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress through container
      const totalDist = rect.height;
      const scrolledPast = windowHeight * 0.7 - rect.top;
      const progress = Math.min(Math.max(scrolledPast / totalDist, 0), 1);
      setSpineHeight(progress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={inViewRef}
      className="py-[clamp(80px,12vh,140px)] px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee]"
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono-tag">05 — Career &amp; Academic Timeline</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#0d0d0d] mb-16">
          One continuous <span className="font-serif-accent font-normal text-[#77756f]">path.</span>
        </h2>

        {/* Timeline Container with dynamic drawing spine */}
        <div ref={containerRef} className="relative pl-7 sm:pl-16 space-y-12">
          
          {/* Background Spine Track */}
          <div
            className="absolute left-2.5 sm:left-4 top-2 bottom-6 w-[2px] bg-[rgba(13,13,13,0.08)]"
            aria-hidden="true"
          />

          {/* Active Drawing Spine */}
          <div
            className="absolute left-2.5 sm:left-4 top-2 w-[2px] bg-[#0d0d0d] transition-all duration-150"
            style={{ height: `${spineHeight}%` }}
            aria-hidden="true"
          />

          {TIMELINE.map((item, index) => (
            <div
              key={item.id}
              className={`relative card-quiet p-6 sm:p-8 transition-all duration-500 rv ${
                isInView ? "is-in" : ""
              }`}
              style={{ "--i": index + 1 } as React.CSSProperties}
            >
              {/* Timeline Stop Dot centered on spine */}
              <div
                className="absolute -left-[27px] sm:-left-[55px] top-8 w-4 h-4 rounded-full bg-[#f4f2ee] border-2 border-[#0d0d0d] flex items-center justify-center shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-[#77756f]">
                  {item.year}
                </span>
                {item.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f4f2ee] border border-[rgba(13,13,13,0.1)] font-mono text-[10px] font-bold text-[#0d0d0d]">
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-2xl text-[#0d0d0d] mb-1">
                {item.title}
              </h3>

              <div className="font-mono text-xs text-[#77756f] mb-4">
                {item.organization} · {item.location}
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-[#3a3a3a] leading-relaxed">
                {item.details.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="font-mono text-[#0d0d0d] font-bold mt-0.5">·</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* End Stop: Next Your Team? */}
          <div
            className={`relative p-8 rounded-3xl border-2 border-dashed border-[rgba(13,13,13,0.15)] bg-white/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rv ${
              isInView ? "is-in" : ""
            }`}
            style={{ "--i": 4 } as React.CSSProperties}
          >
            {/* Timeline Stop Dot */}
            <div
              className="absolute -left-[37px] sm:-left-[69px] top-8 w-4 h-4 rounded-full bg-white border-2 border-dashed border-[#77756f]"
            />

            <div>
              <span className="font-mono text-xs text-[#a9a6a0] uppercase">Next Horizon</span>
              <h4 className="font-display font-bold text-xl text-[#0d0d0d]">
                Next — Your engineering team?
              </h4>
              <p className="text-xs text-[#77756f] font-mono mt-1">
                Open to Full Stack Developer, AI Agent &amp; Frontend roles.
              </p>
            </div>

            <a
              href="#contact"
              className="btn-primary text-xs !py-2.5 !px-5 whitespace-nowrap"
            >
              Get in touch →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
