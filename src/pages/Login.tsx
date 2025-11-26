import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";
import { HeaderNavigation } from "@/components/layout/HeaderNavigation";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple login without form - just set a flag in sessionStorage
    sessionStorage.setItem("isAdmin", "true");
    navigate("/admin");
  };

  return (
    <>
      <SEO 
        title="Admin Login"
        description="Login to admin dashboard"
      />
      <div className="min-h-screen bg-background">
        <div className="px-4 sm:px-8 lg:px-12 py-8">
          <HeaderNavigation />
        </div>
        <div className="flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Admin Login
              </h1>
              <p className="text-muted-foreground mb-8">
                Masuk ke dashboard admin untuk mengelola portfolio
              </p>
              
              <Button 
                onClick={handleLogin}
                className="w-full"
                size="lg"
              >
                Masuk sebagai Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
