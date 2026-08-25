import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categorizedStacks = [
  {
    category: "FRONTEND & UI",
    items: [
      { name: "HTML", tag: "Markup" },
      { name: "CSS", tag: "Styling" },
      { name: "JavaScript", tag: "Language" },
      { name: "React", tag: "Library" },
      { name: "Tailwind CSS", tag: "Framework" },
      { name: "GSAP", tag: "Animation" },
    ],
  },
  {
    category: "BACKEND & DATABASES",
    items: [
      { name: "Python", tag: "Language" },
      { name: "MySQL", tag: "Database" },
      { name: "C++", tag: "Language" },
      { name: "Apache", tag: "Server" },
    ],
  },
];

const experiences = [{
  role: "Freelance Full Stack Developer",
  company: "Self-Employed",
  period: "2024 — PRESENT",
  description: "Architecting and developing custom web applications with React, Next.js, and modern backends. Focus on web performance, responsive UI animations, and clean architecture.",
  bullets: [
    "Built custom web solutions optimized for fast core web vitals.",
    "Integrated REST/Database layers with modular UI components.",
  ],
}];

const academics = [{
  degree: "Bachelor of Science in Information Technology",
  institution: "BATANGAS STATE UNIVERSITY - ARASOF",
  period: "2021 — 2025",
  description: "Focused on software engineering principles, database design, modern web architecture, and algorithms.",
}];

const certifications = [
  {
    title: "IT Specialist - Databases",
    issuer: "Certification Program",
    year: "2024",
    description: "Demonstrated a practical understanding of database design, query logic, and data organization for modern application systems.",
    image: new URL("../assets/it-specialist-1.png", import.meta.url).href,
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Networking Fundamentals",
    year: "2024",
    description: "Strengthened foundational networking knowledge, including connectivity, troubleshooting, and operational understanding of digital systems.",
    image: new URL("../assets/ccna-intro-to-net-1.png", import.meta.url).href,
  },
];

