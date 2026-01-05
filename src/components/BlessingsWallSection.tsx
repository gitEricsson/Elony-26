import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw, HeartOff } from 'lucide-react';
import FloralBackground from './FloralBackground';

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

// Format date to be more readable
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

const BlessingsWallSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Data States
  const [allMessages, setAllMessages] = useState<GuestMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 9;

  // Function to fetch data (extracted so it can be called externally if needed)
  const fetchWishes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/.netlify/functions/wishes');
      const data = await response.json();

      const parsedData = data
        .map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        .sort((a: any, b: any) => b.timestamp - a.timestamp);

      setAllMessages(parsedData);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  // Calculate Pagination
  const totalPages = Math.ceil(allMessages.length / messagesPerPage);
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = allMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  // Split current 9 messages into 3 columns
  const columns = [[], [], []] as GuestMessage[][];
  currentMessages.forEach((msg, i) => {
    columns[i % 3].push(msg);
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll back to top of section on change
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // --- Render Content Logic ---
  const renderContent = () => {
    // 1. Loading State
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground/60">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <RefreshCw className="w-8 h-8 mb-4" />
          </motion.div>
          <p className="font-heading tracking-widest text-sm uppercase">
            Gathering Blessings...
          </p>
        </div>
      );
    }

    // 2. Error State
    if (hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-lg mx-auto">
          <HeartOff className="w-12 h-12 text-stone-300 mb-4" />
          <h3 className="font-heading text-xl text-stone-500 mb-2">
            Love in Transit
          </h3>
          <p className="font-body text-stone-400 italic">
            We couldn't retrieve the digital blessings at this moment.
            <br />
            Please check your connection or try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 text-xs uppercase tracking-widest text-primary hover:text-primary/80 transition-colors border-b border-primary/30 pb-1"
          >
            Reload Page
          </button>
        </div>
      );
    }

    // 3. Empty State
    if (allMessages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <p className="font-script text-3xl text-stone-400 mb-4">
            Be the first to write...
          </p>
          <p className="font-body text-stone-500">
            No blessings have been shared yet.
          </p>
        </div>
      );
    }

    // 4. Success State (Masonry Grid)
    return (
      <>
        <div className="max-w-6xl mx-auto min-h-[600px]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {columns.map((column, colIndex) => (
              <div
                key={`${currentPage}-col-${colIndex}`}
                className="flex-1 flex flex-col gap-6 md:gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {column.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                        transition: { duration: 0.2 },
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      className="group"
                    >
                      <div className="bg-white border border-stone-100 p-8 shadow-sm hover:shadow-xl hover:shadow-wine/5 transition-all duration-500 rounded-2xl relative">
                        <div className="absolute top-4 right-6 font-script text-4xl text-gold/10 select-none">
                          "
                        </div>
                        <p className="font-body text-stone-600 leading-relaxed mb-6 italic relative z-10">
                          {msg.message}
                        </p>
                        <div className="pt-4 border-t border-stone-50 flex justify-between items-center">
                          <h4 className="font-heading font-semibold text-wine tracking-wide">
                            {msg.name}
                          </h4>
                          <span className="text-[10px] uppercase tracking-tighter text-stone-400">
                            {formatDate(msg.timestamp)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="mt-20 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-full border border-stone-200 hover:bg-primary hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2 mx-4">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-full font-heading text-sm transition-all ${
                      currentPage === i + 1
                        ? 'bg-wine text-white shadow-lg shadow-wine/20'
                        : 'hover:bg-stone-100 text-stone-500'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="p-3 rounded-full border border-stone-200 hover:bg-wine hover:text-white disabled:opacity-30 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="text-xs font-serif italic text-stone-400">
              Showing {indexOfFirstMessage + 1} -{' '}
              {Math.min(indexOfLastMessage, allMessages.length)} of{' '}
              {allMessages.length} blessings
            </div>
          </div>
        )}

        {/* Live indicator */}
        {/* <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex items-center justify-center gap-3 mt-12"
        >
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-stone-400">
            Live Updates Enabled
          </span>
        </motion.div> */}

        <div className="flex items-center justify-center gap-3 mt-12">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"
          ></motion.div>
          <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-stone-400">
            Live updates are disabled. Reload page to see new wishes.
          </span>
        </div>
      </>
    );
  };

  return (
    <section
      id="blessings"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      ref={ref}
    >
      <FloralBackground variant="sides" opacity={0.3} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">
            Wall of Blessings
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Words of love and wisdom from our cherished guests
          </p>
          <div className="separator-line bg-wine w-32 mx-auto mt-6" />
        </motion.div>

        {/* Content Area (Loading, Error, or Data) */}
        {renderContent()}
      </div>
    </section>
  );
};

export default BlessingsWallSection;
