import { forwardRef, useEffect, useRef, useState } from 'react';
import GradientWaves from './GradientWaves';
import FloatingObjects from './FloatingObjects';

const TIMEZONE_MAP = {
  'Asia/Manila': 'MANILA, PH',
  'Asia/Tokyo': 'TOKYO, JP',
  'Asia/Seoul': 'SEOUL, KR',
  'Asia/Shanghai': 'SHANGHAI, CN',
  'Asia/Singapore': 'SINGAPORE, SG',
  'Asia/Dubai': 'DUBAI, AE',
  'Asia/Kolkata': 'MUMBAI, IN',
  'Europe/London': 'LONDON, GB',
  'Europe/Paris': 'PARIS, FR',
  'Europe/Berlin': 'BERLIN, DE',
  'Europe/Moscow': 'MOSCOW, RU',
  'America/New_York': 'NEW YORK, US',
  'America/Chicago': 'CHICAGO, US',
  'America/Denver': 'DENVER, US',
  'America/Los_Angeles': 'LOS ANGELES, US',
  'Pacific/Auckland': 'AUCKLAND, NZ',
  'Australia/Sydney': 'SYDNEY, AU',
};

function getFormattedTime() {
  const now = new Date();
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const label = TIMEZONE_MAP[tz] || tz.split('/').pop().replace(/_/g, ' ').toUpperCase();
  const time = now.toLocaleTimeString('en-GB', { hour12: false, timeZone: tz });
  return `${label} | ${time}`;
}

const TILE_SIZE = 64;
const DURATION = 1400;
const PIXEL_DURATION = 450;

function noise(seed) {
  const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
}

function PixelCover({ active }) {
  const containerRef = useRef(null);
  const [tiles, setTiles] = useState([]);
  const animatedRef = useRef(false);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cols = Math.ceil(w / TILE_SIZE) + 1;
    const rows = Math.ceil(h / TILE_SIZE) + 1;
    const result = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        result.push({
          id: idx,
          left: c * TILE_SIZE,
          top: r * TILE_SIZE,
          delay: noise(idx + 1) * (DURATION - PIXEL_DURATION)
        });
      }
    }
    setTiles(result);
  }, []);

  useEffect(() => {
    if (!active || animatedRef.current || !containerRef.current) return;
    animatedRef.current = true;

    const children = containerRef.current.children;
    const animations = [];

    for (let i = 0; i < children.length; i++) {
      const tile = children[i];
      const delay = parseFloat(tile.dataset.delay) || 0;

      animations.push(
        tile.animate(
          [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(0.35)', opacity: 0 }
          ],
          {
            duration: PIXEL_DURATION,
            delay,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'forwards'
          }
        )
      );
    }

    const last = animations[animations.length - 1];
    if (last) {
      last.onfinish = () => {
        containerRef.current.style.display = 'none';
      };
    }
  }, [active]);

  if (animatedRef.current) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[100] overflow-hidden"
    >
      {tiles.map(tile => (
        <div
          key={tile.id}
          data-delay={tile.delay}
          className="absolute bg-[#111111]"
          style={{
            left: tile.left,
            top: tile.top,
            width: TILE_SIZE,
            height: TILE_SIZE
          }}
        />
      ))}
    </div>
  );
}

const Hero = forwardRef(function Hero({ revealed, ...props }, ref) {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [clock, setClock] = useState(getFormattedTime);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fade = Math.max(0, 1 - scrollY / 200);
      setScrollOpacity(fade);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setClock(getFormattedTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] w-full overflow-hidden"
      {...props}
    >
      <GradientWaves
        horizonColor="#111111"
        waveColor="#1f1f1f"
        crestColor="#3a3a3a"
        speed={0.4}
        amplitude={2.5}
        waveScale={0.6}
        waveRatio={0.9}
        swell={35}
        turbulence={20}
        tilt={1.11}
        zoom={1.0}
        height={5.5}
        fogDepth={40}
        detail="medium"
        brightness={0.9}
        opacity={1.0}
        mouseInteraction={true}
        parallaxStrength={0.5}
        grain={true}
        grainIntensity={0.04}
      />

      <FloatingObjects />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 z-[3] -translate-x-1/2 sm:bottom-24 md:bottom-28 select-none pointer-events-none">
        <div className="flex flex-col items-center justify-center gap-0 text-center sm:flex-row sm:gap-2 md:gap-3">
          <h1 className="font-bebas text-[clamp(4rem,13vw,13rem)] leading-[0.7] tracking-[-0.03em] text-softer sm:text-[clamp(5rem,11vw,16rem)] md:text-[clamp(7rem,9vw,18rem)] lg:text-[clamp(13rem,10vw,22rem)]">
            Harvey
          </h1>
          <h1 className="font-playfair text-[clamp(4rem,13vw,13rem)] italic leading-[0.7] tracking-[-0.04em] text-white sm:text-[clamp(5rem,11vw,16rem)] md:text-[clamp(7rem,9vw,18rem)] lg:text-[clamp(12rem,10vw,22rem)]">
            Dacillo
          </h1>
        </div>
        <p
          className="mt-4 text-center font-mono text-[clamp(0.8rem,1.2vw,2.5rem)] uppercase tracking-[0.3em] text-softer/70 sm:mt-5"
        >
          {/* Fullstack Web-Developer */}
        </p>
        <p
          className="mt-3 text-center font-mono text-[clamp(0.5rem,1.2vw,0.85rem)] uppercase tracking-[0.25em] text-softer/50 sm:mt-4"
        >
          {clock}
        </p>
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-8 z-10 -translate-x-1/2 sm:top-10"
        style={{ opacity: scrollOpacity }}
      >
        <div className="hidden md:flex flex-col items-center gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#555]">
            Scroll
          </span>
          <div className="relative h-8 w-[18px] rounded-full border border-[#555]/30">
            <div className="absolute left-1/2 top-1.5 h-1.5 w-[3px] -translate-x-1/2 animate-bounce rounded-full bg-[#555]/50" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
        <div className="h-8 w-[1px] bg-gradient-to-b from-[#555]/40 to-transparent" />
        <div className="mt-0 h-[1px] w-8 bg-gradient-to-r from-[#555]/40 to-transparent" />
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
        <div className="ml-auto h-8 w-[1px] bg-gradient-to-b from-[#555]/40 to-transparent" />
        <div className="mt-0 ml-auto h-[1px] w-8 bg-gradient-to-l from-[#555]/40 to-transparent" />
      </div>

      <PixelCover active={revealed} />
    </section>
  );
});

export default Hero;
