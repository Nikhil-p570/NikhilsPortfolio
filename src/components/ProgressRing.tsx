import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ProgressRingProps {
  progress: number;
}

export default function ProgressRing({ progress }: ProgressRingProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const radius = 24;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (circleRef.current) {
      const offset = circumference - (progress / 100) * circumference;
      gsap.to(circleRef.current, {
        strokeDashoffset: offset,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (textRef.current) {
      gsap.to(textRef.current, {
        innerText: Math.round(progress),
        duration: 0.3,
        snap: { innerText: 1 },
        ease: 'power2.out',
      });
    }
  }, [progress, circumference]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
      <div className="relative w-16 h-16">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
          />
          {/* Progress Circle */}
          <circle
            ref={circleRef}
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="#00F0FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            className="drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]"
          />
        </svg>

        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            ref={textRef}
            className="text-xs font-orbitron font-bold text-[#00F0FF]"
          >
            0
          </span>
        </div>
      </div>
    </div>
  );
}