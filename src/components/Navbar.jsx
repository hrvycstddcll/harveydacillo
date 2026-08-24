import { Menu } from "lucide-react";
import { X } from "lucide-react"
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { useState } from "react";

const navLinks = [
  { name: "HOME", href: "#home", id: "01"},
  { name: "SKILLS", href: "#skills", id: "02"},
  { name: "PROJECTS", href: "#projects", id: "03"},
  { name: "CONTACT", href: "#contact", id: "04"},
];

export default function Navbar() {
  
  const [mobileIsOpen, setMobileIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() => window.location.hash || "#home");
  const navRefDesk = useRef(null);
  const navRefMob = useRef(null);
  const desktopLinksRef = useRef(null);
  const selectorRef = useRef(null);
  const selectorMotion = useRef(null);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    let frameId = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
      const marker = window.innerHeight * 0.35;
      const currentSection = sections.reduce((current, section) => (
        section.getBoundingClientRect().top <= marker ? section : current
      ), sections[0]);

        if (currentSection) {
          const nextSection = `#${currentSection.id}`;
          setActiveSection((currentActive) => currentActive === nextSection ? currentActive : nextSection);
        }
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const moveSelector = (linkElement) => {
    if (!linkElement || !selectorRef.current || !desktopLinksRef.current) return;
    const navBounds = desktopLinksRef.current.getBoundingClientRect();
    const linkBounds = linkElement.getBoundingClientRect();
    if (!selectorMotion.current) {
      selectorMotion.current = {
        x: gsap.quickTo(selectorRef.current, "x", { duration: 0.25, ease: "power3.out" }),
        width: gsap.quickTo(selectorRef.current, "width", { duration: 0.25, ease: "power3.out" }),
      };
    }
    selectorMotion.current.x(linkBounds.left - navBounds.left);
    selectorMotion.current.width(linkBounds.width);
  };
  useGSAP(() => {
    const tl = gsap.timeline(
      {
        defaults: {ease: "power4.out"}

      }
    );
    tl.from(navRefDesk.current, {
      opacity: 0, filter: "blur(20px)", y: -20,
      duration: 1, ease: "power2.out"
    })
    .fromTo(".desk-link", 
      {opacity: 0, y:-30},
      {opacity: 1, y: 0, stagger:0.2, duration: 0.3, ease: "power3.out"}
    );

  }, {scope: navRefDesk})
  useGSAP(() => {
    if (mobileIsOpen && navRefMob.current) {
      const tl = gsap.timeline();

      tl.fromTo(navRefMob.current, 
        {opacity: 0},
        {opacity: 1, duration: 0.1, ease: "power2.out", clearProps: "opacity"}
      ).fromTo( ".mob-link", 
        {opacity: 0, x:-30},
        {opacity: 1, x: 0, stagger:0.2, duration: 0.3, ease: "power3.out"}
      )
    }
  }, {scope: navRefMob, dependencies: [mobileIsOpen]});

  const {contextSafe: contextDesk} = useGSAP({scope: navRefDesk});
  const rollEnter = contextDesk((e) => {
    const li = e.currentTarget;
    const rolls = li.querySelectorAll(".nav-links");
    const id = li.querySelector(".nav-id");

    gsap.to(rolls, {
      yPercent: -50, duration: 0.3, ease: "power2.inOut", stagger: 0.025,
      overwrite: "auto",
    })
    if (id) {
      gsap.to(id, {
        color:"#ad7e23", xPercent:-10, duration: 0.25, overwrite: "auto",
      })
    }
  });
  
  const rollLeave = contextDesk((e) => {
    const li = e.currentTarget;
    const rolls = li.querySelectorAll(".nav-links");
    const id = li.querySelector(".nav-id");

    gsap.to(rolls, {
      yPercent: 0, duration: 0.5, ease: "power2.inOut", stagger: 0.025,
      overwrite: "auto",
    })
    if(id) {
      gsap.to(id, {
        color:"#a3a3a3", xPercent:0, duration: 0.25, overwrite: "auto",
      })
    }
  });

  const selectorEnter = (e) => moveSelector(e.currentTarget);
  const selectorLeave = () => {
    const activeLink = desktopLinksRef.current?.querySelector(`[data-href="${activeSection}"]`);
    moveSelector(activeLink);
  };

  const selectNavLink = (event, href) => {
    setActiveSection(href);
    moveSelector(event.currentTarget.closest(".desk-link"));
  };

  useEffect(() => {
    const activeLink = desktopLinksRef.current?.querySelector(`[data-href="${activeSection}"]`);
    moveSelector(activeLink);
  }, [activeSection]);

  return(
    <>

        <nav ref={navRefDesk} className="fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-md bg-black/20">
          
          <div className="flex justify-between items-center px-8">

            <div className="flex justify-center items-center">
              <img src="icon.svg" alt="logo" width="60" height="60" className="h-15 w-auto"/>
            </div>
            <ul ref={desktopLinksRef} onMouseLeave={selectorLeave} className="relative hidden md:flex justify-center items-center gap-12">
              <span ref={selectorRef} className="pointer-events-none absolute -bottom-3 left-0 h-0.5 w-0 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
              {navLinks.map((link) => (
                <li key={link.name} className="desk-link flex text-xs lg:text-lg tracking-tight space-x-2 select-none"
                onMouseLeave={rollLeave}
                onMouseEnter={(event) => {
                  rollEnter(event);
                  selectorEnter(event);
                }}
                >
                  <span className="nav-id text-neutral-400 font-mono "> {link.id}</span>
                  <a
                    href={link.href}
                    data-href={link.href}
                    onClick={(event) => selectNavLink(event, link.href)}
                    className={`flex items-center ${activeSection === link.href ? "text-amber-400" : ""}`}
                  >
                    {link.name.split("").map((char, index) => (
                      <span key={index} className="relative overflow-hidden inline-block h-3 lg:h-4">
                        <span className="nav-links flex flex-col">
                          <span className="text-neutral-300 font-inter leading-none">
                            {char === " " ? "\u00A0" : char}
                          </span>
                          <span className="text-amber-400 font-inter font-semibold leading-none">
                            {char === " " ? "\u00A0" : char}
                          </span>
                        </span>
                      </span>
                    ))}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex justify-cente items-center gap-15">
              
              <button onClick={() => setMobileIsOpen((prev) => !prev)} className="h-5 w-5 md:hidden cursor-pointer hover:-rotate-360 transition-all duration-700">
                {mobileIsOpen 
                ? <X className="text-amber-400"/>
                : <Menu className="text-neutral-300"/>
                }
              </button>
            </div>
          </div>
        </nav>

        {mobileIsOpen && 
          (
            <nav ref={navRefMob} className="fixed md:hidden inset-0 z-40 border-b border-white/10 backdrop-blur-md bg-black/90 p-8 pt-28 overflow-y-auto">
              <div className="flex flex-col ">
                <ul className="flex flex-col min-h-[calc(100vh-20rem)]">
                  <div className="items-start space-y-4 sm:space-y-8">
                    {navLinks.map((link) => (
                      <li key={link.name} className={`mob-link border-b border-white/10 border-l-2 pb-4 pl-4 transition-colors duration-300 ${activeSection === link.href ? "border-l-amber-400 bg-neutral-900/50" : "border-l-transparent"}`}
                      onClick={() => setMobileIsOpen(false)}
                      >
                        <a href={link.href} className="flex items-center justify-between tracking-[0.15em] group transition-all">
                          <span className={`text-2xl font-inter font-semibold transition-colors duration-300 ${activeSection === link.href ? "text-amber-300" : "text-neutral-300 group-hover:text-amber-300"}`}>
                            {link.name}  
                          </span>
                          <span className="flex items-center gap-3 text-xs font-mono text-neutral-400 transition-colors group-hover:text-[#ad7e23]">
                            {activeSection === link.href && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />}
                            <span>{link.id}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </div>
                </ul>
                <div className="mob-link flex flex-col pt-8 items-center">
                  <span className="font-inter text-neutral-300 text-xs tracking-[0.2em]">
                    AVAILABLE FOR COMISSIONS
                  </span>
                  <span className="font-mono text-xs text-amber-400">
                    2026
                  </span>
                </div>
              </div>
            </nav>
          )
        }
    </>

    
  )  
}
