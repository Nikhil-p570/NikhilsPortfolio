import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, GraduationCap, Award, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: GraduationCap, label: 'CGPA', value: '9.33/10' },
  { icon: Award, label: 'DSA Problems', value: '500+' },
  {
    icon: Mail,
    label: 'Email',
    value: 'Compose',
    href: 'https://mail.google.com/mail/?view=cm&to=nikhil.pabbisetti2006@gmail.com'
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, rotateY: 30 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
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
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32"
    >
      {/* Section Title - Vertical */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block">
        <h2
          ref={titleRef}
          className="font-orbitron text-6xl font-bold tracking-tight text-white/5 writing-mode-vertical"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          ABOUT
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Mobile/Tablet Title */}
        <div className="xl:hidden mb-12">
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white">
            ABOUT <span className="text-[#00F0FF]">ME</span>
          </h2>
          <div className="w-20 h-1 bg-[#00F0FF] mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-[#00F0FF]" />
              <span className="font-rajdhani text-sm tracking-wider text-[#00F0FF]">
                WHO I AM
              </span>
            </div>

            <h3 className="font-orbitron text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              Creative Developer &
              <br />
              <span className="gradient-text">Problem Solver</span>
            </h3>

            <div className="space-y-4 font-rajdhani text-lg text-white/70 leading-relaxed mb-8">
              <p>
                I'm <span className="text-[#00F0FF] font-semibold">Nikhil Pabbisetti</span>,
                an Information Technology student at Gokaraju Rangaraju Institute of Engineering
                and Technology with a passion for building immersive web experiences.
              </p>
              <p>
                With a strong foundation in <span className="text-white">Java</span>,{' '}
                <span className="text-white">Python</span>, and{' '}
                <span className="text-white">JavaScript</span>, I specialize in creating
                full-stack applications that bridge the gap between design and technology.
              </p>
              <p>
                My competitive programming journey has sharpened my problem-solving skills,
                with <span className="text-[#00F0FF]">500+ DSA problems</span> solved across
                LeetCode, Codeforces, and GeeksforGeeks, achieving a contest rating of{' '}
                <span className="text-[#00F0FF]">1616</span> (Top 21% globally).
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const Content = (
                  <>
                    <stat.icon className="w-6 h-6 text-[#00F0FF] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-orbitron text-xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="font-rajdhani text-xs text-white/50 tracking-wider">
                      {stat.label}
                    </div>
                  </>
                );

                const className = "stat-item glass rounded-lg p-4 text-center group hover:border-[#00F0FF]/50 transition-all duration-300 block";

                if (stat.href) {
                  return (
                    <a
                      key={index}
                      href={stat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {Content}
                    </a>
                  );
                }

                return (
                  <div key={index} className={className}>
                    {Content}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual */}
          <div ref={imageRef} className="order-1 lg:order-2 relative" style={{ perspective: '1000px' }}>
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-[#00F0FF]/20 rounded-full blur-[100px]" />

              {/* Code Block */}
              <div className="relative glass rounded-2xl p-6 border border-[#00F0FF]/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 font-rajdhani text-sm text-white/40">about.js</span>
                </div>

                <pre className="font-mono text-sm text-white/80 overflow-x-auto">
                  <code>
                    <span className="text-[#00F0FF]">const</span>{' '}
                    <span className="text-white">developer</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-[#00F0FF]">{`{`}</span>
                    {'\n'}
                    {'  '}<span className="text-white">name</span>:{' '}
                    <span className="text-green-400">"Nikhil Pabbisetti"</span>,
                    {'\n'}
                    {'  '}<span className="text-white">role</span>:{' '}
                    <span className="text-green-400">"Full Stack Developer"</span>,
                    {'\n'}
                    {'  '}<span className="text-white">location</span>:{' '}
                    <span className="text-green-400">"Hyderabad, India"</span>,
                    {'\n'}
                    {'  '}<span className="text-white">cgpa</span>:{' '}
                    <span className="text-yellow-400">9.33</span>,
                    {'\n'}
                    {'  '}<span className="text-white">skills</span>: [
                    {'\n'}
                    {'    '}<span className="text-green-400">"React"</span>,{' '}
                    <span className="text-green-400">"Node.js"</span>,
                    {'\n'}
                    {'    '}<span className="text-green-400">"TypeScript"</span>,{' '}
                    <span className="text-green-400">"Python"</span>
                    {'\n'}
                    {'  '}],
                    {'\n'}
                    {'  '}<span className="text-white">passion</span>:{' '}
                    <span className="text-green-400">
                      "Building the future"
                    </span>
                    {'\n'}
                    <span className="text-[#00F0FF]">{`}`}</span>;
                  </code>
                </pre>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 border border-[#00F0FF]/40" />
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border border-[#00F0FF]/40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}