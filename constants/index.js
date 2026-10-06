import htmlSvg from '../src/assets/stacksSvg/html5.svg';
import cssSvg from '../src/assets/stacksSvg/css3.svg';
import javascriptSvg from '../src/assets/stacksSvg/javascript.svg';
import reactSvg from '../src/assets/stacksSvg/react.svg';
import tailwindcssSvg from '../src/assets/stacksSvg/tailwind-css.svg';
import gsapSvg from '../src/assets/stacksSvg/gsap.svg';
import pythonSvg from '../src/assets/stacksSvg/python.svg';
import mysqlSvg from '../src/assets/stacksSvg/mysql-wordmark-light.svg';
import cplusplusSvg from '../src/assets/stacksSvg/c-plusplus.svg';
import apacheSvg from '../src/assets/stacksSvg/apache.svg';
import gitSvg from '../src/assets/stacksSvg/git.svg';
import githubSvg from '../src/assets/stacksSvg/github-mono.svg';
import npmSvg from '../src/assets/stacksSvg/npm.svg';
import viteSvg from '../src/assets/stacksSvg/vitejs.svg';
import vercelSvg from '../src/assets/stacksSvg/vercel-wordmark-light.svg';
import figmaSvg from '../src/assets/stacksSvg/figma.svg';
import chatgptSvg from '../src/assets/stacksSvg/openai-chatgpt.svg';
import geminiSvg from '../src/assets/stacksSvg/gemini.svg';
import claudeSvg from '../src/assets/stacksSvg/claude-ai.svg';
import opencodeSvg from '../src/assets/stacksSvg/opencode.svg';
import mimoSvg from '../src/assets/stacksSvg/xiaomi-mimo.svg';
import vscodeSvg from '../src/assets/stacksSvg/visual-studio-code.svg';
import antigravitySvg from '../src/assets/stacksSvg/google-antigravity.svg';

export const navLinks = [
    {id:"home", title:"HOME"},
    {id:"career", title:"CAREER"},
    {id:"projects", title:"PROJECTS"},
    {id:"contact", title:"CONTACT"},
]

export const aboutStats = [
    { icon: "GraduationCap", value: "3+", label: "Years of learning" },
    { icon: "Star", value: "100%", label: "Dedication and Curiosity" },
    { icon: "Code", value: "10+", label: "Tech-stacks explored" },
]

export const metrics = [
    { number: 2, suffix: "+", label: "Projects Completed" },
    { number: 10, suffix: "+", label: "Technologies Learned" },
    { number: 3, suffix: "+", label: "Years Of Coding" },
]

export const quote = {
    text: "\u201CVibecoded entirely using free AI, with like, maybe a major code fix or two along the way. Watching an idea come to life through conversation is incredible. If I can build this, you can too\u2014take the tools and start creating.\u201D",
    name: "HARVEY DACILLO",
    role: "Aspiring Software Engineer",
}

