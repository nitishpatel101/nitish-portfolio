export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  degree: string;
  institution: string;
  gradYear: string;
  cgpa: string;
  resumeSummary: string;
  secondaryLine: string;
  quote: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  resumePath: string;
  idNumber: string;
  department: string;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface SkillItem {
  atomicNumber: number;
  symbol: string;
  name: string;
  family: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'AI & Tools' | 'Concepts';
  projects: string[];
  isConcept?: boolean;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  location: string;
  cgpa: string;
  coursework: string[];
}

export interface ExperienceItem {
  title: string;
  organization: string;
  year: string;
  location: string;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  kicker: string;
  title: string;
  description: string;
  features: [string, string];
  tech: string[];
  github?: string;
  live?: string;
  illustrativeType: 'whatsapp' | 'telephony' | 'ecommerce';
}

export interface CertificationItem {
  id: string;
  index: string;
  title: string;
  issuer: string;
  year: string;
  link?: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  type: 'education' | 'experience';
  title: string;
  organization: string;
  location: string;
  details: string[];
  badge?: string;
}

export interface AchievementItem {
  id: string;
  index: string;
  platform: string;
  numberValue: number;
  suffix: string;
  label: string;
  caption: string;
  detail: string;
  color: string;
}

export const PROFILE: Profile = {
  name: "Nitish Kumar",
  firstName: "NITISH",
  lastName: "KUMAR",
  role: "Full Stack Web Developer",
  email: "n70105453@gmail.com",
  phone: "+91 9794852980",
  phoneHref: "tel:+919794852980",
  location: "Kushinagar, Uttar Pradesh, India",
  degree: "Bachelor of Computer Applications (BCA)",
  institution: "University of Delhi",
  gradYear: "2025",
  cgpa: "8.1 / 10",
  resumeSummary: "Dynamic Full Stack Web Developer and BCA graduate from the University of Delhi (8.1 CGPA) with proven ability in building high-performance web applications, autonomous AI conversational agents, and real-time voice automation pipelines. Strong foundation in JavaScript/TypeScript, Python, React, Next.js, and Node.js. Dedicated to clean architecture, modular software design, and accessible, responsive user experiences.",
  secondaryLine: "Specialized in sub-second load times, autonomous Gemini LLM agents, and full-duplex telephony engineering.",
  quote: "Committed to crafting high-performance, quiet web experiences and production-grade conversational AI.",
  github: "https://github.com/nitishkumar-dev",
  linkedin: "https://linkedin.com/in/nitishkumar-dev",
  resumeUrl: "/resume.pdf",
  resumePath: "/resume.pdf",
  idNumber: "NK-2025-DU81",
  department: "Web Systems & AI Engineering"
};

// Navigation lists strictly: About · Skills · Work · Experience · Achievements · Contact
export const NAV: NavItem[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Achievements", href: "#achievements", id: "achievements" },
  { label: "Contact", href: "#contact", id: "contact" }
];
export const NAV_ITEMS = NAV;

export const SKILL_FAMILIES = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "AI & Tools",
  "Concepts"
] as const;

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python 3", "HTML5", "CSS3 / Modern CSS", "SQL"]
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js 15 (App Router)", "Tailwind CSS", "Responsive Design", "State Management"]
  },
  {
    category: "Backend & APIs",
    skills: ["Node.js", "Express.js", "RESTful APIs", "WebSockets", "Python (FastAPI / Flask)"]
  },
  {
    category: "AI & Automation",
    skills: ["Google Gemini API", "LangChain", "Vapi AI", "Twilio Telephony", "Puppeteer", "WhatsApp Business Automation"]
  },
  {
    category: "Databases & Tools",
    skills: ["MongoDB", "PostgreSQL", "Git", "GitHub", "Docker", "Postman", "Linux / CLI", "Vercel"]
  }
];

