
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const NavActions = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the search functionality
    console.log("Search submitted");
    // Optionally close the search bar after submission
    // setSearchOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Search Bar */}
      <div className="flex items-center relative">
        <form 
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 flex items-center",
            "transition-all duration-300 ease-in-out",
            searchOpen
              ? "opacity-100 w-[240px] md:w-[320px]"
              : "opacity-0 w-0 pointer-events-none"
          )}
          onSubmit={handleSearchSubmit}
        >
          <Input
            type="search"
            placeholder="Search..."
            className={cn(
              "pl-3 pr-10 py-1 h-9 rounded-full border-afro-purple bg-gray-50",
              "focus-visible:ring-afro-purple/40"
            )}
            autoFocus={searchOpen}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={toggleSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close search</span>
          </Button>
        </form>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "text-gray-600 hover:text-gray-900 transition-all",
            searchOpen && "opacity-0"
          )}
          aria-label="Search"
          onClick={toggleSearch}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="hidden md:flex items-center gap-2">
        <Link to="/login">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Sign In
          </Button>
        </Link>
        <Link to="/register">
          <Button className="bg-afro-purple hover:bg-afro-purple/90">
            Join Now
          </Button>
        </Link>
      </div>
    </div>
  );
};
