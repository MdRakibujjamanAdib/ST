import React from 'react';
import { motion } from 'framer-motion';

interface StrangerButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const StrangerButton: React.FC<StrangerButtonProps> = ({ href, children, className = '' }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-flex items-center justify-center px-8 py-4 font-bold font-tech text-red-500 uppercase tracking-[0.2em] bg-transparent overflow-hidden group ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {/* Background fill animation */}
      <motion.div 
        className="absolute inset-0 bg-red-600 z-0"
        variants={{
          initial: { scaleY: 0, opacity: 0 },
          hover: { scaleY: 1, opacity: 1 }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      
      {/* Glitch noise overlay on hover */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Top Border */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_10px_#ef4444] z-10"
        variants={{
          initial: { x: '-100%' },
          hover: { x: '100%', transition: { duration: 0.5, repeat: Infinity, ease: "linear" } }
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-red-900/50 z-0" />

      {/* Bottom Border */}
      <motion.div 
        className="absolute bottom-0 right-0 w-full h-[2px] bg-red-500 shadow-[0_0_10px_#ef4444] z-10"
        variants={{
          initial: { x: '100%' },
          hover: { x: '-100%', transition: { duration: 0.5, repeat: Infinity, ease: "linear" } }
        }}
      />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-red-900/50 z-0" />

      {/* Text Content */}
      <motion.span 
        className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-black group-hover:font-extrabold"
        variants={{
          hover: { x: [0, -2, 2, 0], transition: { duration: 0.2, repeat: Infinity, repeatDelay: 0.1 } }
        }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
};

export default StrangerButton;