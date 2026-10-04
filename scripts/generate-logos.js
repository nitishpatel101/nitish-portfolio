const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/logos');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svgs = {
  'javascript.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#F7DF1E"/><path d="M19 11v11c0 2-1 3-3 3-2 0-3-1-3-2l2-1.5c.3.5.7.8 1.2.8.7 0 1-.4 1-1.3V11h1.8zm6.5 0c1.7 0 3 1.2 3 3.3 0 2.2-1.3 3.4-3 3.4h-1.5v3.3h-1.8V11h3.3zm0 1.5h-1.5v2.2h1.5c.8 0 1.3-.4 1.3-1.1s-.5-1.1-1.3-1.1z" fill="#000"/></svg>',
  'typescript.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#3178C6"/><path d="M8 12h8v2.5h-2.8v9h-2.5v-9H8V12zm9.5 3.5h2.2c1.3 0 2.2.8 2.2 2 0 1.3-.9 2.1-2.2 2.1h-2.2v-4.1zm0 5.6h2.4c1.5 0 2.5 1 2.5 2.4 0 1.5-1 2.5-2.5 2.5h-4.8V15h2.4v6.1z" fill="#fff"/></svg>',
  'python.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M15.8 4c-4.3 0-4 1.9-4 1.9l.01 2h4.1v.6H9.7S6 8.1 6 12.4s3.3 4.1 3.3 4.1h2v-2.8s-.1-3.3 3.3-3.3h5.7s3.2.1 3.2-3.1-3.2-3.3-3.2-3.3H15.8zm-2.3 2.1a1 1 0 110 2 1 1 0 010-2z" fill="#387EB8"/><path d="M16.2 28c4.3 0 4-1.9 4-1.9l-.01-2h-4.1v-.6h6.2s3.7.4 3.7-3.9-3.3-4.1-3.3-4.1h-2v2.8s.1 3.3-3.3 3.3h-5.7s-3.2-.1-3.2 3.1 3.2 3.3 3.2 3.3h4.6zm2.3-2.1a1 1 0 110-2 1 1 0 010 2z" fill="#FFE052"/></svg>',
  'react.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><ellipse cx="16" cy="16" rx="3.5" ry="3.5" fill="#00D8FF"/><ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#00D8FF" stroke-width="1.5" fill="none"/><ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#00D8FF" stroke-width="1.5" fill="none" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#00D8FF" stroke-width="1.5" fill="none" transform="rotate(120 16 16)"/></svg>',
  'nextjs.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#000"/><path d="M22.5 24.5L12.8 11.5H10.5V20.5H12.5V14.1L21 25.4C21.5 25.1 22 24.8 22.5 24.5Z" fill="#fff"/><path d="M20 11.5H22V20H20V11.5Z" fill="#fff"/></svg>',
  'tailwindcss.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 9c-3.6 0-5.8 1.8-6.7 5.4 1.3-1.8 2.9-2.5 4.7-2 1.1.3 1.8 1.1 2.7 1.9 1.4 1.4 3 3 6.6 3 3.6 0 5.8-1.8 6.7-5.4-1.3 1.8-2.9 2.5-4.7 2-1.1-.3-1.8-1.1-2.7-1.9-1.4-1.4-3-3-6.6-3zM9.3 17.3c-3.6 0-5.8 1.8-6.7 5.4 1.3-1.8 2.9-2.5 4.7-2 1.1.3 1.8 1.1 2.7 1.9 1.4 1.4 3 3 6.6 3 3.6 0 5.8-1.8 6.7-5.4-1.3 1.8-2.9 2.5-4.7 2-1.1-.3-1.8-1.1-2.7-1.9-1.4-1.4-3-3-6.6-3z" fill="#38BDF8"/></svg>',
  'nodejs.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 4l12 7v14l-12 7-12-7V11l12-7z" fill="#5FA04E"/><path d="M16 11c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z" fill="#fff"/></svg>',
  'mongodb.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 3S9 10 9 17.5C9 23 13 27 16 29c3-2 7-6 7-11.5C23 10 16 3 16 3z" fill="#47A248"/><path d="M16 3v26c-.3-.2-7-5.5-7-11.5C9 10 16 3 16 3z" fill="#499D4A"/></svg>',
  'postgresql.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#336791"/><path d="M10 12c2-2 6-2 9 0 2 1.5 3 4 3 7 0 3.5-2.5 6-6 6-2 0-4-1-5-2.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
  'docker.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#2496ED"/><path d="M7 16h3v3H7zm4 0h3v3h-3zm4 0h3v3h-3zm-4-4h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3zm-13 8c1 4 4 6 9 6s8-2 9-6H6z" fill="#fff"/></svg>',
  'git.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#F05032"/><path d="M16 8v16M11 12l5 4 5-4" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'twilio.svg': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#F22F46"/><circle cx="12" cy="12" r="2.5" fill="#fff"/><circle cx="20" cy="12" r="2.5" fill="#fff"/><circle cx="12" cy="20" r="2.5" fill="#fff"/><circle cx="20" cy="20" r="2.5" fill="#fff"/></svg>'
};

for (const [filename, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, filename), content);
}

console.log(`Created ${Object.keys(svgs).length} SVG brand logos in public/logos.`);
