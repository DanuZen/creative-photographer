import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/types/photographer';
import { Project } from '@/types/gallery';
import { supabase } from '@/lib/supabase';

interface PortfolioState {
  user: UserProfile | null;
  projects: Project[];
  loading: boolean;
  error: string | null;
}

interface PortfolioContextType extends PortfolioState {
  getProjectBySlug: (slug: string) => Project | undefined;
  // Backward compatibility aliases
  photographer: UserProfile | null;
  series: Project[];
  getSeriesBySlug: (slug: string) => Project | undefined;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortfolioState>({
    user: null,
    projects: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check if Supabase credentials are configured
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
           console.warn('Supabase credentials missing. Falling back to local data.');
           throw new Error('Supabase credentials missing');
        }

        // Load user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .single();

        if (profileError) throw profileError;

        // Transform profile data
        const user: UserProfile = {
          name: profileData.name,
          tagline: profileData.tagline,
          contact: {
            email: profileData.email,
            phone: profileData.phone,
            github: profileData.github,
            linkedin: profileData.linkedin,
          },
          portraitImage: {
            src: profileData.portrait_image_src,
            alt: profileData.portrait_image_alt,
          },
          biography: {
            philosophy: profileData.biography_philosophy,
            background: profileData.biography_background,
            experience: profileData.biography_experience,
            currentFocus: profileData.biography_current_focus,
          },
          skills: [], // Todo: Fetch from a separate table if needed
        };

        // Load all projects
        const { data: projectData, error: projectError } = await supabase
          .from('series') // Using 'series' table for now, will rename to 'projects' later
          .select(`
            *,
            images (*)
          `)
          .order('created_at', { ascending: false });

        if (projectError) throw projectError;

        // Transform project data
        const transformedProjects: Project[] = projectData.map((p: any) => ({
          id: p.slug,
          slug: p.slug,
          title: p.title,
          description: p.description,
          featured: p.featured,
          techStack: p.tech_stack || [],
          images: p.images.map((img: any) => ({
            id: img.id,
            src: img.src,
            alt: img.alt,
            aspectRatio: 1, // Default, should be in DB
            caption: {
              title: img.title,
              description: img.description || '',
            },
            projectUrl: img.project_url,
            repoUrl: img.repo_url,
            metadata: {
              title: img.title,
              year: img.year,
              description: img.description,
              techStack: img.tech_stack,
              role: img.role,
              series: p.slug,
            }
          }))
        }));

        setState({
          user,
          projects: transformedProjects,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error loading from Supabase:', error);
        
        // Fallback to local JSON
        try {
          console.log('Attempting to load local data...');
          const photographerResponse = await fetch('/data/photographer.json');
          const photographerData = await photographerResponse.json();

          // Map legacy data to new structure
          const user: UserProfile = {
            ...photographerData,
            skills: photographerData.clients || [], // Map clients to skills temporarily
          };

          const seriesSlugs = ['portraits', 'documentary', 'editorial'];
          const seriesPromises = seriesSlugs.map(async (slug) => {
            const response = await fetch(`/data/series/${slug}.json`);
            return response.json();
          });

          const seriesData = await Promise.all(seriesPromises);
          
          // Map legacy series to projects
          const projects: Project[] = seriesData.map((s: any) => ({
            ...s,
            images: s.images.map((img: any) => ({
              ...img,
              caption: { title: img.metadata.title, description: '' }, // Adapt structure
            }))
          }));

          setState({
            user,
            projects,
            loading: false,
            error: null,
          });
        } catch (localError) {
           setState({
            user: null,
            projects: [],
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load portfolio data',
          });
        }
      }
    };

    loadData();
  }, []);

  const getProjectBySlug = (slug: string) => {
    return state.projects.find((p) => p.slug === slug);
  };

  return (
    <PortfolioContext.Provider value={{ 
      ...state, 
      getProjectBySlug,
      // Backward compatibility aliases
      photographer: state.user,
      series: state.projects,
      getSeriesBySlug: getProjectBySlug
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a PortfolioProvider');
  }
  return context;
}

// Alias for backward compatibility
export const usePortfolio = useProfile;
