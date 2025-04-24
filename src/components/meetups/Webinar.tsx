import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapPlaceholder } from "./MapPlaceholder";

const WEBINARS = [
  {
    id: "1",
    title: "AI in Africa: Opportunities & Challenges",
    date: "June 10, 2025",
    time: "3:00 PM - 5:00 PM",
    platform: "Zoom",
    link: "#",
  },
  {
    id: "2",
    title: "Building Scalable Apps with React",
    date: "June 17, 2025",
    time: "1:00 PM - 3:00 PM",
    platform: "Google Meet",
    link: "#",
  },
  {
    id: "3",
    title: "Cloud Computing: Beginner to Pro",
    date: "June 24, 2025",
    time: "6:00 PM - 8:00 PM",
    platform: "Microsoft Teams",
    link: "#",
  },
];

export const WebinarPage = () => {
  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-50 pb-20">
      {/* Hero */}
      <div className="relative w-full h-[320px] bg-gradient-to-br from-afro-purple to-afro-gold rounded-b-3xl shadow-md flex items-center justify-center text-white">
        <div className="text-center px-6 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold">DFET Webinars</h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Join our expert-led virtual events and upskill from anywhere in the world.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-b-3xl" />
      </div>

      {/* Map / Visual */}
      <div className="mt-10 px-4 md:px-10">
        <MapPlaceholder />
      </div>

      {/* Upcoming Webinars */}
      <div className="mt-16 max-w-5xl mx-auto px-4 md:px-8 space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Upcoming Webinars</h2>
          <p className="mt-2 text-gray-600">
            Don’t miss out on these exclusive sessions with industry leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WEBINARS.map((webinar) => (
            <div
              key={webinar.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-afro-purple">{webinar.title}</h3>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-afro-gold" />
                  <span>{webinar.date} • {webinar.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-afro-red" />
                  <span>Online via {webinar.platform}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center border-t pt-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-afro-purple hover:underline"
                >
                  Learn More
                </Button>
                <Button
                  size="sm"
                  className="bg-afro-purple text-white hover:bg-afro-gold"
                >
                  Register
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            className="border-dashed border-2 border-afro-purple text-afro-purple hover:bg-afro-purple/10"
          >
            View All Webinars
          </Button>
        </div>
      </div>
    </div>
  );
};
