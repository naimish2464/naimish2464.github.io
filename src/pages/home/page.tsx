import React, { useState, useEffect } from 'react';
import { techStack } from '../../data/techStack';
import { profile, externalLinkProps } from '../../data/profile';
import { ContactForm } from '../../components/forms/ContactForm';
import { ConsultationForm } from '../../components/forms/ConsultationForm';

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      <a href="#main" className="sr-only">
        Skip to main content
      </a>

      {/* Sticky Navigation */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className="container-shell">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
            >
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-9 h-9 rounded-full object-cover border border-white/20 ring-2 ring-cyan-400/30"
              />
              <span className="text-xl font-bold">{profile.name}</span>
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                type="button"
                onClick={() => scrollToSection('home')}
                className="btn-nav text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
              >
                Home
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection('services')}
                className="btn-nav text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
              >
                Services
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn-nav text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
              >
                Case Studies
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-nav text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
              >
                Contact
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection('consultation')}
                className="btn-base btn-primary btn-compact whitespace-nowrap"
              >
                Book Free Consultation
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="btn-nav md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-cyan-400 transition-colors"
            >
              <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`} aria-hidden="true"></i>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <div
            id="mobile-navigation"
            className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-4 border-t border-white/10">
              <button 
                type="button"
                onClick={() => scrollToSection('home')}
                className="btn-nav block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
              >
                Home
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection('services')}
                className="btn-nav block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
              >
                Services
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn-nav block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
              >
                Case Studies
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-nav block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
              >
                Contact
              </button>
              <button 
                type="button"
                onClick={() => scrollToSection('consultation')}
                className="block w-full text-left btn-base btn-primary btn-compact mt-2"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-bounce delay-1000"></div>
      </div>

      <main id="main">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center section-shell pt-28">
        <div className={`container-shell grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Available for hire</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                I Build Digital Solutions That Help Businesses Grow With Confidence.
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
                I help founders and small teams launch conversion-focused websites, backend systems, and automation workflows that save time and increase revenue.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('consultation')}
                className="btn-base btn-primary px-8 py-4"
              >
                Book Free Consultation
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn-base btn-secondary px-8 py-4"
              >
                View Case Studies
              </button>
            </div>
          </div>

          <aside className="card-elevated p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-16 h-16 rounded-xl object-cover border border-white/15"
              />
              <div>
                <p className="text-lg font-semibold text-white">{profile.name}</p>
                <p className="text-sm text-slate-400">Full Stack Developer & AI Automation Specialist</p>
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
                <i className="ri-map-pin-line text-cyan-400 mt-0.5"></i>
                <span>India | Remote Worldwide</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-briefcase-line text-cyan-400 mt-0.5"></i>
                <span>Available for New Projects</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-time-line text-cyan-400 mt-0.5"></i>
                <span>Response Within 24 Hours</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-mail-line text-cyan-400 mt-0.5"></i>
                <a href={`mailto:${profile.email}`} className="hover:text-cyan-300 transition-colors">{profile.email}</a>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-shell">
        <div className="container-shell">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-cyan-400/30">
                <span className="text-sm font-medium text-cyan-400 tracking-wider">WHO I AM</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold">
                <span className="text-white">Full Stack Developer</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  & AI Automation Specialist
                </span>
              </h2>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                I design and build complete digital products — including frontend, backend, databases, DevOps, APIs, and AI automation. Whether you are a startup or established business, I deliver solutions that are future-ready, secure, and scalable.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Full Stack Web Development',
                  'API Design, Development & Integration',
                  'AI Chatbots & Automation',
                  'Web Scraping & Data Processing Tools',
                  'UI/UX Support & Optimization',
                  'Deployment + Maintenance'
                ].map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                      <i className="ri-check-line text-black text-sm"></i>
                    </div>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
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
              
              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-400"></div>
                {[
                  { year: '2024', title: 'AI Automation Specialist', company: 'Freelance' },
                  { year: '2023', title: 'Full Stack Developer', company: 'Tech Startup' },
                  { year: '2022', title: 'Backend Developer', company: 'Software Company' },
                  { year: '2020', title: 'Junior Developer', company: 'First Role' }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-center space-x-6 pb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                      {item.year.slice(-2)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-cyan-400 text-sm">{item.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech-stack" className="section-shell bg-black/20">
        <div className="container-shell">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Technology Stack</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tools and platforms I use to deliver production-ready solutions.
            </p>
          </div>

          <div className="space-y-12">
            {techStack.map((group) => (
              <div key={group.category}>
                <h3 className="text-cyan-300 text-sm uppercase tracking-wider mb-6 text-center md:text-left">
                  {group.category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="card-base p-4 flex flex-col items-center gap-3 text-center transition-colors duration-200 hover:border-cyan-400/30"
                        aria-label={item.name}
                      >
                        <div className="w-10 h-10 flex items-center justify-center shrink-0">
                          <Icon
                            className="w-6 h-6"
                            style={{ color: item.color }}
                            aria-hidden="true"
                          />
                        </div>
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

      {/* Services Section */}
      <section id="services" className="section-shell">
        <div className="container-shell">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Services Built Around Business Outcomes</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the delivery model that fits your current growth stage. Each package is structured for clear execution,
              dependable communication, and production-ready implementation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: 'ri-layout-4-line',
                title: 'Business Websites',
                outcome: 'Launch a credible web presence designed to convert visitors into qualified inquiries.',
                forWho: 'Best for founders, local businesses, and service brands needing trust-first websites.'
              },
              {
                icon: 'ri-window-line',
                title: 'Web Applications',
                outcome: 'Build internal or customer-facing products that streamline operations and reduce manual work.',
                forWho: 'Best for teams replacing spreadsheets, fragmented tools, or repetitive workflows.'
              },
              {
                icon: 'ri-robot-line',
                title: 'AI Automation',
                outcome: 'Implement automation systems that handle repetitive tasks and free your team for higher-value work.',
                forWho: 'Best for businesses with recurring support, ops, or data-processing bottlenecks.'
              },
              {
                icon: 'ri-links-line',
                title: 'API Integrations',
                outcome: 'Connect your website, app, and third-party platforms into one reliable operational flow.',
                forWho: 'Best for businesses that need systems to sync cleanly across sales, support, and delivery.'
              }
            ].map((service, index) => (
              <div key={index} className="card-elevated p-8">
                <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-400/30 rounded-xl flex items-center justify-center mb-6">
                  <i className={`${service.icon} text-cyan-400 text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-5 leading-relaxed">{service.outcome}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs uppercase tracking-wider text-cyan-300 mb-2">Who it is for</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.forWho}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-shell bg-black/20">
        <div className="container-shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-12 lg:mb-16">
            <h2 className="text-4xl font-bold shrink-0">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                FEATURED PROJECTS
              </span>
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-4" role="group" aria-label="Project filters (coming soon)">
              {['All', 'Web Apps', 'AI/ML', 'Automation', 'APIs'].map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="Filters coming soon"
                  className={`px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap cursor-not-allowed opacity-60 ${
                  index === 0 
                    ? 'bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400' 
                    : 'text-gray-400'
                }`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'AI Customer Support Bot',
                description: 'Automates customer queries with 24/7 intelligent responses using advanced NLP',
                tech: ['Python', 'LangChain', 'API'],
                image: 'https://readdy.ai/api/search-image?query=modern%20AI%20chatbot%20interface%20with%20dark%20theme%2C%20customer%20support%20dashboard%2C%20futuristic%20design%20with%20neon%20blue%20accents%2C%20clean%20minimal%20background%2C%20professional%20tech%20aesthetic&width=400&height=250&seq=1&orientation=landscape'
              },
              {
                title: 'API-Driven E-Commerce System',
                description: 'Product management with payments and customer portal integration',
                tech: ['Django', 'MySQL', 'REST API'],
                image: 'https://readdy.ai/api/search-image?query=modern%20e-commerce%20dashboard%20interface%20with%20dark%20theme%2C%20product%20management%20system%2C%20clean%20minimal%20background%2C%20professional%20tech%20aesthetic%20with%20purple%20accents&width=400&height=250&seq=2&orientation=landscape'
              },
              {
                title: 'Business Process Automation Tool',
                description: 'Data scraping and workflow automation for invoice processing',
                tech: ['Python', 'Automation APIs', 'RPA'],
                image: 'https://readdy.ai/api/search-image?query=business%20automation%20dashboard%20with%20workflow%20diagrams%2C%20dark%20theme%20interface%2C%20data%20processing%20visualization%2C%20clean%20minimal%20background%2C%20professional%20tech%20aesthetic&width=400&height=250&seq=3&orientation=landscape'
              },
              {
                title: 'Smart Analytics Dashboard',
                description: 'Real-time insights and filters for business KPIs',
                tech: ['React', 'Node.js', 'MongoDB'],
                image: 'https://readdy.ai/api/search-image?query=analytics%20dashboard%20with%20charts%20and%20graphs%2C%20dark%20theme%20interface%2C%20data%20visualization%2C%20clean%20minimal%20background%2C%20professional%20tech%20aesthetic%20with%20cyan%20accents&width=400&height=250&seq=4&orientation=landscape'
              },
              {
                title: 'Knowledge Base RAG System',
                description: 'AI search for internal documents with intelligent retrieval',
                tech: ['LangChain', 'Vector DB', 'OpenAI'],
                image: 'https://readdy.ai/api/search-image?query=knowledge%20base%20search%20interface%20with%20AI%20features%2C%20dark%20theme%2C%20document%20management%20system%2C%20clean%20minimal%20background%2C%20professional%20tech%20aesthetic&width=400&height=250&seq=5&orientation=landscape'
              }
            ].map((project, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-black/50 backdrop-blur-sm text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-6">{project.description}</p>
                  <div className="flex space-x-4">
                    {/* <button className="flex items-center px-4 py-2 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300">
                      <i className="ri-github-line mr-2"></i>
                      GitHub
                    </button>
                    <button className="flex items-center px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 rounded-lg hover:bg-cyan-500/30 transition-all duration-300">
                      <i className="ri-external-link-line mr-2"></i>
                      Live Demo
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section id="consultation" className="section-shell">
        <div className="container-shell">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-cyan-400/30">
                <span className="text-sm font-medium text-cyan-400 tracking-wider">FREE CONSULTATION</span>
              </div>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Book a Free Strategy Call
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Share your project goals and I'll help you identify the right technical approach,
                timeline, and budget — with no obligation.
              </p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-cyan-400 mt-0.5"></i>
                  <span>30-minute discovery call</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-cyan-400 mt-0.5"></i>
                  <span>Clear next steps and scope guidance</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-cyan-400 mt-0.5"></i>
                  <span>Response within 24 hours</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-shell bg-black/20">
        <div className="container-shell">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  LET'S BUILD SOMETHING
                </span>
                <br />
                <span className="text-white">AMAZING TOGETHER</span>
              </h2>
              
              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                I help businesses automate, scale, and grow using smart engineering — APIs, Python automation, clean backend architecture, and AI-powered solutions.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <i className="ri-mail-line text-cyan-400 text-xl"></i>
                  <a href={`mailto:${profile.email}`} className="text-gray-300 hover:text-cyan-300 transition-colors">{profile.email}</a>
                </div>
                <div className="flex items-center space-x-4">
                  <i className="ri-whatsapp-line text-green-400 text-xl"></i>
                  <a href={profile.whatsappUrl} {...externalLinkProps} className="text-gray-300 hover:text-cyan-300 transition-colors">{profile.whatsapp}</a>
                </div>
                <div className="flex items-center space-x-4">
                  <i className="ri-map-pin-line text-cyan-400 text-xl"></i>
                  <span className="text-gray-300">India | Remote Worldwide</span>
                </div>
                <div className="flex items-center space-x-4">
                  <i className="ri-money-dollar-circle-line text-cyan-400 text-xl"></i>
                  <span className="text-gray-300">Starting from $8/hr</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a href={profile.linkedin} {...externalLinkProps} aria-label="LinkedIn" className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
                  <i className="ri-linkedin-line text-cyan-400"></i>
                </a>
                <a href={profile.whatsappUrl} {...externalLinkProps} aria-label="WhatsApp" className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
                  <i className="ri-whatsapp-line text-green-400"></i>
                </a>
                <a href={profile.github} {...externalLinkProps} aria-label="GitHub" className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
                  <i className="ri-github-line text-purple-400"></i>
                </a>
                <a href={`mailto:${profile.email}`} aria-label="Email" className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300">
                  <i className="ri-mail-line text-cyan-400"></i>
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

      {/* Footer */}
      <footer className="section-shell bg-black/40">
        <div className="container-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-12">
            <div className="flex items-center space-x-3">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover border border-white/15"
              />
              <span className="text-xl font-bold">{profile.name}</span>
            </div>
            <p className="text-gray-400">Building the Future with Code & AI</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-white mb-4 uppercase">Services</h4>
              <div className="space-y-2">
                <button type="button" onClick={() => scrollToSection('services')} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">Website Development</button>
                <button type="button" onClick={() => scrollToSection('services')} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">Web Applications</button>
                <button type="button" onClick={() => scrollToSection('services')} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">AI Automation</button>
                <button type="button" onClick={() => scrollToSection('services')} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">API Integrations</button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4 uppercase">Explore</h4>
              <div className="space-y-2">
                <button type="button" onClick={() => scrollToSection('about')} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">About</button>
                <button type="button" onClick={() => scrollToSection('projects')} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">Case Studies</button>
                <button type="button" onClick={() => scrollToSection('tech-stack')} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">Tech Stack</button>
                <button type="button" onClick={() => scrollToSection('consultation')} className="btn-nav block text-left text-gray-400 hover:text-cyan-400 transition-colors">Free Consultation</button>
              </div>
            </div>
            
            <div className="sm:text-right">
              <h4 className="font-semibold text-white mb-4 uppercase sm:text-right">Contact</h4>
              <div className="space-y-2 sm:text-right">
                <button type="button" onClick={() => scrollToSection('contact')} className="btn-nav block sm:ml-auto text-left sm:text-right text-gray-400 hover:text-cyan-400 transition-colors">Contact Form</button>
                <a href={`mailto:${profile.email}`} className="block text-gray-400 hover:text-cyan-400 transition-colors">{profile.email}</a>
                <a href={profile.whatsappUrl} {...externalLinkProps} className="block text-gray-400 hover:text-cyan-400 transition-colors">{profile.whatsapp}</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
              <img
                src={profile.avatarUrl}
                alt=""
                aria-hidden="true"
                className="w-full max-w-xs md:w-64 h-40 rounded-lg object-cover border border-white/10 shrink-0"
              />
              <blockquote className="text-xl md:text-2xl font-serif italic text-white leading-relaxed max-w-md">
                "I help businesses automate, scale, and grow using smart engineering"
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
              Made with 💙 by {profile.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
