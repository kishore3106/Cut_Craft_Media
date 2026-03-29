import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const GeneratedTimelineImage = ({ title, category, className, parallax = true }: { title: string, category: string, className?: string, parallax?: boolean }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(() => {
    return localStorage.getItem('generated_timeline_image');
  });
  const [loading, setLoading] = useState(!imageUrl);

  useEffect(() => {
    if (imageUrl) return;

    const generateImage = async () => {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A realistic image of a DaVinci Resolve timeline with complex nodes and a video preview, suitable for a professional portfolio.',
              },
            ],
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const url = `data:image/png;base64,${base64EncodeString}`;
            setImageUrl(url);
            localStorage.setItem('generated_timeline_image', url);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error('Error generating image:', error);
        setLoading(false);
      }
    };

    generateImage();
  }, [imageUrl]);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const grayscale = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], ["grayscale(100%)", "grayscale(0%)", "grayscale(0%)", "grayscale(100%)"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={ref}
      className={`relative overflow-hidden rounded-sm group/img bg-zinc-900 ${className}`}
    >
      <motion.div 
        style={{ 
          y: parallax ? y : 0,
          scale: parallax ? 1.2 : 1,
          filter: grayscale
        }}
        className="absolute inset-0 w-full h-full origin-center z-0 flex items-center justify-center bg-zinc-900"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center text-white/50">
            <div className="w-8 h-8 border-2 border-white/20 border-t-[#FF4E00] rounded-full animate-spin mb-4"></div>
            <p className="font-display text-xs uppercase tracking-widest">Generating Image...</p>
          </div>
        ) : imageUrl ? (
          <img 
            src={imageUrl} 
            alt="DaVinci Resolve Timeline" 
            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000 ease-[0.22,1,0.36,1]"
          />
        ) : (
          <div className="text-white/50 font-display text-xs uppercase tracking-widest">Failed to generate image</div>
        )}
      </motion.div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-6 md:p-10 pointer-events-none z-10">
        <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#FF4E00] uppercase mb-2">
          {category}
        </p>
        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};
