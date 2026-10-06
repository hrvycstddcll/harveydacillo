import { useState, useRef, useCallback, useEffect } from 'react';

let highestZ = 1000;

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function getClampedPosition(x, y, elWidth, elHeight, containerEl) {
  if (!containerEl) return { x, y };
  const rect = containerEl.getBoundingClientRect();
  return {
    x: clamp(x, 0, rect.width - elWidth),
    y: clamp(y, 0, rect.height - elHeight),
  };
}

export default function DraggableWindow({
  title,
  icon,
  children,
  onClose,
  initialX = 100,
  initialY = 100,
  width = 'max-w-md',
  bringToFront,
  containerRef,
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(++highestZ);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    setZIndex(++highestZ);
  }, [bringToFront]);

  useEffect(() => {
    if (!windowRef.current || !containerRef?.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    setPosition((prev) => getClampedPosition(prev.x, prev.y, rect.width, rect.height, containerRef.current));
  }, [containerRef]);

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('button')) return;
    setZIndex(++highestZ);
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;
    if (windowRef.current && containerRef?.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setPosition(getClampedPosition(newX, newY, rect.width, rect.height, containerRef.current));
    } else {
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging, containerRef]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleWindowClick = () => {
    setZIndex(++highestZ);
  };

  return (
    <div
      ref={windowRef}
      className={`absolute overflow-hidden rounded-xl border border-black/10 bg-[#f5f5f5] shadow-2xl ${width}`}
      style={{
        left: position.x,
        top: position.y,
        zIndex,
      }}
      onClick={handleWindowClick}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className={`flex items-center gap-2 border-b border-black/10 bg-[#e8e8e8] px-4 py-2.5 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div className="flex gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] transition-colors"
          >
            <span className="hidden text-[8px] leading-none text-[#4a0002]/0 group-hover:text-[#4a0002]/100 font-bold">✕</span>
          </button>
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2">
          {icon && <span className="text-xs">{icon}</span>}
          <span className="font-inter text-xs text-black/50">{title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-[70vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
