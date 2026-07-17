import React, { useState, useEffect } from 'react';
import { techStack } from '../../data/techStack';
import { profile, externalLinkProps } from '../../data/profile';
import {
  aboutContent,
  consultationContent,
  contactContent,
  faqContent,
  footerContent,
  heroContent,
  projectsContent,
  servicesContent,
  techStackContent,
} from '../../data/homeContent';
import { ContactForm } from '../../components/forms/ContactForm';
import { ConsultationForm } from '../../components/forms/ConsultationForm';
import { loadProjects, getStaticProjects } from '../../lib/projectFetcher';
import type { Project } from '../../types/project';
import deskImage from '../../assets/desk.png';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setProjectsLoading(true);
      try {
        const data = await loadProjects();
        if (!cancelled) setProjects(data);
      } catch {
        if (!cancelled) setProjects(getStaticProjects());
      } finally {
        if (!cancelled) setProjectsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => window.clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  const navLinkClass =
    'btn-nav text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      <a href="#main" className="sr-only">
        Skip to main content
      </a>

      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container-shell">
          <div className="flex items-center justify-between h-16">
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection('home');
              }}
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 rounded-lg"
            >
              <img
                src={profile.avatarUrl}
                alt={`${profile.name}, full stack developer and AI engineer`}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover border border-white/20 ring-2 ring-cyan-400/30"
              />
              <span className="text-xl font-bold">{profile.name}</span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className={navLinkClass}>
                Home
              </a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className={navLinkClass}>
                About
              </a>
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className={navLinkClass}>
                Services
              </a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className={navLinkClass}>
                Projects
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className={navLinkClass}>
                Contact
              </a>
              <a
                href="#consultation"
                onClick={(e) => { e.preventDefault(); scrollToSection('consultation'); }}
                className="btn-base btn-primary btn-compact whitespace-nowrap"
              >
                {heroContent.primaryCta}
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="btn-nav md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-cyan-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`} aria-hidden="true"></i>
            </button>
          </div>

          <div
            id="mobile-navigation"
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-4 space-y-4 border-t border-white/10">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'services', label: 'Services' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                  className="btn-nav block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#consultation"
                onClick={(e) => { e.preventDefault(); scrollToSection('consultation'); }}
                className="block w-full text-left btn-base btn-primary btn-compact mt-2"
              >
                {heroContent.primaryCta}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
      </div>

      <main id="main">
        <section id="home" aria-labelledby="hero-heading" className="relative min-h-screen flex items-center section-shell pt-28">
          <div className={`container-shell grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" aria-hidden="true"></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">{heroContent.availability}</span>
              </div>

              <div className="space-y-5">
                <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                  {heroContent.h1}
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
                  {heroContent.subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <a
                  href="#consultation"
                  onClick={(e) => { e.preventDefault(); scrollToSection('consultation'); }}
                  className="btn-base btn-primary px-8 py-4"
                >
                  {heroContent.primaryCta}
                  <i className="ri-arrow-right-line" aria-hidden="true"></i>
                </a>
                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                  className="btn-base btn-secondary px-8 py-4"
                >
                  {heroContent.secondaryCta}
                </a>
              </div>

              <p className="text-sm text-slate-400">
                Looking for{' '}
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2">
                  web development or AI automation services
                </a>
                ? Or jump to{' '}
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2">
                  my background
                </a>
                .
              </p>
            </div>

            <aside className="card-elevated p-6 sm:p-8 space-y-6" aria-label="Developer profile summary">
              <div className="flex items-center gap-4">
                <img
                  src={profile.avatarUrl}
                  alt={`Portrait of ${profile.name}, full stack developer and AI engineer`}
                  width={64}
                  height={64}
                  fetchPriority="high"
                  className="w-16 h-16 rounded-xl object-cover border border-white/15"
                />
                <div>
                  <p className="text-lg font-semibold text-white">{profile.name}</p>
                  <p className="text-sm text-slate-400">Full Stack Developer & AI Engineer</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="card-base p-4">
                  <p className="text-2xl font-bold text-white">{profile.experienceYears}</p>
                  <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Years Experience</p>
                </div>
                <div className="card-base p-4">
                  <p className="text-2xl font-bold text-white">15+</p>
                  <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Projects Completed</p>
                </div>
              </div>

              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <i className="ri-map-pin-line text-cyan-400 mt-0.5" aria-hidden="true"></i>
                  <span>India · Remote worldwide</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-briefcase-line text-cyan-400 mt-0.5" aria-hidden="true"></i>
                  <span>Available for new projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-time-line text-cyan-400 mt-0.5" aria-hidden="true"></i>
                  <span>Response within 24 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-mail-line text-cyan-400 mt-0.5" aria-hidden="true"></i>
                  <a href={`mailto:${profile.email}`} className="hover:text-cyan-300 transition-colors">{profile.email}</a>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="about" aria-labelledby="about-heading" className="section-shell">
          <div className="container-shell">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-cyan-400/30">
                  <span className="text-sm font-medium text-cyan-400 tracking-wider uppercase">{aboutContent.eyebrow}</span>
                </div>

                <h2 id="about-heading" className="text-4xl sm:text-5xl font-bold">
                  <span className="text-white">{aboutContent.h2Line1}</span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {aboutContent.h2Line2}
                  </span>
                </h2>

                <p className="text-lg text-gray-300 leading-relaxed">{aboutContent.intro}</p>
                <p className="text-base text-gray-400 leading-relaxed">{aboutContent.body}</p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aboutContent.skills.map((skill) => (
                    <li key={skill} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center shrink-0" aria-hidden="true">
                        <i className="ri-check-line text-black text-sm"></i>
                      </div>
                      <span className="text-gray-300">{skill}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-slate-400">
                  See the{' '}
                  <a href="#tech-stack" onClick={(e) => { e.preventDefault(); scrollToSection('tech-stack'); }} className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2">
                    technology stack
                  </a>{' '}
                  I use, or{' '}
                  <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2">
                    get in touch
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{profile.experienceYears}</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">Years Experience</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">15+</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">Projects Completed</div>
                  </div>
                </div>

                <div className="relative" aria-label="Career timeline">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-400" aria-hidden="true"></div>
                  {aboutContent.timeline.map((item) => (
                    <div key={item.year} className="relative flex items-center space-x-6 pb-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                        {item.year.slice(-2)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-cyan-400 text-sm">{item.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tech-stack" aria-labelledby="tech-heading" className="section-shell bg-black/20">
          <div className="container-shell">
            <div className="text-center mb-16">
              <h2 id="tech-heading" className="text-4xl font-bold mb-4 text-white">{techStackContent.h2}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{techStackContent.intro}</p>
            </div>

            <div className="space-y-12">
              {techStack.map((group) => (
                <div key={group.category}>
                  <h3 className="text-cyan-300 text-sm uppercase tracking-wider mb-8 text-center">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-x-12 gap-y-10 max-w-4xl mx-auto">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.name}
                          className="flex flex-col items-center gap-3 text-center group"
                          aria-label={item.name}
                        >
                          <Icon
                            className="w-12 h-12 transition-transform duration-200 group-hover:scale-110"
                            style={{ color: item.color }}
                            aria-hidden="true"
                          />
                          <span className="text-sm font-medium text-gray-300 leading-tight">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" aria-labelledby="services-heading" className="section-shell">
          <div className="container-shell">
            <div className="text-center mb-16">
              <h2 id="services-heading" className="text-4xl font-bold mb-4 text-white">{servicesContent.h2}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{servicesContent.intro}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {servicesContent.items.map((service) => (
                <article key={service.title} className="card-elevated p-8">
                  <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-400/30 rounded-xl flex items-center justify-center mb-6">
                    <i className={`${service.icon} text-cyan-400 text-2xl`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 mb-5 leading-relaxed">{service.outcome}</p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs uppercase tracking-wider text-cyan-300 mb-2">Who it is for</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{service.forWho}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="text-center mt-10 text-sm text-slate-400">
              Ready to scope a project?{' '}
              <a href="#consultation" onClick={(e) => { e.preventDefault(); scrollToSection('consultation'); }} className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2">
                Book a free consultation
              </a>{' '}
              or browse{' '}
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2">
                featured case studies
              </a>
              .
            </p>
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-heading" className="section-shell bg-black/20">
          <div className="container-shell">
            <div className="mb-12 lg:mb-16 max-w-3xl">
              <h2 id="projects-heading" className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {projectsContent.h2}
                </span>
              </h2>
              <p className="text-gray-400">{projectsContent.intro}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsLoading &&
                Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden animate-pulse"
                    aria-hidden="true"
                  >
                    <div className="h-48 bg-white/10" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 w-3/4 rounded bg-white/10" />
                      <div className="h-4 w-full rounded bg-white/10" />
                      <div className="h-4 w-5/6 rounded bg-white/10" />
                    </div>
                  </div>
                ))}

              {!projectsLoading &&
                projects.map((project) => (
                  <article
                    key={project.id}
                    id={`project-${project.slug}`}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        width={640}
                        height={360}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(event) => {
                          const target = event.currentTarget;
                          if (project.logo && target.src !== project.logo) {
                            target.src = project.logo;
                            target.className =
                              'w-full h-full object-contain p-12 bg-black/40 group-hover:scale-110 transition-transform duration-300';
                          }
                        }}
                      />
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-black/50 backdrop-blur-sm text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-wider text-cyan-300 mb-2">{project.type}</p>
                      <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                      <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                      <ul className="mb-6 space-y-1.5">
                        {project.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-gray-400">
                            <i className="ri-check-line text-cyan-400 mt-0.5 shrink-0" aria-hidden="true"></i>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={project.url}
                        {...externalLinkProps}
                        className="inline-flex items-center px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg hover:bg-cyan-500/30 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                      >
                        <i className="ri-external-link-line mr-2" aria-hidden="true"></i>
                        Visit live project
                        <span className="sr-only">: {project.title}</span>
                      </a>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>

        <section id="consultation" aria-labelledby="consultation-heading" className="section-shell">
          <div className="container-shell">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-cyan-400/30">
                  <span className="text-sm font-medium text-cyan-400 tracking-wider uppercase">{consultationContent.eyebrow}</span>
                </div>
                <h2 id="consultation-heading" className="text-4xl font-bold text-white leading-tight">
                  {consultationContent.h2}
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                  {consultationContent.intro}
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                  {consultationContent.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <i className="ri-check-line text-cyan-400 mt-0.5" aria-hidden="true"></i>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <ConsultationForm />
              </div>
            </div>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className="section-shell bg-black/20">
          <div className="container-shell max-w-3xl">
            <h2 id="faq-heading" className="text-4xl font-bold mb-4 text-white text-center">
              {faqContent.h2}
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Quick answers about working together on web development and AI projects.
            </p>
            <div className="space-y-4">
              {faqContent.items.map((item) => (
                <details
                  key={item.question}
                  className="group bg-white/5 border border-white/10 rounded-xl px-6 py-4 open:border-cyan-400/40"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 rounded">
                    <h3 className="text-base sm:text-lg pr-2">{item.question}</h3>
                    <i className="ri-arrow-down-s-line text-cyan-400 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true"></i>
                  </summary>
                  <p className="mt-3 text-gray-400 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading" className="section-shell">
          <div className="container-shell">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-8">
                <h2 id="contact-heading" className="text-4xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {contactContent.h2Line1}
                  </span>
                  <br />
                  <span className="text-white">{contactContent.h2Line2}</span>
                </h2>

                <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                  {contactContent.intro}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <i className="ri-mail-line text-cyan-400 text-xl" aria-hidden="true"></i>
                    <a href={`mailto:${profile.email}`} className="text-gray-300 hover:text-cyan-300 transition-colors">{profile.email}</a>
                  </div>
                  <div className="flex items-center space-x-4">
                    <i className="ri-map-pin-line text-cyan-400 text-xl" aria-hidden="true"></i>
                    <span className="text-gray-300">India · Remote worldwide</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <i className="ri-money-dollar-circle-line text-cyan-400 text-xl" aria-hidden="true"></i>
                    <span className="text-gray-300">{contactContent.rateNote}</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a href={profile.linkedin} {...externalLinkProps} aria-label={`${profile.name} on LinkedIn`} className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400">
                    <i className="ri-linkedin-line text-cyan-400" aria-hidden="true"></i>
                  </a>
                  <a href={profile.github} {...externalLinkProps} aria-label={`${profile.name} on GitHub`} className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400">
                    <i className="ri-github-line text-purple-400" aria-hidden="true"></i>
                  </a>
                  <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`} className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400">
                    <i className="ri-mail-line text-cyan-400" aria-hidden="true"></i>
                  </a>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="section-shell bg-black/40" aria-label="Site footer">
        <div className="container-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-12">
            <div className="flex items-center space-x-3">
              <img
                src={profile.avatarUrl}
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border border-white/15"
              />
              <span className="text-xl font-bold">{profile.name}</span>
            </div>
            <p className="text-gray-400">{footerContent.tagline}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div>
              <p className="font-semibold text-white mb-4 uppercase text-sm tracking-wider">Services</p>
              <div className="space-y-2">
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">Website Development</a>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">Web Applications</a>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">AI Automation</a>
                <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">API Integrations</a>
              </div>
            </div>

            <div>
              <p className="font-semibold text-white mb-4 uppercase text-sm tracking-wider">Explore</p>
              <div className="space-y-2">
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">About</a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">Projects</a>
                <a href="#tech-stack" onClick={(e) => { e.preventDefault(); scrollToSection('tech-stack'); }} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">Tech Stack</a>
                <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">FAQ</a>
                <a href="#consultation" onClick={(e) => { e.preventDefault(); scrollToSection('consultation'); }} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">Free Consultation</a>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="font-semibold text-white mb-4 uppercase text-sm tracking-wider sm:text-right">Contact</p>
              <div className="space-y-2 sm:text-right">
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="btn-nav block sm:ml-auto text-left sm:text-right text-gray-400 hover:text-cyan-400 transition-colors">Contact Form</a>
                <a href={`mailto:${profile.email}`} className="block text-gray-400 hover:text-cyan-400 transition-colors">{profile.email}</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
              <img
                src={deskImage}
                alt=""
                width={256}
                height={160}
                loading="lazy"
                decoding="async"
                aria-hidden="true"
                className="w-full max-w-xs md:w-64 h-40 rounded-lg object-cover border border-white/10 shrink-0"
              />
              <blockquote className="text-xl md:text-2xl font-serif italic text-white leading-relaxed max-w-md">
                “{footerContent.quote}”
              </blockquote>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400">© 2026 {profile.name}. All rights reserved.</p>
            <div className="space-x-4">
              <a href={profile.linkedin} {...externalLinkProps} className="text-gray-400 hover:text-cyan-400 transition-colors underline">LinkedIn</a>
              <a href={profile.github} {...externalLinkProps} className="text-gray-400 hover:text-cyan-400 transition-colors underline">GitHub</a>
              <a href={`mailto:${profile.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors underline">Email</a>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Built by {profile.name} — full stack developer & AI engineer
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
