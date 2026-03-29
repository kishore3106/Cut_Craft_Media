/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue, useInView } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter, ExternalLink, X, Volume2, VolumeX } from "lucide-react";
import { useRef, useEffect, useState, MouseEvent, lazy, Suspense } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Lenis from "lenis";

const ExperiencePage = lazy(() => import("./ExperiencePage"));

const PROJECTS = [
  {
    id: "video-1",
    type: "video",
    title: "BRAND STORY",
    category: "SOCIAL MEDIA / REELS",
    video: "/showcase.mp4",
    image: "",
    color: "#FF4E00",
    description: "A high-energy, engaging social media reel designed to capture attention in the first 3 seconds. We utilized dynamic text animations, smooth transitions, and precise audio syncing to elevate the client's message.",
    feedback: "Cut Craft Media completely transformed our social media presence. The retention rate on this video was 3x our average, and the pacing was absolutely perfect.",
    client: "Amelia Duren, Creative Director",
    format: "vertical"
  },
  {
    id: "video-2",
    type: "video",
    title: "BRAND SHOWCASE",
    category: "COMMERCIAL / HORIZONTAL",
    video: "/showcase2.mp4",
    image: "",
    color: "#00E5FF",
    description: "A cinematic horizontal showcase highlighting brand identity and product features. This edit focuses on smooth pacing, color grading, and a professional aesthetic tailored for widescreen viewing.",
    feedback: "The horizontal format perfectly captured the cinematic feel we wanted. The color grading and transitions were flawless.",
    client: "TechVision Inc.",
    format: "horizontal"
  },
  {
    id: "video-3",
    type: "video",
    title: "PRODUCT REVEAL",
    category: "COMMERCIAL / HORIZONTAL",
    video: "/showcase3.mp4",
    image: "",
    color: "#E500FF",
    description: "A high-impact product reveal video designed to build anticipation and showcase key features. The edit utilizes fast cuts, dynamic lighting effects, and a driving soundtrack to create excitement.",
    feedback: "The energy in this video is incredible. It perfectly captured the essence of our new product launch.",
    client: "InnovateTech",
    format: "horizontal"
  }
];

