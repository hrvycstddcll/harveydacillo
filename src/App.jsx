import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Simplified from './Simplified';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Moon, Sun } from 'lucide-react';
import { useRef, useState } from 'react';

function App() {
  const transitionRef = useRef(null);
  const themeButtonRef = useRef(null);
  const [themeButtonPosition, setThemeButtonPosition] = useState(null);
  const isDraggingThemeButton = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const pointerStart = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);
  const [isLightMode, setIsLightMode] = useState(true);

  useGSAP(() => {
    const overlay = transitionRef.current;
    if (!overlay) return undefined;

    gsap.set(overlay, { opacity: 0, backdropFilter: 'blur(0px)' });

    const handleNavigation = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      event.preventDefault();
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      const timeline = gsap.timeline();

      timeline
        .to(overlay, { opacity: 1, backdropFilter: 'blur(10px)', duration: 0.2, ease: 'power2.in' })
        .add(() => {
          window.scrollTo(0, targetTop);
          window.history.pushState({}, '', link.getAttribute('href'));
        })
        .to(overlay, { opacity: 0, backdropFilter: 'blur(0px)', duration: 0.3, ease: 'power2.out' });
    };

    document.addEventListener('click', handleNavigation);
    return () => document.removeEventListener('click', handleNavigation);
  }, { scope: transitionRef });

  const startDraggingThemeButton = (event) => {
    const button = themeButtonRef.current;
    if (!button) return;

    const bounds = button.getBoundingClientRect();
    isDraggingThemeButton.current = true;
    didDrag.current = false;
    pointerStart.current = { x: event.clientX, y: event.clientY };
    dragOffset.current = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    setThemeButtonPosition({ x: bounds.left, y: bounds.top });
    button.setPointerCapture(event.pointerId);
  };

  const dragThemeButton = (event) => {
    if (!isDraggingThemeButton.current || !themeButtonRef.current) return;
    if (Math.hypot(event.clientX - pointerStart.current.x, event.clientY - pointerStart.current.y) > 4) {
      didDrag.current = true;
    }
    const size = themeButtonRef.current.offsetWidth;
    setThemeButtonPosition({
      x: Math.max(8, Math.min(window.innerWidth - size - 8, event.clientX - dragOffset.current.x)),
      y: Math.max(8, Math.min(window.innerHeight - size - 8, event.clientY - dragOffset.current.y)),
    });
  };

  const stopDraggingThemeButton = () => {
    isDraggingThemeButton.current = false;
  };

  const toggleThemePreview = () => {
    if (didDrag.current) return;
    setIsLightMode((lightMode) => !lightMode);
  };

  return (
    <div className="min-h-screen bg-black tex-white">
      <div
        ref={transitionRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100] bg-black/20"
      />
      <button
        ref={themeButtonRef}
        type="button"
        aria-label="Theme preview control"
        title="Theme preview control"
        onPointerDown={startDraggingThemeButton}
        onPointerMove={dragThemeButton}
        onPointerUp={stopDraggingThemeButton}
        onPointerCancel={stopDraggingThemeButton}
        onClick={toggleThemePreview}
        style={themeButtonPosition ? { left: themeButtonPosition.x, top: themeButtonPosition.y } : undefined}
        className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 touch-none items-center justify-center overflow-hidden rounded-full border border-neutral-500 shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        <span className="absolute inset-y-0 left-0 w-1/2 bg-neutral-100" />
        <span className="absolute inset-y-0 right-0 w-1/2 bg-neutral-900" />
        <Sun className="relative z-10 -mr-1 h-4 w-4 text-neutral-900" aria-hidden="true" />
        <Moon className="relative z-10 -ml-1 h-4 w-4 text-neutral-100" aria-hidden="true" />
      </button>
      {isLightMode ? (
        <Simplified />
      ) : (
        <>
          <Navbar />
          <Hero />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;