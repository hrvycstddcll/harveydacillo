import { useRef } from "react";
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

export default function Skills() {
  const skillsSection = useRef(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add(
      { desktop: "(min-width: 768px)", reduceMotion: "(prefers-reduced-motion: reduce)" },
      (context) => {
        if (context.conditions.reduceMotion) return undefined;
        const section = skillsSection.current;
        const revealTargets = section.querySelectorAll(".skills-title, .skills-group, .stack-item, .skills-panel");
        const interactiveTargets = section.querySelectorAll(".tech-card, .skills-panel-card");
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
      </div>
    </section>
  );
}

function TimelinePanel({ title, accent, icon: Icon, children }) {
  return <div className="skills-panel flex flex-col gap-5"><div className="flex items-center gap-3 border-b border-neutral-800 pb-3"><Icon className="h-5 w-5 text-amber-400" /><h3 className="font-bebas text-xl tracking-[0.18em] text-neutral-300 sm:text-2xl">{title}</h3><span className="font-bebas text-xl tracking-[0.18em] text-amber-400 sm:text-2xl">{accent}</span></div>{children}</div>;
}
