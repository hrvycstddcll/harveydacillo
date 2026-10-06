import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MorphSlider from './MorphSlider';
import { projects } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

function ProjectModal({ project, onClose }) {
  const images = useMemo(
    () =>
      [project.image, ...(project.screenshots || [])].filter(
        (src, i, arr) => arr.indexOf(src) === i
      ),
    [project]
  );
  const sliderItems = useMemo(() => images.map((src) => ({ image: src })), [images]);
  const [imgIndex, setImgIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const modalRef = useRef(null);
  const panelRef = useRef(null);
  const lightboxRef = useRef(null);
  const sliderRef = useRef(null);

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
        sliderRef.current?.prev();
      } else if (lightbox && e.key === 'ArrowRight') {
        e.preventDefault();
        sliderRef.current?.next();
      }
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, onClose]);

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-8"
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
            className="relative overflow-hidden rounded-xl border border-black/10 bg-black"
            data-modalanim
          >
            <div className="h-[42vh] w-full sm:h-[50vh]">
              <MorphSlider
                ref={sliderRef}
                items={sliderItems}
                transition="melt"
                overlayColor="#212529"
                radius={0}
                showCaptions={false}
                showControls={images.length > 1}
                showIndicators={false}
                onIndexChange={setImgIndex}
                onSlideClick={() => setLightbox(true)}
              />
            </div>
            <span className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 font-ubuntu-mono text-[9px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
              Click to enlarge
            </span>
          </div>

          {images.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2" data-modalanim>
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sliderRef.current?.goToIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={i === imgIndex}
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

          <div className="border-t border-black/10 pt-4" data-modalanim>
            <span className="font-ubuntu-mono text-[10px] uppercase tracking-[0.25em] text-black/40">
              Overview
            </span>
            <p className="mt-2 font-inter text-sm leading-relaxed text-secondary">
              {project.fullDescription}
            </p>
          </div>
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
                onClick={() => sliderRef.current?.prev()}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-black"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => sliderRef.current?.next()}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-black"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      )}
    </div>,
    document.body
  );
}

function Projects() {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useGSAP(
    () => {
      if (prefersReducedMotion.current) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl.from('[data-section-anim]', { y: 22, opacity: 0, duration: 0.6, stagger: 0.08 }).from(
        '[data-card-anim]',
        { y: 36, opacity: 0, duration: 0.7, stagger: 0.12 },
        '-=0.35'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 overflow-x-hidden bg-white px-6 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-5" data-section-anim>
          <div>
            <span className="font-ubuntu-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
              Projects
            </span>
            <div className="mt-2 h-px w-8 bg-black" />
            <h2 className="mt-4 font-bebas text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] tracking-[-0.01em] text-black">
              Selected Work
            </h2>
          </div>
          <p className="max-w-xs font-inter text-sm leading-relaxed text-black/50">
            {projects.length} builds with source on GitHub — academic systems, full stack apps,
            and the interfaces behind them.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <article
              key={p.id}
              data-card-anim
              className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-colors hover:border-black/25"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`View screenshots of ${p.title}`}
                className="relative block w-full overflow-hidden bg-softer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2"
              >
                <img
                  src={p.image}
                  alt={`${p.title} preview`}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 font-ubuntu-mono text-[9px] uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
                  {p.id}
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                >
                  <ArrowUpRight size={15} />
                </span>
              </button>

              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="font-ubuntu-mono text-[10px] uppercase tracking-[0.25em] text-black/40">
                    {p.category}
                  </span>
                  <span className="h-px flex-1 bg-black/10" />
                </div>

                <h3 className="font-bebas text-[clamp(1.5rem,2.4vw,2rem)] leading-[0.95] tracking-[0.01em] text-primary">
                  {p.title}
                </h3>

                <p className="line-clamp-2 font-inter text-sm leading-relaxed text-secondary">
                  {p.shortDescription}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-black/10 bg-softer px-2.5 py-1 font-ubuntu-mono text-[9px] uppercase tracking-wider text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 font-ubuntu-mono text-[10px] uppercase tracking-[0.2em] text-white transition hover:bg-black"
                  >
                    Screenshots
                    <ChevronRight size={13} aria-hidden="true" />
                  </button>
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-2 font-ubuntu-mono text-[10px] uppercase tracking-[0.2em] text-primary transition hover:border-black hover:bg-black hover:text-white"
                  >
                    <ArrowUpRight size={13} aria-hidden="true" />
                    Code
                  </a>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-2 font-ubuntu-mono text-[10px] uppercase tracking-[0.2em] text-primary transition hover:border-black hover:bg-black hover:text-white"
                    >
                      <ExternalLink size={13} aria-hidden="true" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
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