export default function Skills() {
  const skillsSection = useRef(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(
      { desktop: "(min-width: 768px)", reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        if (context.conditions.reduceMotion) return undefined;
        const section = skillsSection.current;
        const revealTargets = section.querySelectorAll(".skills-title, .skills-group, .stack-item, .skills-panel, .cert-card");
        const interactiveTargets = section.querySelectorAll(".tech-card, .skills-panel-card, .cert-card");
        const handlers = [];

        gsap.from(revealTargets, {
          y: 44,
          opacity: 0,
          scale: 0.97,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".cert-image", {
          scale: 0.92,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".certificates-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        interactiveTargets.forEach((target) => {
          const enter = () => gsap.to(target, { y: -6, duration: 0.25, ease: "power2.out", overwrite: "auto" });
          const leave = () => gsap.to(target, { y: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
          target.addEventListener("pointerenter", enter);
          target.addEventListener("pointerleave", leave);
          handlers.push({ target, enter, leave });
        });

        return () => handlers.forEach(({ target, enter, leave }) => {
          target.removeEventListener("pointerenter", enter);
          target.removeEventListener("pointerleave", leave);
        });
      }
    );
  }, { scope: skillsSection });

  return (
    <section ref={skillsSection} id="skills" className="relative min-h-screen overflow-hidden px-5 py-16 sm:px-8 md:py-24">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-14">
        <header className="skills-title flex flex-col gap-4 border-l-2 border-amber-400 pl-5 sm:pl-8">
          <h2 className="font-bebas text-6xl leading-none text-neutral-300 sm:text-8xl md:text-9xl">TECH <span className="text-amber-400">PROFILE</span></h2>
          <p className="max-w-xl font-inter text-sm leading-relaxed text-neutral-400 sm:text-base">A practical toolkit for building fast, expressive, and maintainable digital experiences.</p>
        </header>

        <div className="flex flex-col gap-12">
          {categorizedStacks.map((group) => {
            return (
              <div key={group.category} className="skills-group flex flex-col gap-5">
                <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
                  <h3 className="font-bebas text-xl tracking-[0.18em] text-neutral-300 sm:text-2xl">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((tech) => (
                    <div key={tech.name} className="stack-item group flex items-center gap-2 rounded-full border border-neutral-800/80 bg-neutral-950 px-4 py-2 shadow-lg transition-colors duration-300 hover:border-amber-400/60 hover:bg-neutral-900/70">
                      <h4 className="font-bebas text-lg tracking-wider text-neutral-200 transition-colors group-hover:text-amber-400">{tech.name}</h4>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-neutral-500">{tech.tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <TimelinePanel title="WORK" accent="EXPERIENCE" icon={Briefcase}>
            {experiences.map((experience) => (
              <article key={experience.role} className="skills-panel-card rounded-xl border border-neutral-800/80 bg-neutral-950 p-5 shadow-lg">
                <div className="flex flex-col gap-2 border-b border-neutral-800 pb-4 sm:flex-row sm:items-start sm:justify-between"><div><h4 className="font-bebas text-2xl tracking-wider text-neutral-200">{experience.role}</h4><p className="font-bebas text-lg tracking-wider text-amber-400">@{experience.company}</p></div><span className="font-mono text-xs text-neutral-500">{experience.period}</span></div>
                <p className="mt-4 font-inter text-sm leading-relaxed text-neutral-400">{experience.description}</p>
                <ul className="mt-4 space-y-2">{experience.bullets.map((bullet) => <li key={bullet} className="flex gap-2 font-inter text-sm leading-relaxed text-neutral-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />{bullet}</li>)}</ul>
              </article>
            ))}
          </TimelinePanel>

          <TimelinePanel title="ACADEMIC" accent="BACKGROUND" icon={GraduationCap}>
            {academics.map((academic) => (
              <article key={academic.degree} className="skills-panel-card rounded-xl border border-neutral-800/80 bg-neutral-950 p-5 shadow-lg">
                <div className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-4"><h4 className="font-bebas text-2xl tracking-wider text-neutral-200">{academic.degree}</h4><Award className="h-7 w-7 shrink-0 text-amber-400" strokeWidth={1.5} /></div>
                <p className="mt-4 font-bebas text-lg tracking-wider text-amber-400">@{academic.institution}</p><span className="font-mono text-xs text-neutral-500">{academic.period}</span><p className="mt-4 font-inter text-sm leading-relaxed text-neutral-300">{academic.description}</p>
              </article>
            ))}
          </TimelinePanel>
        </div>

        <div className="certificates-section flex flex-col gap-6">
          <div className="skills-title flex items-center gap-3 border-l-2 border-amber-400 pl-5 sm:pl-8">
            <Award className="h-5 w-5 text-amber-400" />
            <h3 className="font-bebas text-3xl tracking-[0.14em] text-neutral-300 sm:text-5xl">CERTIFICATIONS</h3>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {certifications.map((cert) => (
              <article
                key={cert.title}
                className="cert-card cursor-pointer rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:border-amber-400/60"
                onClick={() => setSelectedCertificate(cert)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedCertificate(cert);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View certificate: ${cert.title}`}
              >
                <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-3">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="cert-image h-52 w-full rounded-lg object-contain bg-white p-3 sm:h-64"
                  />
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-500">
                      {cert.issuer}
                    </p>
                    <h4 className="mt-2 font-bebas text-3xl tracking-wider text-neutral-200">
                      {cert.title}
                    </h4>
                  </div>
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-amber-300">
                    {cert.year}
                  </span>
                </div>

                <p className="mt-4 font-inter text-sm leading-relaxed text-neutral-400">
                  {cert.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {selectedCertificate && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
            onClick={() => setSelectedCertificate(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Certificate preview"
          >
            <div
              className="relative w-full max-w-4xl rounded-3xl border border-neutral-800 bg-neutral-950 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-xl text-neutral-200 transition hover:border-amber-400 hover:text-amber-300"
                aria-label="Close certificate preview"
              >
                ×
              </button>

              <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="max-h-[72vh] w-full rounded-xl object-contain bg-white p-4"
                />
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                    {selectedCertificate.issuer}
                  </p>
                  <h4 className="mt-2 font-bebas text-4xl tracking-wider text-neutral-200">
                    {selectedCertificate.title}
                  </h4>
                </div>
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                  {selectedCertificate.year}
                </span>
              </div>

              <p className="mt-4 font-inter text-sm leading-relaxed text-neutral-300">
                {selectedCertificate.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TimelinePanel({ title, accent, icon: Icon, children }) {
  return <div className="skills-panel flex flex-col gap-5"><div className="flex items-center gap-3 border-b border-neutral-800 pb-3"><Icon className="h-5 w-5 text-amber-400" /><h3 className="font-bebas text-xl tracking-[0.18em] text-neutral-300 sm:text-2xl">{title}</h3><span className="font-bebas text-xl tracking-[0.18em] text-amber-400 sm:text-2xl">{accent}</span></div>{children}</div>;
}
