
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="w-full py-24 px-6 bg-afro-black text-white relative overflow-hidden">
      {/* African-inspired pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=1920&h=1080')] bg-cover bg-center"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Join the Pan-African Tech Community Today
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Connect with developers across Africa, showcase your projects, and be part of a growing tech ecosystem that celebrates African talent.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <Button className="bg-afro-gold hover:bg-afro-gold/90 text-afro-black font-semibold text-lg px-8 py-6">
              Create Your Profile
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
              Learn More
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
          <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="text-3xl font-bold text-afro-gold">54+</div>
            <div className="text-sm text-white/80">Countries</div>
          </div>
          <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="text-3xl font-bold text-afro-gold">1,000+</div>
            <div className="text-sm text-white/80">Developers</div>
          </div>
          <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="text-3xl font-bold text-afro-gold">500+</div>
            <div className="text-sm text-white/80">Projects</div>
          </div>
          <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="text-3xl font-bold text-afro-gold">25+</div>
            <div className="text-sm text-white/80">Tribes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