export const SKILLS: SkillItem[] = [
  { atomicNumber: 1, symbol: "Js", name: "JavaScript", family: "Languages", projects: ["WhatsApp AI Agent", "Voice Calling Agent", "Modern Storefront"] },
  { atomicNumber: 2, symbol: "Ts", name: "TypeScript", family: "Languages", projects: ["Portfolio System", "Full Stack Web Apps"] },
  { atomicNumber: 3, symbol: "Py", name: "Python", family: "Languages", projects: ["FastAPI Microservices", "Data Pipelines & Automation"] },
  { atomicNumber: 4, symbol: "Re", name: "React", family: "Frontend", projects: ["Apparel E-Commerce", "Admin Dashboards"] },
  { atomicNumber: 5, symbol: "Nx", name: "Next.js 15", family: "Frontend", projects: ["Quiet Luxury Portfolio", "High-Performance SSR Platforms"] },
  { atomicNumber: 6, symbol: "Tw", name: "Tailwind CSS", family: "Frontend", projects: ["Design Systems", "Interactive UI Components"] },
  { atomicNumber: 7, symbol: "Nd", name: "Node.js", family: "Backend", projects: ["WhatsApp Web AI Server", "Twilio Voice Backend"] },
  { atomicNumber: 8, symbol: "Ex", name: "Express.js", family: "Backend", projects: ["RESTful APIs", "Webhook Ingestion Endpoints"] },
  { atomicNumber: 9, symbol: "Ws", name: "WebSockets", family: "Backend", projects: ["Twilio Media Streaming", "Live Chat Sync"] },
  { atomicNumber: 10, symbol: "Mg", name: "MongoDB", family: "Databases", projects: ["Conversational Memory Store", "User Data Storage"] },
  { atomicNumber: 11, symbol: "Pg", name: "PostgreSQL", family: "Databases", projects: ["Relational Inventory Schemas", "Auth Records"] },
  { atomicNumber: 12, symbol: "Ai", name: "Gemini AI", family: "AI & Tools", projects: ["Multi-Modal WhatsApp Bot", "Automated Reasoning Engine"] },
  { atomicNumber: 13, symbol: "Vp", name: "Vapi AI", family: "AI & Tools", projects: ["Conversational Speech Assistant", "Telephony Workflows"] },
  { atomicNumber: 14, symbol: "Tw", name: "Twilio API", family: "AI & Tools", projects: ["Inbound/Outbound Phone Trunks", "Audio Media Streaming"] },
  { atomicNumber: 15, symbol: "Gt", name: "Git & GitHub", family: "AI & Tools", projects: ["Version Control", "Continuous Deployment Workflows"] },
  { atomicNumber: 16, symbol: "Dk", name: "Docker", family: "AI & Tools", projects: ["Containerized Deployments", "Microservices"] },
  { atomicNumber: 17, symbol: "Ds", name: "DSA", family: "Concepts", projects: ["Algorithmic Optimization", "Data Structures Problem Solving"], isConcept: true },
  { atomicNumber: 18, symbol: "Op", name: "OOP", family: "Concepts", projects: ["Modular Backend Architecture", "Design Patterns"], isConcept: true },
  { atomicNumber: 19, symbol: "Sd", name: "System Design", family: "Concepts", projects: ["Low-Latency Audio Pipelines", "Scalable Server Clusters"], isConcept: true },
  { atomicNumber: 20, symbol: "Ra", name: "REST APIs", family: "Concepts", projects: ["Enterprise API Contracts", "Third-Party Integrations"], isConcept: true },
  { atomicNumber: 21, symbol: "H5", name: "HTML5 & A11y", family: "Frontend", projects: ["Semantic Markup", "Lighthouse 100 Standards"] },
  { atomicNumber: 22, symbol: "C3", name: "Modern CSS", family: "Frontend", projects: ["Fluid Typography", "Hardware-Accelerated Motion"] },
  { atomicNumber: 23, symbol: "Sq", name: "SQL", family: "Databases", projects: ["Complex Queries", "Relational Database Design"] },
  { atomicNumber: 24, symbol: "Pm", name: "Postman", family: "AI & Tools", projects: ["API Integration Testing", "Webhook Mocking"] }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "University of Delhi",
    year: "2022 – 2025",
    location: "New Delhi, India",
    cgpa: "8.1 / 10 (Distinction)",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java/Python)",
      "Database Management Systems",
      "Computer Networks",
      "Web Technologies"
    ]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Full Stack & AI Automation Developer",
    organization: "Independent Engineering & Client Projects",
    year: "2024 – Present",
    location: "Kushinagar / Remote",
    bullets: [
      "Architected and deployed autonomous multi-channel AI assistants integrating Google Gemini LLM, Node.js, and WhatsApp Web automation with real-time text and Google TTS voice note synthesis.",
      "Implemented full-duplex conversational voice telephony agents bridging Twilio telephony trunks with Vapi AI engines over WebSockets, achieving sub-500ms latency speech-to-speech interaction.",
      "Developed high-conversion modern web applications using Next.js 15, TypeScript, and Tailwind CSS with sub-second page loads and 95+ Google Lighthouse scores across all metrics."
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "whatsapp-ai-agent",
    index: "01",
    kicker: "Autonomous Conversational Agent",
    title: "WhatsApp Autonomous AI Assistant",
    description: "Production-ready automated WhatsApp assistant engineered with Node.js, Google Gemini LLM, and WhatsApp Web automation. Features conversation memory retention, dynamic persona prompts, and automated Google Cloud TTS voice note generation.",
    features: [
      "Gemini 1.5 multi-turn context retention & dynamic persona routing",
      "Google TTS automated voice note generation & audio dispatch"
    ],
    tech: ["Node.js", "Gemini AI", "Puppeteer", "Google TTS", "WebSockets"],
    github: "https://github.com/nitishkumar-dev/whatsapp-ai-agent",
    illustrativeType: "whatsapp"
  },
  {
    id: "voice-calling-agent",
    index: "02",
    kicker: "Real-Time Telephony Infrastructure",
    title: "AI Voice Telephony Agent",
    description: "Low-latency bidirectional voice automation pipeline connecting cellular phone trunks with Vapi and Twilio over bidirectional WebSockets. Achieves sub-500ms conversational turnarounds with real-time speech transcription and automated lead capture.",
    features: [
      "Twilio Media Stream WebSockets with sub-500ms voice turnaround",
      "Real-time speech-to-text, LLM function calling & call transcription"
    ],
    tech: ["Vapi", "Twilio", "Node.js", "WebSockets", "Express"],
    github: "https://github.com/nitishkumar-dev/voice-calling-agent",
    illustrativeType: "telephony"
  },
  {
    id: "luxury-ecommerce",
    index: "03",
    kicker: "High-Performance Modern Web Platform",
    title: "Luxury Apparel E-Commerce Platform",
    description: "Curated digital storefront built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Features dynamic client-side filtering, zero-CLS image loading, responsive sliding cart drawer, and Lighthouse scores exceeding 95 across all metrics.",
    features: [
      "Sub-second page transitions with Next.js App Router & ISR",
      "Lighthouse 99 Performance & 100 Accessibility audit compliance"
    ],
    tech: ["Next.js 15", "React 19", "Tailwind CSS", "TypeScript", "PostgreSQL"],
    github: "https://github.com/nitishkumar-dev/luxury-apparel-store",
    illustrativeType: "ecommerce"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-1",
    index: "01",
    title: "Full Stack Web Development Professional Certificate",
    issuer: "Comprehensive Full-Stack Engineering Program",
    year: "2024",
    link: "https://github.com/nitishkumar-dev"
  },
  {
    id: "cert-2",
    index: "02",
    title: "Python Programming & Algorithmic Problem Solving",
    issuer: "Advanced Software Architecture & Data Structures",
    year: "2024",
    link: "https://github.com/nitishkumar-dev"
  },
  {
    id: "cert-3",
    index: "03",
    title: "Modern Cloud, Next.js & REST API Architecture",
    issuer: "Modern Web Standards & Cloud Deployment",
    year: "2025",
    link: "https://github.com/nitishkumar-dev"
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    id: "timeline-1",
    year: "2024 — Present",
    type: "experience",
    title: "Full Stack Developer & AI Solutions Engineer",
    organization: "Independent Engineering & Production Projects",
    location: "Kushinagar / Remote",
    details: [
      "Engineered autonomous WhatsApp AI agents integrating Google Gemini LLM and Google TTS for automated messaging and lifelike voice notes.",
      "Architected sub-500ms latency voice calling pipelines streaming Twilio audio over WebSockets into Vapi AI voice engine.",
      "Developed high-conversion modern web applications using Next.js 15, TypeScript, and Tailwind CSS with 95+ Lighthouse scores."
    ],
    badge: "Active"
  },
  {
    id: "timeline-2",
    year: "2022 — 2025",
    type: "education",
    title: "Bachelor of Computer Applications (BCA)",
    organization: "University of Delhi",
    location: "New Delhi, India",
    details: [
      "Graduated with 8.1 / 10 CGPA (81%) with First Class Distinction.",
      "Core coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Web Technologies.",
      "Active participant in technical symposiums, hackathons, and open-source software workshops."
    ],
    badge: "8.1 CGPA"
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-1",
    index: "01 / 04",
    platform: "University of Delhi",
    numberValue: 81,
    suffix: "%",
    label: "Academic Distinction",
    caption: "8.1 / 10 CGPA in BCA",
    detail: "Graduated with First Class Honours in Computer Applications",
    color: "#2563eb"
  },
  {
    id: "ach-2",
    index: "02 / 04",
    platform: "Production Architecture",
    numberValue: 500,
    suffix: "+",
    label: "Engineering Hours",
    caption: "Full-Stack & AI Pipeline Dev",
    detail: "Dedicated to robust architecture, clean code, and zero-latency agents",
    color: "#059669"
  },
  {
    id: "ach-3",
    index: "03 / 04",
    platform: "Software Repositories",
    numberValue: 15,
    suffix: "+",
    label: "Production Deployments",
    caption: "Web Apps & Autonomous Agents",
    detail: "End-to-end full stack web platforms, voice bots, and messaging tools",
    color: "#7c3aed"
  },
  {
    id: "ach-4",
    index: "04 / 04",
    platform: "Lighthouse Standard",
    numberValue: 99,
    suffix: "/100",
    label: "Performance Benchmark",
    caption: "Core Web Vitals Excellence",
    detail: "Sub-second first contentful paint, zero layout shift, semantic a11y",
    color: "#ea580c"
  }
];
