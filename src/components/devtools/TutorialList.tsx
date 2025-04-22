
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample tutorial data
const TUTORIALS = [
  {
    id: "1",
    title: "Building a React App with TypeScript",
    description: "Learn how to create a React application using TypeScript from scratch",
    author: "Dev Master",
    date: "Apr 15, 2025",
    duration: "45 min",
    level: "Intermediate"
  },
  {
    id: "2",
    title: "CSS Grid Made Easy",
    description: "A complete guide to CSS Grid layout with practical examples",
    author: "CSS Wizard",
    date: "Apr 12, 2025",
    duration: "30 min",
    level: "Beginner"
  },
  {
    id: "3",
    title: "Node.js Authentication with JWT",
    description: "Implement secure authentication using JSON Web Tokens in your Node.js app",
    author: "Backend Pro",
    date: "Apr 10, 2025",
    duration: "60 min",
    level: "Advanced"
  },
  {
    id: "4",
    title: "Introduction to GraphQL",
    description: "Get started with GraphQL and understand its benefits over REST APIs",
    author: "API Expert",
    date: "Apr 8, 2025",
    duration: "40 min",
    level: "Intermediate"
  }
];

export const TutorialList = () => {
  return (
    <div className="space-y-6">
      {TUTORIALS.map((tutorial) => (
        <Card key={tutorial.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-6">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent">
                {tutorial.title}
              </CardTitle>
              <CardDescription className="mt-1">
                By {tutorial.author} • {tutorial.date}
              </CardDescription>
              
              <p className="mt-3 text-gray-600">{tutorial.description}</p>
              
              <div className="flex gap-2 mt-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-afro-purple text-white">
                  {tutorial.level}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-afro-gold/90 text-white">
                  {tutorial.duration}
                </span>
              </div>
            </div>
            
            <div className="relative md:border-l border-gray-100 flex items-center justify-center bg-gradient-to-r from-afro-purple/5 to-afro-gold/5 p-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-3">Ready to learn?</p>
                <Button className="bg-afro-purple hover:bg-afro-purple/90 text-white">
                  Start Tutorial
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      <div className="text-center mt-8">
        <Button variant="outline" className="hover:bg-afro-purple/10 hover:border-afro-purple transition-colors">
          Load More Tutorials
        </Button>
      </div>
    </div>
  );
};
