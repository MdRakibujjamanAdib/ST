import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute top-0 left-0 -z-10 w-full h-full text-red-600 opacity-70 select-none"
        animate={{
          x: [0, -2, 2, -1, 0],
          opacity: [0.7, 0.4, 0.8, 0.4, 0.7],
          clipPath: [
            'inset(10% 0 80% 0)',
            'inset(30% 0 10% 0)',
            'inset(80% 0 5% 0)',
            'inset(0% 0 100% 0)',
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          repeatType: 'mirror',
          times: [0, 0.1, 0.2, 0.3, 1]
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-70 select-none"
        animate={{
          x: [0, 2, -2, 1, 0],
          opacity: [0.7, 0.3, 0.7, 0.3, 0.7],
          clipPath: [
            'inset(80% 0 10% 0)',
            'inset(10% 0 60% 0)',
            'inset(40% 0 20% 0)',
            'inset(100% 0 0% 0)',
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          repeatType: 'mirror',
          times: [0, 0.1, 0.2, 0.3, 1]
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </Component>
  );
};

export default GlitchText;