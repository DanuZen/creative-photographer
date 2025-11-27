import { Layout } from "@/components/layout/Layout";
import { useProfile } from "@/context/PortfolioContext";
import { FilmstripGallery } from "@/components/gallery/FilmstripGallery";
import { GallerySkeleton } from "@/components/gallery/GallerySkeleton";
import { SEO } from "@/components/seo/SEO";
import { useEffect } from "react";

export default function Home() {
  const { projects, user, loading, error } = useProfile();

  const featuredProject = projects.find((p) => p.featured) || projects[0];

  const seoTitle = featuredProject
    ? `${featuredProject.title} - ${user?.name || "Developer Portfolio"}`
    : user?.name || "Developer Portfolio";

  const seoDescription =
    featuredProject?.description ||
    user?.tagline ||
    "Professional developer portfolio featuring web development, design, and engineering projects.";

  // Set page title and preload critical resources
  useEffect(() => {
    document.title = seoTitle;

    // Preconnect to image CDN for faster loading
    const preconnectLink = document.createElement("link");
    preconnectLink.rel = "preconnect";
    preconnectLink.href = "https://images.unsplash.com";
    document.head.appendChild(preconnectLink);

    return () => {
      if (document.head.contains(preconnectLink)) {
        document.head.removeChild(preconnectLink);
      }
    };
  }, [seoTitle]);

  if (loading) {
    return (
      <Layout>
        <SEO title="Loading..." description="Loading portfolio" />
        <div className="h-full flex items-center justify-center">
          <GallerySkeleton />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <SEO title="Error" description="Error loading portfolio" />
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md px-4">
            <p className="text-destructive font-semibold">Error loading portfolio</p>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-foreground text-background rounded hover:opacity-80 transition-opacity"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!featuredProject) {
    return (
      <Layout>
        <SEO title="No Projects" description="No portfolio projects available" />
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No portfolio projects available</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title={seoTitle} description={seoDescription} image={featuredProject.images[0]?.src} type="website" />
      <div className="h-full flex items-center justify-center">
        <FilmstripGallery images={featuredProject.images} />
      </div>
    </Layout>
  );
}
