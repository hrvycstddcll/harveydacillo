import { useEffect, useRef, useState } from 'react';

const PRELOAD_TEXTS = [
  'INITIALIZING',
  'LOADING PORTFOLIO',
  'PREPARING CONTENT',
  'BUILDING EXPERIENCE',
  'FINALIZING',
  'READY',
];

const CHARS_PER_TICK = 2;

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [groupTransition, setGroupTransition] = useState(false);
  const preloaderRef = useRef(null);
  const prevGroupRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = Math.min(prev + 1, 100);
        if (next >= 100) {
          clearInterval(interval);
        }
        return next;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count >= 100) {
      const timer = setTimeout(() => {
        if (preloaderRef.current) {
          preloaderRef.current.style.transform = 'translateY(-100%)';
          preloaderRef.current.style.opacity = '0';
        }

        setTimeout(onComplete, 500);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  const activeLine = Math.min(PRELOAD_TEXTS.length - 1, Math.floor((count / 100) * PRELOAD_TEXTS.length));
  const currentGroup = Math.floor(activeLine / 3);

  useEffect(() => {
    if (currentGroup !== prevGroupRef.current) {
      setGroupTransition(true);
      const timer = setTimeout(() => {
        setCharIndex(0);
        setGroupTransition(false);
      }, 100);
      prevGroupRef.current = currentGroup;
      return () => clearTimeout(timer);
    }
  }, [currentGroup]);

  useEffect(() => {
    if (groupTransition) return;
    const text = PRELOAD_TEXTS[activeLine] || '';
    if (charIndex >= text.length) return;

    const timer = setTimeout(() => {
      setCharIndex((prev) => Math.min(prev + CHARS_PER_TICK, text.length));
    }, 30);

    return () => clearTimeout(timer);
  }, [charIndex, activeLine, groupTransition]);

  const visibleStart = currentGroup * 3;
  const visibleLines = PRELOAD_TEXTS.slice(visibleStart, Math.min(visibleStart + 3, PRELOAD_TEXTS.length));

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#111111] text-[#f5f5f3] transition-all duration-700 ease-out"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="w-full max-w-lg px-6 sm:px-10">
        <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-[#f5f5f3]/75">
          <span>Loading</span>
          <span>{count}%</span>
        </div>

        <div className="mb-4 h-[2px] w-full overflow-hidden rounded-full bg-[#f5f5f3]/10">
          <div
            className="h-full rounded-full bg-[#f5f5f3] transition-all duration-150 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>

        <div className="flex min-h-[84px] flex-col justify-end gap-2 overflow-hidden font-mono uppercase tracking-[0.24em] text-[#f5f5f3]/90">
          {visibleLines.map((line, index) => {
            const absoluteIndex = visibleStart + index;
            const isCurrent = absoluteIndex === activeLine;
            const isLeaving = absoluteIndex < activeLine - 1;
            const displayText = isCurrent ? line.slice(0, charIndex) : line;
            const showCursor = isCurrent && charIndex < line.length;

            return (
              <div
                key={`${visibleStart}-${line}`}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: isLeaving ? 0 : isCurrent ? (charIndex > 0 ? 1 : 0) : 0.6,
                  transform: isLeaving
                    ? 'translateY(-14px)'
                    : groupTransition && isCurrent
                      ? 'translateY(14px)'
                      : 'translateY(0)',
                }}
              >
                {displayText}
                {showCursor && (
                  <span className="ml-[1px] inline-block h-[1em] w-[2px] animate-pulse bg-[#f5f5f3]/90 align-middle" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}