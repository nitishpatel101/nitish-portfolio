"use client";

import React, { useRef, useEffect, useState } from "react";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/data";

export function Achievements() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasStartedCount, setHasStartedCount] = useState(false);
  const [nearestCardIndex, setNearestCardIndex] = useState<number>(0);

  // Start counter immediately upon mount
  useEffect(() => {
    setHasStartedCount(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);

      // Detect which card is closest to viewport center
      if (trackRef.current) {
        const cards = trackRef.current.querySelectorAll<HTMLElement>("[data-card-index]");
        const viewportCenter = window.innerWidth / 2;
        let minDistance = Infinity;
        let closestIdx = 0;

        cards.forEach((card, idx) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(cardCenter - viewportCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        });
        setNearestCardIndex(closestIdx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Max translation of the track
  const travelPercent = scrollProgress * 55;

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative h-[160vh] bg-[#f4f2ee] border-t border-[rgba(13,13,13,0.08)]"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-between py-12 px-[var(--gutter)] overflow-hidden">
        
        {/* Header with Title & Thin Progress Bar */}
        <div className="max-w-[1320px] mx-auto w-full">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="font-mono-tag">06 — Key milestones</span>
            <span className="font-mono text-xs text-[#77756f]">
              {Math.round(scrollProgress * 100)}% EXPLORED
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0d0d0d] flex flex-wrap items-baseline gap-2.5">
              <span>Impact &amp;</span>
              <span className="font-serif-accent font-normal text-[#77756f]">metrics.</span>
            </h2>
            <p className="font-mono text-xs text-[#77756f]">
              Scroll down to slide horizontally through records.
            </p>
          </div>

          {/* Thin Progress Bar */}
          <div className="w-full h-[2px] bg-[rgba(13,13,13,0.08)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d0d0d] transition-all duration-75"
              style={{ width: `${Math.max(scrollProgress * 100, 10)}%` }}
            />
          </div>
        </div>

        {/* Sliding Cards Track */}
        <div className="w-full my-auto overflow-visible py-6">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 will-change-transform transition-transform duration-100 ease-out pl-[max(1.5rem,calc((100vw-1320px)/2))]"
            style={{
              transform: `translateX(-${travelPercent}%)`,
            }}
          >
            {ACHIEVEMENTS.map((ach, idx) => (
              <AchievementCard
                key={ach.id}
                item={ach}
                index={idx}
                isNearest={nearestCardIndex === idx}
                startCount={hasStartedCount}
              />
            ))}

            {/* End Card: and counting -> */}
            <div className="flex-shrink-0 w-[280px] h-[clamp(260px,36vh,310px)] rounded-[28px] border-2 border-dashed border-[rgba(13,13,13,0.15)] flex flex-col justify-center items-center text-center p-8 bg-white/50">
              <span className="font-mono text-xs text-[#a9a6a0] uppercase tracking-wider mb-2">
                Continuous Journey
              </span>
              <span className="font-display font-bold text-2xl text-[#0d0d0d] tracking-normal">
                and counting →
              </span>
              <span className="font-mono text-[11px] text-[#77756f] mt-2">
                New architectures in progress
              </span>
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="max-w-[1320px] mx-auto w-full flex justify-between items-center text-xs font-mono text-[#a9a6a0] pt-2">
          <span>HORIZONTAL PINNED GALLERY</span>
          <span>KEEP SCROLLING ↓</span>
        </div>

      </div>
    </section>
  );
}

function AchievementCard({
  item,
  index,
  isNearest,
  startCount,
}: {
  item: AchievementItem;
  index: number;
  isNearest: boolean;
  startCount: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(item.numberValue);

  useEffect(() => {
    if (!startCount) return;

    let startTime: number | null = null;
    const duration = 1400; // 1.4s easeOutQuart
    const target = item.numberValue;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(ease * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [startCount, item.numberValue]);

  return (
    <div
      data-card-index={index}
      className={`flex-shrink-0 w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,310px)] rounded-[28px] bg-white p-8 flex flex-col justify-between border border-[rgba(13,13,13,0.06)] transition-all duration-500 relative group overflow-hidden ${
        isNearest
          ? "-translate-y-3 shadow-[0_32px_70px_-15px_rgba(0,0,0,0.12)]"
          : "shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_28px_55px_-15px_rgba(0,0,0,0.08)]"
      }`}
    >
      {/* Soft Brand-Tint Glow in Background (brightens when nearest center) */}
      <div
        className={`absolute top-0 right-0 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
          isNearest ? "opacity-45" : "opacity-20 group-hover:opacity-35"
        }`}
        style={{ backgroundColor: item.color }}
      />

      {/* Top: 72px Logo Tile & Index */}
      <div className="flex items-center justify-between">
        <div className="w-[72px] h-[72px] rounded-2xl bg-[#f4f2ee] flex items-center justify-center border border-[rgba(13,13,13,0.06)] shadow-inner">
          {renderPlatformLogo(item.platform, item.color)}
        </div>
        <span className="font-mono text-xs font-bold text-[#77756f]">
          {item.index}
        </span>
      </div>

      {/* Bottom Content & Huge Count-Up Number */}
      <div className="flex items-end justify-between gap-4 mt-auto">
        <div className="max-w-[60%]">
          <div className="font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider mb-1">
            {item.platform}
          </div>
          <h3 className="font-display font-bold text-lg text-[#0d0d0d] leading-snug">
            {item.label}
          </h3>
          <p className="font-mono text-xs text-[#77756f] mt-1">
            {item.detail}
          </p>
        </div>

        {/* Huge Number */}
        <div className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#0d0d0d] tracking-normal leading-none select-none">
          {displayValue}
          <span className="text-xl sm:text-2xl font-mono font-normal text-[#77756f] ml-0.5">
            {item.suffix}
          </span>
        </div>
      </div>
    </div>
  );
}

function renderPlatformLogo(platform: string, color: string) {
  switch (platform) {
    case "University of Delhi":
      return (
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
          {/* Graduation Cap & Academic Laurel */}
          <path d="M16 6L4 12L16 18L28 12L16 6Z" fill="#2563eb" />
          <path d="M8 14.5V21C8 23.5 11.5 25.5 16 25.5C20.5 25.5 24 23.5 24 21V14.5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
          <path d="M26 13V22" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "Production Architecture":
      return (
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
          {/* Engineering gears & CPU cores */}
          <rect x="5" y="5" width="22" height="22" rx="4" stroke="#059669" strokeWidth="2" />
          <rect x="10" y="10" width="12" height="12" rx="2" fill="#059669" fillOpacity="0.2" stroke="#059669" strokeWidth="1.5" />
          <line x1="16" y1="2" x2="16" y2="5" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="27" x2="16" y2="30" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <line x1="2" y1="16" x2="5" y2="16" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <line x1="27" y1="16" x2="30" y2="16" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Software Repositories":
      return (
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
          {/* Git Branch & Commits */}
          <circle cx="10" cy="9" r="3" fill="#7c3aed" />
          <circle cx="10" cy="23" r="3" fill="#7c3aed" />
          <circle cx="22" cy="16" r="3" fill="#7c3aed" />
          <path d="M10 12V20M10 14C10 16 14 16 19 16" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Lighthouse Standard":
      return (
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
          {/* Lighthouse Beacon */}
          <path d="M16 4L11 26H21L16 4Z" stroke="#ea580c" strokeWidth="2" strokeLinejoin="round" />
          <line x1="13" y1="14" x2="19" y2="14" stroke="#ea580c" strokeWidth="1.5" />
          <line x1="12" y1="20" x2="20" y2="20" stroke="#ea580c" strokeWidth="1.5" />
          <path d="M16 2L16 4M10 7L8 5M22 7L24 5" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <span className="font-display font-black text-xl text-[#0d0d0d]">
          {platform.slice(0, 2).toUpperCase()}
        </span>
      );
  }
}