export const categorizedStacks = [
    {
        category: "FRONTEND & UI",
        items: [
            { name: "HTML", tag: "Markup", icon: "html", color: "#E34F26", description: "Semantic markup for accessible, SEO-friendly web structures" },
            { name: "CSS", tag: "Styling", icon: "css", color: "#1572B6", description: "Visual design, layouts, animations, and responsive interfaces" },
            { name: "JavaScript", tag: "Language", icon: "javascript", color: "#F7DF1E", description: "Dynamic interactivity, DOM manipulation, and async logic" },
            { name: "React", tag: "Library", icon: "react", color: "#61DAFB", description: "Component-based UI with hooks, state, and virtual DOM" },
            { name: "Tailwind CSS", tag: "Framework", icon: "tailwindcss", color: "#06B6D4", description: "Utility-first CSS for rapid, consistent UI development" },
            { name: "GSAP", tag: "Animation", icon: "gsap", color: "#88CE02", description: "High-performance timeline animations and scroll effects" },
        ],
    },
    {
        category: "BACKEND & DATABASES",
        items: [
            { name: "Python", tag: "Language", icon: "python", color: "#3776AB", description: "Scripting, APIs, data processing, and automation" },
            { name: "MySQL", tag: "Database", icon: "mysql", color: "#4479A1", description: "Relational data storage, queries, and schema design" },
            { name: "C++", tag: "Language", icon: "cplusplus", color: "#00599C", description: "Low-level systems, performance-critical algorithms" },
            { name: "Apache", tag: "Server", icon: "apache", color: "#D22128", description: "Web server config, mod_rewrite, and hosting" },
        ],
    },
    {
        category: "DEVELOPER TOOLS",
        items: [
            { name: "Git", tag: "Version Control", icon: "git", color: "#F05032", description: "Branching, merging, and change tracking" },
            { name: "GitHub", tag: "Platform", icon: "github", color: "#181717", description: "Code collaboration, PRs, issues, and CI/CD" },
            { name: "npm", tag: "Package Manager", icon: "npm", color: "#CB3837", description: "Dependency management and script automation" },
            { name: "Vite", tag: "Build Tool", icon: "vite", color: "#646CFF", description: "Lightning-fast dev server and optimized builds" },
            { name: "Vercel", tag: "Deployment", icon: "vercel", color: "#000000", description: "Instant deployments, serverless functions, and analytics" },
            { name: "Figma", tag: "Design", icon: "figma", color: "#F24E1E", description: "UI/UX design, prototyping, and design systems" },
        ],
    },
    {
        category: "AI PLATFORMS",
        items: [
            { name: "ChatGPT", tag: "LLM", icon: "chatgpt", color: "#412991", description: "Conversational AI for code generation and research" },
            { name: "Gemini", tag: "LLM", icon: "gemini", color: "#8E75B2", description: "Multimodal AI for text, code, and image tasks" },
            { name: "Claude", tag: "LLM", icon: "claude", color: "#191919", description: "Long-context reasoning and nuanced analysis" },
            { name: "OpenCodeZen", tag: "AI Coding", icon: "opencodezen", color: "#6366f1", description: "AI-powered coding assistant for faster development" },
            { name: "Mimo", tag: "Learning", icon: "mimo", color: "#f97316", description: "Interactive learning platform for coding skills" },
        ],
    },
    {
        category: "IDES & EDITORS",
        items: [
            { name: "VS Code", tag: "Editor", icon: "vscode", color: "#007ACC", description: "Extensible code editor with debugging and extensions" },
            { name: "Antigravity", tag: "AI IDE", icon: "antigravity", color: "#a855f7", description: "AI-native IDE with inline code suggestions" },
        ],
    },
]

export const skillIcons = {
    html: htmlSvg,
    css: cssSvg,
    javascript: javascriptSvg,
    react: reactSvg,
    tailwindcss: tailwindcssSvg,
    gsap: gsapSvg,
    python: pythonSvg,
    mysql: mysqlSvg,
    cplusplus: cplusplusSvg,
    apache: apacheSvg,
    git: gitSvg,
    github: githubSvg,
    npm: npmSvg,
    vite: viteSvg,
    vercel: vercelSvg,
    figma: figmaSvg,
    chatgpt: chatgptSvg,
    gemini: geminiSvg,
    claude: claudeSvg,
    opencodezen: opencodeSvg,
    mimo: mimoSvg,
    vscode: vscodeSvg,
    antigravity: antigravitySvg,
}

export const experiences = [{
  role: "Freelance Full Stack Developer",
  company: "Self-Employed",
  period: "2024 — PRESENT",
  description: "Architecting and developing custom web applications with React, Next.js, and modern backends. Focus on web performance, responsive UI animations, and clean architecture.",
  bullets: [
    "Built custom web solutions optimized for fast core web vitals.",
    "Integrated REST/Database layers with modular UI components.",
  ],
}];

