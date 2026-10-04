"use client";

import React from "react";

interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export function isBrand(name: string): boolean {
  const concepts = [
    "DSA",
    "OOP",
    "System Design",
    "REST APIs",
    "Concepts",
    "Algorithmic Optimization",
    "Data Structures Problem Solving"
  ];
  return !concepts.includes(name);
}

export const CONCEPT: Record<string, (s: number, className?: string) => React.ReactNode> = {
  DSA: (s, c) => (
    // Binary Tree / Graph nodes connected by thin lines
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="7" r="3.5" />
      <circle cx="8" cy="22" r="3.5" />
      <circle cx="24" cy="22" r="3.5" />
      <line x1="14" y1="10" x2="10" y2="19" />
      <line x1="18" y1="10" x2="22" y2="19" />
    </svg>
  ),
  OOP: (s, c) => (
    // Modular Isometric Cube with encapsulation layers
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 4L27 10.5V21.5L16 28L5 21.5V10.5L16 4Z" />
      <path d="M16 4V16M27 10.5L16 16M5 10.5L16 16" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  ),
  "System Design": (s, c) => (
    // Distributed Architecture / Load Balancer Cluster
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="5" width="8" height="6" rx="1.5" />
      <rect x="20" y="5" width="8" height="6" rx="1.5" />
      <rect x="12" y="21" width="8" height="6" rx="1.5" />
      <line x1="8" y1="11" x2="14" y2="21" />
      <line x1="24" y1="11" x2="18" y2="21" />
      <line x1="8" y1="8" x2="20" y2="8" strokeDasharray="2 2" />
    </svg>
  ),
  "REST APIs": (s, c) => (
    // Endpoint Request / Response Protocol exchange
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="11" r="3" />
      <circle cx="25" cy="21" r="3" />
      <path d="M10 11H22M22 11L18 7" />
      <path d="M22 21H10M10 21L14 25" />
    </svg>
  ),
  SQL: (s, c) => (
    // Cylindrical relational database schema
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="16" cy="8" rx="10" ry="4" />
      <path d="M6 8v8c0 2.2 4.5 4 10 4s10-1.8 10-4V8" />
      <path d="M6 16v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8" />
    </svg>
  )
};

