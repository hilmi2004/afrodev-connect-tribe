
import { useState } from "react";
import { MapPin } from "lucide-react";

export const MapPlaceholder = () => {
  const [hoveredMarker, setHoveredMarker] = useState<null | string>(null);
  
  const markers = [
    { id: "1", lat: 40, lng: 30, name: "TechHub Conference" },
    { id: "2", lat: 55, lng: 10, name: "Developer Meetup" },
    { id: "3", lat: 25, lng: -10, name: "Code & Coffee" },
    { id: "4", lat: -20, lng: 50, name: "AI Workshop" },
    { id: "5", lat: -30, lng: -40, name: "Mobile Dev Summit" },
  ];
  
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-afro-purple/10 to-afro-gold/5 overflow-hidden">
      {/* Map Background Grid */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="border border-afro-purple/5"></div>
        ))}
      </div>
      
      {/* Continents */}
      <div className="absolute top-[20%] left-[15%] w-[25%] h-[30%] bg-white/20 rounded-full blur-xl"></div>
      <div className="absolute top-[30%] left-[50%] w-[35%] h-[20%] bg-white/20 rounded-full blur-xl"></div>
      <div className="absolute top-[60%] left-[20%] w-[30%] h-[25%] bg-white/10 rounded-full blur-xl"></div>
      
      {/* Markers */}
      {markers.map((marker) => {
        const top = `${marker.lat + 50}%`;
        const left = `${marker.lng + 50}%`;
        const isHovered = hoveredMarker === marker.id;
        
        return (
          <div 
            key={marker.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ top, left }}
            onMouseEnter={() => setHoveredMarker(marker.id)}
            onMouseLeave={() => setHoveredMarker(null)}
          >
            <div className={`relative transition-all duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}>
              <MapPin 
                className={`h-6 w-6 text-afro-red ${isHovered ? 'animate-bounce' : ''}`}
                fill={isHovered ? '#EA384C' : 'transparent'}
              />
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-afro-red rounded-full animate-ping opacity-75"></div>
              
              {isHovered && (
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg text-sm min-w-[120px] text-center z-10">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
                  <p className="font-medium text-gray-800">{marker.name}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {/* Pulsing Circle Decorations */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-md">
        <div className="w-2 h-2 bg-afro-red rounded-full animate-pulse"></div>
        <span>Live Events</span>
      </div>
      
      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-afro-purple/20 text-9xl font-bold tracking-widest rotate-12">MAP</p>
      </div>
    </div>
  );
};
