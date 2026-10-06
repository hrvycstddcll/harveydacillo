import { useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useInView, useMotionValue, useSpring } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { quote, metrics } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

function BlurText({ text = '', className = '', animateBy = 'words', direction = 'top', stagger = 0.04 }) {
  const containerRef = useRef(null);
  const tlRef = useRef(null);
  const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);
  const lastHeight = useRef(typeof window !== 'undefined' ? window.innerHeight : 0);
  const animationStopped = useRef(false);

  useEffect(() => {
    if (animationStopped.current) return;

    const el = containerRef.current;
    if (!el) return;

    const spans = el.querySelectorAll('span');
    if (!spans.length) return;

    const yFrom = direction === 'top' ? -30 : 30;

    gsap.set(spans, { filter: 'blur(10px)', opacity: 0, y: yFrom });

    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 40%',
        scrub: 0.4,
        invalidateOnRefresh: true,
      },
    });

    tlRef.current.to(spans, {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      duration: 1,
      stagger,
      ease: 'power2.out',
    });

    return () => {
      tlRef.current?.scrollTrigger?.kill();
      tlRef.current?.kill();
    };
  }, [text, direction, stagger]);

  useEffect(() => {
    const onResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      if (newWidth !== lastWidth.current || newHeight !== lastHeight.current) {
        lastWidth.current = newWidth;
        lastHeight.current = newHeight;
        animationStopped.current = true;
        const el = containerRef.current;
        if (!el) return;
        const spans = el.querySelectorAll('span');
        tlRef.current?.scrollTrigger?.kill();
        tlRef.current?.kill();
        gsap.killTweensOf(spans);
        gsap.set(spans, { filter: 'blur(0px)', opacity: 1, y: 0 });
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap`}>
      {elements.map((segment, index) => (
        <span key={index} className="inline-block will-change-[transform,filter,opacity]">
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </p>
  );
}

function CountUp({ to, from = 0, direction = 'up', delay = 0, duration = 2, className = '', padStart = 0 }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const springValue = useSpring(motionValue, { damping: 20 + 40 * (1 / duration), stiffness: 100 * (1 / duration) });
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const hasAnimated = useRef(false);
  const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);

  const formatValue = useCallback(latest => {
    const rounded = Math.round(latest);
    return padStart > 0 ? String(rounded).padStart(padStart, '0') : String(rounded);
  }, [padStart]);

  useEffect(() => {
    if (ref.current) ref.current.textContent = formatValue(direction === 'down' ? to : from);
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (!isInView) return;
    hasAnimated.current = true;
    const id = setTimeout(() => motionValue.set(direction === 'down' ? from : to), delay * 1000);
    return () => clearTimeout(id);
  }, [isInView, motionValue, direction, from, to, delay]);

  useEffect(() => {
    const unsub = springValue.on('change', latest => {
      if (ref.current) ref.current.textContent = formatValue(latest);
    });
    return () => unsub();
  }, [springValue, formatValue]);

  useEffect(() => {
    const onResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth !== lastWidth.current) {
        lastWidth.current = newWidth;
        motionValue.jump(direction === 'down' ? from : to);
        if (ref.current) ref.current.textContent = formatValue(to);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [motionValue, direction, from, to, formatValue]);

  return <span className={className} ref={ref} />;
}

export default function Home() {
  return (
    <section id='home' className="relative z-10 bg-white px-6 py-20 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Top Section — Two-Column Split */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1px_1fr] md:gap-16">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
                Home
              </span>
              <div className="mt-2 h-[1px] w-8 bg-black" />
            </div>

            <h2 className="font-bebas text-[clamp(2.2rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.02em] text-black">
              Full Stack Developer
              <br />
              &amp; UI/UX Designer
            </h2>

            <BlurText
              text="Developer focused on building reliable web applications and clear user interfaces. Combines frontend craft, backend logic, and practical problem-solving through academic projects, freelance work, and continuous learning."
              animateBy="words"
              direction="bottom"
              stagger={0.03}
              className="max-w-md font-inter text-sm leading-relaxed text-black/60"
            />

            <div>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white transition-colors hover:bg-black/80"
              >
                View My Work
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden bg-black/10 md:block" />

          {/* Right Column — Quote */}
          <div className="flex flex-col justify-center gap-6">
            <BlurText
              text={quote.text}
              animateBy="words"
              direction="bottom"
              stagger={0.04}
              className="font-inter text-[clamp(0.875rem,4vw,1.25rem)] leading-relaxed text-black/70 italic"
            />
            <div className="flex items-center gap-3">
              <img
                src="/harveybg.jpg"
                alt=""
                className="h-15 w-15 rounded-full border border-black/10 object-cover"
              />
              <div>
                <div className="font-bebas text-[clamp(1rem,3vw,1.5rem)] leading-none tracking-[-0.01em] text-black">
                  {quote.name}
                </div>
                <div className="mt-0.5 font-mono text-[clamp(0.45rem,2vw,0.875rem)] uppercase tracking-[0.2em] text-black/50">
                  {quote.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="my-12 h-[1px] bg-black/10 md:my-16" />

        {/* Bottom Section — 3-Column Metric Grid */}
        <div className="grid gap-6 grid-cols-3 sm:gap-0">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`flex flex-col items-center gap-2 py-4 text-center ${
                i < metrics.length - 1 ? 'md:border-r md:border-black/10' : ''
              }`}
            >
              <div className="font-bebas text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-black">
                <CountUp from={0} to={metric.number} duration={2} padStart={2} className="inline" />
                <span>{metric.suffix}</span>
              </div>
              <div className="font-mono text-[clamp(0.35rem,2vw,0.675rem)] uppercase tracking-[0.25em] text-black/50">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
