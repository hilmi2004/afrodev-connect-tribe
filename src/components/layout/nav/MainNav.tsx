
import { useLocation } from "react-router-dom";
import { NavLink } from "./NavLink";
import { NavDropdown } from "../NavDropdown";
import {
  Search,
  Users,
  Globe,
  LayoutGrid,
  BookOpen,
  User,
  Calendar,
  UsersRound,
  Layers,
} from "lucide-react";

const navImages = {
  projects: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=facearea&w=400&q=80",
  tribes: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=400&q=80",
  resources: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=400&q=80",
  community: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=facearea&w=400&q=80",
  events: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=facearea&w=400&q=80",
  profile: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=400&q=80",
};

const featuredProjects = [
  { label: "Project Spotlight: UmojaPay", href: "/projectspot" },
  { label: "Award Winner: SheCodes Africa", href: "/projectspot" },
  { label: "Editor's Pick: Kijiji Connect", href: "/projectspot" },
];

export const MainNav = () => {
  const location = useLocation();

  return (
    <nav className="flex items-center gap-3 lg:gap-5">
      <NavLink to="/" active={location.pathname === "/"}>
        Home
      </NavLink>
      
      <NavLink to="/roadmap" active={location.pathname.includes("/roadmap")}>
        Roadmaps
      </NavLink>

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium text-gray-700 hover:text-gray-900">
            <LayoutGrid className="mr-1" size={18} />
            Projects
          </span>
        }
        image={navImages.projects}
        imageAlt="Explore African tech projects"
        items={[
          { label: "By Country", icon: <Globe size={16} />, href: "#" },
          { label: "By Tech Stack", icon: <Layers size={16} />, href: "#" },
          ...featuredProjects.map((p) => ({
            label: p.label,
            href: p.href,
            icon: <LayoutGrid size={16} />,
          })),
        ]}
        visualLabel="Explore Projects"
      />

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium text-gray-700 hover:text-gray-900">
            <UsersRound className="mr-1" size={18} />
            Tribes
          </span>
        }
        image={navImages.tribes}
        imageAlt="Tribes collaboration"
        items={[
          { label: "Find Tribes", icon: <Search size={16} />, href: "/tribes" },
          { label: "Create a Tribe", isCTA: true, href: "/tribes/create" },
        ]}
        visualLabel="Tribes"
      />

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium text-gray-700 hover:text-gray-900">
            <BookOpen className="mr-1" size={18} />
            Resources
          </span>
        }
        image={navImages.resources}
        imageAlt="Resources and learning"
        items={[
          { label: "Tech News", href: "/technews", icon: <BookOpen size={16} /> },
          { label: "Dev Tools & Tutorials", href: "/dev-tools", icon: <BookOpen size={16} /> },
          { label: "Career Advice", href: "/careeradvice", icon: <BookOpen size={16} /> },
        ]}
        visualLabel="Resources"
      />

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium text-gray-700 hover:text-gray-900">
            <Users className="mr-1" size={18} />
            Community
          </span>
        }
        image={navImages.community}
        imageAlt="Local connect and forums"
        items={[
          { label: "Local Connect", href: "/localconnect", icon: <Globe size={16} /> },
          { label: "Forums", href: "/forum", icon: <Users size={16} /> },
        ]}
        visualLabel="Community"
      />

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium text-gray-700 hover:text-gray-900">
            <Calendar className="mr-1" size={18} />
            Events
          </span>
        }
        image={navImages.events}
        imageAlt="Events and hackathons"
        items={[
          { label: "Upcoming Hackathons", href: "/hackathon", icon: <Calendar size={16} /> },
          { label: "Dev Meetups", href: "/meetups", icon: <Calendar size={16} /> },
          { label: "Webinars", href: "/webinar", icon: <Calendar size={16} /> },
        ]}
        visualLabel="Events"
      />

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium text-gray-700 hover:text-gray-900">
            <User className="mr-1" size={18} />
            Profile
          </span>
        }
        image={navImages.profile}
        imageAlt="User profile"
        items={[
          { label: "View Profile", href: "/profileview", icon: <User size={16} /> },
          { label: "Edit Profile", href: "/profileedit", icon: <User size={16} /> },
          { label: "Dev Journey", href: "/profile/journey", icon: <BookOpen size={16} /> },
        ]}
        visualLabel="My Profile"
      />
    </nav>
  );
};
