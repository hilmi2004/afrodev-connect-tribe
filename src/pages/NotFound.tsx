
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-12 bg-gradient-to-b from-transparent to-gray-50/50">
        <div className="relative w-full max-w-md mx-auto text-center">
          {/* Animated elements */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-afro-purple/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-afro-gold/10 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <h1 className="text-8xl font-black bg-gradient-to-r from-afro-purple via-afro-red to-afro-gold bg-clip-text text-transparent pb-2">
              404
            </h1>
            
            <div className="flex justify-center -mt-3 mb-6">
              {[...Array(3)].map((_, i) => (
                <span 
                  key={i} 
                  className="inline-block h-1.5 w-6 rounded mx-0.5 bg-gradient-to-r from-afro-purple to-afro-gold"
                ></span>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
            
            <p className="text-gray-600 mb-8">
              The page you are looking for might have been removed or is temporarily unavailable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="w-full sm:w-auto bg-afro-purple hover:bg-afro-purple/90 transition-all gap-2">
                  <ArrowLeft size={18} />
                  Back to Home
                </Button>
              </Link>
              
              <Link to="/discover">
                <Button variant="outline" className="w-full sm:w-auto border-afro-purple text-afro-purple hover:bg-afro-purple/10 transition-all gap-2">
                  <Search size={18} />
                  Discover Content
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Code-like decorative elements */}
          <div className="hidden md:block absolute -right-16 top-12 rotate-12 text-sm text-afro-purple/40 font-mono">
            <div>{'<html>'}</div>
            <div className="pl-4">{'<body>'}</div>
            <div className="pl-8">{'<h1>404</h1>'}</div>
            <div className="pl-4">{'</body>'}</div>
            <div>{'</html>'}</div>
          </div>
          
          <div className="hidden md:block absolute -left-24 bottom-8 -rotate-12 text-sm text-afro-gold/40 font-mono">
            <div>{'function findPage() {'}</div>
            <div className="pl-4">{'return 404;'}</div>
            <div>{'}'}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
