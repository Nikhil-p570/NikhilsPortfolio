import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Code2,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

// EMAILJS CONFIGURATION (You can also set these in a .env file)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_677j6v9';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_v8at2t5';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '5U_i9S_Bclm0W2422';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'nikhil.pabbisetti2006@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&to=nikhil.pabbisetti2006@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-8919626878',
    href: 'tel:+918919626878',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Hyderabad, India',
    href: '#',
  },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/Nikhil-p570' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhil-pabbisetti/' },
  { icon: Code2, label: 'LeetCode', href: 'https://leetcode.com/u/nikhil_pabbisetti/' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        throw new Error('EmailJS credentials are not configured.');
      }

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formData,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setIsSubmitted(true);
        setFormData({ from_name: '', from_email: '', message: '' });
      } else {
        throw new Error('Failed to send message.');
      }
    } catch (error: any) {
      console.error('EmailJS Error:', error);
      if (error.text === 'Account not found' || error.message?.includes('Account not found')) {
        setSubmitError('EmailJS is not set up correctly. Please replace the placeholders with your actual Service ID, Template ID, and Public Key from emailjs.com');
      } else {
        setSubmitError(error.message || 'Something went wrong. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
      // Reset error after 5 seconds
      if (submitError) setTimeout(() => setSubmitError(''), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-[#00F0FF]" />
            <span className="font-rajdhani text-sm tracking-wider text-[#00F0FF]">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            LET'S <span className="text-[#00F0FF]">CONNECT</span>
          </h2>
          <div className="w-20 h-1 bg-[#00F0FF] mt-4 mx-auto" />
          <p className="font-rajdhani text-lg text-white/60 mt-6 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 border border-white/10"
          >
            <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
              SEND A <span className="text-[#00F0FF]">MESSAGE</span>
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block font-rajdhani text-sm text-white/60 mb-2">
                  YOUR NAME
                </label>
                <Input
                  type="text"
                  value={formData.from_name}
                  onChange={(e) =>
                    setFormData({ ...formData, from_name: e.target.value })
                  }
                  placeholder="John Doe"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20"
                />
              </div>

              <div>
                <label className="block font-rajdhani text-sm text-white/60 mb-2">
                  YOUR EMAIL
                </label>
                <Input
                  type="email"
                  value={formData.from_email}
                  onChange={(e) =>
                    setFormData({ ...formData, from_email: e.target.value })
                  }
                  placeholder="john@example.com"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20"
                />
              </div>

              <div>
                <label className="block font-rajdhani text-sm text-white/60 mb-2">
                  YOUR MESSAGE
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20 resize-none"
                />
              </div>

              {submitError && (
                <p className="text-red-400 font-rajdhani text-sm text-center">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#00F0FF] hover:bg-[#00d0dd] text-black font-orbitron font-semibold tracking-wider py-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    SENDING...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center gap-2">
                    MESSAGE SENT!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    SEND MESSAGE
                    <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Contact Details */}
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
                CONTACT <span className="text-[#00F0FF]">INFO</span>
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center group-hover:bg-[#00F0FF]/20 transition-colors">
                      <info.icon className="w-5 h-5 text-[#00F0FF]" />
                    </div>
                    <div>
                      <div className="font-rajdhani text-sm text-white/50">
                        {info.label}
                      </div>
                      <div className="font-rajdhani text-white group-hover:text-[#00F0FF] transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h3 className="font-orbitron text-2xl font-bold text-white mb-6">
                FOLLOW <span className="text-[#00F0FF]">ME</span>
              </h3>

              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-all duration-300 group"
                  >
                    <social.icon className="w-6 h-6 text-white/60 group-hover:text-[#00F0FF] transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00F0FF]/20 to-[#0080FF]/20 border border-[#00F0FF]/30 p-8">
              <div className="relative z-10">
                <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                  OPEN TO OPPORTUNITIES
                </h3>
                <p className="font-rajdhani text-white/70 mb-4">
                  Currently looking for internships and collaborative projects.
                </p>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=nikhil.pabbisetti2006@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#00F0FF] font-rajdhani hover:gap-3 transition-all duration-300"
                >
                  Let's talk
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="font-orbitron text-2xl font-bold tracking-wider text-white">
              <span className="text-[#00F0FF]">&lt;</span>
              NIKHIL
              <span className="text-[#00F0FF]">/&gt;</span>
            </div>

            {/* Copyright */}
            <div className="font-rajdhani text-white/50 text-center">
              © {new Date().getFullYear()} Nikhil Pabbisetti. All rights reserved.
              <br />
              <span className="text-sm">Built with React, TypeScript & Tailwind CSS</span>
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center hover:bg-[#00F0FF]/20 transition-colors"
            >
              <ArrowUpRight className="w-5 h-5 text-[#00F0FF] -rotate-45" />
            </button>
          </div>
        </div>
      </footer>
    </section>
  );
}