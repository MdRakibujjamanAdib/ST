import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Atmosphere: React.FC = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);
  const [snowflakes, setSnowflakes] = useState<{ id: number; x: number; y: number; size: number; duration: number; drift: number }[]>([]);
  const [shadowCreatures, setShadowCreatures] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    // Detect mobile devices
    const isMobile = window.innerWidth < 768;
    
    // Reduced particle count on mobile for better performance
    const particleCount = isMobile ? 25 : 50;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 0.5,
      duration: Math.random() * 25 + 15,
    }));
    setParticles(newParticles);

    // Reduced snowfall on mobile
    const snowCount = isMobile ? 50 : 100;
    const newSnowflakes = Array.from({ length: snowCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -50,
      size: Math.random() * 5 + 1,
      duration: Math.random() * 15 + 10,
      drift: (Math.random() - 0.5) * 20,
    }));
    setSnowflakes(newSnowflakes);

    // Reduced shadow creatures on mobile
    const creatureCount = isMobile ? 2 : 5;
    const creatures = Array.from({ length: creatureCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
    }));
    setShadowCreatures(creatures);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden will-change-transform">
      {/* Deep dark red/black gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_#1a0000_0%,_#050000_50%,_#000000_100%)]" />

      {/* Animated grid pattern - Upside Down aesthetic */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{ 
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Static TV noise effect */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        animate={{ opacity: [0.02, 0.04, 0.02, 0.05, 0.02] }}
        transition={{ duration: 0.15, repeat: Infinity }}
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }} 
      />

      {/* Intense pulsing red glow from corners */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-red-900/20 rounded-full blur-[100px]"
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-red-800/20 rounded-full blur-[100px]"
        animate={{ 
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Flickering lights effect */}
      <motion.div 
        className="absolute inset-0 bg-red-500/5"
        animate={{ 
          opacity: [0, 0.1, 0, 0.15, 0, 0, 0.08, 0] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          times: [0, 0.1, 0.2, 0.25, 0.3, 0.6, 0.65, 0.7]
        }}
      />

      {/* Floating Dust Particles (More Spores) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
          animate={{
            y: [`${p.y}vh`, `${p.y - 30}vh`, `${p.y - 60}vh`],
            x: [`${p.x}vw`, `${p.x + (Math.random() - 0.5) * 15}vw`, `${p.x + (Math.random() - 0.5) * 20}vw`],
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: p.size,
            height: p.size,
            background: p.size > 2 
              ? 'radial-gradient(circle, rgba(200,200,220,0.8) 0%, rgba(150,150,170,0.3) 100%)'
              : 'rgba(180,180,200,0.6)',
            boxShadow: p.size > 2 ? '0 0 3px rgba(200,200,220,0.5)' : 'none',
          }}
        />
      ))}

      {/* Heavy Snowfall */}
      {snowflakes.map((snow) => (
        <motion.div
          key={`snow-${snow.id}`}
          className="absolute rounded-full bg-white/60"
          initial={{ x: `${snow.x}vw`, y: `${snow.y}vh`, opacity: 0 }}
          animate={{
            y: [`${snow.y}vh`, `${snow.y + 150}vh`],
            x: [`${snow.x}vw`, `${snow.x + snow.drift}vw`, `${snow.x}vw`],
            opacity: [0, 0.8, 0.6, 0.8, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: snow.duration,
            repeat: Infinity,
            ease: "linear",
            rotate: { duration: snow.duration * 0.5, repeat: Infinity, ease: "linear" }
          }}
          style={{
            width: snow.size,
            height: snow.size,
            boxShadow: snow.size > 3 ? '0 0 4px rgba(255,255,255,0.8), 0 0 8px rgba(200,220,255,0.4)' : '0 0 2px rgba(255,255,255,0.6)',
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Shadow Creatures passing by */}
      {shadowCreatures.map((creature) => (
        <motion.div
          key={creature.id}
          className="absolute top-0 h-full w-32 opacity-0"
          initial={{ x: '-10%', opacity: 0 }}
          animate={{
            x: ['110%', '-10%'],
            opacity: [0, 0.15, 0.15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: creature.delay,
            times: [0, 0.1, 0.9, 1],
            ease: "linear",
          }}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      ))}

      {/* Multiple fog layers */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/10 to-transparent blur-3xl"
        animate={{ opacity: [0.2, 0.4, 0.2], translateX: ['-20%', '20%', '-20%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-800/5 to-transparent blur-2xl"
        animate={{ opacity: [0.1, 0.3, 0.1], translateX: ['20%', '-20%', '20%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Enhanced Red Veins Network */}
      <svg className="absolute w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <motion.path 
          d="M0,100 Q200,300 400,100 T800,100" 
          fill="none" 
          stroke="#7f1d1d" 
          strokeWidth="2"
          animate={{ strokeOpacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.path 
          d="M0,800 Q300,500 0,200" 
          fill="none" 
          stroke="#991b1b" 
          strokeWidth="1.5"
          animate={{ strokeOpacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.path 
          d="M1200,800 Q900,500 1200,200" 
          fill="none" 
          stroke="#7f1d1d" 
          strokeWidth="2"
          animate={{ strokeOpacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
        <motion.path 
          d="M400,0 Q600,400 400,800" 
          fill="none" 
          stroke="#991b1b" 
          strokeWidth="1"
          animate={{ strokeOpacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.path 
          d="M800,0 Q1000,400 800,800" 
          fill="none" 
          stroke="#7f1d1d" 
          strokeWidth="1.5"
          animate={{ strokeOpacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
        />
      </svg>

      {/* Organic tendrils from edges */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-full opacity-10"
        style={{
          background: 'radial-gradient(ellipse at 0% 50%, #7f1d1d 0%, transparent 50%)',
          filter: 'blur(30px)',
        }}
        animate={{ 
          scaleY: [1, 1.1, 0.9, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-0 w-64 h-full opacity-10"
        style={{
          background: 'radial-gradient(ellipse at 100% 50%, #991b1b 0%, transparent 50%)',
          filter: 'blur(30px)',
        }}
        animate={{ 
          scaleY: [1, 0.9, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Circular light pulses */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)',
        }}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Heavy layered vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_70%,#000000_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,0,0,0.8)_90%)]" />
    </div>
  );
};

export default Atmosphere;