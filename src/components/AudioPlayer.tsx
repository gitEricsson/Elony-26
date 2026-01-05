import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  // 1. Set default state to NOT muted
  const [isMuted, setIsMuted] = useState(false);

  const playAudio = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        console.log('Playback delayed until user interaction.');
      });
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.muted = false; // Ensure strictly unmuted on load
      audioRef.current.loop = true;

      // Try to play immediately
      playAudio();
    }

    // 2. Global listener: If autoplay is blocked, music starts on the guest's first click anywhere
    window.addEventListener('click', playAudio, { once: true });

    return () => window.removeEventListener('click', playAudio);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !audioRef.current.muted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);

      if (newMutedState) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <audio
        ref={audioRef}
        src="/src/assets/audio/background-music.mp3"
        preload="auto"
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className="relative w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-500"
        style={{
          backgroundColor: '#FDFBF7', // Cream
          border: `1px solid #722F37`, // Wine
          color: '#722F37',
        }}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <VolumeX size={20} strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Volume2 size={20} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wine-colored pulse effect when active */}
        {!isMuted && (
          <span className="absolute inset-0 rounded-full bg-[#722F37]/20 animate-ping" />
        )}
      </motion.button>
    </div>
  );
};

export default AudioPlayer;
