import { useState } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, Copy, Link, MapPin, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const mail = "Harvey.custodio.dacillo@gmail.com"
const contactLinks = [
    {
        label: "PHONE",
        value: "09919602127",
        href: "tel:09919602127",
        icon: Phone,
    },
    {
        label: "GITHUB",
        value: "github.com/hrvycstddcll",
        href: "https://github.com/hrvycstddcll",
        icon: Link,
        external: true,
    },
    {
        label: "FACEBOOK",
        value: "facebook.com/harvey.custodio.dacillo",
        href: "https://www.facebook.com/harvey.custodio.dacillo",
        icon: Link,
        external: true,
    },
];

export default function Contact() {
    const contactSection = useRef(null);
    const [copied, setCopied] = useState(false);
    const email = mail;
    const mailtoHref = `mailto:${email}?subject=${encodeURIComponent("Project inquiry")}&body=${encodeURIComponent("Hi Harvey,\n\nI would like to discuss a project with you.\n\nProject details:\n")}`;

    useGSAP(() => {
        const media = gsap.matchMedia();
        media.add(
            { desktop: "(min-width: 768px)", reduceMotion: "(prefers-reduced-motion: reduce)" },
            (context) => {
                if (!context.conditions.desktop || context.conditions.reduceMotion) return undefined;

                const section = contactSection.current;
                const links = section.querySelectorAll(".contact-link");
                const designLine = section.querySelector(".contact-design-line");
                const designFrame = section.querySelector(".contact-design-frame");

                gsap.fromTo(".contact-copy",
                    { y: 90, opacity: 0 },
                    {
                        y: -20,
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 92%",
                            end: "top 28%",
                            scrub: 0.8,
                        },
                    }
                );

                gsap.fromTo(links,
                    { x: 70, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        ease: "none",
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 88%",
                            end: "top 25%",
                            scrub: 0.8,
                        },
                    }
                );

                gsap.fromTo(designFrame,
                    { opacity: 0, scale: 0.92 },
                    {
                        opacity: 1,
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 95%",
                            end: "top 35%",
                            scrub: 0.8,
                        },
                    }
                );

                gsap.to(designLine, {
                    xPercent: 115,
                    duration: 2.8,
                    ease: "power1.inOut",
                    repeat: -1,
                    yoyo: true,
                });
            }
        );

        return () => media.revert();
    }, { scope: contactSection });

    const copyEmail = async () => {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    };

    return (
        <section ref={contactSection} id="contact" className="relative w-full max-w-full overflow-hidden bg-black px-4 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32">
            <div className="contact-design-frame pointer-events-none absolute right-0 top-20 h-56 w-56 border-r border-t border-neutral-800/70 md:right-[8%] md:top-28 md:h-80 md:w-80">
                <div className="contact-design-line absolute left-0 top-0 h-px w-24 bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.8)]" />
            </div>
            <div className="mx-auto grid max-w-6xl gap-12 border-t border-white/10 pt-8 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
            <div className="contact-copy border-l-2 border-amber-400 pl-5 sm:pl-8">

                    <h2 className="mt-5 max-w-lg font-bebas text-[clamp(3.5rem,9vw,7rem)] leading-[0.85] tracking-wider text-white">
                        LET&apos;S BUILD
                        <span className="block text-amber-400">SOMETHING</span>
                    </h2>
                    <p className="mt-8 max-w-sm font-inter text-sm leading-relaxed text-neutral-400 sm:text-base">
                        Have an idea, a project, or a good challenge? Reach out and let&apos;s make it real.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                            href={mailtoHref}
                            aria-label="Start a project conversation by email"
                            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 font-mono text-xs tracking-[0.14em] text-black transition-colors hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black"
                        >
                            START A CONVERSATION
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <button
                            type="button"
                            onClick={copyEmail}
                            className="inline-flex items-center gap-2 rounded-full border border-neutral-800 px-4 py-3 font-mono text-xs tracking-[0.14em] text-neutral-300 transition-colors hover:border-amber-400 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black"
                        >
                            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                            {copied ? "EMAIL COPIED" : "COPY EMAIL"}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-4 border-b border-white/10 py-5">
                        <MapPin className="h-5 w-5 shrink-0 text-amber-400" strokeWidth={1.5} aria-hidden="true" />
                        <span>
                            <span className="block font-mono text-[10px] tracking-[0.2em] text-neutral-500">LOCATION</span>
                            <span className="mt-1 block font-inter text-sm text-neutral-200 sm:text-base">Calatagan, Batangas</span>
                        </span>
                    </div>
                    {contactLinks.map(({ label, value, href, icon: Icon, external }) => (
                        <a
                            key={label}
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noreferrer" : undefined}
                            className="contact-link group flex items-center justify-between gap-4 border-b border-white/10 py-5 transition-colors hover:border-amber-400"
                        >
                            <span className="flex min-w-0 items-center gap-4">
                                <Icon className="h-5 w-5 shrink-0 text-amber-400" strokeWidth={1.5} aria-hidden="true" />
                                <span className="min-w-0">
                                    <span className="block font-mono text-[10px] tracking-[0.2em] text-neutral-500">{label}</span>
                                    <span className="mt-1 block truncate font-inter text-sm text-neutral-200 transition-colors group-hover:text-white sm:text-base">{value}</span>
                                </span>
                            </span>
                            <ArrowUpRight className="h-5 w-5 shrink-0 text-neutral-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber-400" aria-hidden="true" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
