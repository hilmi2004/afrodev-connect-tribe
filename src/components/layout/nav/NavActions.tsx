
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NavActions = () => (
  <div className="flex items-center gap-1">
    <Button variant="ghost" size="icon" className="hover:bg-afro-purple/10">
      <Search className="h-5 w-5" />
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
);
