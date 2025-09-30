import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

// ===============================================
// 1. DATA
// ===============================================
const projectsData = [
  { id: 1, title: 'Pico Park Clone', description: 'A fun, cooperative multiplayer game clone.', image: '/projects/pico.png', tags: ['godot', 'visualstudiocode'], href: 'https://github.com/Praveen-afkl/PicoParkClone-main' },
  { id: 2, title: 'Taxi Reservation System', description: 'A fully-featured social taxi reservation system design.', image: '/projects/taxi.png', tags: ['Java', 'visualstudiocode'], href: '#' },
  { id: 3, title: 'Railway Reservation System', description: 'A command-line railway booking system.', image: '/projects/rail.png', tags: ['Java','visualstudiocode'], href: '#' },
  { id: 4, title: 'AI-Powered Interview app', description: 'In Progress!!', image: '/projects/inter.png', tags: ['React', 'tailwindcss', 'javascript'], href: '/in-progress.html' },
];

// ===============================================
// 2. ICONS
// ===============================================
const getIconPath = (tag) => {
  const lowerTag = tag.toLowerCase().replace('.', '').replace('#', 'sharp').replace('-', '');
  return `/assets/logos/${lowerTag}.svg`;
};

const TechIcon = ({ tag }) => {
  const iconPath = getIconPath(tag);
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center p-1 bg-slate-700/50 border border-slate-600" title={tag}>
      <img
        src={iconPath}
        alt={tag}
        className="w-full h-full object-contain"
        onError={(e) => {
          e.target.style.display = 'none';
          console.error(`Icon not found for tag: "${tag}". Expected at path: "${iconPath}"`);
        }}
      />
    </div>
  );
};

// ===============================================
// 3. PROJECT CARD
// ===============================================
const ProjectCard = ({ project, isActive }) => {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full w-full block cursor-pointer"
    >
      <div className={`
        relative w-full h-full rounded-2xl overflow-hidden
        border border-white/10 bg-slate-900
        transition-transform duration-500 ease-out
        ${isActive ? 'scale-100' : 'scale-90'}
      `}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = `https://placehold.co/800x600/18181b/ffffff?text=${project.title.replace(/\s/g, '+')}` }}
        />
        <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
          <p className="text-sm text-white/70 mt-1">{project.description}</p>
          <div className="flex items-center gap-2 mt-4">
            {project.tags.map((tag) => <TechIcon key={tag} tag={tag} />)}
          </div>
        </div>
      </div>
    </a>
  );
};

// ===============================================
// 4. MAIN PROJECTS COMPONENT (CORRECTED)
// ===============================================
const Projects = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <section id="projects" className="relative py-24 w-full flex flex-col items-center">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap");

        .embla {
          overflow: visible;
        }
        .embla__container { display: flex; }
        .embla__slide {
          flex: 0 0 80%;
          min-width: 0;
          padding: 0 1rem;
        }
        @media (min-width: 768px) {
          .embla__slide {
            flex: 0 0 50%;
          }
        }
        .embla__slide__inner {
          transition: opacity 0.5s ease-out;
        }
        .embla__slide:not(.is-selected) .embla__slide__inner {
          opacity: 0.3;
        }
        
        .funnel-title { font-family: 'Funnel Display', sans-serif; font-weight: 800; }
      `}</style>

      <motion.h2
        className="text-4xl md:text-6xl text-center mb-12 text-white tracking-widest"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>

      <div 
        className="w-full max-w-7xl relative"
        // === THIS IS THE FIX: Using a mask to create a true fade effect ===
        style={{ 
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' // For Safari compatibility
        }}
      >
        <div className="embla w-full" ref={emblaRef}>
          <div className="embla__container h-[450px]">
            {projectsData.map((proj, index) => (
              <div className={`embla__slide ${index === selectedIndex ? 'is-selected' : ''}`} key={proj.id}>
                <div className="embla__slide__inner h-full">
                  <ProjectCard project={proj} isActive={index === selectedIndex} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="absolute top-1/2 left-0 md:-left-8 transform -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={scrollNext}
          className="absolute top-1/2 right-0 md:-right-8 transform -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
};

export default Projects;