const COLLECTION_VIDEOS = [
  { id: "c1", src: "/1C.mp4", title: "Love & Relationship", desc: "Capturing heartfelt moments and emotional connections." },
  { id: "c2", src: "/2c.mp4", title: "Commercial Jewellery Ad", desc: "Elegant showcases of luxury and craftsmanship." },
  { id: "c3", src: "/3c.mp4", title: "UGC Brand Promotion", desc: "Authentic content that builds trust and engagement." },
  { id: "c4", src: "/4c.mp4", title: "Engaging Podcasts Edit", desc: "Dynamic visual storytelling for audio-first content." },
  { id: "c5", src: "/5c.mp4", title: "3D Motion Graphics", desc: "Immersive animations that bring concepts to life." },
  { id: "c6", src: "/6c.mp4", title: "Event Promotion", desc: "High-energy teasers for unforgettable experiences.", format: "horizontal" },
  { id: "c7", src: "/7c.mp4", title: "Funny Meme Edit", desc: "Viral-ready humor with perfect comedic timing.", format: "horizontal" },
  { id: "c8", src: "/8c.mp4", title: "Property Edit", desc: "Professional real estate tours with a cinematic touch.", format: "horizontal" },
];

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest(".cursor-pointer")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-white/50 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isClicking ? 0.8 : (isHovering ? 2 : 1),
      }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </motion.div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 p-4 sm:p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="font-display font-bold text-xl sm:text-2xl tracking-tighter"
    >
      <span className="md:hidden">CCM</span>
      <span className="hidden md:inline">CUT CRAFT MEDIA.</span>
    </motion.div>
    <div className="flex gap-4 sm:gap-8 text-[10px] sm:text-sm font-medium uppercase tracking-widest">
      {["Work", "About", "Contact"].map((item, i) => (
        <motion.a
          key={item}
          href={`#${item.toLowerCase()}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hover:opacity-50 transition-opacity"
        >
          {item}
        </motion.a>
      ))}
    </div>
  </nav>
);

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col justify-center px-6 md:px-12 bg-white text-black overflow-hidden relative py-20 md:py-0">
      
      {/* Person Image with Blurry Glass Effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 right-0 w-full md:w-[60%] h-full pointer-events-none z-0 overflow-hidden"
      >
        {/* The Image - Replace src with your attached image URL if needed */}
        <img 
          src="/profile.jpg" 
          alt="Person" 
          className="w-full h-full object-cover object-center md:object-right"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        
        {/* Blurry Glass / Fade Effect Overlays */}
        {/* Left to right fade to blend with the white background, darkening slightly on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-black/30 z-10" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
        {/* Glass blur effect fading towards the right - reduced blur for better visibility */}
        <div className="absolute inset-0 backdrop-blur-sm [mask-image:linear-gradient(to_right,white,transparent)] z-10" />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 relative"
      >
        <h1 className="text-[clamp(3.5rem,15vw,12rem)] md:text-[clamp(5rem,12vw,15rem)] font-black leading-[0.8] tracking-tighter uppercase text-black">
          EDIT <br />
          <span className="font-display text-black">That</span> <br />
          Moves.
        </h1>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 0.5, duration: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0"
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/20 via-transparent to-transparent" />
      </motion.div>

    </section>
  );
};

interface ProjectCardProps {
  project: {
    id: number | string;
    type: string;
    title: string;
    category: string;
    image?: string;
    video?: string;
    color: string;
    description?: string;
    feedback?: string;
    client?: string;
    format?: string;
  };
  key?: number | string;
}

const VideoProjectCard = ({ project }: ProjectCardProps) => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px" });
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isHorizontal = project.format === "horizontal";
  const aspectClass = isHorizontal ? "aspect-[16/9]" : "aspect-[9/16]";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]), { damping: 20, stiffness: 100 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isInView && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isInView]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <motion.div
        ref={containerRef}
        style={{ scale, opacity }}
        onClick={() => setIsOpen(true)}
        className={`group relative cursor-pointer overflow-hidden w-full ${aspectClass} ${isHorizontal ? 'max-h-[75vh]' : ''} bg-zinc-900 rounded-xl`}
      >
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full origin-center">
          <video
            ref={videoRef}
            src={project.video}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-6 md:p-8 z-10">
          <div className="flex justify-between items-end translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1]">
            <div>
              <p className="font-display text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2" style={{ color: project.color }}>
                {project.category}
              </p>
              <h3 className="font-display text-2xl md:text-4xl font-black text-white leading-none tracking-tighter uppercase">
                {project.title}
              </h3>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-12 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-6xl h-[85vh] md:h-[80vh] bg-[#111] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 text-white/50 hover:text-white transition-colors bg-black/40 p-2 rounded-full backdrop-blur-md"
              >
                <X size={24} />
              </button>
              
              <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col md:flex-row overscroll-contain" data-lenis-prevent="true">
                <div className={`bg-black relative shrink-0 mx-auto md:mx-0 md:sticky md:top-0 flex items-center justify-center ${isHorizontal ? 'w-full md:w-[60%] h-auto aspect-[16/9]' : 'w-auto max-w-full md:max-w-[45%] h-[45vh] md:h-[80vh] aspect-[9/16]'}`}>
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain md:object-cover"
                  />
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 p-8 md:p-12"
                >
                  <div className="py-4 md:py-8">
                    <p className="font-display text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4" style={{ color: project.color }}>
                      {project.category}
                    </p>
                    <h3 className="font-display text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase mb-8">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-6 text-white/70 font-display text-sm md:text-base leading-relaxed">
                      <p>
                        {project.description}
                      </p>
                      
                      <div className="pt-8 border-t border-white/10 mt-8">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">Client Feedback</h4>
                        <blockquote className="italic text-lg md:text-xl text-white/90 border-l-2 pl-6 py-2" style={{ borderColor: project.color }}>
                          "{project.feedback}"
                        </blockquote>
                        <p className="mt-4 text-xs uppercase tracking-widest opacity-50">— {project.client}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]), { damping: 20, stiffness: 100 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <motion.div
      ref={containerRef}
      style={{ scale, opacity }}
      className="group relative cursor-pointer overflow-hidden w-full aspect-[4/5] md:aspect-[16/10] max-h-[60vh] bg-zinc-900 rounded-xl"
    >
      <motion.img
        src={project.image}
        alt={project.title}
        referrerPolicy="no-referrer"
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-6 md:p-8">
        <div className="flex justify-between items-end translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1]">
          <div>
            <p className="font-display text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2" style={{ color: project.color }}>
              {project.category}
            </p>
            <h3 className="font-display text-2xl md:text-4xl font-black text-white leading-none tracking-tighter uppercase">
              {project.title}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start end", "center center", "end start"]
  });

  // Map scroll progress to volume (0 at edges, 1 at center)
  const volumeValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Update active video volume based on scroll and mute state
  useEffect(() => {
    const updateVolume = (v: number) => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === currentIndex && !isMuted) {
            video.volume = v;
          } else {
            video.volume = 0;
          }
        }
      });
    };

    const unsubscribe = volumeValue.on("change", updateVolume);
    // Initial set
    updateVolume(volumeValue.get());

    return () => unsubscribe();
  }, [currentIndex, isMuted, volumeValue]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % COLLECTION_VIDEOS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + COLLECTION_VIDEOS.length) % COLLECTION_VIDEOS.length);
  };

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div ref={carouselRef} className="w-full mt-12 md:mt-24 relative flex flex-col items-center">
      <div className="relative h-[450px] sm:h-[600px] w-full flex items-center justify-center perspective-1500 overflow-visible">
        <div className="relative w-full h-full flex items-center justify-center preserve-3d">
          {COLLECTION_VIDEOS.map((video, index) => {
            const offset = index - currentIndex;
            
            // Handle circular wrapping for a smoother 3D feel
            let displayOffset = offset;
            if (offset > COLLECTION_VIDEOS.length / 2) displayOffset -= COLLECTION_VIDEOS.length;
            if (offset < -COLLECTION_VIDEOS.length / 2) displayOffset += COLLECTION_VIDEOS.length;
            
            const absDisplayOffset = Math.abs(displayOffset);
            const isActive = index === currentIndex;

            return (
              <motion.div
                key={video.id}
                initial={false}
                animate={{
                  rotateY: displayOffset * -25,
                  scale: isActive ? (isMobile ? 1.1 : 1.2) : 1 - absDisplayOffset * 0.15,
                  z: absDisplayOffset * -200,
                  x: displayOffset * (isMobile ? 220 : 280),
                  opacity: 1 - absDisplayOffset * 0.3,
                  zIndex: COLLECTION_VIDEOS.length - absDisplayOffset,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="absolute w-[220px] sm:w-[300px] h-[380px] sm:h-[530px] bg-white/5 rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
                onClick={() => setCurrentIndex(index)}
              >
                <video 
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src} 
                  muted={!isActive || isMuted} 
                  loop 
                  playsInline 
                  preload="metadata"
                  className={`w-full h-full ${video.format === 'horizontal' ? 'object-contain bg-black' : 'object-cover'}`}
                />
                
                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className={`absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 flex flex-col justify-end p-6 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs">{video.title}</h4>
                  <p className="text-white/50 text-[10px] mt-2 uppercase tracking-tighter">{video.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex gap-4 mt-12">
        {COLLECTION_VIDEOS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              index === currentIndex ? "bg-[#FF4E00] w-8" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Side Navigation Arrows (Optional but helpful) */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10 z-50"
      >
        <ArrowUpRight className="rotate-[-135deg] text-white w-5 h-5" />
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10 z-50"
      >
        <ArrowUpRight className="rotate-[45deg] text-white w-5 h-5" />
      </button>
    </div>
  );
};

const Work = () => (
  <section id="work" className="bg-[#0A0A0A] py-32">
    <div className="px-4 sm:px-6 md:px-24 mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 max-w-[1800px] mx-auto">
      <motion.h2 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]"
      >
        Selected<br />Work
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="font-display text-xs sm:text-sm text-white max-w-xs md:text-right uppercase tracking-widest"
      >
        A collection of digital experiences and brand identities crafted with precision.
      </motion.p>
    </div>
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 px-4 sm:px-6 md:px-24 max-w-[1800px] mx-auto">
      {/* Left Side - Videos Container */}
      <div className="w-full lg:w-[65%] flex flex-col gap-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left Column - Vertical Projects */}
          <div className="w-full md:w-[40%] flex flex-col gap-6 md:gap-8">
            {PROJECTS.filter(p => p.format === 'vertical' || p.type !== 'video').map((project) => (
              project.type === 'video' ? (
                <VideoProjectCard key={project.id} project={project} />
              ) : (
                <ProjectCard key={project.id} project={project} />
              )
            ))}
          </div>
          
          {/* Right Column - Horizontal Projects */}
          <div className="w-full md:w-[60%] flex flex-col gap-6 md:gap-8">
            {PROJECTS.filter(p => p.format === 'horizontal').map((project) => (
              project.type === 'video' ? (
                <VideoProjectCard key={project.id} project={project} />
              ) : (
                <ProjectCard key={project.id} project={project} />
              )
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Description */}
      <div className="w-full lg:w-[35%] lg:sticky lg:top-32 h-fit flex flex-col justify-center pt-12 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-12 h-1 bg-[#FF4E00] mb-8"></div>
          <h3 className="text-[#FF4E00] font-bold tracking-widest uppercase text-sm mb-4">Creative Portfolio</h3>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-[0.9] mb-6 tracking-tighter">
            Digital Content <br/> Production
          </h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            A diverse range of visual storytelling projects, from high-energy social media edits to cinematic brand narratives. We specialize in crafting engaging content that resonates with audiences and elevates brand presence across all platforms.
          </p>
          
          <div className="space-y-6">
            {[
              { title: "Brand Stories", desc: "Immersive cinematic narratives" },
              { title: "Social Content", desc: "High-retention vertical formats" },
              { title: "Dynamic Edits", desc: "Fast-paced, engaging visual cuts" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-4"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[#FF4E00]"></div>
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm">{item.title}</h4>
                  <p className="text-white/50 text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </div>

    {/* Video Carousel Section - Full Width & Centered */}
    <div className="mt-32 max-w-[1800px] mx-auto">
      <div className="px-6 md:px-24 mb-8">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-[#FF4E00] font-bold tracking-widest uppercase text-lg"
        >
          BUDGET-FRIENDLY EDITS & MORE
        </motion.h3>
      </div>
      <VideoCarousel />
    </div>
  </section>
);

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Apply a spring physics smoothing to the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const yHeading = useTransform(smoothProgress, [0, 0.5, 1], [-150, 0, 150]);
  const opacityHeading = useTransform(smoothProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0]);

  const opacityParagraph = useTransform(smoothProgress, [0.1, 0.35, 0.8, 1], [0, 1, 1, 0]);

  const yServices = useTransform(smoothProgress, [0, 0.5, 1], [-50, 0, 50]);
  const opacityServices = useTransform(smoothProgress, [0.2, 0.45, 0.8, 1], [0, 1, 1, 0]);

  return (
  <section id="about" ref={containerRef} className="bg-white text-black py-32 md:py-48 px-4 sm:px-6 md:px-12 relative z-10 overflow-hidden">
    {/* Background Image on the Left */}
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "backOut" }}
      className="absolute top-0 left-0 w-full md:w-[60%] h-full pointer-events-none z-0 overflow-hidden"
    >
      <img 
        src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2070&auto=format&fit=crop" 
        alt="Editing Suite" 
        className="w-full h-full object-cover object-center md:object-left contrast-150"
        referrerPolicy="no-referrer"
      />
      
      {/* Blurry Glass / Fade Effect Overlays */}
      {/* Right to left fade to blend with the white background */}
      <div className="absolute inset-0 bg-gradient-to-l from-white via-white/60 to-white/20 z-10" />
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent z-10" />
      {/* Top fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-transparent z-10" />
      {/* Glass blur effect fading towards the left */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/20 [mask-image:linear-gradient(to_left,white,transparent)] z-10" />
    </motion.div>

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
        <motion.h2 
          style={{ y: yHeading, opacity: opacityHeading }}
          className="font-display text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-black origin-left"
        >
          We craft <br />
          visual stories <br />
          that resonate.
        </motion.h2>
        <div className="space-y-12">
          <motion.p 
            style={{ opacity: opacityParagraph }}
            className="font-display text-2xl md:text-3xl leading-tight font-medium"
          >
            Cut Craft Media is a boutique video editing and post-production studio. We partner with forward-thinking creators to bring cinematic quality to every frame. Our approach is rooted in rhythm, driven by narrative, and powered by technical mastery.
          </motion.p>
          <motion.div 
            style={{ y: yServices, opacity: opacityServices }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 pt-12 border-t border-black/10"
          >
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest mb-6">Services</h4>
              <ul className="font-display text-sm space-y-3 uppercase font-semibold opacity-80">
                <li>Video Editing</li>
                <li>Color Grading</li>
                <li>Sound Design</li>
                <li>Motion Graphics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-widest mb-6">Clients</h4>
              <ul className="font-display text-sm space-y-3 uppercase font-semibold opacity-80">
                <li>Tech Startups</li>
                <li>Fashion Houses</li>
                <li>Cultural Institutions</li>
                <li>Global Brands</li>
              </ul>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="pt-12"
            >
              <Link 
                to="/experience" 
                className="group inline-flex items-center gap-4 text-2xl md:text-3xl font-black tracking-tighter uppercase border-b-4 border-black pb-2 hover:opacity-50 transition-all"
              >
                EXPERIENCE & MORE
                <ExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
};

const Portfolio = () => (
  <>
    <Navbar />
    <Hero />
    <Work />
    <About />
    <Footer />
  </>
);

const Footer = () => (
  <footer id="contact" className="bg-[#0A0A0A] text-white py-32 px-6 md:px-12">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 xl:gap-16 mb-20 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-full xl:max-w-[50%]"
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] opacity-70 mb-8">Got a project?</p>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-black tracking-tighter uppercase leading-[0.75] break-words">
            Let's talk.
          </h2>
        </motion.div>
        <div className="flex flex-col items-start xl:items-end gap-4 w-full xl:w-auto">
          <motion.a 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            href="mailto:hellocutcraftmedia@gmail.com" 
            className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl font-bold border-b-2 md:border-b-4 border-white pb-2 md:pb-4 hover:opacity-50 transition-all duration-500 break-all sm:break-normal w-full xl:w-auto text-left xl:text-right"
          >
            hellocutcraftmedia@gmail.com
          </motion.a>
          <motion.a 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            href="tel:+918524083106" 
            className="font-display text-sm sm:text-lg md:text-xl lg:text-2xl font-bold opacity-60 hover:opacity-100 transition-all duration-500 w-full xl:w-auto text-left xl:text-right"
          >
            +91 8524083106
          </motion.a>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-white/10 gap-12">
        <div className="font-display font-bold text-3xl tracking-tighter">CUT CRAFT MEDIA.</div>
        <div className="flex gap-10">
          {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.2 }}
              className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            >
              <Icon size={24} />
            </motion.div>
          ))}
        </div>
        <p className="font-display text-[10px] uppercase tracking-widest opacity-50">
          © 2026 Cut Craft Media. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => {
      lenis.destroy();
      lenisRef.current = null;
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className={`bg-[#0A0A0A] selection:bg-white selection:text-black overflow-x-hidden ${!isTouchDevice ? 'custom-cursor-active' : ''}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-black font-display font-black text-4xl md:text-6xl tracking-tighter uppercase"
            >
              Cut Craft Media.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      <Suspense fallback={
        <div className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/experience" element={<ExperiencePage />} />
        </Routes>
      </Suspense>
    </main>
  );
}
