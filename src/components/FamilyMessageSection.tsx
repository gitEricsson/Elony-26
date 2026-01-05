import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart } from 'lucide-react';
import coupleImage from '@/assets/couple-4.jpg';
import FloralBackground from './FloralBackground';

const FamilyMessageSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="family-message"
      className="py-24 md:py-32 bg-gradient-cream relative overflow-hidden"
      ref={ref}
    >
      <FloralBackground variant="scattered" opacity={0.25} />
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Message Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <span className="font-heading text-sm tracking-widest uppercase text-primary">
                A Message of Gratitude
              </span>
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </motion.div>

            <h2 className="font-script text-4xl md:text-5xl text-primary mb-8">
              From the Bride's Family
            </h2>

            <div className="space-y-6 font-body text-lg leading-relaxed text-foreground/80">
              <p>
                With hearts full of gratitude, we thank you for being a part of
                Precious and Tony's special day.
              </p>
              <p>
                Your love, prayers, support, and presence made this celebration
                truly unforgettable.
              </p>
              <p>
                Every smile shared, every photo captured, and every moment spent
                together reflect the beauty of family and friendship. We pray
                that the joy of this union fills your homes as you continue to
                surround the couple with love and blessings.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-4 border-t border-border"
              >
                <p className="text-primary font-medium">
                  Thank you for standing with us.
                </p>
                <p className="text-primary font-medium">
                  Thank you for celebrating with us.
                </p>
                <p className="text-primary font-medium">
                  Thank you for being part of our story.
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 font-script text-2xl text-primary"
            >
              With love,
              <br />
              The Bride's Family
            </motion.p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="aspect-square max-w-md mx-auto overflow-hidden rounded-full border-4 border-primary shadow-gold"
              >
                <img
                  src={coupleImage}
                  alt="Precious and Tony"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Hearts */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-10, 10, -10],
                    x: [0, 5, 0, -5, 0],
                    rotate: [0, 10, 0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute text-primary"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: i % 2 === 0 ? '-5%' : 'auto',
                    right: i % 2 === 1 ? '-5%' : 'auto',
                  }}
                >
                  <Heart className="w-6 h-6 fill-primary/30" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FamilyMessageSection;
