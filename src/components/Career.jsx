import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft } from 'lucide-react';
import Folder from './Folder';
import DraggableWindow from './DraggableWindow';
import { categorizedStacks, skillIcons, experiences, academics, certifications } from '../../constants';

const folders = [
  { name: 'TechStacks', color: '#60a5fa' },
  { name: 'Academics', color: '#34d399' },
  { name: 'Experience', color: '#fbbf24' },
  { name: 'Certification', color: '#f87171' },
];

function ImagePreview({ src, alt, className }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(true);
        }}
        className="cursor-zoom-in rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
        aria-label={`View ${alt} image`}
      >
        <img src={src} alt={alt} className={className} />
      </button>
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[1100] flex cursor-zoom-out items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${alt} image preview`}
          >
            <img
              src={src}
              alt={alt}
              className="h-full w-full max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
            />
          </div>,
          document.body
        )}
    </>
  );
}

function TechStacksContent({ onSelectCategory }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
      {categorizedStacks.map((cat) => (
        <button
          key={cat.category}
          onClick={() => onSelectCategory(cat)}
          className="flex flex-col items-center gap-3 rounded-lg p-4 transition-colors hover:bg-black/5"
        >
          <Folder color="#60a5fa" size={1} />
          <span className="text-center font-inter text-[10px] text-black/70 leading-tight">
            {cat.category}
          </span>
        </button>
      ))}
    </div>
  );
}

function TechStackCategoryContent({ category }) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-black/10 px-4 py-2">
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <span className="w-5 h-5 shrink-0" />
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Name</span>
        </div>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Tag</span>
        <span className="hidden flex-1 font-mono text-[9px] uppercase tracking-[0.15em] text-black/40 sm:block">Description</span>
      </div>
      {/* Files */}
      {category.items.map((item, i) => (
        <div
          key={item.name}
          className={`group flex items-center gap-3 px-4 py-2.5 transition-colors cursor-default ${
            i % 2 === 0 ? 'bg-white' : 'bg-black/[0.02]'
          } hover:bg-[#0066FF]/10`}
        >
          {/* Icon + Name */}
          <div className="flex flex-1 items-center gap-2 min-w-0">
            {skillIcons[item.icon] && (
              <img
                src={skillIcons[item.icon]}
                alt={item.name}
                className="h-5 w-5 shrink-0 object-contain transition-transform group-hover:scale-110"
              />
            )}
            <span className="font-inter text-xs font-medium text-black/80 truncate">{item.name}</span>
          </div>
          {/* Tag */}
          <span className="shrink-0 rounded-full bg-black/5 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-black/50">
            {item.tag}
          </span>
          {/* Description */}
          <span className="hidden flex-1 font-inter text-[11px] text-black/40 truncate sm:block">
            {item.description}
          </span>
        </div>
      ))}
    </div>
  );
}

function AcademicsContent({ onSelectInstitution }) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-black/10 px-4 py-2">
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <span className="w-5 h-5 shrink-0" />
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Institution</span>
        </div>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Period</span>
        <span className="hidden flex-1 font-mono text-[9px] uppercase tracking-[0.15em] text-black/40 sm:block">Degree</span>
      </div>
      {/* Files */}
      {academics.map((edu, i) => (
        <div
          key={i}
          onClick={() => onSelectInstitution(edu)}
          className={`group flex items-center gap-3 px-4 py-2.5 transition-colors cursor-default ${
            i % 2 === 0 ? 'bg-white' : 'bg-black/[0.02]'
          } hover:bg-[#34d399]/10`}
        >
          <div className="flex flex-1 items-center gap-2 min-w-0">
            {edu.image ? (
              <ImagePreview src={edu.image} alt={edu.institution} className="h-5 w-5 shrink-0 rounded object-cover transition-transform group-hover:scale-110" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" fill="#34d399">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
              </svg>
            )}
            <span className="font-inter text-xs font-medium text-black/80 truncate">{edu.institution}</span>
          </div>
          <span className="shrink-0 rounded-full bg-black/5 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-black/50">
            {edu.period}
          </span>
          <span className="hidden flex-1 font-inter text-[11px] text-black/40 truncate sm:block">
            {edu.degree}
          </span>
        </div>
      ))}
    </div>
  );
}

