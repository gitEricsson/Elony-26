import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';

const GallerySection = () => {
  // Dynamically import all images that start with "couple-" from assets folder
  const imageModules = import.meta.glob(
    '../assets/couple-*.{jpg,jpeg,png,webp}',
    {
      eager: true,
    }
  );

  // Process the imported images into a usable format
  const images = useMemo(() => {
    return Object.entries(imageModules)
      .map(([path, module]) => {
        // Extract filename from path for alt text
        const filename =
          path
            .split('/')
            .pop()
            ?.replace(/\.(jpg|jpeg|png|webp)$/, '') || '';
        const imageNumber = filename.match(/\d+/)?.[0] || '';

        return {
          src: module.default,
          alt: `Precious and Tony - Photo ${imageNumber}`,
          filename,
        };
      })
      .sort((a, b) => {
        // Sort by number in filename (couple-1, couple-2, etc.)
        const numA = parseInt(a.filename.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.filename.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Dynamically adjust grid columns based on number of images
  const getGridCols = () => {
    if (images.length === 0) return 'grid-cols-1';
    if (images.length <= 4) return 'grid-cols-4';
    if (images.length <= 6) return 'grid-cols-6';
    if (images.length <= 8) return 'grid-cols-8';
    return 'grid-cols-5 md:grid-cols-8 lg:grid-cols-10';
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setIsModalOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentIndex]);

  // Auto-slide functionality: Changes image every 5s, pauses if modal is open
  useEffect(() => {
    if (isModalOpen || images.length === 0) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isModalOpen, images.length]);

  // Show message if no images found
  if (images.length === 0) {
    return (
      <section
        id="gallery"
        className="py-24 md:py-32 bg-gradient-cream"
        ref={ref}
      >
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">
              Captured moments
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
              Add images to your{' '}
              <code className="bg-muted px-2 py-1 rounded">assets</code> folder.
              <br />
              Name them{' '}
              <code className="bg-muted px-2 py-1 rounded">couple-1.jpg</code>,
              <code className="bg-muted px-2 py-1 rounded ml-1">
                couple-2.jpg
              </code>
              , etc.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="py-24 md:py-32 bg-gradient-cream"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">
            Captured moments
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            A glimpse into our forever
          </p>
          <div className="separator-line-wine w-32 mx-auto mt-6" />
        </motion.div>

        {/* Main Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main Image */}
          <div
            className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer group shadow-soft"
            onClick={() => setIsModalOpen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-300 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-wine">
                  <Play className="w-6 h-6 text-primary-foreground ml-1" />
                </div>
              </motion.div>
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-foreground/80 text-background px-3 py-1 rounded-full text-sm font-body backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-soft"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-soft"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary shadow-wine'
                    : 'w-2 bg-border hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Thumbnail Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`grid ${getGridCols()} gap-2 md:gap-3 mt-8 max-w-5xl mx-auto`}
        >
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square overflow-hidden ${
                index === currentIndex
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                  : 'opacity-60 hover:opacity-100'
              } transition-all duration-300 rounded-lg`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              aria-label="Close gallery"
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center text-background hover:bg-background/40 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Counter in Modal */}
            <div className="absolute top-6 left-6 bg-background/20 text-background px-4 py-2 rounded-full text-sm font-body backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center text-background hover:bg-background/40 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center text-background hover:bg-background/40 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
