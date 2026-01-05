import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Calendar, MapPin } from 'lucide-react';
import coupleImage from '@/assets/couple-1.jpg';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef(null);

  // Parallax effect for the text vs background
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-stone-900"
    >
      {/* --- 1. Cinematic Background Layer --- */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <img
            src={coupleImage}
            alt="Precious and Tony"
            className="w-full h-full object-cover object-[center_-60px] opacity-90"
          />
          {/* Advanced Gradient Overlay: Clear in middle, dark on edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-wine/40 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-wine/40 via-transparent to-wine/40" />

          {/* Film Grain Texture for "High-End" feel */}
          <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </motion.div>
      </div>

      {/* --- 2. Content Layer --- */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 py-12 md:py-20">
        {/* Top: The "Brand" Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full flex justify-center md:justify-start"
        >
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-12 bg-white/50" />
            <span className="font-heading text-xs md:text-sm tracking-[0.4em] text-cream/80 uppercase">
              The Wedding
            </span>
            <div className="h-[1px] w-12 bg-white/50" />
          </div>
        </motion.div>

        {/* Center: The Main Title (Editorial Style) */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="flex flex-col items-center justify-center text-center space-y-2"
        >
          {/* <motion.div
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="font-heading text-white/90 text-sm md:text-xl uppercase tracking-widest mb-4"
          >
            The Wedding Celebration of{' '}
          </motion.div> */}

          <div className="relative">
            {/* Glowing blur behind text for readability */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-wine/20 blur-[80px] rounded-full" />

            <motion.h1
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative font-script text-7xl md:text-9xl lg:text-[11rem] leading-none text-cream-dark drop-shadow-2xl mix-blend-overlay"
            >
              Precious
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-script text-5xl md:text-7xl text-gold-dark my-[-10px] md:my-[-20px] relative z-20 drop-shadow-lg"
            >
              &
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative font-script text-7xl md:text-9xl lg:text-[11rem] leading-none text-cream-dark drop-shadow-2xl"
            >
              Tony
            </motion.h1>
          </div>
        </motion.div>

        {/* Bottom: Info Bar (Glassmorphism) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 w-full max-w-6xl mx-auto"
        >
          {/* Date & Location Pill */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-black/20 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full text-cream/90 shadow-lg">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gold-dark" />
              <span className="font-heading text-sm tracking-wider">
                JANUARY 10, 2026
              </span>
            </div>
            <div className="hidden md:block w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gold-dark" />
              <span className="font-heading text-sm tracking-wider">
                LAGOS, NIGERIA
              </span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => {
              document
                .getElementById('invitation')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-cream/60">
              Scroll
            </span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm hover:bg-white/20 transition-colors">
              <ArrowDown className="w-4 h-4 text-cream" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
