import { useEffect, useRef } from "react";
import { Circle, Users, Calendar, Palette, Globe, File } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Features() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Users className="h-10 w-10 text-afro-purple  group-hover: text-white feature-icon" />,
      title: "Tribes",
      description:
          "Join tech tribes based on your country, language, or interests to collaborate with like-minded developers.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-afro-purple group-hover: text-white feature-icon" />,
      title: "Dev Journey Timeline",
      description:
          "Display your developer journey in a visual timeline including education, certifications, and career milestones.",
    },
    {
      icon: <Palette className="h-10 w-10 text-afro-purple group-hover: text-afro-white feature-icon" />,
      title: "Culture Mode",
      description:
          "Personalize your profile with African cultural themes including patterns, borders, and local language greetings.",
    },
    {
      icon: <Globe className="h-10 w-10 text-afro-purple group-hover: text-afro-white feature-icon" />,
      title: "Local Connect",
      description:
          "Discover developers near you through city, university, or tech hub connections.",
    },
    {
      icon: <File className="h-10 w-10 text-afro-purple group-hover: text-afro-white feature-icon" />,
      title: "Offline Mode",
      description:
          "Export your profile to PDF or ZIP for networking events or areas with limited connectivity.",
    },
    {
      icon: <Circle className="h-10 w-10 text-afro-purple group-hover: text-afro-white feature-icon" />,
      title: "Project Showcase",
      description:
          "Upload and display your technical projects with images, descriptions, links, and tech stack details.",
    },
  ];

  useEffect(() => {
    // Reset the refs array
    cardsRef.current = [];

    // Wait for the DOM to be stable before running animations
    setTimeout(() => {
      // Bouncing entrance animation
      gsap.from(cardsRef.current, {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Swaying icon animation
      gsap.to(".feature-icon", {
        rotation: 5,
        yoyo: true,
        repeat: -1,
        duration: 2,
        ease: "sine.inOut",
      });

      // Drum sound on scroll
      const audio = new Audio("/drum.mp3");
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          audio.play().catch((e) => console.log("Audio failed:", e));
        },
      });
    }, 100);
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  return (
      <section
          ref={sectionRef}
          className="w-full py-20 px-6 bg-gray-50 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unique Features for African Developers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform is specifically designed with features that address the
              unique needs and celebrate the cultural diversity of African tech
              creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <div
                    key={feature.title}
                    ref={(el) => setCardRef(el, index)}
                    className="relative group bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 overflow-hidden hover:bg-black hover:text-white"
                >
                  {/* Pattern Background Overlay (Appears on Hover) */}
                  <div className="absolute inset-0 bg-[url('/african-pattern.jpg')] opacity-0 group-hover:opacity-20 bg-cover bg-center transition-opacity duration-300 pointer-events-none rounded-xl" />

                  {/* Feature Content */}
                  <div className="relative z-10">
                    <div className="mb-5 group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-black group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}