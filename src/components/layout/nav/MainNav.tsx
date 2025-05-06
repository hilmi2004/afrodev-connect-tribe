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
import { Logo } from "@/components/layout/nav/Logo.tsx";
import {useAuth} from "@/hooks/useAuth.tsx";

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
    const { user } = useAuth();

    return (
        <nav className="hidden md:flex items-center overflow-x-auto whitespace-nowrap max-w-full px-4 py-2 gap-4">
            {/*<NavLink to="/" active={location.pathname === "/"}>*/}
            {/*    <Logo />*/}
            {/*</NavLink>*/}

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
            Projects & Resources
          </span>
                }
                image={navImages.projects}
                imageAlt="Explore Projects & Resources"
                items={[
                    { label: "By Country", icon: <Globe size={17} />, href: "#" },
                    { label: "By Tech Stack", icon: <Layers size={17} />, href: "#" },
                    ...featuredProjects.map((p) => ({
                        label: p.label,
                        href: p.href,
                        icon: <LayoutGrid size={17} />,
                    })),
                    { label: "Tech News", href: "/technews", icon: <BookOpen size={17} /> },
                    { label: "Dev Tools & Tutorials", href: "/dev-tools", icon: <BookOpen size={17} /> },
                    { label: "Career Advice", href: "/careeradvice", icon: <BookOpen size={17} /> },
                ]}
                visualLabel="Projects & Resources"
            />

            <NavDropdown
                trigger={
                    <span className="flex items-center gap-1 font-medium">
            <UsersRound className="mr-2" size={20} />
            Community
          </span>
                }
                image={navImages.community}
                imageAlt="Community and Tribes"
                items={[
                    { label: "Find Tribes", icon: <Search size={17} />, href: "/tribes" },
                    { label: "Create a Tribe", isCTA: true, href: "/tribes/create" },
                    { label: "Local Connect", href: "/localconnect", icon: <Globe size={17} /> },
                    { label: "Forums", href: "/forum", icon: <Users size={17} /> },
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
                    { label: "Upcoming Hackathons", href: "/hackathon", icon: <Calendar size={17} /> },
                    { label: "Dev Meetups", href: "/meetups", icon: <Calendar size={17} /> },
                    { label: "Webinars", href: "/webinar", icon: <Calendar size={17} /> },
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
                    { label: "View Profile", href: `/users/${user?._id}`, icon: <User size={17} /> },
                    { label: "Edit Profile", href: "/profileedit", icon: <User size={17} /> },
                    { label: "Dev Journey", href: "/devjourney", icon: <BookOpen size={17} /> },
                ]}
                visualLabel="My Profile"
            />
        </nav>
    );
};
