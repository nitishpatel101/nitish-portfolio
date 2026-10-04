"use client";

import React, { useRef, useState, useEffect } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollTo } = useScroll();

  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Initialize video and handle visibility pausing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt unmuted play, fallback to muted
    video.muted = true;
    video
      .play()
      .then(() => {
        setAutoplayBlocked(true); // muted autoplay active, awaiting interaction
      })
      .catch(() => {
        setIsPlaying(false);
      });

    // Interaction unlock listener
    const unlockSound = () => {
      if (video && video.muted) {
        video.muted = false;
        setIsAudioActive(true);
        setAutoplayBlocked(false);
      }
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    // IntersectionObserver: Pause when < 35% visible
    const heroEl = heroRef.current;
    if (heroEl) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio < 0.35) {
            video.pause();
            setIsPlaying(false);
          } else {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        },
        { threshold: [0, 0.35, 0.7, 1.0] }
      );
      observer.observe(heroEl);

      return () => {
        observer.disconnect();
        window.removeEventListener("pointerdown", unlockSound);
        window.removeEventListener("keydown", unlockSound);
        window.removeEventListener("touchend", unlockSound);
      };
    }
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsAudioActive(true);
      setAutoplayBlocked(false);
      video.play();
    } else {
      video.muted = true;
      setIsAudioActive(false);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center pt-24 pb-12 px-[var(--gutter)] overflow-hidden"
    >
      {/* Giant Ghost Outlined First Name behind Character */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <span
          className="text-[clamp(14vw,22vw,320px)] font-display font-black tracking-tighter text-transparent leading-none"
          style={{
            WebkitTextStroke: "1.5px rgba(13, 13, 13, 0.08)",
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Hero Video Container */}
      <div className="relative z-10 my-auto flex items-center justify-center w-full max-w-[768px]">
        <div className="relative h-[clamp(62svh,96svh,1040px)] aspect-[768/960] flex items-center justify-center">
          <video
            ref={videoRef}
            playsInline
            loop
            preload="auto"
            className="w-full h-full object-contain pointer-events-none"
            style={{ mixBlendMode: "multiply" }}
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Sound Control Button */}
          <div className="absolute bottom-6 right-6 pointer-events-auto">
            <button
              onClick={toggleSound}
              aria-label={isAudioActive ? "Mute introduction voice" : "Unmute introduction voice"}
              className="relative w-[46px] h-[46px] rounded-full bg-[#0d0d0d] text-[#ffffff] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            >
              {autoplayBlocked && !isAudioActive && (
                <span className="absolute inset-0 rounded-full animate-ping bg-[#0d0d0d]/30" />
              )}
              {isAudioActive ? (
                // Pause / Two Bars icon
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                // Play / Triangle icon
                <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Role, Location & CTAs */}
      <div className="relative z-20 w-full max-w-[1320px] flex flex-col md:flex-row items-center md:items-end justify-between gap-6 pt-4 border-t border-[rgba(13,13,13,0.08)]">
        <div className="text-center md:text-left">
          <p className="font-mono-tag mb-1.5 flex items-center justify-center md:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0d0d0d] animate-pulse" />
            Available for Engineering &amp; High-Impact Roles
          </p>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#0d0d0d]">
            Full Stack <span className="font-serif-accent font-normal text-[#77756f]">Developer.</span>
          </h1>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => scrollTo("#work")}
            className="btn-primary"
          >
            Explore work
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-secondary"
          >
            Let&apos;s talk
          </button>
          <a
            href={PROFILE.resumeUrl}
            download="Nitish_Kumar_Resume.pdf"
            className="btn-secondary"
            aria-label="Download Résumé PDF"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </section>
  );
}
