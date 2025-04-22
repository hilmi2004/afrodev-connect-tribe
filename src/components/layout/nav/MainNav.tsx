
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
  { label: "Project Spotlight: UmojaPay", href: "/projects/umojapay" },
  { label: "Award Winner: SheCodes Africa", href: "/projects/shecodes" },
  { label: "Editor's Pick: Kijiji Connect", href: "/projects/kijiji-connect" },
];

export const MainNav = () => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4">
      <NavLink to="/" active={location.pathname === "/"}>
        Home
      </NavLink>
      
      <NavLink to="/roadmap" active={location.pathname.includes("/roadmap")}>
        Roadmaps
      </NavLink>

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium">
            <LayoutGrid className="mr-2" size={20} />
            Explore Projects
          </span>
        }
        image={navImages.projects}
        imageAlt="Explore African tech projects"
        items={[
          { label: "By Country", icon: <Globe size={17} />, href: "#" },
          { label: "By Tech Stack", icon: <Layers size={17} />, href: "#" },
          ...featuredProjects.map((p) => ({
            label: p.label,
            href: p.href,
            icon: <LayoutGrid size={17} />,
          })),
        ]}
        visualLabel="Explore Projects"
      />

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium">
            <UsersRound className="mr-2" size={20} />
            Tribes
          </span>
        }
        image={navImages.tribes}
        imageAlt="Tribes collaboration"
        items={[
          { label: "Find Tribes", icon: <Search size={17} />, href: "/tribes" },
          { label: "Create a Tribe", isCTA: true, href: "/tribes/create" },
        ]}
        visualLabel="Tribes"
      />

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium">
            <BookOpen className="mr-2" size={20} />
            Resources
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

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium">
            <Users className="mr-2" size={20} />
            Community
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

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium">
            <Calendar className="mr-2" size={20} />
            Events
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

      <NavDropdown
        trigger={
          <span className="flex items-center gap-1 font-medium">
            <User className="mr-2" size={20} />
            My Profile
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
  );
};
