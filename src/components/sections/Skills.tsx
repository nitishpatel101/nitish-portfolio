"use client";

import React, { useState } from "react";
import { SKILLS, SKILL_FAMILIES, SkillItem } from "@/lib/data";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";

export function Skills() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeFamily, setActiveFamily] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS[0]);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-[clamp(80px,12vh,140px)] px-[var(--gutter)] border-t border-[rgba(13,13,13,0.08)] bg-[#f4f2ee]"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono-tag">02 — Stack periodic table</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#0d0d0d]">
              Technical <span className="font-serif-accent font-normal text-[#77756f]">elements.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#77756f] font-mono mt-2">
              The chemical composition of production software and AI pipelines.
            </p>
          </div>

          {/* Family Filter Chips */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white/60 backdrop-blur-sm rounded-full border border-[rgba(13,13,13,0.08)]">
            {SKILL_FAMILIES.map((family) => {
              const active = activeFamily === family;
              return (
                <button
                  key={family}
                  onClick={() => setActiveFamily(family)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                    active
                      ? "bg-[#0d0d0d] text-white shadow-sm"
                      : "text-[#77756f] hover:text-[#0d0d0d]"
                  }`}
                >
                  {family}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid + Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Periodic Table Grid (8 cols desktop, 4 cols mobile, 3 cols ultra-compact) */}
          <div className="grid grid-cols-3 min-[380px]:grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-2.5">
            {SKILLS.map((skill, index) => {
              const col = index % 8;
              const row = Math.floor(index / 8);
              const delay = (row + col) * 40;
              const isMatch = activeFamily === "All" || skill.family === activeFamily;
              const isSelected = selectedSkill.name === skill.name;

              return (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  onFocus={() => setSelectedSkill(skill)}
                  style={{
                    transitionDelay: `${delay}ms`,
                  }}
                  className={`group relative aspect-square p-2.5 rounded-xl border flex flex-col justify-between text-left transition-all duration-300 rv ${
                    isInView ? "is-in" : ""
                  } ${
                    isSelected
                      ? "bg-white border-[#0d0d0d] shadow-md scale-[1.03] z-10"
                      : isMatch
                      ? "bg-white/70 border-[rgba(13,13,13,0.1)] hover:bg-white hover:border-[#0d0d0d] hover:shadow-sm"
                      : "opacity-25 grayscale border-transparent bg-white/20"
                  }`}
                  aria-label={`${skill.name}, ${skill.family}`}
                >
                  {/* Top row: atomic number & family initial */}
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-[9px] text-[#77756f]">
                      {skill.atomicNumber < 10 ? `0${skill.atomicNumber}` : skill.atomicNumber}
                    </span>
                    <span className="font-mono text-[8px] text-[#a9a6a0] uppercase truncate max-w-[40px]">
                      {skill.family.slice(0, 3)}
                    </span>
                  </div>

                  {/* Center: Symbol */}
                  <div className="font-display font-extrabold text-xl text-[#0d0d0d] group-hover:scale-110 transition-transform">
                    {skill.symbol}
                  </div>

                  {/* Bottom: Full Name */}
                  <div className="font-mono text-[9px] text-[#3a3a3a] truncate w-full">
                    {skill.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sticky Inspector Panel (320px) */}
          <div className="lg:sticky lg:top-24 card-quiet p-6 flex flex-col items-center text-center">
            <span className="font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider mb-4">
              Element Inspector
            </span>

            {/* Real Brand Logo at 150px with Pop Animation & Soft Brand Glow */}
            <div className="relative w-40 h-40 flex items-center justify-center rounded-2xl bg-[#f4f2ee] p-4 mb-4 border border-[rgba(13,13,13,0.06)] shadow-inner group">
              <div className="absolute inset-0 bg-white/40 blur-xl rounded-full" />
              <div className="relative z-10 transform transition-transform duration-300 scale-100 hover:scale-110">
                <TechLogo name={selectedSkill.name} size={110} />
              </div>
            </div>

            <div className="font-mono text-xs text-[#77756f] mb-1">
              Atomic No. {selectedSkill.atomicNumber < 10 ? `0${selectedSkill.atomicNumber}` : selectedSkill.atomicNumber} · {selectedSkill.symbol}
            </div>

            <h3 className="font-display font-bold text-2xl text-[#0d0d0d] mb-1">
              {selectedSkill.name}
            </h3>

            <div className="inline-block px-3 py-1 rounded-full bg-[#f4f2ee] font-mono text-[10px] text-[#3a3a3a] border border-[rgba(13,13,13,0.08)] mb-6">
              Family: {selectedSkill.family}
            </div>

            {/* Projects Utilizing Skill */}
            <div className="w-full text-left border-t border-[rgba(13,13,13,0.08)] pt-4">
              <span className="font-mono text-[9px] text-[#a9a6a0] uppercase block mb-2">
                Production Implementation
              </span>
              <ul className="space-y-1.5 font-mono text-xs text-[#3a3a3a]">
                {selectedSkill.projects.map((proj) => (
                  <li key={proj} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                    <span className="truncate">{proj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
