import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Heart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <div className="flex justify-center mb-6">
          <Heart className="w-12 h-12 text-primary fill-primary/20" />
        </div>
        <h1 className="mb-4 font-heading text-6xl font-bold text-foreground">404</h1>
        <p className="mb-2 font-body text-xl text-muted-foreground">Oops! Page not found</p>
        <p className="mb-8 font-body text-muted-foreground">
          Let's get you back to the celebration
        </p>
        <a 
          href="/" 
          className="inline-block font-heading text-sm tracking-widest uppercase px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
