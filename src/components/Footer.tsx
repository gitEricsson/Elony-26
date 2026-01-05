import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 bg-wine text-background">
      <div className="container mx-auto px-6">
        <div className="text-center">
          {/* Names */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-script text-5xl md:text-6xl mb-4"
            style={{
              background:
                'linear-gradient(135deg, hsl(43 74% 49%), hsl(43 60% 60%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Precious & Tony
          </motion.h2>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-sm tracking-[0.3em] uppercase text-background/70 mb-8"
          >
            10 • January • 2026
          </motion.p>

          {/* Separator */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />

          {/* Thank you message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg text-background/80 max-w-md mx-auto mb-8"
          >
            Thank you for celebrating this beautiful journey with us
          </motion.p>

          {/* Hearts */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <Heart className="w-4 h-4 text-gold" />
            <Heart className="w-6 h-6 text-gold fill-gold" />
            <Heart className="w-4 h-4 text-gold" />
          </motion.div>

          {/* Hashtag */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="font-heading text-xl text-primary tracking-wide text-gradient-gold"
          >
            #ELONY26
          </motion.p>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 font-body text-sm text-background/50"
          >
            Made with love for Precious & Tony's Wedding | Designed & Developed
            by{' '}
            <a
              href="https://github.com/gitEricsson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gradient-gold hover:text-cream transition-colors duration-300"
            >
              Ericsson Raphael
            </a>
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
