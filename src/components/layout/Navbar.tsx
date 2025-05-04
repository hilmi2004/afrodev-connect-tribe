
import { Logo } from "./nav/Logo";
import { MainNav } from "./nav/MainNav";
import { NavActions } from "./nav/NavActions";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0 mr-4">
            <Logo />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <MainNav />
          </div>
          
          <div className="flex items-center">
            <NavActions />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">
                {mobileMenuOpen ? "Close main menu" : "Open main menu"}
              </span>
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 bg-white border-t border-gray-100">
            <MainNav />
            <div className="mt-4 flex justify-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-afro-purple hover:bg-afro-purple/90">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
