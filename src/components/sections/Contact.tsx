"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export function Contact() {
  const { scrollTo } = useScroll();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <footer
      id="contact"
      className="py-[clamp(80px,14vh,160px)] px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee] relative"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono-tag">07 — Direct dialogue</span>
        </div>

        {/* Letter-bounce interactive heading */}
        <div className="mb-14">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-[#0d0d0d] leading-[1.05]">
            <div className="flex flex-wrap">
              {line1.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block transition-transform duration-200 hover:-translate-y-4 cursor-default select-none"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap text-[#77756f]">
              {line2.split("").map((char, index) => (
                <span
                  key={index}
                  className="inline-block transition-transform duration-200 hover:-translate-y-4 cursor-default select-none"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </h2>
        </div>

        {/* Contact Bar & Spinning Badge */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 pb-16 border-b border-[rgba(13,13,13,0.08)]">
          
          {/* Email with Copy Chip */}
          <div className="space-y-4">
            <span className="font-mono text-xs text-[#a9a6a0] uppercase tracking-wider block">
              Inquiries &amp; Collaborations
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PROFILE.email}`}
                className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0d0d0d] underline decoration-[rgba(13,13,13,0.2)] hover:decoration-[#0d0d0d] transition-all"
              >
                {PROFILE.email}
              </a>

              {/* Copy Chip */}
              <button
                onClick={copyEmail}
                className="px-3.5 py-1.5 rounded-full border border-[rgba(13,13,13,0.15)] bg-white font-mono text-xs font-medium text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white transition-all shadow-sm"
                aria-label="Copy email address"
              >
                <span aria-live="polite">
                  {copied ? "Copied ✓" : "Copy"}
                </span>
              </button>
            </div>

            {/* Direct Phone & Social Links */}
            <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-[#77756f]">
              <a
                href={PROFILE.phoneHref}
                className="hover:text-[#0d0d0d] flex items-center gap-1.5 font-bold"
              >
                <span>📞</span>
                <span>{PROFILE.phone}</span>
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#0d0d0d] underline"
              >
                GitHub ↗
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#0d0d0d] underline"
              >
                LinkedIn ↗
              </a>
              <a
                href={PROFILE.resumeUrl}
                download="Nitish_Kumar_Resume.pdf"
                className="hover:text-[#0d0d0d] underline"
              >
                Résumé PDF ↓
              </a>
            </div>
          </div>

          {/* Circular Spinning Say-Hello Badge */}
          <div className="relative w-32 h-32 flex items-center justify-center self-center lg:self-auto">
            <svg
              className="w-full h-full animate-[spin_12s_linear_infinite]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text fontSize="8.5" letterSpacing="2.2" className="fill-[#0d0d0d] font-mono uppercase">
                <textPath xlinkHref="#circlePath">
                  · SAY HELLO · GET IN TOUCH · LET&apos;S TALK
                </textPath>
              </text>
            </svg>
            <div className="absolute w-8 h-8 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center font-mono text-xs">
              ↗
            </div>
          </div>

        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#77756f]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with Next.js 15 &amp; Quiet Design</span>
            <button
              onClick={() => scrollTo("#hero")}
              className="hover:text-[#0d0d0d] underline"
            >
              Back to top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
