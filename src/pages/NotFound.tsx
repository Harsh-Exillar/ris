import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { sanitizeInput } from "@/utils/validation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Sanitize the pathname before logging to prevent log injection
    const sanitizedPath = sanitizeInput(location.pathname);
    console.warn(
      "404 Error: User attempted to access non-existent route:",
      sanitizedPath
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/30">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-gray-600 mb-4">Page Not Found</p>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
