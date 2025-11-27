import { PhotographerProfile } from '@/types/photographer';
import { Mail, Phone, Lightbulb, User, Briefcase, Target, MessageCircle } from 'lucide-react';
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
    id: 'contact',
    label: 'Contact',
    icon: MessageCircle
  }];
  return <div className="w-full max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-8 items-center">
        {/* Icon Navigation - Static Left Column */}
        <div className="hidden lg:block">
          <nav className="flex flex-col gap-3">
            {sections.map(section => <button key={section.id} onClick={() => setActiveSection(section.id)} className={`group relative p-2 rounded-lg transition-all ${activeSection === section.id ? 'bg-accent text-white' : 'bg-secondary text-muted-foreground hover:bg-accent/20 hover:text-accent'}`} aria-label={section.label}>
                <section.icon className="w-5 h-5" />
                <span className="absolute left-full ml-3 px-3 py-1 bg-foreground text-background text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {section.label}
                </span>
              </button>)}
          </nav>
        </div>

        {/* Middle Column - Biography & Content */}
        <div className="relative flex flex-col max-w-[600px] min-h-[320px]">
          {/* Philosophy Section */}
          {activeSection === 'philosophy' && <section className="animate-in fade-in duration-300 absolute inset-0">
              <h2 className="text-base lg:text-lg leading-tight font-serif font-bold text-foreground mb-2">
                Philosophy
              </h2>
              <p className="text-xs lg:text-sm leading-relaxed text-gray-700">
                {photographer.biography.philosophy}
              </p>
            </section>}

          {/* Background Section */}
          {activeSection === 'background' && <section className="animate-in fade-in duration-300 absolute inset-0">
              <h2 className="text-base lg:text-lg leading-tight font-serif font-bold text-foreground mb-2">
                Background
              </h2>
              <p className="text-xs lg:text-sm leading-relaxed text-gray-700">
                {photographer.biography.background}
              </p>
            </section>}

          {/* Experience Section */}
          {activeSection === 'experience' && <section className="animate-in fade-in duration-300 absolute inset-0">
              <h2 className="text-base lg:text-lg leading-tight font-serif font-bold text-foreground mb-2">
                Experience
              </h2>
              <p className="text-xs lg:text-sm leading-relaxed text-gray-700">
                {photographer.biography.experience}
              </p>
            </section>}

          {/* Current Focus Section */}
          {activeSection === 'current-focus' && <section className="animate-in fade-in duration-300 absolute inset-0">
              <h2 className="text-base lg:text-lg leading-tight font-serif font-bold text-foreground mb-2">
                Current Focus
              </h2>
              <p className="text-xs lg:text-sm leading-relaxed text-gray-700">
                {photographer.biography.currentFocus}
              </p>
            </section>}

          {/* Contact Information Section */}
          {activeSection === 'contact' && <section className="animate-in fade-in duration-300 absolute inset-0">
              <h2 className="text-base lg:text-lg leading-tight font-serif font-bold text-foreground mb-2">
                Get in Touch
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <a href={`mailto:${photographer.contact.email}`} className="text-xs lg:text-sm leading-snug text-gray-700 hover:text-foreground transition-colors">
                    {photographer.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <a href={`tel:${photographer.contact.phone}`} className="text-xs lg:text-sm leading-snug text-gray-700 hover:text-foreground transition-colors">
                    {photographer.contact.phone}
                  </a>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-gray-500">
                Available for editorial assignments, commercial projects, and personal commissions.
              </p>
            </section>}
        </div>

        {/* Right Column - Professional Portrait */}
        <div className="lg:self-center">
          <img src={photographer.portraitImage.src} alt={photographer.portraitImage.alt} className="w-full aspect-square object-cover rounded-sm shadow-sm max-w-[280px] lg:max-w-[260px] mx-auto" loading="eager" />
        </div>
      </div>
    </div>;
}