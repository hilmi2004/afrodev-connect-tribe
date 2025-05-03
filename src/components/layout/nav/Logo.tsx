
import { Link } from "react-router-dom";

export const Logo = () => (
  <div className="flex items-center gap-2">
    <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
      <img 
        src="/lovable-uploads/c316deb4-52ce-41a0-af55-839aaf159db3.png" 
        alt="BlackTech Builders Logo" 
        className="h-10 w-10"
      />
      <span className="font-[900] text-xl tracking-tight ml-2 hidden md:inline">BlackTech Builders</span>
    </Link>
  </div>
);
