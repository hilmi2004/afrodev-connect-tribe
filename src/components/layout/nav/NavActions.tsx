import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NavActions = () => (
    <div className="flex items-center gap-2">
        <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900"
            aria-label="Search"
        >
            <Search className="h-5 w-5" />
        </Button>

        <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    Sign In
                </Button>
            </Link>
            <Link to="/register">
                <Button className="bg-afro-purple hover:bg-afro-purple/90">
                    Join Now
                </Button>
            </Link>
        </div>
    </div>
);