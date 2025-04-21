
import { useEffect, useState } from "react";
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
import NotFound from "./pages/NotFound";
import { Switch } from "@/components/ui/switch";

const queryClient = new QueryClient();

const App = () => {
  const [bwMode, setBwMode] = useState(false);

  // Add/remove the .bw-mode class on <body> for color mode
  useEffect(() => {
    const body = document.body;
    if (bwMode) {
      body.classList.add("bw-mode");
    } else {
      body.classList.remove("bw-mode");
    }
  }, [bwMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Absolute color toggle switch, top right */}
        <div className="fixed z-[999] top-6 right-6 flex items-center gap-2 bg-white/70 dark:bg-black/70 rounded-full px-4 py-2 shadow-xl glass-morphism transition-colors animate-fade-in select-none">
          <span className="font-medium text-xs text-gray-600 dark:text-gray-300">Color</span>
          <Switch
            checked={bwMode}
            onCheckedChange={v => setBwMode(v)}
            aria-label="Toggle black & white mode"
          />
          <span className="ml-1 font-medium text-xs text-gray-700 dark:text-gray-100">B&W</span>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tribes" element={<Tribes />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

