import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

// Country name to ISO 3166-1 alpha-2 code mapping
const countryToISO: Record<string, string> = {
  'Nigeria': 'ng',
  'Ghana': 'gh',
  'Kenya': 'ke',
  'South Africa': 'za',
  'Ethiopia': 'et',
  'Egypt': 'eg',
  'Tanzania': 'tz',
  'Uganda': 'ug',
  'Rwanda': 'rw',
  'Senegal': 'sn',
  'Africa': 'un', // Fallback for 'Africa'
};

export function Hero() {
  const { user, isAuthenticated } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Safely extract user data with defaults
  const getProfileData = () => {
    if (!isAuthenticated || !user) {
      return {
        name: "Kwame Nkrumah",
        country: "Ghana",
        initials: "KN",
        interests: ["JavaScript", "React", "Node.js"],
      };
    }

    return {
      name: user.fullName || "New Member",
      country: user.country || "Africa",
      initials: (user.fullName || "NM")
          .split(" ")
          .map(n => n[0])
          .join("")
          .slice(0, 2),
      interests: user.interests?.length ? user.interests : ["Tech enthusiast"],
    };
  };

  const { name, country, initials, interests } = getProfileData();
  const countryISO = countryToISO[country]?.toLowerCase() || 'un';
  const flagUrl = `https://flagcdn.com/24x18/${countryISO}.png`;

  return (
      <section className="w-full py-20 px-6 bg-gradient-to-br from-afro-purple via-afro-purple/70 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Call to Action */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Connect with African Tech Talent
            </h1>
            <p className="text-lg lg:text-xl mb-8 text-white/90">
              A digital platform to showcase your projects, connect with developers across Africa, and build a vibrant tech community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {!isAuthenticated ? (
                  <Link to="/register">
                    <Button className="bg-afro-gold hover:bg-afro-gold/90 text-afro-black font-semibold text-lg px-8 py-6">
                      Join the Community
                    </Button>
                  </Link>
              ) : (
                  <Link to="/profile">
                    <Button className="bg-afro-gold hover:bg-afro-gold/90 text-afro-black font-semibold text-lg px-8 py-6">
                      View Your Profile
                    </Button>
                  </Link>
              )}
              <Link to="/projects">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  Explore Projects
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={`w-10 h-10 rounded-full border-2 border-white bg-afro-${i % 2 === 0 ? 'green' : 'purple'} flex items-center justify-center`}
                    >
                      <span className="text-xs font-bold">{i}</span>
                    </div>
                ))}
              </div>
              <p className="ml-4 text-white/90">Join 1,000+ developers across Africa</p>
            </div>
          </div>

          {/* Right Column - Profile Card */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="w-full h-[500px] bg-black/20 rounded-xl relative overflow-hidden border-4 border-white/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-afro-black/40 to-transparent"></div>

              <div className="absolute top-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                {/* Profile Header with Flag Badge */}
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-afro-gold/90 mr-4 flex items-center justify-center text-afro-black font-bold text-lg">
                      {initials}
                      {isMounted && (
                          <div className="absolute top-0 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md border border-white overflow-hidden">
                            <img
                                src={flagUrl}
                                alt={`${country} flag`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://flagcdn.com/24x18/un.png';
                                }}
                            />
                          </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <p className="text-sm text-white/90 flex items-center">
                      {/*{isMounted && (*/}
                      {/*    <img*/}
                      {/*        src={`https://flagcdn.com/16x12/${countryISO}.png`}*/}
                      {/*        alt=""*/}
                      {/*        className="w-4 h-3 mr-1.5 object-cover rounded-sm"*/}
                      {/*        loading="lazy"*/}
                      {/*    />*/}
                      {/*)}*/}
                      {country}
                    </p>
                  </div>
                </div>

                {/* Interests Tags */}
                <div className="mb-4">
                  <p className="text-xs font-medium mb-2 text-white/80">TECH INTERESTS</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest, index) => (
                        <span
                            key={index}
                            className="text-xs px-3 py-1 bg-white/10 rounded-full border border-white/20"
                        >
                      {interest}
                    </span>
                    ))}
                  </div>
                </div>

                {/* Project Thumbnails */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                          key={i}
                          className="aspect-video bg-afro-purple/20 rounded-md border border-white/10"
                      ></div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-white/80">
                    Available for collaborations
                  </span>
                  </div>
                  <Link to={isAuthenticated ? "/profile" : "/register"}>
                    <button className="text-xs px-3 py-1 rounded bg-afro-purple/40 hover:bg-afro-purple/60 transition text-white">
                      {isAuthenticated ? "View Profile" : "Join Now"}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}