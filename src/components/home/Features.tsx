
import { Circle, Users, Calendar, Palette, Globe, File } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-afro-purple" />,
      title: "Tribes",
      description: "Join tech tribes based on your country, language, or interests to collaborate with like-minded developers."
    },
    {
      icon: <Calendar className="h-10 w-10 text-afro-purple" />,
      title: "Dev Journey Timeline",
      description: "Display your developer journey in a visual timeline including education, certifications, and career milestones."
    },
    {
      icon: <Palette className="h-10 w-10 text-afro-purple" />,
      title: "Culture Mode",
      description: "Personalize your profile with African cultural themes including patterns, borders, and local language greetings."
    },
    {
      icon: <Globe className="h-10 w-10 text-afro-purple" />,
      title: "Local Connect",
      description: "Discover developers near you through city, university, or tech hub connections."
    },
    {
      icon: <File className="h-10 w-10 text-afro-purple" />,
      title: "Offline Mode",
      description: "Export your profile to PDF or ZIP for networking events or areas with limited connectivity."
    },
    {
      icon: <Circle className="h-10 w-10 text-afro-purple" />,
      title: "Project Showcase",
      description: "Upload and display your technical projects with images, descriptions, links, and tech stack details."
    },
  ];

  return (
    <section className="w-full py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Unique Features for African Developers</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform is specifically designed with features that address the unique needs and celebrate the cultural diversity of African tech creators.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
