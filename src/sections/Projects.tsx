import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Layers, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    name: "TRANSPOCARBON",
    description: "Established a digital carbon marketplace linking farmers, project entities, auditors, registries, and buyers to streamline credit lifecycle management.",
    image: "/projects/transpoCarbon.png",
    tech: ["React.js", "Firebase", "Python", "Google Earth Engine", "CHIRPS Dataset"],
    github: "https://github.com/Nikhil-p570/transpoCarbon",
    live: "",
    featured: true,
  },
  {
    id: 2,
    name: "GPS ATTENDANCE SYSTEM",
    description: "System to mark the attendance using GPS based geolocation tracking. Integrated Leaflet API for mapping and implemented JWT-secured GPS geofencing for accurate attendance marking.",
    image: "/projects/gpsattendance.png",
    tech: ["React.js", "TailwindCSS", "MongoDB", "Node.js"],
    github: "https://github.com/Nikhil-p570/GPS_Attendance_System-",
    live: "",
    featured: false,
  },
  {
    id: 3,
    name: "TEAM UP",
    description: "A platform to connect with like-minded people and collaborate on projects. Features include real-time chat, notifications, and Firebase authentication with Google OAuth.",
    image: "/projects/teamup.png",
    tech: ["JavaScript", "React.js", "Node.js", "Firebase"],
    github: "https://github.com/Nikhil-p570/Teamup",
    live: "https://teamupns.vercel.app/",
    featured: false,
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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

      // Projects animation
      const projectCards = projectsRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        gsap.fromTo(
          projectCards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: projectsRef.current,
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
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-[#00F0FF]" />
            <span className="font-rajdhani text-sm tracking-wider text-[#00F0FF]">
              MY WORK
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            FEATURED <span className="text-[#00F0FF]">PROJECTS</span>
          </h2>
          <div className="w-20 h-1 bg-[#00F0FF] mt-4" />
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}

            >
              {/* Image */}
              <div
                className={`relative group ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-[#00F0FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
                  />

                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-20" />

                  {/* Project Number */}
                  <div className="absolute top-4 left-4 z-30">
                    <span className="font-orbitron text-6xl font-bold text-white/10">
                      0{project.id}
                    </span>
                  </div>
                </div>

                {/* Decorative Frame */}
                <div className="absolute -top-2 -left-2 w-12 h-12 border-l-2 border-t-2 border-[#00F0FF]/50" />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 border-r-2 border-b-2 border-[#00F0FF]/50" />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="flex items-center gap-2 mb-4">
                  {project.featured && (
                    <span className="px-3 py-1 text-xs font-rajdhani tracking-wider bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/30">
                      FEATURED
                    </span>
                  )}
                </div>

                <h3 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#00F0FF] transition-colors">
                  {project.name}
                </h3>

                <p className="font-rajdhani text-lg text-white/70 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="skill-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white/70 hover:border-[#00F0FF] hover:text-[#00F0FF] transition-all duration-300 font-rajdhani tracking-wider"
                  >
                    <Github className="w-5 h-5" />
                    CODE
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-[#00F0FF] text-black font-semibold hover:bg-[#00d0dd] transition-all duration-300 font-rajdhani tracking-wider"
                    >
                      <ExternalLink className="w-5 h-5" />
                      LIVE DEMO
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#00F0FF] font-rajdhani tracking-wider hover:gap-4 transition-all duration-300"
          >
            VIEW ALL PROJECTS
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}