export interface ProjectImage {
  id: string;
  src: string;
  srcSet?: string;
  alt: string;
  aspectRatio: number;
  caption: {
    title: string;
    description: string;
  };
  metadata: {
    title: string;
    year: string;
    description?: string;
    techStack?: string[]; // Replaces camera/location
    role?: string;
    series: string; // Keep for compatibility or rename to category
  };
  projectUrl?: string;
  repoUrl?: string; // New field for GitHub repo
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: ProjectImage[];
  featured: boolean;
  techStack?: string[];
}

export interface FilmstripGalleryProps {
  images: ProjectImage[];
  className?: string;
  autoAdvance?: boolean;
  autoAdvanceInterval?: number;
}

export interface GalleryControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  currentIndex: number;
  totalImages: number;
  className?: string;
}
