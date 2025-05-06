
import { Link } from "react-router-dom";

export const Logo = () => (
    <div className="flex items-center">
        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img
                src="/bt-nobg%20(2).png"
                alt="BlackTech Builders Logo"
                className="h-10 w-auto"
            />
        </Link>
    </div>
);