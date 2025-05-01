
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import TechNews from "@/pages/TechNews.tsx";
import Hackathon from "@/pages/Hackathon.tsx";
import Webinar from "@/pages/Webinar.tsx";
import ProjectSpotlight from "@/pages/ProjectSpotlight.tsx";
import Forum from "@/pages/Forum.tsx";
import DevProfile from "@/pages/DevProfile.tsx";
import LocalConnect from "@/pages/LocalConnect.tsx";
import CareerAdvice from "@/pages/CareerAdvice.tsx";
import TribeDetail from "@/pages/TribeDetail.tsx";

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
          <Route path="/tribes" element={<Tribes />} />
          <Route path="/tribes/:id" element={<TribeDetail />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/about" element={<About />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/roadmap/:id" element={<Roadmap />} />
          <Route path="/technews" element={<TechNews/>} />
          <Route path="/hackathon" element={<Hackathon/>} />
          <Route path="/webinar" element={<Webinar/>} />
          <Route path="/projectspot" element={<ProjectSpotlight/>} />
          <Route path="/forum" element={<Forum/>} />
          <Route path="/devprof" element={<DevProfile/>} />
          <Route path="/localconnect" element={<LocalConnect/>} />
          <Route path="/careeradvice" element={<CareerAdvice/>} />
          <Route path="/meetups" element={<Meetups />} />
          <Route path="/dev-tools" element={<DevTools />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
