import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
...
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
