"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";
import { useInView } from "@/lib/hooks";

export function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [flipped, setFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  // Pendulum swing on pointer move with damping
  useEffect(() => {
    let currentAngle = 0;
    let targetAngle = 0;
    let animationFrameId: number;
    let idleTime = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!cardContainerRef.current) return;
      const rect = cardContainerRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const dx = e.clientX - cardCenterX;
      // Map dx into subtle swing angle (-12deg to 12deg)
      targetAngle = Math.max(Math.min(dx * 0.05, 12), -12);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    const animateSwing = () => {
      idleTime += 0.03;
      // Spring damping towards target
      currentAngle += (targetAngle - currentAngle) * 0.08;
      // Return target towards 0 gradually
      targetAngle *= 0.94;

      // Add gentle idle sway when still
      const idleSway = Math.sin(idleTime) * 1.5;
      setSwingAngle(currentAngle + idleSway);

      animationFrameId = requestAnimationFrame(animateSwing);
    };

    animationFrameId = requestAnimationFrame(animateSwing);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped(!flipped);
    }
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-[clamp(80px,12vh,140px)] px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee]"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono-tag">01 — Profile overview</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0d0d0d] mb-12 flex flex-wrap items-baseline gap-2.5">
          <span>About the</span>
          <span className="font-serif-accent font-normal text-[#77756f]">developer.</span>
        </h2>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
          
          {/* Left Column: Summary & Links */}
          <div className={`card-quiet p-8 flex flex-col justify-between rv ${isInView ? "is-in" : ""}`} style={{ "--i": 1 } as React.CSSProperties}>
            <div>
              <span className="font-mono-tag block mb-3 text-xs">Bio &amp; Mission</span>
              <h3 className="font-display font-bold text-2xl mb-4 text-[#0d0d0d]">
                Hi, I&apos;m {PROFILE.name.split(" ")[0]}.
              </h3>
              <p className="text-sm sm:text-[15px] text-[#3a3a3a] leading-relaxed mb-4 text-left">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-xs sm:text-sm text-[#77756f] leading-normal font-mono">
                {PROFILE.secondaryLine}
              </p>
            </div>

            <div className="pt-6 border-t border-[rgba(13,13,13,0.08)] flex flex-wrap gap-3 mt-6">
              <a
                href={PROFILE.resumeUrl}
                download="Nitish_Kumar_Resume.pdf"
                className="btn-primary text-xs !py-2.5 !px-5"
              >
                Résumé PDF ↓
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs !py-2.5 !px-5"
              >
                GitHub ↗
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-xs !py-2.5 !px-5"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Center Column: Realistic Hanging Lanyard ID Card */}
          <div
            ref={cardContainerRef}
            className={`relative flex flex-col items-center justify-start min-h-[480px] rv ${isInView ? "is-in" : ""}`}
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {/* Lanyard Top Strap (30x56 px) with vertically scrolling name and role */}
            <div className="relative w-[30px] h-[56px] bg-[#0d0d0d] overflow-hidden rounded-t-sm shadow-md z-20 flex justify-center">
              <div className="animate-strap-scroll whitespace-nowrap flex flex-col items-center text-[7px] text-[#f4f2ee] font-mono tracking-widest uppercase select-none opacity-85 py-1">
                <span>NITISH</span>
                <span>·</span>
                <span>DEV</span>
                <span>·</span>
                <span>BCA</span>
                <span>·</span>
                <span>DU</span>
                <span>·</span>
                <span>NITISH</span>
                <span>·</span>
                <span>DEV</span>
                <span>·</span>
                <span>BCA</span>
                <span>·</span>
                <span>DU</span>
              </div>
            </div>

            {/* Lanyard Metal Clip */}
            <div className="w-[18px] h-[12px] bg-[#77756f] border border-[#a9a6a0] rounded-sm shadow-inner z-20" />
            <div className="w-[8px] h-[8px] border-2 border-[#77756f] rounded-full -mt-1 z-20" />

            {/* Swinging & 3D Flipping Card Container */}
            <div
              className="relative w-[min(300px,calc(100vw-56px))] h-[404px] cursor-pointer mt-1 select-none group"
              style={{
                perspective: "1000px",
                transform: `rotate(${swingAngle}deg)`,
                transformOrigin: "top center",
                transition: "transform 0.1s linear",
              }}
              onClick={() => setFlipped(!flipped)}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-label="Developer ID card. Hover, click or press Enter to flip."
            >
              <div
                className={`w-full h-full relative transition-transform duration-700 ease-[var(--ease)] ${
                  flipped ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(180deg)]"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-white rounded-2xl p-5 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[rgba(13,13,13,0.1)] backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Top Black Header Band */}
                  <div className="bg-[#0d0d0d] text-white py-1 px-3 rounded-md flex items-center justify-between font-mono text-[9px] tracking-widest">
                    <span>DEVELOPER ID</span>
                    <span>2022-2025</span>
                  </div>

                  {/* Centered Portrait with Halo & Zoom */}
                  <div className="flex flex-col items-center my-1">
                    <div className="relative w-[140px] h-[172px] rounded-xl overflow-hidden p-[2px] bg-[#e9e6e0] shadow-md group/photo">
                      <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-white">
                        <Image
                          src="/portrait-bust.webp"
                          alt="Nitish Kumar Portrait"
                          fill
                          className="object-cover object-center transition-transform duration-500 group-hover/photo:scale-105"
                          priority
                        />
                      </div>
                    </div>
                    <h4 className="font-display font-bold text-lg text-[#0d0d0d] mt-2">
                      {PROFILE.name}
                    </h4>
                    <p className="font-mono text-xs text-[#555555] font-medium">
                      {PROFILE.role}
                    </p>
                  </div>

                  {/* ID Details Table */}
                  <div className="border-t border-b border-[rgba(13,13,13,0.06)] py-1.5 font-mono text-[9px] text-[#3a3a3a] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#a9a6a0]">ID NO.</span>
                      <span className="font-bold">{PROFILE.idNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a9a6a0]">DEPT.</span>
                      <span className="truncate max-w-[160px]">{PROFILE.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#a9a6a0]">VALID TILL</span>
                      <span className="font-bold">{PROFILE.gradYear}</span>
                    </div>
                  </div>

                  {/* Barcode & Hologram Footer */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-col">
                      <div className="font-mono text-[8px] text-[#77756f] tracking-tighter">||| | |||| | ||||| || |</div>
                      <div className="font-mono text-[7px] text-[#a9a6a0]">AUTHENTICATED DEV</div>
                    </div>
                    {/* Grayscale Holographic Sticker */}
                    <div className="w-8 h-8 rounded-full bg-[#f4f2ee] border border-[#a9a6a0] flex items-center justify-center shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#e9e6e0]/60" />
                      <span className="text-[8px] font-mono font-bold text-[#3a3a3a] relative z-10">NK</span>
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#0d0d0d] text-[#f4f2ee] rounded-2xl p-5 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-[#3a3a3a]"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="font-mono text-[9px] text-[#a9a6a0] tracking-wider border-b border-[#3a3a3a] pb-2">
                    ENGINEERING PROFILE CREDENTIALS
                  </div>

                  <div className="space-y-2 text-left my-auto text-xs font-mono">
                    <p className="text-[10px] text-[#a9a6a0] uppercase font-bold">WHAT I AM:</p>
                    <p className="text-xs font-semibold text-white">{PROFILE.role}</p>
                    <p className="text-[11px] text-[#a9a6a0]">{PROFILE.degree} · University of Delhi</p>
                    <p className="text-[11px] text-[#f4f2ee]">CGPA: {PROFILE.cgpa} · First Class Distinction</p>
                    <p className="text-[11px] text-[#a9a6a0]">
                      Key: WhatsApp AI Agent · Real-Time Telephony · Next.js
                    </p>
                    <p className="text-[10px] text-[#77756f]">
                      500+ Production Eng Hours · 15+ Deployed Repos
                    </p>
                  </div>

                  <div className="border-t border-[#3a3a3a] pt-3 text-center">
                    <div className="font-serif-accent text-sm text-[#a9a6a0] italic mb-1">
                      Nitish Kumar
                    </div>
                    <p className="font-mono text-[8px] text-[#77756f]">
                      If found, say hello · {PROFILE.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="font-mono text-[9px] text-[#a9a6a0] mt-2">
              (hover or tap to flip)
            </div>
          </div>

          {/* Right Column: Quick Facts & Quote */}
          <div className={`card-quiet p-8 flex flex-col justify-between rv ${isInView ? "is-in" : ""}`} style={{ "--i": 3 } as React.CSSProperties}>
            <div>
              <span className="font-mono-tag block mb-3 text-xs">Snapshot</span>
              <h3 className="font-display font-bold text-2xl mb-6 text-[#0d0d0d]">
                Quick Facts
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="pb-3 border-b border-[rgba(13,13,13,0.06)]">
                  <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase">Location</span>
                  <span className="font-semibold text-[#0d0d0d]">{PROFILE.location}</span>
                </div>
                <div className="pb-3 border-b border-[rgba(13,13,13,0.06)]">
                  <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase">Education</span>
                  <span className="font-semibold text-[#0d0d0d]">{PROFILE.degree} ({PROFILE.gradYear})</span>
                  <span className="block text-xs text-[#77756f]">{PROFILE.institution} · {PROFILE.cgpa}</span>
                </div>
                <div className="pb-3 border-b border-[rgba(13,13,13,0.06)]">
                  <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase">Current Focus</span>
                  <span className="font-semibold text-[#0d0d0d]">AI Conversational Agents &amp; Full Stack</span>
                </div>
                <div className="pb-3">
                  <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase">Direct Inquiries</span>
                  <a href={`mailto:${PROFILE.email}`} className="font-semibold text-[#0d0d0d] hover:underline">
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Paraphrased Quote from résumé */}
            <div className="p-4 bg-[#f4f2ee] rounded-2xl border border-[rgba(13,13,13,0.06)] mt-6">
              <p className="font-serif-accent text-sm text-[#3a3a3a] italic leading-relaxed">
                &ldquo;{PROFILE.quote}&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