export const academics = [
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "BATANGAS STATE UNIVERSITY - ARASOF",
    period: "2024 — PRESENT",
    description: "Focused on software engineering principles, database design, modern web architecture, and algorithms.",
    image: new URL("../src/assets/BSU-ARASOF.jpg", import.meta.url).href,
  },
  {
    degree: "Science, Technology, Engineering, and Mathematics",
    institution: "CALATAGAN SENIOR HIGH SCHOOL",
    period: "2022-2024",
    description: "Focuses on developing critical thinking, problem-solving, and analytical skills through evidence-based learning.",
    image: new URL("../src/assets/CSHS.jpg", import.meta.url).href,
  }
];

export const certifications = [
  {
    title: "IT Specialist - Databases",
    issuer: "Certification Program",
    year: "2026",
    description: "Demonstrated a practical understanding of database design, query logic, and data organization for modern application systems.",
    image: new URL("../src/assets/it-specialist-1.png", import.meta.url).href,
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Networking Fundamentals",
    year: "2026",
    description: "Strengthened foundational networking knowledge, including connectivity, troubleshooting, and operational understanding of digital systems.",
    image: new URL("../src/assets/ccna-intro-to-net-1.png", import.meta.url).href,
  },
];

export const projects = [
  {
    id: '01',
    title: 'BIO-CLICK-DONE',
    category: 'Full Stack Development',
    shortDescription: 'A Python and SQLite-powered information system built as an academic semestral project for digital scholar profiling.',
    fullDescription: 'Developed as a semestral project, the BCD Scholarship Profiling System replaces manual paper-based workflows with a centralized, local digital database. Built to streamline scholar management for administrators and applicants, it offers automated eligibility tracking, data verification, and secure record exports.',
    features: [
      'Automated applicant verification & eligibility checks',
      'Role-based access control for administrators and students',
      'Instant report generation and export capabilities',
      'Offline-first local database support via SQLite'
    ],
    githubUrl: 'https://github.com/hrvycstddcll/BCD-Scholar-Bio-Click-Done',
    liveUrl: null,
    image: 'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p1s1.png',
    screenshots: [
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p1icon.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/Project1.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p1s1.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p1s2.png',
    ],
    tags: ['Python', 'SQLite', 'PyQt5', 'Desktop GUI'],
  },
  {
    id: '02',
    title: 'Hamster Pet Shop System',
    category: 'Full Stack Web Development',
    shortDescription: 'A Python, and MySQL-powered management system built as a semestral project running locally via XAMPP.',
    fullDescription: 'The Hamster Pet Shop System is a database-driven application built as a semestral project to manage pet shop operations locally. Hosted using XAMPP (Apache & MySQL) with Python backend integration, it provides centralized management for hamster supplies, customer transactions, automated inventory tracking, and sales reporting in a local environment.',
    features: [
      'Interactive product catalog with automated inventory updates',
      'Python-driven data processing and backend logic',
      'Local relational database management powered by MySQL',
      'Role-based features for administrative management and reporting',
      'Offline-first local web deployment hosted via XAMPP (Apache)'
    ],
    githubUrl: 'https://github.com/hrvycstddcll/HamsterPetShop',
    liveUrl: null,
    image: 'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s2.png',
    screenshots: [
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2icon.jpg',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s1.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s2.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s3.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s4.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s5.png'
    ],
    tags: ['Python', 'MySQL', 'Apache', 'XAMPP'],
  },
];

export const contact = {
  email: 'Harvey.custodio.dacillo@gmail.com',
  availability: 'Available for commissions',
  message: 'Have an idea, a project, or a good challenge? Send it over and let’s make it real.',
  links: [
    { label: 'Email', value: 'Harvey.custodio.dacillo@gmail.com', href: 'mailto:Harvey.custodio.dacillo@gmail.com', icon: 'mail' },
    { label: 'Phone', value: '0991 960 2127', href: 'tel:09919602127', icon: 'phone' },
    { label: 'Location', value: 'Calatagan, Batangas', icon: 'map' },
    { label: 'GitHub', value: 'github.com/hrvycstddcll', href: 'https://github.com/hrvycstddcll', icon: 'github', external: true },
    { label: 'Facebook', value: 'facebook.com/harvey.custodio.dacillo', href: 'https://www.facebook.com/harvey.custodio.dacillo', icon: 'facebook', external: true },
  ],
};