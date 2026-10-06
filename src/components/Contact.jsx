import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { useGSAP } from '@gsap/react';
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from 'lucide-react';
import { contact, quote } from '../../constants';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

const editorialEase = (progress) => 1 - Math.pow(1 - progress, 3.4);

function GithubMark({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function FacebookMark({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const linkIcons = {
  mail: Mail,
  phone: Phone,
  map: MapPin,
  github: GithubMark,
  facebook: FacebookMark,
};



export default function Contact() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const labelRef = useRef(null);
  const enteredRef = useRef(false);
  const copyTimer = useRef(null);
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    'Project inquiry'
  )}&body=${encodeURIComponent('Hi Harvey,\n\nI would like to discuss a project with you.\n\nProject details:\n')}`;

  useGSAP(
    () => {
      if (prefersReducedMotion.current) return;

      const root = sectionRef.current;
      const sticky = root?.querySelector('[data-sticky]');

      let split = null;
      let introTl = null;
      let headTl = null;
      let driftTl = null;
      let ruleTl = null;
      let resizeTimer = null;
      let cancelled = false;

      const buildHeadline = () => {
        headTl?.scrollTrigger?.kill();
        headTl?.kill();
        split?.revert();
        split = null;

        if (!headlineRef.current) return;

        split = SplitText.create(headlineRef.current, {
          type: 'lines',
          mask: 'lines',
          aria: 'auto',
        });
        split.masks.forEach((mask) => mask.classList.add('contact-headline-mask'));

        headTl = gsap.timeline({
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 88%',
            end: 'bottom 58%',
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });
        headTl.from(split.lines, {
          yPercent: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.16,
          ease: editorialEase,
        });

        driftTl = gsap.to(headlineRef.current, {
          yPercent: -10,
          opacity: 0.55,
          ease: 'none',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 55%',
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      };

      const buildIntro = () => {
        introTl?.scrollTrigger?.kill();
        introTl?.kill();

        introTl = gsap.timeline({
          defaults: { ease: editorialEase },
          scrollTrigger: {
            trigger: root,
            start: 'top 74%',
            once: true,
            invalidateOnRefresh: true,
            onEnter: () => {
              enteredRef.current = true;
            },
          },
        });

        introTl
          .from('[data-rule]', {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.1,
            stagger: 0.1,
          })
          .from(
            '[data-row]',
            { y: 28, opacity: 0, duration: 0.85, stagger: 0.075 },
            '-=0.75'
          )
          .from('[data-sticky] > *', { y: 22, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.6');

        if (labelRef.current) {
          introTl.to(
            labelRef.current,
            {
              duration: 1.2,
              scrambleText: {
                text: contact.availability,
                chars: 'upperCase',
                revealDelay: 0.4,
              },
            },
            '-=0.95'
          );
        }
      };

      const buildRule = () => {
        ruleTl?.scrollTrigger?.kill();
        ruleTl?.kill();

        if (!sticky) return;

        ruleTl = gsap.fromTo(
          '[data-rule-fill]',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sticky,
              start: 'top 82%',
              end: 'bottom 55%',
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          }
        );
      };



      const settle = () => {
        gsap.set('[data-rule], [data-row], [data-sticky] > *', {
          clearProps: 'opacity,y,transform,scaleX',
        });
      };

      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          buildHeadline();
          if (enteredRef.current) {
            settle();
          } else {
            buildIntro();
          }
          ScrollTrigger.refresh();
        }, 280);
      };

      buildHeadline();
      buildIntro();
      buildRule();

      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      fontsReady.then(() => {
        if (cancelled) return;
        buildHeadline();
        ScrollTrigger.refresh();
      });

      window.addEventListener('resize', onResize);

      return () => {
        cancelled = true;
        clearTimeout(resizeTimer);
        window.removeEventListener('resize', onResize);
        introTl?.scrollTrigger?.kill();
        introTl?.kill();
        headTl?.scrollTrigger?.kill();
        headTl?.kill();
        driftTl?.scrollTrigger?.kill();
        driftTl?.kill();
        ruleTl?.scrollTrigger?.kill();
        ruleTl?.kill();
        split?.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef }
  );

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        setCopied(false);
        return;
      }
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-primary px-6 pb-28 pt-20 sm:px-8 sm:pb-32 sm:pt-24 md:px-12 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.04]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Masthead */}
        <header className="flex items-center gap-5">
          <div className="h-px w-10 bg-white/20" data-rule />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">Contact</span>
          <span
            ref={labelRef}
            className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 sm:block"
            aria-label={`Availability: ${contact.availability}`}
          >
            {contact.availability}
          </span>
        </header>

        {/* Display headline */}
        <h2
          ref={headlineRef}
          data-headline
          className="mt-10 font-bebas text-[clamp(3.25rem,14vw,12rem)] leading-[0.95] tracking-[-0.02em] text-white md:mt-16"
        >
          <span className="block">Let&apos;s Build</span>
          <span className="block text-white/25">Something</span>
          <span className="block font-playfair text-[0.52em] italic leading-[0.95] tracking-[-0.04em] text-white/80 md:pl-[0.6em]">
            real.
          </span>
        </h2>

        {/* Statement + directory */}
        <div className="mt-14 grid gap-12 border-t border-white/10 pt-12 md:mt-20 md:grid-cols-[0.82fr_1.18fr] md:gap-20">
          <div data-sticky className="md:sticky md:top-24 md:self-start">
            <p className="max-w-sm font-inter text-[clamp(1rem,1.5vw,1.25rem)] font-light leading-[1.6] text-white/80">
              Have an idea, a project, or a good challenge? Send it over — every message gets read,
              and I reply within a day or two.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={mailtoHref} rel="noopener noreferrer" aria-label="Start a project conversation by email" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-black transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
                Start a Conversation
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-live="polite"
                aria-label={copied ? 'Email copied to clipboard' : 'Copy email address to clipboard'}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                <span>{copied ? 'Email Copied' : 'Copy Email'}</span>
              </button>
            </div>

            <div className="mt-10 h-px w-full bg-white/10">
              <div data-rule-fill className="h-px w-full origin-left scale-x-0 bg-white" />
            </div>
          </div>

          <div className="flex flex-col">
            {contact.links.map(({ label, value, href, icon, external }, i) => {
              const Icon = linkIcons[icon];

              const content = (
                <>
                  <span
                    className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                    aria-hidden="true"
                  />
                  <span className="relative flex items-baseline gap-4 px-1 py-6 sm:gap-6 sm:py-8 lg:gap-8">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-white/60 transition-colors duration-500 group-hover:text-black/40 group-focus-visible:text-black/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 transition-colors duration-500 group-hover:text-black/50 group-focus-visible:text-black/50 sm:w-20">
                      {label}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-inter text-[clamp(0.95rem,2.2vw,1.375rem)] text-white/90 transition-colors duration-500 group-hover:text-black group-focus-visible:text-black">
                      {value}
                    </span>
                    <Icon className="h-4 w-4 shrink-0 self-center text-white/40 transition-colors duration-500 group-hover:text-black group-focus-visible:text-black sm:h-5 sm:w-5" aria-hidden="true" />
                  </span>
                </>
              );

              const shell =
                'group relative block border-b border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-primary';

              if (!href) {
                return (
                  <div key={`${label}-${i}`} className={shell} data-row>
                    {content}
                  </div>
                );
              }

              return (
                <a
                  key={`${label}-${i}`}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className={`${shell} transition-colors duration-500 hover:border-white/40`}
                  data-row
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>



        {/* Colophon */}
        <footer className="mt-20 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mt-28">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
            © {new Date().getFullYear()} {quote.name} — {quote.role}
          </span>
          <a
            href="#home"
            className="inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
          >
            Back to Top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}
