"use client";

import React, { useState, useEffect } from "react";
import { NAV_ITEMS, PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export function Navigation() {
  const { scrollTo } = useScroll();
  const scrollProgress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      {/* 2px Ink scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#0d0d0d] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress * 100}%` }}
        aria-hidden="true"
      />

      <header className="fixed top-0 left-0 right-0 z-40 px-[var(--gutter)] py-4 transition-all duration-300">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          
          {/* Left: Initials badge & Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-3 group"
            aria-label="Nitish Kumar - Scroll to top"
          >
            <div
              className={`w-10 h-10 rounded-full border border-[#0d0d0d] flex items-center justify-center font-mono text-xs font-bold tracking-wider transition-all duration-500 transform group-hover:rotate-[360deg] ${
                scrolled ? "bg-[#0d0d0d] text-[#f4f2ee]" : "bg-transparent text-[#0d0d0d]"
              }`}
            >
              NK
            </div>
            <span
              className={`font-display font-bold text-sm tracking-tight text-[#0d0d0d] transition-opacity duration-300 ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </a>

          {/* Center/Right Desktop Nav Pill */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-full transition-all duration-300 ${
              scrolled
                ? "bg-white/80 backdrop-blur-md border border-[rgba(13,13,13,0.08)] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                : "bg-transparent"
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                    isActive ? "text-white" : "text-[#77756f] hover:text-[#0d0d0d]"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 bg-[#0d0d0d] rounded-full -z-10 transition-all duration-300"
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden px-4 py-2 rounded-full border border-[rgba(13,13,13,0.15)] bg-white/70 backdrop-blur-sm text-xs font-mono font-medium text-[#0d0d0d]"
            aria-label="Open Navigation Menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-[#f4f2ee] z-50 flex flex-col justify-between p-8 md:hidden transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          clipPath: mobileMenuOpen ? "circle(150% at top right)" : "circle(0% at top right)",
          transition: "clip-path 0.5s var(--ease), opacity 0.3s ease",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full border border-[#0d0d0d] flex items-center justify-center font-mono text-xs font-bold bg-[#0d0d0d] text-[#f4f2ee]">
            NK
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2 rounded-full border border-[#0d0d0d] text-xs font-mono text-[#0d0d0d]"
            aria-label="Close Navigation Menu"
          >
            Close ✕
          </button>
        </div>

        <nav className="flex flex-col gap-6 my-auto">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="group flex items-baseline gap-4 text-3xl font-display font-bold tracking-tight text-[#0d0d0d]"
            >
              <span className="font-mono text-xs text-[#a9a6a0]">0{index + 1}</span>
              <span className="group-hover:translate-x-2 transition-transform duration-200">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="pt-6 border-t border-[rgba(13,13,13,0.1)] flex items-center justify-between text-xs font-mono text-[#77756f]">
          <span>{PROFILE.email}</span>
          <span>{PROFILE.location.split(",")[0]}</span>
        </div>
      </div>
    </>
  );
}
