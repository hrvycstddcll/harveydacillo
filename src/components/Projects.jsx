import { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight, ExternalLink, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MorphSlider from './MorphSlider';
import { projects } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

function ProjectModal({ project, onClose }) {
  const images = [project.image, ...(project.screenshots || [])].filter(
    (src, i, arr) => arr.indexOf(src) === i
  );
  const [imgIndex, setImgIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const modalRef = useRef(null);
  const panelRef = useRef(null);
  const lightboxRef = useRef(null);

  const prevImage = () => setImgIndex((i) => (i - 1 + images.length) % images.length);
  const nextImage = () => setImgIndex((i) => (i + 1) % images.length);

  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useGSAP(
    () => {
      if (reducedMotion.current) {
        gsap.set([modalRef.current, panelRef.current], { clearProps: 'all' });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        modalRef.current,
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { opacity: 1, backdropFilter: 'blur(8px)', duration: 0.35 }
      )
        .fromTo(
          panelRef.current,
          { opacity: 0, scale: 0.94, y: 28 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5 },
          '-=0.1'
        )
        .fromTo(
          '[data-modalanim]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
          '-=0.15'
        );
    },
    { scope: modalRef }
  );

  useGSAP(
    () => {
      if (!lightbox || reducedMotion.current) return;
      gsap.fromTo(
        lightboxRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        '[data-lightbox-img]',
        { scale: 1.04 },
        { scale: 1, duration: 0.45, ease: 'power2.out' }
      );
    },
    { dependencies: [lightbox], scope: lightboxRef }
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(false);
        else onClose();
      } else if (lightbox && e.key === 'ArrowLeft') {
        e.preventDefault();
        prevImage();
      } else if (lightbox && e.key === 'ArrowRight') {
        e.preventDefault();
        nextImage();
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, images.length]);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        ref={panelRef}
        className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4" data-modalanim>
          <div className="flex flex-col gap-0.5">
            <span className="font-ubuntu-mono text-[10px] uppercase tracking-[0.25em] text-black/40">
              {project.id} — {project.category}
            </span>
            <h3 className="font-bebas text-2xl tracking-wide text-primary">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Screenshots"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-primary transition hover:bg-black hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
          <div
            className="flex relative flex-1 items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-softer"
            data-modalanim
          >
            <button
              type="button"
              onClick={() => setLightbox(true)}
              aria-label={`Enlarge image ${imgIndex + 1} of ${project.title}`}
              className="group block w-full cursor-zoom-in"
            >
              <img
                src={images[imgIndex]}
                alt={`${project.title} — view ${imgIndex + 1}`}
                className="max-h-[62vh] w-full object-contain transition duration-300 group-hover:scale-[1.02]"
              />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/15 bg-white/80 text-primary backdrop-blur-sm transition hover:bg-black hover:text-white"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/15 bg-white/80 text-primary backdrop-blur-sm transition hover:bg-black hover:text-white"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2" data-modalanim>
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImgIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`shrink-0 overflow-hidden rounded-md border-2 ${
                    i === imgIndex
                      ? 'border-black'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="h-14 w-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} image viewer`}
        >
          <img
            data-lightbox-img
            src={images[imgIndex]}
            alt={`${project.title} — view ${imgIndex + 1}`}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-black"
          >
            <X size={18} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-black"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-black"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Projects() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const firstRun = useRef(true);
  const enteredRef = useRef(false);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const slides = projects.map((project) => ({
    image: project.image,
    caption: project.title,
  }));
  const project = projects[currentIndex];

  useGSAP(
    () => {
      if (prefersReducedMotion.current) return;

      let introTl = null;
      let resizeTimer = null;

      const createIntro = () => {
        if (introTl) {
          introTl.scrollTrigger?.kill();
          introTl.kill();
          introTl = null;
        }

        introTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
            invalidateOnRefresh: true,
            onEnter: () => {
              enteredRef.current = true;
            },
          },
        });

        introTl.fromTo(
          '[data-section-anim]',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 }
        )
          .fromTo(
            '[data-panel-scale]',
            { scale: 1.06, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.9, ease: 'power4.out' },
            '-=0.5'
          )
          .fromTo(
            '[data-title-line]',
            { yPercent: 115 },
            { yPercent: 0, duration: 0.7, ease: 'power4.out' },
            '-=0.35'
          )
          .fromTo(
            '[data-slide-anim]',
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, stagger: 0.06 },
            '-=0.45'
          );
      };

      const settlePlayed = () => {
        gsap.set('[data-section-anim], [data-panel-scale], [data-title-line], [data-slide-anim]', {
          clearProps: 'opacity,y,yPercent,scale,transform',
        });
      };

      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (enteredRef.current) {
            settlePlayed();
          } else {
            createIntro();
          }
          ScrollTrigger.refresh();
        }, 300);
      };

      createIntro();
      window.addEventListener('resize', onResize);

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener('resize', onResize);
        if (introTl) {
          introTl.scrollTrigger?.kill();
          introTl.kill();
          introTl = null;
        }
      };
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      if (prefersReducedMotion.current || !enteredRef.current) return;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: 'auto' } });
      tl.fromTo(
        '[data-title-line]',
        { yPercent: 115 },
        { yPercent: 0, duration: 0.6, ease: 'power4.out' }
      )
        .fromTo(
          '[data-slide-anim]',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.055 },
          '-=0.35'
        );
    },
    { dependencies: [project.id], scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 flex min-h-svh flex-col overflow-hidden bg-white px-6 pb-8 pt-10 sm:px-8 sm:pb-10 md:px-12 lg:h-svh lg:px-16"
    >
      <div className="flex items-center gap-4" data-section-anim>
        <span className="font-ubuntu-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
          Projects
        </span>
        <div className="h-[1px] w-12 bg-black" />
        <span className="hidden font-ubuntu-mono text-[10px] uppercase tracking-[0.3em] text-black/30 sm:block">
          Selected Work — {String(projects.length).padStart(2, '0')} Pieces
        </span>
      </div>

      <div className="mt-5 flex min-h-0 flex-1 flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.5fr)] lg:gap-12">
        <aside className="order-2 flex min-h-0 flex-col gap-5 lg:order-1 lg:justify-center lg:pr-4">
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-ubuntu-mono text-[10px] uppercase tracking-[0.25em] text-black/40" data-slide-anim>
                {project.category}
              </span>
              <div className="overflow-hidden">
                <h2
                  data-title-line
                  className="mt-2 block font-bebas text-[clamp(2.4rem,4.5vw,4.25rem)] leading-[0.92] tracking-[0.01em] text-primary will-change-transform"
                >
                  {project.title}
                </h2>
              </div>
            </div>

            <p className="max-w-md font-inter text-sm leading-relaxed text-secondary" data-slide-anim>
              {project.fullDescription}
            </p>

            {project.features.length > 0 && (
              <ul className="flex flex-col gap-2" data-slide-anim>
                {project.features.slice(0, 3).map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-inter text-sm text-black/70"
                  >
                    <Check size={15} className="mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2" data-slide-anim>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 bg-softer px-3 py-1 font-ubuntu-mono text-[10px] uppercase tracking-wider text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1" data-slide-anim>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-black/15 px-4 py-2 font-ubuntu-mono text-[10px] uppercase tracking-[0.15em] text-primary transition hover:bg-black hover:text-white"
              >
                <ArrowUpRight size={14} />
                Code
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-black/15 px-4 py-2 font-ubuntu-mono text-[10px] uppercase tracking-[0.15em] text-primary transition hover:bg-black hover:text-white"
                >
                  <ExternalLink size={14} />
                  Live
                </a>
              )}
              <button
                type="button"
                onClick={() => setActiveIndex(currentIndex)}
                className="inline-flex items-center gap-1 px-2 py-2 font-ubuntu-mono text-[10px] uppercase tracking-[0.15em] text-black/50 transition hover:text-black"
              >
                ScreenShots
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-black/10 pt-5" data-section-anim>
            {projects.map((p, i) => {
              const active = i === currentIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => sliderRef.current?.goToIndex(i)}
                  aria-pressed={active}
                  aria-label={`Go to ${p.title}`}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-ubuntu-mono text-[10px] uppercase tracking-[0.15em] transition ${
                    active
                      ? 'border-black bg-black text-white'
                      : 'border-black/15 bg-white text-primary hover:bg-softer'
                  }`}
                >
                  <span className={active ? 'text-white/70' : 'text-black/40'}>{p.id}</span>
                  {p.title}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="order-1 flex min-h-0 flex-col lg:order-2 lg:h-full">
          <div
            className="min-h-[320px] h-[52vh] lg:h-auto lg:min-h-0 lg:flex-1"
            data-panel-scale
          >
            <MorphSlider
              ref={sliderRef}
              items={slides}
              transition="melt"
              overlayColor="#212529"
              autoplay
              autoplayDelay={5}
              loop
              showCaptions={false}
              showControls={false}
              onIndexChange={setCurrentIndex}
              onSlideClick={setActiveIndex}
            />
            <div className="pointer-events-none relative -mt-10 ml-auto mr-4 w-fit rounded-full border border-white/20 bg-black/35 px-3 py-1 font-ubuntu-mono text-[9px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
              Click · Drag · 0{currentIndex + 1}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center justify-end" data-section-anim>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => sliderRef.current?.prev()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-primary transition hover:bg-black hover:text-white"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => sliderRef.current?.next()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-primary transition hover:bg-black hover:text-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeIndex !== null && (
        <ProjectModal
          project={projects[activeIndex]}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </section>
  );
}

export default Projects;