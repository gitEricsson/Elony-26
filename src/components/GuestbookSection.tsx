import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import FloralBackground from './FloralBackground';

interface GuestbookSectionProps {
  onNewMessage: () => void;
}

const GuestbookSection = ({ onNewMessage }: GuestbookSectionProps) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      toast({
        title: 'Please fill in all fields',
        description: 'Name and message are required',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/.netlify/functions/wishes', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast({
        title: 'Message sent! 💕',
        description: 'Thank you for your beautiful wishes!',
      });

      setName('');
      setMessage('');

      // Notify the parent component to re-fetch
      onNewMessage();
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission failed',
        description: 'We couldn’t save your wish. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="guestbook"
      className="py-24 md:py-32 bg-gradient-cream relative overflow-hidden"
      ref={ref}
    >
      <FloralBackground variant="corners" opacity={0.3} />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">
            Guest Book
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto">
            Share your prayers, wishes, or a lovely memory from our wedding day.
          </p>
          <div className="separator-line w-32 mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block font-heading text-sm tracking-wide mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-card border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                maxLength={50}
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-heading text-sm tracking-wide mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your wishes, prayers, or a lovely memory..."
                rows={5}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                maxLength={500}
                required
              />
              <p className="text-sm text-muted-foreground mt-1 text-right">
                {message.length}/500
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-primary text-primary-foreground font-heading tracking-widest uppercase flex items-center justify-center gap-2 rounded-lg hover:shadow-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Your Wishes
                </>
              )}
            </motion.button>
          </form>

          {/* Google Drive Link */}
          <div className="mt-8 text-center pt-2">
            <p className="text-sm text-muted-foreground mb-2">
              Have photos to share with us? Upload them to our shared Google
              Drive folder
            </p>
            <a
              href="https://drive.google.com/drive/folders/1sfNCzJdKJ4fKwuGKJqQXfE4X10TF66xW?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload to Our Wedding Photos
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GuestbookSection;
