import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Database,
  Globe,
  Cpu,
  Cloud,
  Terminal,
  Layers,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'LANGUAGES',
    icon: Code2,
    skills: [
      { name: 'Java', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'C', level: 75 },
      { name: 'TypeScript', level: 85 },
    ],
  },
  {
    name: 'FRONTEND',
    icon: Globe,
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Next.js', level: 80 },
    ],
  },
  {
    name: 'BACKEND',
    icon: ServerIcon,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    name: 'DATABASE',
    icon: Database,
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'SQL', level: 80 },
      { name: 'Firebase', level: 85 },
    ],
  },
  {
    name: 'TOOLS',
    icon: Terminal,
    skills: [
      { name: 'Git', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Vercel', level: 85 },
    ],
  },
  {
    name: 'CLOUD & ML',
    icon: Cloud,
    skills: [
      { name: 'AWS', level: 75 },
      { name: 'Google Cloud', level: 70 },
      { name: 'Machine Learning', level: 70 },
      { name: 'Google Earth Engine', level: 80 },
      { name: 'CHIRPS Dataset', level: 75 },
    ],
  },
];

function ServerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

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

      // Categories animation
      const categoryCards = categoriesRef.current?.querySelectorAll('.category-card');
      if (categoryCards) {
        gsap.fromTo(
          categoryCards,
          { y: 60, opacity: 0, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Skill bars animation
      const skillBars = categoriesRef.current?.querySelectorAll('.skill-bar-fill');
      if (skillBars) {
        skillBars.forEach((bar) => {
          const width = bar.getAttribute('data-width');
          gsap.fromTo(
            bar,
            { width: '0%' },
            {
              width: `${width}%`,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cpu className="w-6 h-6 text-[#00F0FF]" />
            <span className="font-rajdhani text-sm tracking-wider text-[#00F0FF]">
              EXPERTISE
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            MY <span className="text-[#00F0FF]">SKILLS</span>
          </h2>
          <div className="w-20 h-1 bg-[#00F0FF] mt-4 mx-auto" />
          <p className="font-rajdhani text-lg text-white/60 mt-6 max-w-2xl mx-auto">
            A comprehensive toolkit built through countless hours of coding,
            problem-solving, and continuous learning.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={categoriesRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="category-card glass rounded-xl p-6 border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-500 group"
              style={{ perspective: '1000px' }}

            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center group-hover:bg-[#00F0FF]/20 transition-colors">
                  <category.icon className="w-5 h-5 text-[#00F0FF]" />
                </div>
                <h3 className="font-orbitron text-lg font-bold text-white tracking-wider">
                  {category.name}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-rajdhani text-sm text-white/80">
                        {skill.name}
                      </span>
                      <span className="font-orbitron text-xs text-[#00F0FF]">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full bg-gradient-to-r from-[#00F0FF] to-[#0080FF] rounded-full"
                        data-width={skill.level}
                        style={{
                          boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-xl bg-[#00F0FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Tech Stack Tags */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Layers className="w-5 h-5 text-[#00F0FF]" />
            <span className="font-rajdhani text-sm tracking-wider text-white/60">
              TECH STACK
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              'React',
              'Node.js',
              'TypeScript',
              'MongoDB',
              'Firebase',
              'Tailwind',
              'Git',
              'Python',
              'Java',
              'Google Earth Engine',
              'CHIRPS Dataset',
              'REST API',
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full font-rajdhani text-sm text-white/70 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] hover:bg-[#00F0FF]/10 transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}