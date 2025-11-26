import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";
import { LogOut, Image, User, FolderOpen, FileText } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const adminStatus = sessionStorage.getItem("isAdmin");
    if (adminStatus !== "true") {
      navigate("/login");
    } else {
      setIsAdmin(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    navigate("/");
  };

  if (!isAdmin) return null;

  const managementSections = [
    {
      title: "Project Data",
      description: "Kelola judul, deskripsi, dan URL project",
      icon: FileText,
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Project Images",
      description: "Upload dan kelola gambar project",
      icon: Image,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Series/Kategori",
      description: "Atur series dan kategori portfolio",
      icon: FolderOpen,
      color: "bg-secondary-foreground/10 text-secondary-foreground",
    },
    {
      title: "Info Photographer",
      description: "Update informasi dan kontak photographer",
      icon: User,
      color: "bg-muted-foreground/10 text-muted-foreground",
    },
  ];

  return (
    <>
      <SEO 
        title="Admin Dashboard"
        description="Manage portfolio content"
      />
      <Layout>
        <div className="min-h-screen px-4 sm:px-8 lg:px-12 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Kelola semua konten portfolio Anda
              </p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Management Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {managementSections.map((section) => (
              <div
                key={section.title}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center mb-4`}>
                  <section.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {section.title}
                </h2>
                <p className="text-muted-foreground">
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          {/* Info Notice */}
          <div className="mt-8 bg-secondary border border-border rounded-lg p-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Catatan:</strong> Fitur manajemen konten sedang dalam pengembangan. 
              Untuk saat ini, Anda dapat mengedit data langsung di file JSON yang tersimpan di folder <code className="bg-background px-2 py-1 rounded">public/data/</code>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminDashboard;
