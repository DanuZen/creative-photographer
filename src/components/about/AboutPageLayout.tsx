import { PhotographerProfile } from '@/types/photographer';
import { Mail, Phone, Lightbulb, User, Briefcase, Target, Users, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
interface AboutPageLayoutProps {
  photographer: PhotographerProfile;
}
export function AboutPageLayout({
  photographer
}: AboutPageLayoutProps) {
  const [activeSection, setActiveSection] = useState('philosophy');
  const sections = [{
    id: 'philosophy',
    label: 'Philosophy',
    icon: Lightbulb
  }, {
    id: 'background',
    label: 'Background',
    icon: User
  }, {
    id: 'experience',
    label: 'Experience',
    icon: Briefcase
  }, {
    id: 'current-focus',
    label: 'Current Focus',
    icon: Target
  }, {
    id: 'clients',
    label: 'Clients',
    icon: Users
  }, {
    id: 'contact',
    label: 'Contact',
    icon: MessageCircle
  }];
  return <div className="py-8 sm:py-12 min-h-screen">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Three-Column Grid: Icon Nav, Content, Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 lg:gap-12">
          {/* Icon Navigation - Static Left Column */}
          <div className="hidden lg:block">
            <nav className="flex flex-col gap-6">
              {sections.map(section => <button key={section.id} onClick={() => setActiveSection(section.id)} className={`group relative p-2 rounded-lg transition-all ${activeSection === section.id ? 'bg-accent text-white' : 'bg-secondary text-muted-foreground hover:bg-accent/20 hover:text-accent'}`} aria-label={section.label}>
                  <section.icon className="w-5 h-5" />
                  <span className="absolute left-full ml-3 px-3 py-1 bg-foreground text-background text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {section.label}
                  </span>
                </button>)}
            </nav>
          </div>

          {/* Middle Column - Biography & Content */}
          <div className="flex flex-col max-w-[700px] min-h-[600px]">
            {/* Philosophy Section */}
            {activeSection === 'philosophy' && <section className="animate-in fade-in duration-300">
                <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                  Philosophy
                </h2>
                <p className="text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed text-gray-700">
                  {photographer.biography.philosophy}
                </p>
              </section>}

            {/* Background Section */}
            {activeSection === 'background' && <section className="animate-in fade-in duration-300">
                <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                  Background
                </h2>
                <p className="text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed text-gray-700">
                  {photographer.biography.background}
                </p>
              </section>}

            {/* Experience Section */}
            {activeSection === 'experience' && <section className="animate-in fade-in duration-300">
                <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                  Experience
                </h2>
                <p className="text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed text-gray-700">
                  {photographer.biography.experience}
                </p>
              </section>}

            {/* Current Focus Section */}
            {activeSection === 'current-focus' && <section className="animate-in fade-in duration-300">
                <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                  Current Focus
                </h2>
                <p className="text-sm sm:text-base lg:text-[1.0625rem] leading-relaxed text-gray-700">
                  {photographer.biography.currentFocus}
                </p>
              </section>}

            {/* Client List Section */}
            {activeSection === 'clients' && <section className="animate-in fade-in duration-300">
                <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-6 sm:mb-8">
                  Select Clients
                </h2>
                <div className="space-y-6 sm:space-y-8">
                  {photographer.clients.map((clientCategory, index) => <div key={index}>
                      <h3 className="text-base sm:text-lg lg:text-[1.375rem] leading-tight font-semibold text-foreground mb-3 sm:mb-4">
                        {clientCategory.category}
                      </h3>
                      <ul className="space-y-2">
                        {clientCategory.clients.map((client, clientIndex) => {})}
                      </ul>
                    </div>)}
                </div>
              </section>}

            {/* Contact Information Section */}
            {activeSection === 'contact' && <section className="animate-in fade-in duration-300">
                <h2 className="text-lg sm:text-xl lg:text-[1.75rem] leading-tight font-serif font-bold text-foreground mb-4 sm:mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                    <a href={`mailto:${photographer.contact.email}`} className="text-sm sm:text-base lg:text-[1.0625rem] leading-snug text-gray-700 hover:text-foreground transition-colors">
                      {photographer.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                    <a href={`tel:${photographer.contact.phone}`} className="text-sm sm:text-base lg:text-[1.0625rem] leading-snug text-gray-700 hover:text-foreground transition-colors">
                      {photographer.contact.phone}
                    </a>
                  </div>
                </div>
                <p className="mt-4 sm:mt-6 text-xs sm:text-sm lg:text-[0.9375rem] leading-relaxed text-gray-500">
                  Available for editorial assignments, commercial projects, and personal commissions.
                </p>
              </section>}
          </div>

          {/* Right Column - Professional Portrait */}
          <div className="lg:self-start">
            <img src={photographer.portraitImage.src} alt={photographer.portraitImage.alt} className="w-full aspect-square object-cover rounded-sm shadow-sm max-w-[400px] mx-auto" loading="eager" />
          </div>
        </div>
      </div>
    </div>;
}