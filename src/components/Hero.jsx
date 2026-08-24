import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ArrowDown, Download } from "lucide-react";





gsap.registerPlugin(ScrollTrigger);

const roles = [ "WEB DEV", "FREELANCER", "STUDENT"];
const status = [
  {top: "3+", bottom: "YEARS OF LEARNING"},
  {top: "100%", bottom: "DEDICATION TO QUALITY"},
  {top: "10+", bottom: "TECH STACKS"},
  
];

export default function Hero() {
  const heroSection = useRef(null);
  const statsRef = useRef([]);

  useGSAP(() => {
    
    const glowTl = gsap.timeline({
      paused: true,
      repeat: -1,
      yoyo: true,
      defaults: {
        ease: "sine.inOut",
      },
    });

    glowTl
      .to(".hero-glow", {
        x: 40,
        y: -30,
        opacity: 0,
        scale: 1.08,
        duration: 3,
      })
      .to(".hero-glow", {
        x: -30,
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 4,
      });

    const glow = gsap.to(".hero-glow", {
      x: 40,
      y: -30,
      scale: 1.1,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      paused: true,
    });

    gsap.to(".scroll-down-button", {
      y: 8,
      duration: 0.9,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    ScrollTrigger.create({
      trigger: heroSection.current,
      scrub: true,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => glow.play(),
      onEnterBack: () => glow.play(),
      onLeave: () => glow.pause(),
      onLeaveBack: () => glow.pause(),
    });



    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduceMotion } = context.conditions;
        if (!desktop || reduceMotion) return;
        const tl = gsap.timeline({
          defaults: {ease: "power4.out"}
        });
        tl.fromTo(".hero-roles",
          {opacity: 0, y:-20},
          {opacity: 1, y:0, duration: 0.3, ease: "power2.out"}
        ).from(".hero-line",
          {opacity: 0, x:-20,  stagger: 0.1},
        ).fromTo(".hero-phrase",
          {opacity: 0, y:-20},
          {opacity: 1, y:0, duration: 0.3, ease: "power2.out"}
        ).fromTo(statsRef.current,
          {opacity: 0, y:-20},
          {opacity: 1, y:0, duration: 0.3, ease: "power2.out", stagger: 0.2}
        ).fromTo(
          ".hero-img, .hero-name",
          {
            opacity: 0,
            clipPath: "inset(0% 0% 100% 0%)", 
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
          },
          "0" 
        ).fromTo(
          ".hero-name",
          {
            opacity: 0,
            clipPath: "inset(0% 100% 0% 0%)", 
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
          },
          "0" 
        )
        .then(() => {
          gsap.set(".hero-img, .hero-name", { clearProps: "clipPath,filter,opacity" });
        });

        gsap.to(".hero-content", {
          yPercent: -18,
          scale: 0.96,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection.current,
            start: "top top",
            end: "bottom 30%",
            scrub: 0.5,
          },
        });
      }
    );
    
    return () => {
      mm.revert();
    };
  }, {scope: heroSection});

  return (
    <section
      ref={heroSection}
      id="home"
      className="relative min-h-screen max-h-5vh w-full max-w-full overflow-x-hidden mx-auto pt-6 pb-8 sm:pt-18 md:pt-25 lg:pt-40 bg-black overflow-hidden"
    >
      <div className="hero-content flex flex-col md:flex-row w-full h-auto md:h-[600px]">
        
        {/* LEFT SIDE // TOP */}
        <div className="z-10 w-full md:w-1/2 flex flex-col justify-center items-start px-4 md:px-8 py-12 sm:py-0 select-none">
          
          <div className="flex flex-col py-2 gap-2">
            <div className="hero-roles flex items-center gap-2 min-[100px]:max-[280px]:flex-col min-[100px]:max-[280px]:items-start">
              <span className="text-xs sm:text-sm lg:text-[clamp(20px,2.5vw,24px)] font-semibold tracking-[0.2em] text-neutral-300 uppercase font-mono">
                I AM A
              </span>
              <div className="group relative inline-flex h-5 sm:h-6 min-w-[150px] sm:min-w-[200px] overflow-hidden items-center">
                {roles.map((role, idx) => (
                  <span
                    key={role}
                    className="text-roller absolute left-0 text-xs sm:text-sm lg:text-[clamp(20px,2.5vw,24px)] font-semibold tracking-[0.2em] text-amber-400 uppercase font-inter whitespace-nowrap opacity-0"
                    style={{ animationDelay: `${idx * 2}s` }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex pb-2">
              <div className="h-0.5 min-w-[45px] bg-amber-400"/>
              <div className="h-0.5 min-w-[15px] bg-amber-600"/>
            </div>
          </div>
          
          <h1
            className=" z-10 flex flex-col font-bebas text-[clamp(2rem,6vw,10rem)]  text-white tracking-widest leading-[0.9em]">
            <span className="hero-line">Creative</span>
            <span className="hero-line text-amber-400 -mt-[0.05em]">Engineering</span>
            <div className="hero-line flex flex-col items-start -mt-[0.05em]">
              <span className="hero-line text-white">
                &#40;Hybrid <span className="text-amber-400">UI/UX</span> &#43;
              </span>
              <span className="hero-line text-neutral-400">
                Web Dev<span className="hero-line text-white">&#41;</span>
              </span>
            </div>
          </h1>
          

          <div className="pt-4 flex flex-col gap-8 w-full">
            <p className="hero-phrase text-neutral-400 font-inter w-full text-[clamp(0.875rem,2.5vw,1.5rem)] leading-relaxed">
              I transform ideas into digital experiences with clean code, modern design, and innovative problem-solving.
            </p>
            <a
              href="/resume.pdf"
              download
              className="inline-flex w-fit items-center gap-2 border-b border-amber-400 pb-2 font-mono text-xs tracking-[0.16em] text-amber-400 transition-colors hover:border-amber-300 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black"
            >
              DOWNLOAD CV
              <Download className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          
          <div className="flex flex-col gap-y-3 py-2 w-full">

            <div className="flex items-center justify-center w-full max-w-[900px]">
              <div className="bg-neutral-800 h-[clamp(0.5px,2.5vw,1.50px)] w-full"/>
              <div className="bg-neutral-600 h-[clamp(1px,2.5vw,2.5px)] min-w-4"/>
              <div className="bg-neutral-400 h-[clamp(1.5px,2.5vw,3px)] min-w-2.5"/>
              <div className="bg-neutral-200 h-[clamp(2px,2.5vw,4px)] w-[clamp(2px,2.5vw,4px)] rounded-full ml-0.5"/>
            </div>

           
            <div className="flex divide-x divide-neutral-800"> 
              {status.map((stats, idx) => (
                <div key={idx} ref={(el) => (statsRef.current[idx] = el)}
                className="flex text-neutral-50 text-xl items-start gap-1  py-2 px-3 first:pl-0">
                  <div className="flex flex-col items-start justify-center gap-1">
                    <span className="font-inter font-bold text-amber-300 tracking-widest text-[clamp(1rem,2.5vw,2.5rem)]">
                      {stats.top}
                    </span>
                    <span className="font-mono font-light text-neutral-300 text-[clamp(0.75rem,2.5vw,1.25rem)] tracking-wide
                    min-[100px]:max-[280px]:text-[8px]">
                      {stats.bottom}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* DESIGNLEFTSIDE */}
          <div className="hero-glow absolute z-10 top-0 left-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] 
          rounded-full blur-3xl bg-neutral-300/20"/>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[-10] h-[100px] w-[200px] sm:h-[200px] sm:w-[400px] md:h-[300px] md:w-[700px] pointer-events-none select-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[-10] h-[50px] w-[100px] sm:h-[100px] sm:w-[200px] md:h-[200px] md:w-[500px] pointer-events-none select-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_bottom,black_40%,transparent_80%)]" />
          </div>

        </div>  


        {/* RIGHT SIDE // BOTTOM */}
        <div className="relative flex w-full md:w-1/2 min-h-[500px] overflow-visible items-end justify-end">
  
          <div className="hero-name absolute z-10 right-0 top-[clamp(280px,18%,400px)] md:top-[clamp(450px,50%,550px)] translate-y-full rotate-90 origin-top-right text-neutral-200 font-bebas text-[clamp(4rem,12vw,9rem)] whitespace-nowrap pointer-events-none select-none">
            <span>HRVY</span>
            <span className="text-neutral-400">CSTD</span>
            <span className="text-neutral-500">DCLL</span>
          </div>

          <img 
            src="/harveybg.png" 
            alt="Harvey" 
            width="1200"
            height="1200"
            fetchPriority="high"
            decoding="async"
            className="hero-img absolute bottom-0 right-0 w-[clamp(300px, 50vw, 800px)] h-[clamp(300px, 50vw, 800px)] z-20 max-h-full max-w-full object-contain object-bottom-right 
            sm:scale-130 sm:-translate-x-20 md:scale-150 lg:scale-200 md:-translate-x-20 lg:-translate-x-100 lg:translate-y-30
            mask-[linear-gradient(to_bottom,black_75%,transparent)]
            [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent),linear-gradient(to_right,black_75%,transparent)] 
            [-webkit-mask-composite:source-in] [mask-composite:intersect]" 
          />

          {/* DESIGN RIGHTSIDE */}
          <div className="hero-glow absolute z-10 top-0 left-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] 
          rounded-full blur-3xl bg-neutral-300/20"/>
          <div className="absolute z-0 top-1/2 -translate-y-1/2 right-0 translate-x-[35%]  h-[500px] w-[500px] md:h-[800px] md:w-[800px] rounded-full border-3 border-neutral-800 [mask-image:linear-gradient(to_right,black_0%,transparent_30%)]"/>
          
        </div>    

      </div>

      <button
        type="button"
        aria-label="Scroll to skills section"
        title="Scroll to skills"
        onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
        className="scroll-down-button absolute bottom-5 left-1/2 z-30 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-amber-400/70 bg-black/70 text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.15)] backdrop-blur-sm transition-colors duration-300 hover:bg-amber-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black"
      >
        <ArrowDown className="h-5 w-5" aria-hidden="true" />
      </button>
      
    </section>
  );
}