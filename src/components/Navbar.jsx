import { useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ heroRef }) {
  const [mobileIsOpen, setMobileIsOpen] = useState(false);
  const navRef = useRef(null);

  useGSAP(
    () => {
      const nav = navRef.current;
      const hero = heroRef?.current;

      if (!nav || !hero) return;

      let tl = null;

      const resetNavState = () => {
        gsap.set(nav, { clearProps: 'all' });
      };

      const createAnimation = () => {
        if (tl) {
          tl.kill();
          tl = null;
        }

        ScrollTrigger.getAll().forEach((st) => st.kill());

        resetNavState();

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            pin: false,
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
          tl.to(nav, { opacity: 0, duration: 0.15 });
          tl.to(nav, {
            y: () => -(window.innerHeight - nav.offsetHeight - 16),
            maxWidth: '100%',
            borderRadius: 0,
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '0.875rem',
            paddingBottom: '0.875rem',
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
            borderColor: 'rgba(0, 0, 0, 0.06)',
            duration: 0.7,
            ease: 'none',
          }, 0.15);
          tl.to(nav, { opacity: 1, duration: 0.15 }, 0.85);
        } else {
          tl.to(nav, {
            y: () => -(window.innerHeight - nav.offsetHeight - 16),
            maxWidth: '100%',
            borderRadius: 0,
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '0.875rem',
            paddingBottom: '0.875rem',
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
            borderColor: 'rgba(0, 0, 0, 0.06)',
            duration: 1,
            ease: 'none',
          });
        }

        ScrollTrigger.refresh();
      };

      createAnimation();

      let resizeTimer = null;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (window.innerWidth >= 768) {
            setMobileIsOpen(false);
          }
          createAnimation();
        }, 300);
      };

      window.addEventListener('resize', onResize);

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener('resize', onResize);
        if (tl) tl.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
        gsap.set(nav, { clearProps: 'all' });
      };
    },
    { scope: navRef, dependencies: [heroRef] }
  );

  return (
    <>
      <nav
        ref={navRef}
        className="navbar-shell fixed bottom-4 left-1/2 z-[1000] w-[calc(100%-1rem)] -translate-x-1/2 border border-black/15 bg-white/80 px-3 py-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:bottom-5 sm:w-[calc(100%-2.5rem)] sm:max-w-5xl sm:px-4 sm:py-3"
      >
        <div className="nav-inner flex items-center justify-between gap-2 sm:gap-4">
          <ul className="hidden items-center gap-5 whitespace-nowrap md:flex lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0f0f0f]">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2 sm:gap-3 md:ml-0">
            <span className="commission-text hidden font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0f0f0f] lg:inline-block">
              AVAILABLE FOR COMMISSIONS
            </span>

            <button
              onClick={() => setMobileIsOpen((prev) => !prev)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm sm:h-10 sm:w-10 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileIsOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileIsOpen && (
        <nav className="fixed inset-0 z-[1001] bg-[#f5f5f3]/95 px-5 pt-24 backdrop-blur-md sm:px-6 md:hidden">
          <button
            onClick={() => setMobileIsOpen(false)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm sm:right-6"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex flex-col gap-4 sm:gap-5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileIsOpen(false)}
                className="mobile-menu-link border-b border-black/10 pb-3 font-mono text-lg uppercase tracking-[0.2em] text-black sm:text-xl"
              >
                {link.title}
              </a>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
