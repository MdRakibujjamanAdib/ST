import React from 'react';
import { motion } from 'framer-motion';

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children, id, className = '', delay = 0 }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`relative max-w-4xl mx-auto px-4 py-16 md:px-6 md:py-24 border-l-2 border-red-900/20 md:border-red-900/30 ${className}`}
    >
      <div className="absolute top-0 left-[-2px] w-[2px] h-full bg-gradient-to-b from-transparent via-red-600 to-transparent opacity-50 shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
      {children}
    </motion.section>
  );
};

export default SectionContainer;