import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Achievements from './sections/Achievements';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Navigation from './sections/Navigation';
import ParticleBackground from './components/ParticleBackground';
import ProgressRing from './components/ProgressRing';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Initial animations after loading
  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        '.main-content',
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      <CustomCursor />
      
      <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Grid Background Overlay */}
        <div className="fixed inset-0 grid-bg opacity-50 pointer-events-none z-[1]" />
        
        {/* Main Content */}
        <div ref={mainRef} className="main-content relative z-10">
          <Navigation />
          
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Achievements />
            <Certifications />
            <Contact />
          </main>
        </div>
        
        {/* Progress Ring */}
        <ProgressRing progress={scrollProgress} />
      </div>
    </>
  );
}

export default App;