function AcademicsModal({ institution, onClose, bringToFront, containerRef }) {
  const [imageOpen, setImageOpen] = useState(false);

  return (
    <DraggableWindow
      title={institution.institution}
      icon={institution.image ? <img src={institution.image} alt="" className="h-3 w-3 rounded object-cover" /> : null}
      onClose={onClose}
      initialX={200}
      initialY={150}
      bringToFront={bringToFront}
      containerRef={containerRef}
    >
      <div className="px-5 py-4 space-y-3 bg-white">
        {institution.image && (
          <>
            <button
              onClick={() => setImageOpen(true)}
              className="relative h-32 w-full cursor-zoom-in overflow-hidden rounded-lg bg-black/[0.03]"
            >
              <img src={institution.image} alt={institution.institution} className="h-full w-full object-contain" />
            </button>
            {imageOpen &&
              createPortal(
                <div
                  className="fixed inset-0 z-[1100] flex cursor-zoom-out items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
                  onClick={() => setImageOpen(false)}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${institution.institution} image preview`}
                >
                  <img
                    src={institution.image}
                    alt={institution.institution}
                    className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                  />
                </div>,
                document.body
              )}
          </>
        )}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Degree</span>
          <p className="mt-0.5 font-inter text-sm font-medium text-black/80">{institution.degree}</p>
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Period</span>
          <p className="mt-0.5 font-inter text-sm text-black/60">{institution.period}</p>
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Description</span>
          <p className="mt-0.5 font-inter text-sm leading-relaxed text-black/60">{institution.description}</p>
        </div>
      </div>
    </DraggableWindow>
  );
}

function ExperienceContent({ onSelectExperience }) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-black/10 px-4 py-2">
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <span className="w-5 h-5 shrink-0" />
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Role</span>
        </div>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Period</span>
        <span className="hidden flex-1 font-mono text-[9px] uppercase tracking-[0.15em] text-black/40 sm:block">Description</span>
      </div>
      {/* Files */}
      {experiences.map((exp, i) => (
        <div
          key={i}
          onClick={() => onSelectExperience(exp)}
          className={`group flex items-center gap-3 px-4 py-2.5 transition-colors cursor-default ${
            i % 2 === 0 ? 'bg-white' : 'bg-black/[0.02]'
          } hover:bg-[#fbbf24]/10`}
        >
          <div className="flex flex-1 items-center gap-2 min-w-0">
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" fill="#fbbf24">
              <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
            </svg>
            <span className="font-inter text-xs font-medium text-black/80 truncate">{exp.role}</span>
          </div>
          <span className="shrink-0 rounded-full bg-black/5 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-black/50">
            {exp.period}
          </span>
          <span className="hidden flex-1 font-inter text-[11px] text-black/40 truncate sm:block">
            {exp.description}
          </span>
        </div>
      ))}
    </div>
  );
}

function ExperienceModal({ experience, onClose, bringToFront, containerRef }) {
  return (
    <DraggableWindow
      title={experience.role}
      onClose={onClose}
      initialX={250}
      initialY={150}
      bringToFront={bringToFront}
      containerRef={containerRef}
    >
      <div className="px-5 py-4 space-y-3 bg-white">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Company</span>
          <p className="mt-0.5 font-inter text-sm font-medium text-black/80">{experience.company}</p>
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Period</span>
          <p className="mt-0.5 font-inter text-sm text-black/60">{experience.period}</p>
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Description</span>
          <p className="mt-0.5 font-inter text-sm leading-relaxed text-black/60">{experience.description}</p>
        </div>
        {experience.bullets && experience.bullets.length > 0 && (
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Highlights</span>
            <ul className="mt-1 space-y-1">
              {experience.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 font-inter text-[11px] text-black/60">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#fbbf24]" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DraggableWindow>
  );
}

function CertificationContent({ onSelectCert }) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-black/10 px-4 py-2">
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <span className="w-5 h-5 shrink-0" />
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Title</span>
        </div>
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Year</span>
        <span className="hidden flex-1 font-mono text-[9px] uppercase tracking-[0.15em] text-black/40 sm:block">Issuer</span>
      </div>
      {/* Files */}
      {certifications.map((cert, i) => (
        <div
          key={i}
          onClick={() => onSelectCert(cert)}
          className={`group flex items-center gap-3 px-4 py-2.5 transition-colors cursor-default ${
            i % 2 === 0 ? 'bg-white' : 'bg-black/[0.02]'
          } hover:bg-[#f87171]/10`}
        >
          <div className="flex flex-1 items-center gap-2 min-w-0">
            {cert.image ? (
              <ImagePreview src={cert.image} alt={cert.title} className="h-5 w-5 shrink-0 rounded object-cover transition-transform group-hover:scale-110" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" fill="#f87171">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            )}
            <span className="font-inter text-xs font-medium text-black/80 truncate">{cert.title}</span>
          </div>
          <span className="shrink-0 rounded-full bg-black/5 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-black/50">
            {cert.year}
          </span>
          <span className="hidden flex-1 font-inter text-[11px] text-black/40 truncate sm:block">
            {cert.issuer}
          </span>
        </div>
      ))}
    </div>
  );
}

function CertificationModal({ cert, onClose, bringToFront, containerRef }) {
  const [imageOpen, setImageOpen] = useState(false);

  return (
    <DraggableWindow
      title={cert.title}
      icon={cert.image ? <img src={cert.image} alt="" className="h-3 w-3 rounded object-cover" /> : null}
      onClose={onClose}
      initialX={300}
      initialY={150}
      bringToFront={bringToFront}
      containerRef={containerRef}
    >
      <div className="px-5 py-4 space-y-3 bg-white">
        {cert.image && (
          <>
            <button
              onClick={() => setImageOpen(true)}
              className="relative h-32 w-full cursor-zoom-in overflow-hidden rounded-lg bg-black/[0.03]"
            >
              <img src={cert.image} alt={cert.title} className="h-full w-full object-contain" />
            </button>
            {imageOpen &&
              createPortal(
                <div
                  className="fixed inset-0 z-[1100] flex cursor-zoom-out items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
                  onClick={() => setImageOpen(false)}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${cert.title} image preview`}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                  />
                </div>,
                document.body
              )}
          </>
        )}
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Issuer</span>
          <p className="mt-0.5 font-inter text-sm text-black/60">{cert.issuer}</p>
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Year</span>
          <p className="mt-0.5 font-inter text-sm text-black/60">{cert.year}</p>
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-black/40">Description</span>
          <p className="mt-0.5 font-inter text-sm leading-relaxed text-black/60">{cert.description}</p>
        </div>
      </div>
    </DraggableWindow>
  );
}

export default function Career() {
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const sectionRef = useRef(null);

  const handleBack = () => {
    if (activeCategory) {
      setActiveCategory(null);
    } else {
      setActiveFolder(null);
    }
  };

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat);
  };

  const handleSelectInstitution = (inst) => {
    setOpenWindows((prev) => {
      const existingIndex = prev.findIndex(
        (w) => w.type === 'academics' && w.data.institution === inst.institution
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          bringToFront: (updated[existingIndex].bringToFront || 0) + 1,
        };
        return updated;
      }
      return [...prev, { type: 'academics', data: inst, id: Date.now(), bringToFront: 0 }];
    });
  };

  const handleSelectCert = (cert) => {
    setOpenWindows((prev) => {
      const existingIndex = prev.findIndex(
        (w) => w.type === 'certification' && w.data.title === cert.title
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          bringToFront: (updated[existingIndex].bringToFront || 0) + 1,
        };
        return updated;
      }
      return [...prev, { type: 'certification', data: cert, id: Date.now(), bringToFront: 0 }];
    });
  };

  const handleSelectExperience = (exp) => {
    setOpenWindows((prev) => {
      const existingIndex = prev.findIndex(
        (w) => w.type === 'experience' && w.data.role === exp.role
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          bringToFront: (updated[existingIndex].bringToFront || 0) + 1,
        };
        return updated;
      }
      return [...prev, { type: 'experience', data: exp, id: Date.now(), bringToFront: 0 }];
    });
  };

  const handleCloseWindow = (id) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const renderContent = () => {
    if (activeFolder === 'TechStacks') {
      if (activeCategory) {
        return <TechStackCategoryContent category={activeCategory} />;
      }
      return <TechStacksContent onSelectCategory={handleSelectCategory} />;
    }
    if (activeFolder === 'Academics') {
      return <AcademicsContent onSelectInstitution={handleSelectInstitution} />;
    }
    if (activeFolder === 'Experience') return <ExperienceContent onSelectExperience={handleSelectExperience} />;
    if (activeFolder === 'Certification') {
      return <CertificationContent onSelectCert={handleSelectCert} />;
    }
    return null;
  };

  const showBack = activeFolder !== null;

  return (
    <section id="career" ref={sectionRef} className="relative z-10 bg-primary min-h-[95vh] px-6 py-12 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-center">
      <div className="mx-auto relative w-full max-w-7xl flex flex-col flex-1">
        {/* macOS Finder Window */}
        <div className="flex flex-col flex-1 overflow-hidden rounded-xl border border-black/10 bg-[#f5f5f5] shadow-lg">
          {/* Title Bar */}
          <div className="flex items-center gap-2 border-b border-black/10 bg-[#e8e8e8] px-4 py-3 shrink-0">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="ml-4 flex-1 text-center font-inter text-xs text-black/40">
              Career
            </div>
          </div>

          {/* Path Bar */}
          <div className="flex items-center gap-1.5 border-b border-black/10 bg-[#f0f0f0] px-4 py-2 shrink-0">
            {showBack && (
              <button
                onClick={handleBack}
                className="mr-1 flex items-center justify-center rounded hover:bg-black/5"
              >
                <ChevronLeft className="h-3.5 w-3.5 text-black/50" />
              </button>
            )}
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="#60a5fa">
              <path d="M2 6a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z" />
            </svg>
            <button
              onClick={() => { setActiveFolder(null); setActiveCategory(null); }}
              className={`font-inter text-[11px] transition-colors ${
                !activeFolder ? 'text-black/70' : 'text-black/50 hover:text-black/70'
              }`}
            >
              Career
            </button>
            {activeFolder && (
              <>
                <span className="font-inter text-[11px] text-black/30">/</span>
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`font-inter text-[11px] transition-colors ${
                    activeCategory ? 'text-black/50 hover:text-black/70' : 'text-black/70'
                  }`}
                >
                  {activeFolder}
                </button>
              </>
            )}
            {activeCategory && (
              <>
                <span className="font-inter text-[11px] text-black/30">/</span>
                <span className="font-inter text-[11px] text-black/70">{activeCategory.category}</span>
              </>
            )}
            <span className="font-inter text-[11px] text-black/30">/</span>
          </div>

          {/* Sidebar + Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="hidden w-44 border-r border-black/10 bg-[#ececec] p-3 sm:flex sm:flex-col shrink-0">
              <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.15em] text-black/30">
                Favorites
              </div>
              {folders.map((folder) => (
                <button
                  key={folder.name}
                  onClick={() => { setActiveFolder(folder.name); setActiveCategory(null); }}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
                    activeFolder === folder.name ? 'bg-black/10 text-black' : 'text-black/70 hover:bg-black/5'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill={folder.color}>
                    <path d="M2 6a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6z" />
                  </svg>
                  <span className="font-inter text-xs">{folder.name}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {!activeFolder ? (
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                  {folders.map((folder) => (
                    <button
                      key={folder.name}
                      onClick={() => setActiveFolder(folder.name)}
                      className="flex flex-col items-center gap-4 rounded-lg p-4 transition-colors hover:bg-black/5"
                    >
                      <Folder color={folder.color} size={1.2} />
                      <span className="text-center font-inter text-[11px] text-black/70">
                        {folder.name}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                renderContent()
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Open Windows */}
      {openWindows.map((window) => {
        if (window.type === 'academics') {
          return (
            <AcademicsModal
              key={window.id}
              institution={window.data}
              onClose={() => handleCloseWindow(window.id)}
              bringToFront={window.bringToFront}
              containerRef={sectionRef}
            />
          );
        }
        if (window.type === 'certification') {
          return (
            <CertificationModal
              key={window.id}
              cert={window.data}
              onClose={() => handleCloseWindow(window.id)}
              bringToFront={window.bringToFront}
              containerRef={sectionRef}
            />
          );
        }
        if (window.type === 'experience') {
          return (
            <ExperienceModal
              key={window.id}
              experience={window.data}
              onClose={() => handleCloseWindow(window.id)}
              bringToFront={window.bringToFront}
              containerRef={sectionRef}
            />
          );
        }
        return null;
      })}
    </section>
  );
}