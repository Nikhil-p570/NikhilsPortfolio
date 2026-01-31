import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cube = cubeRef.current;
    const progress = progressRef.current;
    const text = textRef.current;

    if (!cube || !progress || !text) return;

    // Cube rotation animation
    gsap.to(cube, {
      rotateX: 360,
      rotateY: 360,
      duration: 2,
      ease: 'none',
      repeat: -1,
    });

    // Progress bar animation
    gsap.to(progress, {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut',
    });

    // Text pulse
    gsap.to(text, {
      opacity: 0.5,
      duration: 0.5,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Exit animation
    const tl = gsap.timeline({ delay: 1.8 });
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    }).set(containerRef.current, {
      display: 'none',
    });

    return () => {
      gsap.killTweensOf([cube, progress, text]);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
    >
      {/* 3D Cube */}
      <div className="relative w-24 h-24 mb-8" style={{ perspective: '400px' }}>
        <div
          ref={cubeRef}
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Cube Faces */}
          <div
            className="absolute w-24 h-24 border border-[#00F0FF] bg-[#00F0FF]/5"
            style={{ transform: 'translateZ(48px)' }}
          />
          <div
            className="absolute w-24 h-24 border border-[#00F0FF] bg-[#00F0FF]/5"
            style={{ transform: 'rotateY(180deg) translateZ(48px)' }}
          />
          <div
            className="absolute w-24 h-24 border border-[#00F0FF] bg-[#00F0FF]/5"
            style={{ transform: 'rotateY(90deg) translateZ(48px)' }}
          />
          <div
            className="absolute w-24 h-24 border border-[#00F0FF] bg-[#00F0FF]/5"
            style={{ transform: 'rotateY(-90deg) translateZ(48px)' }}
          />
          <div
            className="absolute w-24 h-24 border border-[#00F0FF] bg-[#00F0FF]/5"
            style={{ transform: 'rotateX(90deg) translateZ(48px)' }}
          />
          <div
            className="absolute w-24 h-24 border border-[#00F0FF] bg-[#00F0FF]/5"
            style={{ transform: 'rotateX(-90deg) translateZ(48px)' }}
          />
        </div>
      </div>

      {/* Loading Text */}
      <div
        ref={textRef}
        className="font-orbitron text-lg tracking-[0.3em] text-[#00F0FF] mb-6"
      >
        LOADING
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-[#00F0FF] rounded-full"
          style={{ width: '0%', boxShadow: '0 0 10px #00F0FF' }}
        />
      </div>

      {/* Version */}
      <div className="absolute bottom-8 text-xs text-white/30 font-rajdhani">
        v2.0.27
      </div>
    </div>
  );
}