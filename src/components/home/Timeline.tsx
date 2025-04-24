import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "education" | "work" | "project" | "event";
}

export function Timeline() {
  const timelineEvents: TimelineEvent[] = [
    {
      year: "2019",
      title: "Started Learning to Code",
      description: "Began with HTML, CSS, and JavaScript through free online resources",
      type: "education"
    },
    {
      year: "2020",
      title: "First Hackathon",
      description: "Participated in the Lagos Tech Hackathon and won 3rd place",
      type: "event"
    },
    {
      year: "2020",
      title: "Completed Full Stack Bootcamp",
      description: "Graduated from Moringa School's 12-week intensive program",
      type: "education"
    },
    {
      year: "2021",
      title: "First Developer Role",
      description: "Junior Frontend Developer at TechAfrica Solutions",
      type: "work"
    },
    {
      year: "2022",
      title: "Launched First Product",
      description: "Released MarketConnect, a platform for local vendors",
      type: "project"
    },
    {
      year: "2023",
      title: "Senior Developer",
      description: "Promoted to Senior Developer, leading a team of 5",
      type: "work"
    }
  ];

  const getBadgeColor = (type: string): string => {
    switch(type) {
      case "education": return "bg-blue-100 text-blue-700";
      case "work": return "bg-green-100 text-green-700";
      case "project": return "bg-purple-100 text-afro-purple";
      case "event": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    // Scroll-triggered animations for timeline items
    gsap.utils.toArray(".timeline-event").forEach((el: HTMLElement, i) => {
      gsap.from(el, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Scroll-triggered animation for profile card header
    gsap.from(".timeline-card-header", {
      opacity: 0,
      y: -40,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".timeline-card-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Timeline dot animation (pulse effect)
    gsap.utils.toArray(".timeline-dot").forEach((dot: HTMLElement) => {
      gsap.from(dot, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: dot,
          start: "top 90%",
        },
      });
    });
  }, []);

  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dev Journey Timeline</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every developer has a unique story. Share your journey from your first line of code to where you are today.
          </p>
        </div>
        
        <Card className="border border-gray-200 overflow-hidden">
          <CardHeader className="bg-afro-purple/10 border-b border-gray-200 timeline-card-header">
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Developer"
                className="w-12 h-12 rounded-full mr-4 border-2 border-white"
              />
              <div>
                <CardTitle>Mark Ochieng's Developer Journey</CardTitle>
                <p className="text-sm text-gray-500">Full Stack Developer • Kenya</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative pl-8 py-8 border-l-2 border-afro-purple/30 ml-8">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className="timeline-event mb-8 last:mb-0 relative"
                >
                  <div className="timeline-dot absolute w-4 h-4 bg-afro-purple rounded-full -left-10 top-1.5 border-4 border-white"></div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <Badge variant="outline" className="text-afro-purple border-afro-purple w-fit px-3 py-1">
                      {event.year}
                    </Badge>
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {event.title}
                        <Badge variant="secondary" className={getBadgeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-white border border-afro-purple text-afro-purple rounded-md hover:bg-afro-purple/5 transition-colors">
            Create Your Timeline
          </button>
        </div>
      </div>
    </section>
  );
}
