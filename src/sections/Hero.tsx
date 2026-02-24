import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.3 });

      // Name and Profile Image animation
      if (nameRef.current) {
        const letters = nameRef.current.querySelectorAll('.letter');
        const profileImg = containerRef.current?.querySelector('.profile-image');

        tl.fromTo(
          letters,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out(1.7)',
          }
        );

        if (profileImg) {
          tl.fromTo(
            profileImg,
            { scale: 0.8, opacity: 0, x: 50 },
            {
              scale: 1,
              opacity: 1,
              x: 0,
              duration: 1.2,
              ease: 'power3.out',
            },
            '-=0.8'
          );
        }
      }

      // Title animation
      tl.fromTo(
        titleRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // Subtitle animation
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

      // CTA animation
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      );

      // Floating animation for image container
      const profileImg = containerRef.current?.querySelector('.profile-image');
      if (profileImg) {
        gsap.to(profileImg, {
          y: -15,
          duration: 3,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // Cube rotating animation
      if (cubeRef.current) {
        gsap.to(cubeRef.current, {
          rotateY: 360,
          rotateX: 360,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }

      // Scroll indicator pulse
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const name = 'NIKHIL';

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00F0FF]/5 via-transparent to-transparent opacity-50" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-[#00F0FF]/20 rotate-45" />
      <div className="absolute bottom-32 right-20 w-24 h-24 border border-[#00F0FF]/20 rotate-12" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#00F0FF] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />

      {/* 3D Cube Decoration */}
      <div
        ref={cubeRef}
        className="absolute top-1/4 right-1/4 w-32 h-32 opacity-30 hidden lg:block"
        style={{ perspective: '400px', transformStyle: 'preserve-3d' }}
      >
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-0 border border-[#00F0FF]/40" style={{ transform: 'translateZ(64px)' }} />
          <div className="absolute inset-0 border border-[#00F0FF]/40" style={{ transform: 'rotateY(180deg) translateZ(64px)' }} />
          <div className="absolute inset-0 border border-[#00F0FF]/40" style={{ transform: 'rotateY(90deg) translateZ(64px)' }} />
          <div className="absolute inset-0 border border-[#00F0FF]/40" style={{ transform: 'rotateY(-90deg) translateZ(64px)' }} />
          <div className="absolute inset-0 border border-[#00F0FF]/40" style={{ transform: 'rotateX(90deg) translateZ(64px)' }} />
          <div className="absolute inset-0 border border-[#00F0FF]/40" style={{ transform: 'rotateX(-90deg) translateZ(64px)' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Pre-title */}
            <p className="font-rajdhani text-sm tracking-[0.5em] text-[#00F0FF] mb-6 opacity-0 animate-fade-in">
              HELLO, WORLD
            </p>

            {/* Name */}
            <h1
              ref={nameRef}
              className="font-orbitron text-responsive-hero font-black tracking-tight mb-4"
              style={{ perspective: '500px' }}
            >
              <div className="flex justify-center lg:justify-start">
                {name.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="letter inline-block text-white"
                    style={{ textShadow: '0 0 30px rgba(0, 240, 255, 0.3)' }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </h1>

            {/* Title */}
            <p
              ref={titleRef}
              className="font-orbitron text-2xl md:text-3xl lg:text-5xl font-semibold tracking-wider mb-6 opacity-0"
            >
              <span className="gradient-text">FULL STACK DEVELOPER</span>
            </p>

            {/* Subtitle */}
            <div ref={subtitleRef} className="opacity-0">
              <p className="font-rajdhani text-lg md:text-xl text-white/60 max-w-2xl lg:mx-0 mx-auto mb-10">
                Building immersive digital experiences with code and creativity.
                <br />
                <span className="text-[#00F0FF]">500+</span> DSA problems solved | LeetCode Top{' '}
                <span className="text-[#00F0FF]">21%</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 opacity-0">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-cyan"
              >
                VIEW PROJECTS
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 font-orbitron font-semibold text-sm tracking-wider text-white/70 hover:text-[#00F0FF] transition-colors border border-white/20 hover:border-[#00F0FF]/50"
              >
                GET IN TOUCH
              </a>
            </div>
          </div>

          {/* Right Column: Large Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div
              className="profile-image relative w-full max-w-[280px] lg:max-w-sm aspect-[250/400] opacity-0 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[#00F0FF]/20 rounded-3xl blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-3xl border-2 border-[#00F0FF]/50 overflow-hidden glass box-glow">
                <img
                  src="https://res.cloudinary.com/dfc8a9imb/image/upload/c_crop,w_250,h_400,g_auto/v1751541568/profile_xzc4h2.jpg"
                  alt="Nikhil"
                  className="w-full h-full object-cover"
                />

                {/* Decorative scanning line effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#00F0FF]/50 blur-sm animate-scan" style={{ animationDuration: '3s' }} />
              </div>

              {/* Corner Accents for image */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#00F0FF]" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#00F0FF]" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-rajdhani text-xs tracking-wider text-white/40">SCROLL TO EXPLORE</span>
        <ChevronDown className="w-5 h-5 text-[#00F0FF]" />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-24 left-6 w-20 h-px bg-gradient-to-r from-[#00F0FF] to-transparent" />
      <div className="absolute top-24 left-6 w-px h-20 bg-gradient-to-b from-[#00F0FF] to-transparent" />
      <div className="absolute bottom-24 right-6 w-20 h-px bg-gradient-to-l from-[#00F0FF] to-transparent" />
      <div className="absolute bottom-24 right-6 w-px h-20 bg-gradient-to-t from-[#00F0FF] to-transparent" />
    </section>
  );
}