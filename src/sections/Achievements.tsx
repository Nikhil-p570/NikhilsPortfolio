import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Target, TrendingUp, Award, Star, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    icon: Target,
    title: 'DSA Mastery',
    value: '500+',
    description: 'Problems solved on LeetCode, Codeforces & GFG',
    color: '#00F0FF',
  },
  {
    icon: TrendingUp,
    title: 'LeetCode Rating',
    value: '1616',
    description: 'Top 21% globally in competitive programming',
    color: '#00FF88',
    link: 'https://leetcode.com/u/nikhil_pabbisetti/',
  },
  {
    icon: Award,
    title: 'Academic Excellence',
    value: '9.33',
    description: 'CGPA in Information Technology',
    color: '#FF6B6B',
  },
  {
    icon: Star,
    title: 'Certifications',
    value: '6+',
    description: 'From Google, AWS & other platforms',
    color: '#FFD93D',
  },
];

const experiences = [
  {
    role: 'Technical Team Member',
    organization: 'X-Kernel Club @ GRIET',
    period: 'Feb 2024 - Present',
    description:
      'Collaborating with distributed engineering teams on web development projects using modern technologies like React, Node.js, and cloud services.',
    icon: Zap,
  },
  {
    role: 'Class Representative',
    organization: 'GRIET IT Department',
    period: 'Aug 2023 - Present',
    description:
      'Leading coordination activities for 70+ students, demonstrating leadership and project management skills. Facilitating communication across diverse backgrounds.',
    icon: Trophy,
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

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

      // Stats cards animation
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(
          statCards,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Experience cards animation
      const expCards = experienceRef.current?.querySelectorAll('.exp-card');
      if (expCards) {
        gsap.fromTo(
          expCards,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: experienceRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Counter animation for stats
      const counters = statsRef.current?.querySelectorAll('.counter');
      counters?.forEach((counter) => {
        const target = counter.getAttribute('data-target');
        const isDecimal = target?.includes('.');
        const numericValue = parseFloat(target || '0');

        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: numericValue,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: isDecimal ? 0.01 : 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-[#00F0FF]" />
            <span className="font-rajdhani text-sm tracking-wider text-[#00F0FF]">
              HIGHLIGHTS
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            ACHIEVEMENTS & <span className="text-[#00F0FF]">EXPERIENCE</span>
          </h2>
          <div className="w-20 h-1 bg-[#00F0FF] mt-4 mx-auto" />
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16"
        >
          {achievements.map((achievement, index) => {
            const CardWrapper = achievement.link ? 'a' : 'div';
            const linkProps = achievement.link
              ? { href: achievement.link, target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <CardWrapper
                key={index}
                {...linkProps}
                className={`stat-card glass rounded-xl p-6 border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-500 group relative overflow-hidden block ${achievement.link ? 'cursor-pointer' : ''}`}
              >
                {/* Background Glow */}
                <div
                  className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: achievement.color }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${achievement.color}20` }}
                >
                  <achievement.icon
                    className="w-6 h-6"
                    style={{ color: achievement.color }}
                  />
                </div>

                {/* Value */}
                <div
                  className="counter font-orbitron text-3xl lg:text-4xl font-bold mb-2"
                  data-target={achievement.value.replace(/[^0-9.]/g, '')}
                  style={{ color: achievement.color }}
                >
                  0
                </div>
                <div className="font-orbitron text-lg text-white mb-1">
                  {achievement.title}
                </div>
                <div className="font-rajdhani text-sm text-white/50">
                  {achievement.description}
                </div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Experience Section */}
        <div className="mb-8">
          <h3 className="font-orbitron text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Zap className="w-6 h-6 text-[#00F0FF]" />
            EXPERIENCE
          </h3>
        </div>

        <div ref={experienceRef} className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="exp-card glass rounded-xl p-6 lg:p-8 border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-500 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#00F0FF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00F0FF]/20 transition-colors">
                  <exp.icon className="w-7 h-7 text-[#00F0FF]" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-2">
                    <h4 className="font-orbitron text-xl font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                      {exp.role}
                    </h4>
                    <span className="font-rajdhani text-sm text-[#00F0FF] tracking-wider">
                      {exp.period}
                    </span>
                  </div>

                  <div className="font-rajdhani text-lg text-white/60 mb-3">
                    {exp.organization}
                  </div>

                  <p className="font-rajdhani text-white/70 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Decorative Line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00F0FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}