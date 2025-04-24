
import { Users, MapPin, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tribes = [
  {
    id: 1,
    name: "Nairobi JS Community",
    description: "JavaScript developers in Nairobi focusing on web and mobile app development.",
    location: "Nairobi, Kenya",
    members: 230,
    tags: ["JavaScript", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1653564142048-d5af2cf9b50f?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Lagos Python Devs",
    description: "Python enthusiasts building web applications, data science projects, and machine learning models.",
    location: "Lagos, Nigeria",
    members: 195,
    tags: ["Python", "Django", "Flask", "Data Science"],
    image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Cairo UI/UX Designers",
    description: "Designer community focused on creating beautiful, functional, and accessible interfaces.",
    location: "Cairo, Egypt",
    members: 125,
    tags: ["UI", "UX", "Figma", "Adobe XD"],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80"
  }
];

export function Tribes() {
  return (
    <section className="w-full py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Tech Tribes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with developers who share your interests, location, or tech stack through our Tribes feature.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tribes.map((tribe) => (
            <Card key={tribe.id} className="overflow-hidden hover:shadow-md transition-all">
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={tribe.image} 
                  alt={tribe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-xl">{tribe.name}</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{tribe.location}</span>
                </div>
                <p className="text-gray-700 mb-4">{tribe.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tribe.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-1" />
                  <span>{tribe.members} members</span>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <button className="w-full py-2 text-afro-purple font-medium flex items-center justify-center hover:bg-gray-100 transition-colors rounded">
                  Join Tribe
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="inline-flex items-center text-afro-purple font-medium hover:underline">
            View All Tribes
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
