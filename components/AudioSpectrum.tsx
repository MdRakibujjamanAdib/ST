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
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

          // Dark red gradient matching Stranger Things theme
          const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
          gradient.addColorStop(0, '#7f1d1d');
          gradient.addColorStop(0.4, '#450a0a');
          gradient.addColorStop(1, '#1a0000');

          ctx.fillStyle = gradient;
          
          // Add glow effect before drawing
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(220, 38, 38, 0.8)';
          
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

          // Reset shadow for next bar
          ctx.shadowBlur = 0;

          x += barWidth;
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
