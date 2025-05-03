
import { Link } from "react-router-dom";

export const Logo = () => (
  <div className="flex items-center">
    <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
      <img 
        src="/lovable-uploads/c316deb4-52ce-41a0-af55-839aaf159db3.png" 
        alt="BlackTech Builders Logo" 
        className="h-10 w-auto"
      />
    </Link>
  </div>
);
