import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="w-full py-20 px-6 bg-gradient-to-br from-afro-purple via-afro-purple/70 to-indigo-800 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Connect with African Tech Talent
          </h1>
          <p className="text-lg lg:text-xl mb-8 text-white/90">
            A digital platform to showcase your projects, connect with other developers across Africa, and build a vibrant tech community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button className="bg-afro-gold hover:bg-afro-gold/90 text-afro-black font-semibold text-lg px-8 py-6">
                Join the Community
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Explore Projects
              </Button>
            </Link>
          </div>
          
          <div className="mt-10 flex items-center">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-afro-${i % 2 === 0 ? 'green' : 'purple'} flex items-center justify-center`}>
                  <span className="text-xs font-bold">{i}</span>
                </div>
              ))}
            </div>
            <p className="ml-4 text-white/90">Join 1,000+ developers across Africa</p>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="w-full h-[500px] bg-black/20 rounded-xl relative overflow-hidden border-4 border-white/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-afro-black/40 to-transparent"></div>
            <div className="absolute top-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-afro-gold mr-4"></div>
                <div>
                  <h3 className="font-bold">Kwame Nkrumah</h3>
                  <p className="text-sm">Full Stack Developer • Ghana</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-video bg-afro-purple/20 rounded-md"></div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs">Available for work</span>
                </div>
                <button className="text-xs px-3 py-1 rounded bg-afro-purple/40">View Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
