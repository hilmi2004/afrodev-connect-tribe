
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Heart, Users, Calendar, Palette, Globe, File, ArrowRight } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Kwame Nkrumah",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Amina Mohammed",
      role: "Head of Community",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "David Oyelowo",
      role: "Lead Developer",
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    {
      name: "Grace Muthoni",
      role: "UX Designer",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-afro-purple to-indigo-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl mb-8 text-white/90">
              To build a vibrant, connected community of African tech creators that showcases talent, fosters collaboration, and celebrates our cultural diversity.
            </p>
            <Button className="bg-white text-afro-purple hover:bg-white/90">
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                BlackTech Builders was founded in 2025 with a simple idea: to create a platform that celebrates the incredible tech talent across Africa. We recognized that while African developers were building amazing projects and solutions, they often lacked visibility and connection opportunities.
              </p>
              <p className="text-gray-600 mb-4">
                Our platform bridges this gap by providing a space where developers, designers, and tech creators from across the continent can showcase their work, connect with peers, and form communities around shared interests and geographical proximity.
              </p>
              <p className="text-gray-600">
                What makes us unique is our focus on African cultural elements and addressing specific challenges faced by African tech professionals, such as intermittent internet connectivity and localized networking.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=800" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Users className="h-12 w-12 text-afro-purple mb-4" />
              <h3 className="text-xl font-bold mb-3">Tribes</h3>
              <p className="text-gray-600 mb-4">
                Join tech tribes based on your country, language, or interests to collaborate with like-minded developers.
              </p>
              <Button variant="link" className="text-afro-purple p-0 flex items-center">
                Learn more <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Calendar className="h-12 w-12 text-afro-purple mb-4" />
              <h3 className="text-xl font-bold mb-3">Dev Journey Timeline</h3>
              <p className="text-gray-600 mb-4">
                Display your developer journey in a visual timeline including education, certifications, and career milestones.
              </p>
              <Button variant="link" className="text-afro-purple p-0 flex items-center">
                Learn more <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Palette className="h-12 w-12 text-afro-purple mb-4" />
              <h3 className="text-xl font-bold mb-3">Culture Mode</h3>
              <p className="text-gray-600 mb-4">
                Personalize your profile with African cultural themes including patterns, borders, and local language greetings.
              </p>
              <Button variant="link" className="text-afro-purple p-0 flex items-center">
                Learn more <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Globe className="h-12 w-12 text-afro-purple mb-4" />
              <h3 className="text-xl font-bold mb-3">Local Connect</h3>
              <p className="text-gray-600 mb-4">
                Discover developers near you through city, university, or tech hub connections.
              </p>
              <Button variant="link" className="text-afro-purple p-0 flex items-center">
                Learn more <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <File className="h-12 w-12 text-afro-purple mb-4" />
              <h3 className="text-xl font-bold mb-3">Offline Mode</h3>
              <p className="text-gray-600 mb-4">
                Export your profile to PDF or ZIP for networking events or areas with limited connectivity.
              </p>
              <Button variant="link" className="text-afro-purple p-0 flex items-center">
                Learn more <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Heart className="h-12 w-12 text-afro-purple mb-4" />
              <h3 className="text-xl font-bold mb-3">Community Focus</h3>
              <p className="text-gray-600 mb-4">
                Built with love for and by the African tech community, celebrating our diversity and innovation.
              </p>
              <Button variant="link" className="text-afro-purple p-0 flex items-center">
                Learn more <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
            A diverse group of tech enthusiasts passionate about connecting and elevating African talent.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-afro-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join BlackTech Builders?</h2>
          <p className="text-lg text-white/80 mb-8">
            Create an account today and become part of a vibrant community of African tech professionals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-afro-gold hover:bg-afro-gold/90 text-afro-black font-semibold">
              Create Your Profile
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
