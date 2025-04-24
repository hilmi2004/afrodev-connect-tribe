
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export const Logo = () => (
  <div className="flex items-center gap-2">
    <Link to="/" className="text-2xl font-bold text-afro-purple flex items-center hover-scale">
      <Home className="h-6 w-6 mr-2" />
      <span className="font-[900] tracking-tight">BlackTech Builders</span>
    </Link>
  </div>
);
