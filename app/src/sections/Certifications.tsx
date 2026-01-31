import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    name: 'AI/ML Virtual Internship',
    provider: 'Google',
    icon: 'G',
    color: '#4285F4',
    description: 'Comprehensive training in Artificial Intelligence and Machine Learning fundamentals',
    link: 'https://drive.google.com/file/d/1rs08f3v5M6_ZKq3_-M7mZYD5yJ8FBmeW/view',
  },
  {
    name: 'AWS Machine Learning Foundations',
    provider: 'AWS',
    icon: 'AWS',
    color: '#FF9900',
    description: 'Core concepts of machine learning on AWS cloud platform',
    link: 'https://www.credly.com/badges/6ccff52c-3823-49b6-a6b4-a9c2d5c3d3bc',
  },
  {
    name: 'AWS Academy Data Engineering',
    provider: 'AWS',
    icon: 'AWS',
    color: '#FF9900',
    description: 'Data engineering principles and AWS data services',
    link: 'https://www.credly.com/badges/216e6437-fcaa-49c8-a6dd-e4717b42b0ba',
  },
  {
    name: 'AWS Academy Cloud Foundations',
    provider: 'AWS',
    icon: 'AWS',
    color: '#FF9900',
    description: 'Fundamentals of cloud computing with AWS',
    link: 'https://www.credly.com/badges/3ec16164-756e-43fa-a3f3-6d662854ba33',
  },
  {
    name: 'Introduction to Generative AI',
    provider: 'AWS',
    icon: 'AWS',
    color: '#FF9900',
    description: 'Understanding generative AI concepts and applications',
    link: 'https://www.udacity.com/certificate/e/07ffeaac-5966-11f0-96d3-8f73ca1868f4',
  },
  {
    name: 'Introduction to Cyber Security',
    provider: 'Google',
    icon: 'G',
    color: '#4285F4',
    description: 'Essential cybersecurity concepts and best practices',
    link: '',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Certification cards animation
      const certCards = certsRef.current?.querySelectorAll('.cert-card');
      if (certCards) {
        gsap.fromTo(
          certCards,
          { y: 40, opacity: 0, rotateY: -15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: certsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-6 h-6 text-[#00F0FF]" />
            <span className="font-rajdhani text-sm tracking-wider text-[#00F0FF]">
              CREDENTIALS
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            <span className="text-[#00F0FF]">CERTIFICATIONS</span>
          </h2>
          <div className="w-20 h-1 bg-[#00F0FF] mt-4 mx-auto" />
          <p className="font-rajdhani text-lg text-white/60 mt-6 max-w-2xl mx-auto">
            Continuous learning and professional development through industry-recognized certifications.
          </p>
        </div>

        {/* Certifications Grid */}
        <div
          ref={certsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.link || '#'}
              target={cert.link ? '_blank' : '_self'}
              rel={cert.link ? 'noopener noreferrer' : undefined}
              className={`cert-card group relative glass rounded-xl p-6 border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-500 overflow-hidden block ${!cert.link ? 'cursor-default' : 'cursor-pointer'}`}
              style={{ perspective: '1000px' }}
              onClick={(e) => {
                if (!cert.link) e.preventDefault();
              }}
            >
              {/* Provider Badge */}
              <div
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs"
                style={{
                  backgroundColor: `${cert.color}20`,
                  color: cert.color,
                  border: `1px solid ${cert.color}40`,
                }}
              >
                {cert.icon}
              </div>

              {/* Content */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00F0FF]/20 transition-colors">
                  <CheckCircle className="w-6 h-6 text-[#00F0FF]" />
                </div>

                <div className="flex-1 pr-12">
                  <h3 className="font-orbitron text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors mb-1">
                    {cert.name}
                  </h3>
                  <p
                    className="font-rajdhani text-sm mb-2"
                    style={{ color: cert.color }}
                  >
                    {cert.provider}
                  </p>
                  <p className="font-rajdhani text-sm text-white/50 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Corner Decoration */}
              <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r border-b border-[#00F0FF]/30" />
              </div>
            </a>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.linkedin.com/in/nikhil-pabbisetti/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#00F0FF]/50 text-[#00F0FF] font-rajdhani tracking-wider hover:bg-[#00F0FF]/10 transition-all duration-300"
          >
            VIEW ALL CREDENTIALS
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}