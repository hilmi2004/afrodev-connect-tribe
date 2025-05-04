
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import Tribes from "./pages/Tribes";
import Discover from "./pages/Discover";
import About from "./pages/About";
import Roadmap from "./pages/Roadmap";
import Meetups from "./pages/Meetups";
import DevTools from "./pages/DevTools";
import NotFound from "./pages/NotFound";
import TechNews from "@/pages/TechNews";
import Hackathon from "@/pages/Hackathon";
import Webinar from "@/pages/Webinar";
import ProjectSpotlight from "@/pages/ProjectSpotlight";
import Forum from "@/pages/Forum";
import DevProfile from "@/pages/DevProfile";
import LocalConnect from "@/pages/LocalConnect";
import CareerAdvice from "@/pages/CareerAdvice";
import TribeDetail from "@/pages/TribeDetail";
import ProfileView from "@/pages/ProfileView";
import ProfileEdit from "@/pages/ProfileEdit";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import ArticleDetailPage from "@/pages/ArticleDetailPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/tribes" element={<Tribes />} />
            <Route path="/tribes/:id" element={<TribeDetail />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/about" element={<About />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/roadmap/:id" element={<Roadmap />} />
            <Route path="/technews" element={<TechNews />} />
            <Route path="/articles/:id" element={<ArticleDetailPage />} />
            <Route path="/articles/:id/:slug" element={<ArticleDetailPage />} />
            <Route path="/hackathon" element={<Hackathon />} />
            <Route path="/webinar" element={<Webinar />} />
            <Route path="/projectspot" element={<ProjectSpotlight />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/devprof" element={<DevProfile />} />
            <Route path="/localconnect" element={<LocalConnect />} />
            <Route path="/careeradvice" element={<CareerAdvice />} />
            <Route path="/meetups" element={<Meetups />} />
            <Route path="/dev-tools" element={<DevTools />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/:id" element={<ProfileView />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
