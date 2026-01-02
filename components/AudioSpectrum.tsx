import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioSpectrumProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioSpectrum: React.FC<AudioSpectrumProps> = ({ audioRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    const initAudioContext = () => {
      try {
        // Create audio context only once
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          
          // Create analyser
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 128;
          analyserRef.current.smoothingTimeConstant = 0.8;

          // Connect audio source - only create source once
          try {
            const sourceNode = audioContextRef.current.createMediaElementSource(audio);
            sourceNode.connect(analyserRef.current);
            analyserRef.current.connect(audioContextRef.current.destination);
          } catch (error) {
            // Source already connected, just connect to destination
            console.log('Audio source already connected');
          }
        }

        // Resume context if suspended
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }

        visualize();
      } catch (error) {
        console.error('Audio context error:', error);
      }
    };

    const visualize = () => {
      const analyser = analyserRef.current;
      if (!analyser || !canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        animationRef.current = requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create organic vine-like wave visualization
        const spacing = canvas.width / (bufferLength - 1);
        
        // Draw multiple layers for depth
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          
          for (let i = 0; i < bufferLength; i++) {
            const x = i * spacing;
            const value = dataArray[i] / 255;
            const baseHeight = canvas.height * 0.5;
            const amplitude = value * baseHeight * (0.8 - layer * 0.2);
            const y = canvas.height - baseHeight - amplitude;
            
            // Add wave motion
            const wave = Math.sin(i * 0.2 + Date.now() * 0.001) * 5;
            
            if (i === 0) {
              ctx.moveTo(x, y + wave);
            } else {
              // Smooth curves between points for organic look
              const prevX = (i - 1) * spacing;
              const prevValue = dataArray[i - 1] / 255;
              const prevAmplitude = prevValue * baseHeight * (0.8 - layer * 0.2);
              const prevY = canvas.height - baseHeight - prevAmplitude;
              const prevWave = Math.sin((i - 1) * 0.2 + Date.now() * 0.001) * 5;
              
              const cpX = (prevX + x) / 2;
              const cpY = (prevY + prevWave + y + wave) / 2;
              
              ctx.quadraticCurveTo(cpX, cpY, x, y + wave);
            }
          }
          
          // Complete the vine shape by drawing back along the bottom
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          
          // Gradient for vine-like appearance
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          const opacity = 0.3 - layer * 0.08;
          gradient.addColorStop(0, `rgba(127, 29, 29, ${opacity * 1.5})`);
          gradient.addColorStop(0.3, `rgba(69, 10, 10, ${opacity})`);
          gradient.addColorStop(1, `rgba(26, 0, 0, ${opacity * 0.5})`);
          
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Add organic spine-like details
          if (layer === 0) {
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.4})`;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(220, 38, 38, 0.6)';
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
        
        // Add spine/tentacle details
        for (let i = 0; i < bufferLength; i += 3) {
          const x = i * spacing;
          const value = dataArray[i] / 255;
          
          if (value > 0.3) {
            const spineHeight = value * 20 * (1 + Math.sin(i + Date.now() * 0.002));
            const y = canvas.height - canvas.height * 0.5 - (value * canvas.height * 0.4);
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - spineHeight);
            ctx.strokeStyle = `rgba(139, 0, 0, ${value * 0.8})`;
            ctx.lineWidth = 1 + value * 2;
            ctx.lineCap = 'round';
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(220, 38, 38, 0.8)';
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      };

      draw();
    };

    // Initialize on first play
    const handlePlay = () => {
      if (!analyserRef.current) {
        initAudioContext();
      } else if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('play', handlePlay);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioRef]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      className="fixed bottom-0 left-0 right-0 z-40 h-24 sm:h-32 pointer-events-none overflow-hidden"
    >
      {/* Dark overlay to blend with background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      
      <canvas
        ref={canvasRef}
        width={typeof window !== 'undefined' ? window.innerWidth : 1920}
        height={96}
        className="w-full h-full relative z-10 opacity-70"
      />
      
      {/* Additional atmospheric effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/10 to-transparent mix-blend-overlay pointer-events-none" />
      
      {/* Scanline effect */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220, 38, 38, 0.2) 2px, rgba(220, 38, 38, 0.2) 4px)',
        }}
      />
    </motion.div>
  );
};

export default AudioSpectrum;
