
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import ProjectSpotlight from "./pages/ProjectSpotlight";
import Tribes from "./pages/Tribes";
import Discover from "./pages/Discover";
import About from "./pages/About";
import Roadmap from "./pages/Roadmap";
import Meetups from "./pages/Meetups";
import DevTools from "./pages/DevTools";
import DevProfile from "./pages/DevProfile";
import LocalConnect from "./pages/LocalConnect";
import Forum from "./pages/Forum";
import Hackathon from "./pages/Hackathon";
import Webinar from "./pages/Webinar";
import TechNews from "./pages/TechNews";
import CareerAdvice from "./pages/CareerAdvice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project-spotlight" element={<ProjectSpotlight />} />
          <Route path="/tribes" element={<Tribes />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/about" element={<About />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/roadmap/:id" element={<Roadmap />} />
          <Route path="/meetups" element={<Meetups />} />
          <Route path="/dev-tools" element={<DevTools />} />
          <Route path="/dev-profile" element={<DevProfile />} />
          <Route path="/local-connect" element={<LocalConnect />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/hackathons" element={<Hackathon />} />
          <Route path="/webinars" element={<Webinar />} />
          <Route path="/tech-news" element={<TechNews />} />
          <Route path="/career-advice" element={<CareerAdvice />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
