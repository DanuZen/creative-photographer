import { UserProfile } from '@/types/photographer';
import { Mail, Phone, Lightbulb, User, Briefcase, Target, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
interface AboutPageLayoutProps {
  photographer: UserProfile;
}
export function AboutPageLayout({ photographer }: AboutPageLayoutProps) {
  const [activeSection, setActiveSection] = useState('philosophy');
  const sections = [
    {
      id: 'philosophy',
      label: 'Philosophy',
      icon: Lightbulb,
    },
    {
      id: 'background',
      label: 'Background',
      icon: User,
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: Briefcase,
    },
    {
      id: 'current-focus',
      label: 'Current Focus',
      icon: Target,
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: MessageCircle,
    },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_auto_1fr] gap-8 lg:gap-16 items-start">
        
        {/* Left Column - Professional Portrait */}
        <div className="w-full max-w-[400px] mx-auto lg:mx-0">
          <img 
            src={photographer.portraitImage.src} 
            alt={photographer.portraitImage.alt} 
            className="w-full aspect-[3/4] object-cover rounded-3xl shadow-sm" 
            loading="eager" 
          />
        </div>

        {/* Middle Column - Icon Navigation */}
        <div className="hidden lg:flex flex-col gap-6 py-4">
          <nav className="flex flex-col gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`group relative p-3 rounded-full transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'bg-foreground text-background shadow-md scale-110' 
                    : 'bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
                aria-label={section.label}
              >
                <section.icon className="w-5 h-5" />
                <span className="absolute left-full ml-4 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {section.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Column - Biography & Content */}
        <div className="relative min-h-[400px] bg-white dark:bg-black border border-transparent dark:border-white/[0.2] rounded-3xl p-8 shadow-input dark:shadow-none">
          {/* Mobile Navigation (Visible only on small screens) */}
          <div className="lg:hidden flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>

          {/* Philosophy Section */}
          {activeSection === 'philosophy' && (
            <section className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold mb-4">Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed max-w-prose">
                {photographer.biography.philosophy || "Photography is more than just capturing a moment; it's about telling a story that resonates with the viewer. My approach is grounded in the belief that every subject has a unique narrative waiting to be unfolded."}
              </p>
            </section>
          )}

          {/* Background Section */}
          {activeSection === 'background' && (
            <section className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold mb-4">Background</h2>
              <p className="text-muted-foreground leading-relaxed max-w-prose">
                {photographer.biography.background}
              </p>
            </section>
          )}

          {/* Experience Section */}
          {activeSection === 'experience' && (
            <section className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold mb-4">Experience</h2>
              <p className="text-muted-foreground leading-relaxed max-w-prose">
                {photographer.biography.experience}
              </p>
            </section>
          )}

          {/* Current Focus Section */}
          {activeSection === 'current-focus' && (
            <section className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold mb-4">Current Focus</h2>
              <p className="text-muted-foreground leading-relaxed max-w-prose">
                {photographer.biography.currentFocus}
              </p>
            </section>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <section className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground mb-6">
                  Available for editorial assignments, commercial projects, and personal commissions.
                </p>
                <div className="flex flex-col gap-3">
                  <a 
                    href={`mailto:${photographer.contact.email}`} 
                    className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors w-fit"
                  >
                    <div className="p-2 bg-secondary rounded-full">
                      <Mail className="w-4 h-4" />
                    </div>
                    {photographer.contact.email}
                  </a>
                  <a 
                    href={`tel:${photographer.contact.phone}`} 
                    className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors w-fit"
                  >
                    <div className="p-2 bg-secondary rounded-full">
                      <Phone className="w-4 h-4" />
                    </div>
                    {photographer.contact.phone}
                  </a>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
