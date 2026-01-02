import React, { useEffect, useRef } from 'react';
import Atmosphere from './components/Atmosphere';
import GlitchText from './components/GlitchText';
import StrangerButton from './components/StrangerButton';
import { Download } from 'lucide-react';
import { RESUME_DATA } from './constants';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          // Try to play immediately
          await audioRef.current.play();
        } catch (error) {
          // If autoplay is blocked, play on any user interaction
          const handleInteraction = async () => {
            try {
              await audioRef.current?.play();
              // Remove listeners after successful play
              document.removeEventListener('click', handleInteraction);
              document.removeEventListener('touchstart', handleInteraction);
              document.removeEventListener('keydown', handleInteraction);
            } catch (err) {
              console.log('Audio play failed:', err);
            }
          };
          
          document.addEventListener('click', handleInteraction);
          document.addEventListener('touchstart', handleInteraction);
          document.addEventListener('keydown', handleInteraction);
        }
      }
    };
    
    // Small delay to ensure audio element is ready
    const timer = setTimeout(playAudio, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-gray-200 selection:bg-red-900 selection:text-white overflow-x-hidden">
      <Atmosphere />

      {/* Background Music */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio.mp3" type="audio/mpeg" />
        <source src="/audio.mp3" type="audio/mp3" />
      </audio>

      {/* --- HERO SECTION --- */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 z-10">
         {/* Intense flickering light overlay */}
         <motion.div 
            className="absolute inset-0 bg-red-500 pointer-events-none mix-blend-overlay"
            animate={{ opacity: [0, 0.05, 0, 0.08, 0, 0, 0.12, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 0.75, 1] }}
         />

         {/* Radial pulse effect behind content */}
         <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ 
              background: [
                'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.08) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
         />

         {/* Portal/Gate effect in background */}
         <motion.div
            className="absolute inset-0 pointer-events-none opacity-20"
            animate={{
              background: [
                'radial-gradient(ellipse at 50% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 40%)',
                'radial-gradient(ellipse at 50% 50%, rgba(139, 0, 0, 0.5) 0%, transparent 50%)',
                'radial-gradient(ellipse at 50% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 40%)',
              ],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
         />

         {/* Floating orbs around the hero - hidden on mobile */}
         <motion.div
            className="absolute w-3 h-3 bg-red-500/30 rounded-full blur-sm hidden md:block"
            animate={{
              x: ['20%', '30%', '20%'],
              y: ['30%', '40%', '30%'],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ left: '10%', top: '20%' }}
         />
         <motion.div
            className="absolute w-2 h-2 bg-blue-400/40 rounded-full blur-sm hidden md:block"
            animate={{
              x: ['80%', '70%', '80%'],
              y: ['25%', '35%', '25%'],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ right: '10%', top: '30%' }}
         />
         <motion.div
            className="absolute w-4 h-4 bg-red-600/20 rounded-full blur-md hidden md:block"
            animate={{
              x: ['50%', '60%', '50%'],
              y: ['70%', '60%', '70%'],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ left: '15%', bottom: '20%' }}
         />

         {/* Scanline effect - reduced on mobile */}
         <motion.div
            className="absolute inset-0 pointer-events-none opacity-[0.03] md:opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.1) 0px, transparent 2px, transparent 4px)',
            }}
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
         />
         
         <motion.div 
            className="max-w-4xl w-full space-y-4 sm:space-y-6 md:space-y-8 mt-[-10vh] px-4 relative z-10"
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
         >
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1.2 }}
              className="text-red-500 font-tech tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs md:text-base uppercase relative px-2"
            >
              <motion.span
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full hidden sm:block"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Hawkins Lab Personnel File: #011-ADIB
              <motion.span
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full hidden sm:block"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
              />
            </motion.p>
            
            <motion.div 
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            >
              {/* Glow behind text - reduced blur on mobile */}
              <motion.div
                className="absolute inset-0 blur-2xl md:blur-3xl opacity-40 md:opacity-50"
                animate={{ 
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.98, 1.02, 0.98],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ 
                  background: 'radial-gradient(ellipse, rgba(220, 38, 38, 0.4) 0%, transparent 70%)',
                }}
              />
              <GlitchText 
                text={RESUME_DATA.name.toUpperCase()} 
                as="h1" 
                className="font-horror text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[16rem] tracking-wider text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] leading-tight relative"
              />
            </motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 1.5 }}
              className="h-1 mx-auto max-w-xs md:max-w-2xl relative"
            >
              {/* Only the sliding energy line */}
              <motion.div
                className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent shadow-[0_0_15px_red]"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
              />
            </motion.div>

            <h2 className="text-base sm:text-lg md:text-3xl font-light text-blue-200/80 font-tech px-2">
              {RESUME_DATA.title}
            </h2>

            <p className="text-gray-400 italic font-serif text-sm sm:text-base md:text-lg max-w-lg mx-auto px-2">
              "{RESUME_DATA.tagline}"
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="pt-4 sm:pt-8"
            >
              <StrangerButton href={RESUME_DATA.pdfLink}>
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Download Profile</span>
              </StrangerButton>
            </motion.div>
         </motion.div>

         {/* Alphabet wall letters (bottom) */}
         <motion.div 
            className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 sm:gap-4 px-4 opacity-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.3, y: 0 }}
            transition={{ delay: 2.5 }}
         >
           {['R', 'U', 'N'].map((letter, i) => (
             <motion.div
               key={i}
               className="font-mono text-xl sm:text-3xl md:text-4xl font-bold text-gray-600 relative"
               animate={{ 
                 opacity: [0.3, 0.6, 0.3],
                 textShadow: [
                   '0 0 5px rgba(220, 38, 38, 0.3)',
                   '0 0 15px rgba(220, 38, 38, 0.6)',
                   '0 0 5px rgba(220, 38, 38, 0.3)',
                 ],
               }}
               transition={{ 
                 duration: 2, 
                 repeat: Infinity, 
                 delay: i * 0.3,
               }}
             >
               {letter}
             </motion.div>
           ))}
         </motion.div>
      </header>
    </div>
  );
};

export default App;