import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { useState } from "react";

const skillGroups = [
  { label: "Frontend", items: ["React", "JavaScript", "HTML / CSS", "Tailwind CSS", "GSAP"] },
  { label: "Backend", items: ["Python", "MySQL", "C++", "Apache"] },
];

const education = {
  degree: "Bachelor of Science in Information Technology",
  school: "Batangas State University - ARASOF",
  period: "2021 — PRESENT",
};

const experience = {
  role: "Freelance Full Stack Developer",
  company: "Self-Employed",
  period: "2024 — Present",
  description: "Architecting custom web applications with React, Next.js, and modern backends, with a focus on performance, responsive interfaces, and maintainable code.",
};

const projects = [
  {
    number: "01",
    title: "Bio-Click-Done",
    type: "Desktop application",
    description: "A scholarship profiling system that makes applicant verification and record management clearer.",
    source: "https://github.com/hrvycstddcll/BCD-Scholar-Bio-Click-Done",
  },
  {
    number: "02",
    title: "Hamster Pet Shop",
    type: "Desktop application",
    description: "A database-driven shop system for inventory, transactions, and operational reporting.",
    source: "https://github.com/hrvycstddcll/HamsterPetShop",
  },
];

const navItems = ["home", "skills", "projects", "contact"];

export default function Simplified() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const menuClasses = [
    menuOpen ? "flex" : "hidden",
    "absolute left-0 right-0 top-[68px] flex-col gap-5 border-b border-black/15 bg-white px-5 py-6",
    "lg:static lg:flex lg:flex-row lg:gap-8 lg:border-0 lg:px-0 lg:py-0",
  ].join(" ");

  return (
    <main className="min-h-screen bg-white font-inter text-black selection:bg-black selection:text-white">
      <nav className="sticky top-0 z-40 border-b border-black/15 bg-white/95 px-5 py-4 backdrop-blur sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="#home" onClick={closeMenu} className="font-serif text-base font-bold tracking-tight">
            Harvey Custodio Dacillo
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            Menu
          </button>

          <div className={menuClasses}>
            {navItems.map((item) => (
              <a
                key={item}
                href={"#" + item}
                onClick={closeMenu}
                className="font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:text-black"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="mx-auto max-w-5xl px-5 pb-14 pt-14 sm:px-8 sm:pt-20 lg:px-14">
        <header className="border-b-2 border-black pb-7">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h1 className="mt-3 font-serif text-5xl leading-none tracking-[-0.05em] sm:text-7xl">
                Harvey Custodio Dacillo
              </h1>

              <p className="mt-3 font-serif text-xl text-black/65">
                Full Stack Developer &amp; UI/UX Designer
              </p>

              <a
                href="/resume.pdf"
                download
                className="mt-5 inline-flex items-center gap-2 border-b border-black pb-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
              >
                Download CV
                <Download className="h-4 w-4" />
              </a>
            </div>

            <figure>
              <div className="relative h-40 w-32 overflow-hidden bg-black/10 grayscale sm:h-48 sm:w-40">
                <img src="/harveybg.png" alt="Portrait" className="h-full w-full object-cover" />
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[size:5px_5px] opacity-30 mix-blend-multiply" />
              </div>
            </figure>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-black/20 pt-4 font-mono text-[10px] text-black/65">
            <a href="mailto:Harvey.custodio.dacillo@gmail.com" className="hover:text-black">
              Harvey.custodio.dacillo@gmail.com
            </a>
            <a href="tel:09919602127" className="hover:text-black">
              0991 960 2127
            </a>
            <a
              href="https://github.com/hrvycstddcll"
              target="_blank"
              rel="noreferrer"
              className="hover:text-black"
            >
              github.com/hrvycstddcll
            </a>
            <span>Batangas, Philippines</span>
          </div>
        </header>

        <div className="grid gap-4 border-b border-black/20 py-7 sm:grid-cols-[150px_1fr]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">Profile</p>
          <p className="max-w-3xl text-sm leading-relaxed text-black/75">
            Developer focused on building reliable web applications and clear user interfaces.
            Combines frontend craft, backend logic, and practical problem-solving through academic
            projects, freelance work, and continuous learning.
          </p>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:px-14">
        <div className="grid gap-8 border-b border-black/20 pb-10 sm:grid-cols-[150px_1fr]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">Skills</p>

          <div className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.label} className="grid gap-2 sm:grid-cols-[100px_1fr]">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/50">
                  {group.label}
                </span>

                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {group.items.map((skill) => (
                    <span key={skill} className="font-serif text-xl text-black/75">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 border-b border-black/20 py-10 sm:grid-cols-[150px_1fr]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">Education</p>

          <div>
            <h2 className="font-serif text-2xl tracking-[-0.03em]">{education.degree}</h2>

            <div className="mt-2 flex flex-wrap justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-black/55">
              <span>{education.school}</span>
              <span>{education.period}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-14 sm:px-8 lg:px-14">
        <div className="grid gap-8 border-b border-black/20 pb-10 sm:grid-cols-[150px_1fr]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">Experience</p>

          <div>
            <div className="flex flex-wrap justify-between gap-3">
              <h2 className="font-serif text-2xl tracking-[-0.03em]">{experience.role}</h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/55">
                {experience.period}
              </span>
            </div>

            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-black/60">
              {experience.company}
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/65">
              {experience.description}
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:px-14">
        <div className="grid gap-8 sm:grid-cols-[150px_1fr]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/60">Projects</p>

          <div className="divide-y divide-black/15 border-t border-black/20">
            {projects.map((project) => (
              <a
                key={project.number}
                href={project.source}
                target="_blank"
                rel="noreferrer"
                className="group relative grid gap-3 py-6 pr-8 transition-colors hover:text-black sm:grid-cols-[55px_1fr_1fr] sm:pr-10"
              >
                <span className="font-mono text-xs text-black/60">{project.number}</span>

                <div>
                  <h2 className="font-serif text-2xl tracking-[-0.03em]">{project.title}</h2>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-black/50">
                    {project.type}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-black/65 group-hover:text-black/75">
                  {project.description}
                </p>

                <ArrowUpRight
                  className="absolute right-0 top-7 h-5 w-5 text-black/45 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t-2 border-black bg-black px-5 py-12 text-white sm:px-8 lg:px-14">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-[150px_1fr]">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Contact</p>

          <div>
            <h2 className="font-serif text-3xl tracking-[-0.03em]">Available for selected projects.</h2>

            <a
              href="mailto:Harvey.custodio.dacillo@gmail.com?subject=Project%20inquiry"
              className="mt-4 inline-flex items-center gap-2 border-b border-white pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white"
            >
              Harvey.custodio.dacillo@gmail.com
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-5xl justify-between border-t border-white/20 pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/50">
          <span>Harvey Custodio Dacillo</span>
          <span>© 2026</span>
        </div>
      </section>
    </main>
  );
}