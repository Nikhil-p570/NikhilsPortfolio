import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Github, Linkedin, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'ACHIEVEMENTS', href: '#achievements' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 2.2, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, x: '100%' },
          { opacity: 1, x: '0%', duration: 0.3, ease: 'power2.out' }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          x: '100%',
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050505]/80 backdrop-blur-lg border-b border-white/5'
            : 'bg-transparent'
        }`}
        style={{ opacity: 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-orbitron text-xl font-bold tracking-wider text-white hover:text-[#00F0FF] transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="text-[#00F0FF]">&lt;</span>
              NIKHIL
              <span className="text-[#00F0FF]">/&gt;</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative font-rajdhani text-sm tracking-wider text-white/70 hover:text-[#00F0FF] transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00F0FF] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://github.com/Nikhil-p570"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00F0FF] transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/nikhil-pabbisetti/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00F0FF] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://leetcode.com/u/nikhil_pabbisetti/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00F0FF] transition-colors"
              >
                <Code2 className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-lg lg:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ opacity: 0, transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-orbitron text-2xl tracking-wider text-white hover:text-[#00F0FF] transition-colors"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.name}
            </a>
          ))}

          <div className="flex items-center gap-6 mt-8">
            <a
              href="https://github.com/Nikhil-p570"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#00F0FF] transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-pabbisetti/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#00F0FF] transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://leetcode.com/u/nikhil_pabbisetti/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#00F0FF] transition-colors"
            >
              <Code2 className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}