import { motion } from 'framer-motion';
import { useInView, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Clock, Gem, Phone, Heart, PartyPopper } from 'lucide-react';
import coupleImage from '@/assets/couple-3.jpg';
import FloralBackground from './FloralBackground';

const InvitationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax effect for the image
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="invitation"
      className="py-24 md:py-32 bg-gradient-cream relative overflow-hidden"
      ref={ref}
    >
      <FloralBackground variant="corners" opacity={0.3} />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">
            Happily Ever After
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-primary/40" />
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <div className="h-[1px] w-12 bg-primary/40" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* --- Image Section (Editorial Arch Style) --- */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <motion.div style={{ y }} className="relative z-10">
              {/* Decorative Frame Border */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-primary/40 rounded-t-[10rem] rounded-b-[2rem] z-0" />

              {/* Main Image Mask */}
              <div className="relative rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl aspect-[3/4] group">
                <div className="absolute inset-0 bg-primary/10 z-10 group-hover:bg-transparent transition-colors duration-700" />
                <img
                  src={coupleImage}
                  alt="Precious and Tony"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />

                {/* Floating Date Badge */}
                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-t-full rounded-b-lg shadow-lg text-center min-w-[100px] border border-primary/20 z-20">
                  <span className="block text-xs font-serif text-muted-foreground uppercase tracking-widest">
                    Jan
                  </span>
                  <span className="block font-heading text-4xl text-primary">
                    10
                  </span>
                  <span className="block text-xs font-serif text-muted-foreground">
                    2026
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Invitation Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-7 space-y-12 order-1 lg:order-2 lg:pt-10 text-center lg:text-left"
          >
            <div className="space-y-4">
              <p className="font-body text-lg text-muted-foreground italic">
                The families of
              </p>
              <p className="font-body text-base md:text-lg">
                Mr & Dr. Mrs Wilson Esiri Edafevwiroro
                <br />
                <span className="text-primary">&</span>
                <br />
                Mr & Mrs Edward Ikemefune Okwumabua
              </p>
              <p className="font-body text-lg text-muted-foreground italic">
                cordially invite you to celebrate the love of their children
              </p>
            </div>

            <h3 className="font-script text-4xl md:text-5xl bg-gradient-to-r from-wine to-gold text-transparent bg-clip-text">
              Precious & Tony
            </h3>

            {/* Timeline Events Component */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative pl-8 border-l border-primary/30 space-y-12"
            >
              {/* Event 1 */}
              <div className="relative group">
                <span className="absolute -left-[41px] top-0 p-2 bg-[#FDFBF7] border border-primary/30 rounded-full group-hover:border-primary transition-colors">
                  <div className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-wine rounded-full" />
                  </div>
                </span>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-primary/5 rounded-lg text-primary">
                        <Gem size={20} />
                      </span>
                      <h4 className="font-heading font-semibold text-wine text-lg">
                        Holy Matrimony
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Clock size={16} />
                      <span>10:00 AM</span>
                    </div>
                  </div>
                  <p className="font-body text-muted-foreground mb-2 flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    St Cyprian Catholic Church, 1 Da'silva Street, Oko-oba,
                    Abule-egba, Lagos
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative group">
                <span className="absolute -left-[41px] top-0 p-2 bg-[#FDFBF7] border border-primary/30 rounded-full group-hover:border-primary transition-colors">
                  <div className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                </span>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-primary/5 rounded-lg text-primary">
                        {/* <div className="w-5 h-5 flex items-center justify-center font-serif italic">
                          R
                        </div> */}
                        <PartyPopper size={20} />
                      </span>
                      <h4 className="font-heading font-semibold text-lg text-wine">
                        Reception
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Clock size={16} />
                      <span>After Mass</span>
                    </div>
                  </div>
                  <p className="font-body text-muted-foreground flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    Blue Ribbon Event Centre, 15 Olayiwola Str, Abule-egba,
                    Lagos
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RSVP */}
            <div className="pt-6 border-t border-border">
              <h4 className="font-script text-3xl text-primary mb-4">RSVP</h4>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="tel:09026871275"
                  className="flex items-center gap-2 font-body text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Wilson Edafe (Jnr) - 09026871275
                </a>
                <a
                  href="tel:09118995792"
                  className="flex items-center gap-2 font-body text-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Richard Okwumabua - 09118995792
                </a>
              </div>
            </div>

            {/* Color Code */}
            <div className="pt-4">
              <p className="font-heading text-sm tracking-widest uppercase mb-3">
                Colour Code
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-wine" />
                  <span className="font-body text-sm">Wine</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-magenta" />
                  <span className="font-body text-sm">Magenta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cream-dark border border-border" />
                  <span className="font-body text-sm">Cream</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-gold" />
                  <span className="font-body text-sm">Gold</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
