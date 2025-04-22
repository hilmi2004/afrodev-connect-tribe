
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample meetup data
const MEETUPS = [
  {
    id: "1",
    title: "Frontend Developer Meetup",
    date: "May 15, 2025",
    time: "6:30 PM - 8:30 PM",
    location: "Tech Hub, Downtown",
    attendees: 42
  },
  {
    id: "2",
    title: "React Workshop",
    date: "May 22, 2025",
    time: "5:00 PM - 7:00 PM",
    location: "Innovation Center",
    attendees: 28
  },
  {
    id: "3",
    title: "Code & Coffee",
    date: "May 29, 2025",
    time: "9:00 AM - 11:00 AM",
    location: "Brew & Bytes Café",
    attendees: 15
  }
];

export const UpcomingMeetups = () => {
  return (
    <div className="space-y-4">
      {MEETUPS.map((meetup) => (
        <div 
          key={meetup.id}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border-l-4 border-afro-purple hover:border-afro-gold transition-colors duration-300 hover:shadow-xl"
        >
          <h3 className="text-xl font-semibold text-gray-800">{meetup.title}</h3>
          
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-afro-purple" />
              <span>{meetup.date} • {meetup.time}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-afro-red" />
              <span>{meetup.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4 text-afro-gold" />
              <span>{meetup.attendees} attending</span>
            </div>
          </div>
          
          <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
            <Button size="sm" variant="outline" className="hover:bg-afro-purple/10 hover:border-afro-purple">
              View Details
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-afro-purple to-afro-gold hover:from-afro-gold hover:to-afro-purple text-white transition-all duration-300">
              RSVP
            </Button>
          </div>
        </div>
      ))}
      
      <Button variant="outline" className="w-full mt-4 hover:bg-afro-purple/10 border-dashed">
        Show More Events
      </Button>
    </div>
  );
};
