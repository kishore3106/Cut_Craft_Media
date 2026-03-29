import { motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, Mail, Phone, MapPin, ExternalLink, Award, Briefcase, Cpu, Target, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const BlendedBackgroundImage = ({ src, position = "left", theme = "light", contrast, priority = false }: { src: string, position?: "left" | "right" | "bottom" | "top" | "center", theme?: "light" | "dark", contrast?: string, priority?: boolean }) => {
  const isDark = theme === "dark";
  
  let positionClasses = "top-0 left-0 w-full md:w-[60%] h-full";
  let gradientClasses = isDark ? (
    <>
      <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent z-10" />
      <div className="absolute inset-0 backdrop-blur-md bg-[#0A0A0A]/20 [mask-image:linear-gradient(to_left,black,transparent)] z-10" />
    </>
  ) : (
    <>
      <div className="absolute inset-0 bg-gradient-to-l from-white via-white/60 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent z-10" />
      <div className="absolute inset-0 [mask-image:linear-gradient(to_left,white,transparent)] z-10" />
    </>
  );

  if (position === "right") {
    positionClasses = "top-0 right-0 w-full md:w-[60%] h-full";
    gradientClasses = isDark ? (
      <>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent z-10" />
        <div className="absolute inset-0 backdrop-blur-md bg-[#0A0A0A]/20 [mask-image:linear-gradient(to_right,black,transparent)] z-10" />
      </>
    ) : (
      <>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-white/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-transparent z-10" />
        <div className="absolute inset-0 backdrop-blur-md bg-white/20 [mask-image:linear-gradient(to_right,white,transparent)] z-10" />
      </>
    );
  } else if (position === "bottom") {
    positionClasses = "bottom-0 left-0 w-full h-full md:h-[80%]";
    gradientClasses = isDark ? (
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent z-10" />
        <div className="absolute inset-0 backdrop-blur-md bg-[#0A0A0A]/20 [mask-image:linear-gradient(to_top,black,transparent)] z-10" />
      </>
    ) : (
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-transparent z-10" />
        <div className="absolute inset-0 backdrop-blur-md bg-white/20 [mask-image:linear-gradient(to_top,white,transparent)] z-10" />
      </>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${positionClasses} pointer-events-none z-0 overflow-hidden`}
    >
      <img 
        src={src} 
        alt="Background" 
        className={`w-full h-full object-cover object-center brightness-90 ${isDark ? 'grayscale opacity-60' : ''} ${contrast ? contrast : (isDark ? 'contrast-125' : 'contrast-150')}`}
        referrerPolicy="no-referrer"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      {gradientClasses}
    </motion.div>
  );
};

const ExperiencePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: "100%", 
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "backOut" } 
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const revealVariants = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { 
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white selection:text-black font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-4 sm:p-6 md:p-10 flex justify-between items-center mix-blend-difference text-white">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xs sm:text-sm md:text-base tracking-[0.2em] group uppercase">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          PORTFOLIO
        </Link>
        <div className="font-display font-black text-xl tracking-tighter uppercase">K.B</div>
      </nav>

      <main className="pt-32 md:pt-48 border-x border-white/10 max-w-[1800px] mx-auto min-h-screen">
        {/* Header Section */}
        <header className="relative px-6 md:px-20 pb-24 border-b border-white/10 overflow-hidden bg-[#0A0A0A] text-white">
          <BlendedBackgroundImage src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1600&auto=format&fit=crop" position="right" theme="dark" priority={true} />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="overflow-hidden">
              <motion.h1 
                custom={0}
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="font-display text-[15vw] md:text-[12vw] font-black tracking-tighter uppercase leading-[0.75] mb-4"
              >
                KISHORE<br />B
              </motion.h1>
              <motion.p 
                custom={1}
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                className="font-display text-xl md:text-3xl font-medium opacity-40 uppercase tracking-tight"
              >
                Freelance Video Editor
              </motion.p>
            </div>
            <motion.div 
              custom={2}
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2 text-right"
            >
              <span className="font-display text-[10px] uppercase tracking-[0.3em] opacity-30">Based in</span>
              <span className="font-display text-lg md:text-xl font-bold uppercase tracking-tighter">Chennai, India</span>
            </motion.div>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-16 md:mt-24">
            <div className="md:col-span-8"></div>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="md:col-span-4 flex flex-col justify-end gap-8 md:gap-12"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <span className="font-display text-[10px] uppercase tracking-[0.3em] opacity-30">Specialization</span>
                <p className="font-display text-lg font-bold uppercase leading-tight">Commercial Ads / Real Estate / Luxury Brands</p>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col gap-6 pt-10 border-t border-white/10">
                <a href="mailto:hellocutcraftmedia@gmail.com" className="group flex flex-col gap-1">
                  <span className="font-display text-[10px] uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 transition-opacity">Email</span>
                  <span className="text-sm font-medium uppercase tracking-widest border-b border-white/20 group-hover:border-white transition-all">hellocutcraftmedia@gmail.com</span>
                </a>
                <a href="tel:+918524083106" className="group flex flex-col gap-1">
                  <span className="font-display text-[10px] uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 transition-opacity">Phone</span>
                  <span className="text-sm font-medium uppercase tracking-widest border-b border-white/20 group-hover:border-white transition-all">+91 8524083106</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Summary Section - WHITE BACKGROUND */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid grid-cols-1 md:grid-cols-12 bg-white text-black overflow-hidden"
        >
          <BlendedBackgroundImage src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1600&q=80" position="left" />
          <div className="relative z-10 md:col-span-4 p-6 sm:p-8 md:p-20 border-b md:border-b-0 md:border-r border-black/10">
            <motion.h2 variants={itemVariants} className="font-display text-xs md:text-[10px] font-bold uppercase tracking-[0.5em] opacity-60">01 / Summary</motion.h2>
          </div>
          <div className="relative z-10 md:col-span-8 p-6 sm:p-8 md:p-20">
            <motion.p variants={itemVariants} className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-[1.2] md:leading-[1.1] font-medium tracking-tight mb-8 md:mb-12">
              Creative and results-driven Freelance Video Editor with proven hands-on experience crafting compelling visual content for brands, businesses, and content creators.
            </motion.p>
          </div>
        </motion.section>

        {/* Skills Grid - BLACK BACKGROUND */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-y border-black/10 bg-[#0A0A0A] text-white"
        >
          {[
            { title: "Video Editing", icon: Briefcase, skills: ["DaVinci Resolve", "Multi-layer Timeline", "Pacing & Rhythm"] },
            { title: "Post-Production", icon: Cpu, skills: ["Colour Grading", "Motion Graphics", "Audio Sync & Mixing"] },
            { title: "Social & Ads", icon: Target, skills: ["Instagram / YT Reels", "Commercial Ads", "Brand Storytelling"] }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className={`p-8 md:p-20 flex flex-col justify-between min-h-[300px] md:min-h-[400px] ${i < 2 ? 'border-b sm:border-b-0 sm:border-r border-white/10' : ''} ${i === 1 ? 'border-b md:border-b-0' : ''} hover:bg-white/5 transition-colors group`}
            >
              <item.icon className="opacity-20 group-hover:opacity-100 transition-opacity duration-500 mb-8 md:mb-0" size={40} />
              <div>
                <h3 className="font-display text-xl md:text-2xl font-black uppercase tracking-tighter mb-6 md:mb-8">{item.title}</h3>
                <ul className="space-y-2 md:space-y-3 opacity-40 font-display text-xs md:text-sm uppercase tracking-widest font-bold">
                  {item.skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Experience Section - WHITE BACKGROUND */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid grid-cols-1 md:grid-cols-12 bg-white text-black border-b border-black/10 overflow-hidden"
        >
          <BlendedBackgroundImage src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80" position="left" contrast="contrast-125" />
          <div className="relative z-10 md:col-span-4 p-6 sm:p-8 md:p-20 border-b md:border-b-0 md:border-r border-black/10">
            <motion.h2 variants={itemVariants} className="font-display text-xs md:text-[10px] font-bold uppercase tracking-[0.5em] opacity-60">02 / Experience</motion.h2>
          </div>
          <div className="relative z-10 md:col-span-8">
            <div className="p-6 sm:p-8 md:p-20 border-b border-black/10 last:border-b-0">
              <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8 md:mb-12">
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Freelance Editor</h3>
                  <p className="font-display text-xs md:text-sm opacity-60 uppercase tracking-[0.2em] mt-2 md:mt-4">Self-Employed / Chennai, India</p>
                </div>
                <span className="font-display text-xs md:text-sm font-black opacity-50 uppercase tracking-widest">2024 — PRESENT</span>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
                {[
                  "Edited high-impact promotional videos for real estate clients with cinematic colour grades.",
                  "Produced jewellery advertisement videos featuring precise colour correction for luxury aesthetics.",
                  "Collaborated with content creators to develop scroll-stopping content for 100k+ follower channels.",
                  "Delivered commercial ad edits for product launches and brand awareness campaigns."
                ].map((text, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex gap-4 md:gap-6 items-start group">
                    <span className="font-display text-[10px] md:text-xs font-black opacity-50 mt-1 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                    <p className="text-base md:text-lg opacity-90 leading-relaxed group-hover:opacity-100 transition-opacity">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Timeline Section - BLACK BACKGROUND */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 border-b border-black/10 bg-[#0A0A0A] text-white"
        >
          <div className="md:col-span-4 p-6 sm:p-8 md:p-20 border-b md:border-b-0 md:border-r border-white/10">
            <motion.h2 variants={itemVariants} className="font-display text-xs md:text-[10px] font-bold uppercase tracking-[0.5em] opacity-60">03 / Timeline</motion.h2>
            <motion.p variants={itemVariants} className="mt-8 md:mt-12 font-display text-xs md:text-sm uppercase tracking-widest opacity-70 leading-relaxed">
              A visual journey through the key milestones of my professional career.
            </motion.p>
          </div>
          <div className="md:col-span-8 p-6 sm:p-8 md:p-20">
            <div className="relative space-y-16 md:space-y-24">
              {/* Vertical Line */}
              <motion.div 
                variants={lineVariants}
                className="absolute left-0 top-0 w-[1px] bg-white/10 ml-[7px] md:ml-[9px] origin-top" 
              />
              
              {[
                { year: "2024", title: "The Beginning", desc: "Launched freelance career in Chennai. Focused on local businesses and small creators, building a foundation in DaVinci Resolve." },
                { year: "2025", title: "Luxury & Real Estate", desc: "Expanded into high-end markets. Partnered with jewellery brands and real estate firms for cinematic showcases and luxury aesthetics." },
                { year: "2026", title: "Commercial Mastery", desc: "Leading post-production for large-scale commercial ad campaigns and helping creators reach the 100K milestone." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  className="relative pl-10 md:pl-20 group"
                >
                  {/* Dot */}
                  <motion.div 
                    variants={dotVariants}
                    className="absolute left-0 top-2 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-white bg-[#0A0A0A] z-10 group-hover:bg-white transition-colors duration-500" 
                  />
                  
                  <div className="flex flex-col gap-2 md:gap-4">
                    <span className="font-display text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity duration-500">{item.year}</span>
                    <div>
                      <h3 className="font-display text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-2 md:mb-4">{item.title}</h3>
                      <p className="text-sm sm:text-base md:text-xl opacity-80 max-w-2xl leading-relaxed group-hover:opacity-100 transition-opacity duration-500">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Achievements & Tools - ALTERNATING BACKGROUNDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-black/10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative p-6 sm:p-8 md:p-20 border-b md:border-b-0 md:border-r border-black/10 bg-white text-black overflow-hidden"
          >
            <BlendedBackgroundImage src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=1600&q=80" position="bottom" />
            <div className="relative z-10">
              <motion.h2 variants={itemVariants} className="font-display text-xs md:text-[10px] font-bold uppercase tracking-[0.5em] opacity-60 mb-12 md:mb-16">04 / Achievements</motion.h2>
              <motion.ul variants={containerVariants} className="space-y-8 md:space-y-12 mb-16 md:mb-20">
                {[
                  "Helped multiple content creator clients grow their channels past the 100,000 followers milestone.",
                  "Built a strong freelance client base with a 100% satisfaction rate.",
                  "Developed expertise in DaVinci Resolve colour science for broadcast-quality grades."
                ].map((text, i) => (
                  <motion.li key={i} variants={itemVariants} className="flex gap-6 md:gap-8 items-start group">
                    <Award className="opacity-50 group-hover:text-black group-hover:opacity-100 transition-all shrink-0" size={24} />
                    <p className="text-lg md:text-xl lg:text-2xl font-medium tracking-tight opacity-90 group-hover:opacity-100 transition-opacity">{text}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 sm:p-8 md:p-20 flex flex-col justify-between bg-[#0A0A0A] text-white"
          >
            <div>
              <motion.h2 variants={itemVariants} className="font-display text-xs md:text-[10px] font-bold uppercase tracking-[0.5em] opacity-60 mb-12 md:mb-16">05 / Stack</motion.h2>
              <div className="space-y-12 md:space-y-16">
                <motion.div variants={itemVariants}>
                  <h4 className="font-display text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-4 md:mb-6">Primary Tool</h4>
                  <p className="font-display text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter break-words">DaVinci Resolve</p>
                </motion.div>
              </div>
            </div>
            
            <div className="mt-16 md:mt-20 overflow-hidden border-t border-white/10 pt-8 md:pt-10 -mx-8 md:-mx-20">
              <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex gap-8 md:gap-10 whitespace-nowrap"
              >
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-8 md:gap-10 items-center">
                    {["Capcut", "Premiere Pro", "After Effects", "Photoshop", "Audition"].map(tool => (
                      <span key={tool} className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter opacity-10 hover:opacity-100 transition-opacity cursor-default">
                        {tool}
                      </span>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section - BLACK BACKGROUND */}
        <motion.footer 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="p-6 md:p-40 text-center bg-[#0A0A0A] text-white"
        >
          <motion.p variants={itemVariants} className="font-display text-2xl md:text-4xl font-medium italic opacity-30 mb-20 max-w-3xl mx-auto">
            "Fast delivery. Clean edits. Fully satisfied customers. Every time."
          </motion.p>
          <div className="flex flex-col items-center">
            <motion.a variants={itemVariants} href="mailto:hellocutcraftmedia@gmail.com" className="group relative">
              <span className="font-display text-[15vw] font-black tracking-tighter uppercase leading-none inline-block group-hover:scale-[1.02] transition-transform duration-700">
                LET'S TALK
              </span>
            </motion.a>
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default ExperiencePage;
