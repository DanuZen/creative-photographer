export interface BiographyContent {
  philosophy: string; // Can be "Approach" or "Methodology"
  background: string;
  experience: string;
  currentFocus: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  github?: string;
  linkedin?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface UserProfile {
  name: string;
  tagline: string;
  biography: BiographyContent;
  contact: ContactInfo;
  skills: SkillCategory[];
  portraitImage: {
    src: string;
    alt: string;
  };
}
