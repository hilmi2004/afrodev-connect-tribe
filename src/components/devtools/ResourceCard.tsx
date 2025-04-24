
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
}

export const ResourceCard = ({ title, description, image, url, category }: ResourceCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 bg-afro-purple text-white text-xs font-medium px-2 py-1 rounded-full">
          {category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <CardHeader className="pb-2 pt-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-afro-purple to-afro-blue bg-clip-text text-transparent">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          asChild
          variant="outline" 
          size="sm" 
          className="w-full gap-1 hover:bg-afro-purple/10 hover:border-afro-purple group-hover:bg-afro-purple group-hover:text-white transition-all duration-300"
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Link size={14} />
            <span>Visit Resource</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
