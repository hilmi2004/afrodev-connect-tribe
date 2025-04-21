
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavDropdown } from "./NavDropdown";
import {
  Search,
  Users,
  Globe,
  LayoutGrid,
  BookOpen,
  User,
  Home,
  Calendar,
  UsersRound,
  Layers,
} from "lucide-react";

const countryList = [
  "Nigeria",
  "Kenya",
  "South Africa",
  "Egypt",
  "Ghana",
  "Morocco",
  "Uganda",
  "Senegal",
  // ...add more countries as needed
];

const stackList = [
  { label: "Frontend", icon: <LayoutGrid size={18} /> },
  { label: "Backend", icon: <Layers size={18} /> },
  { label: "Mobile", icon: <Users size={18} /> },
  { label: "Fullstack", icon: <UsersRound size={18} /> },
  { label: "Data Science", icon: <BookOpen size={18} /> },
];

const featuredProjects: { label: string; href: string }[] = [
  { label: "Project Spotlight: UmojaPay", href: "/projects/umojapay" },
  { label: "Award Winner: SheCodes Africa", href: "/projects/shecodes" },
  { label: "Editor's Pick: Kijiji Connect", href: "/projects/kijiji-connect" },
];

const navImages = {
  projects: "/photo-1488590528505-98d2b5aba04b.jpg",
  countries: "/photo-1500673922987-e212871fec22.jpg",
  stack: "/photo-1518770660439-4636190af475.jpg",
  featured: "/photo-1488590528505-98d2b5aba04b.jpg",
  tribes: "/photo-1581091226825-a6a2a5aee158.jpg",
  resources: "/photo-1461749280684-dccba630e2f6.jpg",
  community: "/photo-1500673922987-e212871fec22.jpg",
  events: "/photo-1466442929976-97f336a657be.jpg",
  profile: "/photo-1581091226825-a6a2a5aee158.jpg",
};

export function Navbar() {
  const location = useLocation();

  return (
    <header className="w-full py-3 px-2 md:px-6 flex items-center justify-between bg-white shadow-sm border-b border-gray-200 relative z-20">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/" className="text-2xl font-bold text-afro-purple flex items-center hover-scale">
          <Home className="h-6 w-6 mr-2" />
          <span className="font-[900] tracking-tight">BlackTech Builders</span>
        </Link>
      </div>
      {/* NAVIGATION */}
      <nav className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4">
        {/* Home Link */}
        <Link
          to="/"
          className={`px-3 py-1.5 font-semibold text-base rounded transition-colors
          ${location.pathname === "/" ? "bg-afro-purple text-white shadow" : "text-gray-900 hover:text-afro-purple hover:bg-afro-purple/10"}
          `}
        >
          Home
        </Link>
        {/* Explore Projects Dropdown */}
        <NavDropdown
          trigger={
            <span className="flex items-center">
              <LayoutGrid className="mr-2" size={20} /> Explore Projects
            </span>
          }
          image={navImages.projects}
          imageAlt="Explore African tech projects"
          items={[
            // By Country
            {
              label: "By Country",
              icon: <Globe size={17} />,
              href: "#",
              onClick: (e?: any) => {},
            },
            // By Tech Stack
            {
              label: "By Tech Stack",
              icon: <Layers size={17} />,
              href: "#",
              onClick: (e?: any) => {},
            },
            // Featured Projects (dropdown only, highlight)
            ...featuredProjects.map((p) => ({
              label: p.label,
              href: p.href,
              icon: <LayoutGrid size={17} />,
            })),
          ]}
          visualLabel="Explore Projects"
        />
        {/* Tribes Dropdown */}
        <NavDropdown
          trigger={
            <span className="flex items-center">
              <UsersRound className="mr-2" size={20} /> Tribes
            </span>
          }
          image={navImages.tribes}
          imageAlt="Tribes collaboration"
          items={[
            {
              label: "Find Tribes",
              icon: <Search size={17} />,
              href: "/tribes",
            },
            {
              label: "Create a Tribe",
              isCTA: true,
              href: "/tribes/create",
            },
          ]}
          visualLabel="Tribes"
        />
        {/* Resources Dropdown */}
        <NavDropdown
          trigger={
            <span className="flex items-center">
              <BookOpen className="mr-2" size={20} /> Resources
            </span>
          }
          image={navImages.resources}
          imageAlt="Resources and learning"
          items={[
            { label: "Tech News", href: "#", icon: <BookOpen size={17} /> },
            { label: "Dev Tools & Tutorials", href: "#", icon: <BookOpen size={17} /> },
            { label: "Career Advice", href: "#", icon: <BookOpen size={17} /> },
          ]}
          visualLabel="Resources"
        />

        {/* Community Dropdown */}
        <NavDropdown
          trigger={
            <span className="flex items-center">
              <Users className="mr-2" size={20} /> Community
            </span>
          }
          image={navImages.community}
          imageAlt="Local connect and forums"
          items={[
            { label: "Local Connect", href: "#", icon: <Globe size={17} /> },
            { label: "Forums", href: "#", icon: <Users size={17} /> },
          ]}
          visualLabel="Community"
        />

        {/* Events Dropdown */}
        <NavDropdown
          trigger={
            <span className="flex items-center">
              <Calendar className="mr-2" size={20} /> Events
            </span>
          }
          image={navImages.events}
          imageAlt="Events and hackathons"
          items={[
            { label: "Upcoming Hackathons", href: "#", icon: <Calendar size={17} /> },
            { label: "Dev Meetups", href: "#", icon: <Calendar size={17} /> },
            { label: "Webinars", href: "#", icon: <Calendar size={17} /> },
          ]}
          visualLabel="Events"
        />

        {/* My Profile Dropdown */}
        <NavDropdown
          trigger={
            <span className="flex items-center">
              <User className="mr-2" size={20} /> My Profile
            </span>
          }
          image={navImages.profile}
          imageAlt="User profile"
          items={[
            { label: "View Profile", href: "/profile", icon: <User size={17} /> },
            { label: "Edit Profile", href: "/profile/edit", icon: <User size={17} /> },
            { label: "Dev Journey", href: "/profile/journey", icon: <BookOpen size={17} /> },
          ]}
          visualLabel="My Profile"
        />
      </nav>
      {/* Actions */}
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
    </header>
  );
}

