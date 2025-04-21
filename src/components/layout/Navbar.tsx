
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, Users, Globe, Rocket } from "lucide-react";

export function Navbar() {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-white border-b border-gray-200">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-2xl font-bold text-afro-purple flex items-center">
          <Rocket className="h-6 w-6 mr-2" />
          <span>BlackTech Builders</span>
        </Link>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <Link to="/projects" className="text-gray-700 hover:text-afro-purple transition-colors">
          Projects
        </Link>
        <Link to="/tribes" className="text-gray-700 hover:text-afro-purple transition-colors">
          Tribes
        </Link>
        <Link to="/discover" className="text-gray-700 hover:text-afro-purple transition-colors">
          Discover
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-afro-purple transition-colors">
          About
        </Link>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
        <Link to="/login">
          <Button variant="outline" className="hidden md:inline-flex">
            Sign In
          </Button>
        </Link>
        <Link to="/register">
          <Button className="bg-afro-purple hover:bg-afro-purple/90">
            Join Now
          </Button>
        </Link>
      </div>
    </header>
  );
}
