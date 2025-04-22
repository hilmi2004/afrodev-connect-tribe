
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

export const NavLink = ({ to, active, children }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "px-3 py-1.5 font-semibold text-base rounded transition-colors",
      active ? "bg-afro-purple text-white shadow" : "text-gray-900 hover:text-afro-purple hover:bg-afro-purple/10"
    )}
  >
    {children}
  </Link>
);