export const BRAND: Record<string, (s: number, className?: string) => React.ReactNode> = {
  JavaScript: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <rect width="32" height="32" rx="6" fill="#F7DF1E" />
      <path d="M19 11v11c0 2-1 3-3 3-2 0-3-1-3-2l2-1.5c.3.5.7.8 1.2.8.7 0 1-.4 1-1.3V11h1.8zm6.5 0c1.7 0 3 1.2 3 3.3 0 2.2-1.3 3.4-3 3.4h-1.5v3.3h-1.8V11h3.3zm0 1.5h-1.5v2.2h1.5c.8 0 1.3-.4 1.3-1.1s-.5-1.1-1.3-1.1z" fill="#000" />
    </svg>
  ),
  TypeScript: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <rect width="32" height="32" rx="6" fill="#3178C6" />
      <path d="M8 12h8v2.5h-2.8v9h-2.5v-9H8V12zm9.5 3.5h2.2c1.3 0 2.2.8 2.2 2 0 1.3-.9 2.1-2.2 2.1h-2.2v-4.1zm0 5.6h2.4c1.5 0 2.5 1 2.5 2.4 0 1.5-1 2.5-2.5 2.5h-4.8V15h2.4v6.1z" fill="#fff" />
    </svg>
  ),
  Python: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <path d="M15.8 4c-4.3 0-4 1.9-4 1.9l.01 2h4.1v.6H9.7S6 8.1 6 12.4s3.3 4.1 3.3 4.1h2v-2.8s-.1-3.3 3.3-3.3h5.7s3.2.1 3.2-3.1-3.2-3.3-3.2-3.3H15.8zm-2.3 2.1a1 1 0 110 2 1 1 0 010-2z" fill="#387EB8" />
      <path d="M16.2 28c4.3 0 4-1.9 4-1.9l-.01-2h-4.1v-.6h6.2s3.7.4 3.7-3.9-3.3-4.1-3.3-4.1h-2v2.8s.1 3.3-3.3 3.3h-5.7s-3.2-.1-3.2 3.1 3.2 3.3 3.2 3.3h4.6zm2.3-2.1a1 1 0 110-2 1 1 0 010 2z" fill="#FFE052" />
    </svg>
  ),
  React: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <ellipse cx="16" cy="16" rx="3.5" ry="3.5" fill="#00D8FF" />
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#00D8FF" strokeWidth="1.5" fill="none" />
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#00D8FF" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#00D8FF" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)" />
    </svg>
  ),
  "Next.js": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <circle cx="16" cy="16" r="15" fill="#000000" />
      <path d="M22.5 24.5L12.8 11.5H10.5V20.5H12.5V14.1L21 25.4C21.5 25.1 22 24.8 22.5 24.5Z" fill="#fff" />
      <path d="M20 11.5H22V20H20V11.5Z" fill="#fff" />
    </svg>
  ),
  "Next.js 15": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <circle cx="16" cy="16" r="15" fill="#000000" />
      <path d="M22.5 24.5L12.8 11.5H10.5V20.5H12.5V14.1L21 25.4C21.5 25.1 22 24.8 22.5 24.5Z" fill="#fff" />
      <path d="M20 11.5H22V20H20V11.5Z" fill="#fff" />
    </svg>
  ),
  "Tailwind CSS": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <path d="M16 9c-3.6 0-5.8 1.8-6.7 5.4 1.3-1.8 2.9-2.5 4.7-2 1.1.3 1.8 1.1 2.7 1.9 1.4 1.4 3 3 6.6 3 3.6 0 5.8-1.8 6.7-5.4-1.3 1.8-2.9 2.5-4.7 2-1.1-.3-1.8-1.1-2.7-1.9-1.4-1.4-3-3-6.6-3zM9.3 17.3c-3.6 0-5.8 1.8-6.7 5.4 1.3-1.8 2.9-2.5 4.7-2 1.1.3 1.8 1.1 2.7 1.9 1.4 1.4 3 3 6.6 3 3.6 0 5.8-1.8 6.7-5.4-1.3 1.8-2.9 2.5-4.7 2-1.1-.3-1.8-1.1-2.7-1.9-1.4-1.4-3-3-6.6-3z" fill="#38BDF8" />
    </svg>
  ),
  "Node.js": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <path d="M16 4l12 7v14l-12 7-12-7V11l12-7z" fill="#5FA04E" />
      <path d="M16 11c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z" fill="#fff" />
    </svg>
  ),
  "Express.js": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <rect width="32" height="32" rx="6" fill="#111" />
      <text x="16" y="20" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ex</text>
    </svg>
  ),
  Express: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <rect width="32" height="32" rx="6" fill="#111" />
      <text x="16" y="20" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ex</text>
    </svg>
  ),
  WebSockets: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 24 24" className={c} stroke="currentColor" strokeWidth="2" fill="none">
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M7 12a5 5 0 0 1 10 0" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  ),
  MongoDB: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <path d="M16 3S9 10 9 17.5C9 23 13 27 16 29c3-2 7-6 7-11.5C23 10 16 3 16 3z" fill="#47A248" />
      <path d="M16 3v26c-.3-.2-7-5.5-7-11.5C9 10 16 3 16 3z" fill="#499D4A" />
    </svg>
  ),
  PostgreSQL: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <circle cx="16" cy="16" r="14" fill="#336791" />
      <path d="M10 12c2-2 6-2 9 0 2 1.5 3 4 3 7 0 3.5-2.5 6-6 6-2 0-4-1-5-2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "Gemini AI": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <path d="M16 3C16 10 10 16 3 16C10 16 16 22 16 29C16 22 22 16 29 16C22 16 16 10 16 3Z" fill="url(#geminiGrad)" />
      <defs>
        <linearGradient id="geminiGrad" x1="3" y1="3" x2="29" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1B73E8" />
          <stop offset="0.5" stopColor="#7B1FA2" />
          <stop offset="1" stopColor="#D93025" />
        </linearGradient>
      </defs>
    </svg>
  ),
  "Vapi AI": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <rect width="32" height="32" rx="6" fill="#18181B" />
      <path d="M8 16h3v4H8zm5-6h3v16h-3zm5 3h3v10h-3zm5 4h3v2h-3z" fill="#6366F1" />
    </svg>
  ),
  Vapi: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <rect width="32" height="32" rx="6" fill="#18181B" />
      <path d="M8 16h3v4H8zm5-6h3v16h-3zm5 3h3v10h-3zm5 4h3v2h-3z" fill="#6366F1" />
    </svg>
  ),
  Twilio: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <circle cx="16" cy="16" r="14" fill="#F22F46" />
      <circle cx="12" cy="12" r="2.5" fill="#fff" />
      <circle cx="20" cy="12" r="2.5" fill="#fff" />
      <circle cx="12" cy="20" r="2.5" fill="#fff" />
      <circle cx="20" cy="20" r="2.5" fill="#fff" />
    </svg>
  ),
  "Twilio API": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <circle cx="16" cy="16" r="14" fill="#F22F46" />
      <circle cx="12" cy="12" r="2.5" fill="#fff" />
      <circle cx="20" cy="12" r="2.5" fill="#fff" />
      <circle cx="12" cy="20" r="2.5" fill="#fff" />
      <circle cx="20" cy="20" r="2.5" fill="#fff" />
    </svg>
  ),
  "Git & GitHub": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <circle cx="16" cy="16" r="14" fill="#F05032" />
      <path d="M16 8v16M11 12l5 4 5-4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Docker: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <rect width="32" height="32" rx="6" fill="#2496ED" />
      <path d="M7 16h3v3H7zm4 0h3v3h-3zm4 0h3v3h-3zm-4-4h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3zm-13 8c1 4 4 6 9 6s8-2 9-6H6z" fill="#fff" />
    </svg>
  ),
  Postman: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <circle cx="16" cy="16" r="14" fill="#FF6C37" />
      <path d="M10 18l12-8-4 12-3-3-5-1z" fill="#fff" />
    </svg>
  ),
  "HTML5 & A11y": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <path d="M6 4l2 20 8 4 8-4 2-20H6z" fill="#E34F26" />
      <path d="M16 7v18.5l6-3 1.5-15.5H16z" fill="#EF652A" />
      <path d="M16 11h-4l.3 3h3.7v3h-3.4l.3 3 3.1.8V23l-5-1.4-.6-6.6h5.6V11z" fill="#fff" />
    </svg>
  ),
  "Modern CSS": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <path d="M6 4l2 20 8 4 8-4 2-20H6z" fill="#1572B6" />
      <path d="M16 7v18.5l6-3 1.5-15.5H16z" fill="#33A9DC" />
      <path d="M16 11h-4l.3 3h3.7v3h-3.4l.3 3 3.1.8V23l-5-1.4-.6-6.6h5.6V11z" fill="#fff" />
    </svg>
  ),
  Puppeteer: (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <circle cx="16" cy="16" r="14" fill="#00D8A2" />
      <circle cx="12" cy="14" r="2" fill="#000" />
      <circle cx="20" cy="14" r="2" fill="#000" />
    </svg>
  ),
  "Google TTS": (s, c) => (
    <svg width={s} height={s} viewBox="0 0 32 32" className={c} fill="none">
      <circle cx="16" cy="16" r="14" fill="#4285F4" />
      <path d="M11 12h3l4-4v16l-4-4h-3v-8z" fill="#fff" />
    </svg>
  )
};

export function TechLogo({ name, className = "", size = 24 }: TechLogoProps) {
  // Check BRAND map first
  if (BRAND[name]) {
    return <>{BRAND[name](size, className)}</>;
  }

  // Check CONCEPT map
  if (CONCEPT[name]) {
    return <>{CONCEPT[name](size, className)}</>;
  }

  // Fallback to minimal luxury concept icon
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth="1.5" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9 9h6M9 13h6M9 17h3" />
    </svg>
  );
}
