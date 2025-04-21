
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-afro-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <h3 className="text-xl font-bold mb-4">BlackTech Builders</h3>
          <p className="text-gray-300 mb-4">
            Connecting African developers and showcasing tech talent across the continent.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="col-span-1">
          <h4 className="font-semibold text-afro-gold mb-4">Explore</h4>
          <ul className="space-y-3">
            <li><Link to="/projects" className="text-gray-300 hover:text-white">Projects</Link></li>
            <li><Link to="/tribes" className="text-gray-300 hover:text-white">Tribes</Link></li>
            <li><Link to="/discover" className="text-gray-300 hover:text-white">Discover Devs</Link></li>
            <li><Link to="/events" className="text-gray-300 hover:text-white">Events</Link></li>
          </ul>
        </div>
        
        <div className="col-span-1">
          <h4 className="font-semibold text-afro-gold mb-4">Resources</h4>
          <ul className="space-y-3">
            <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
            <li><Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
            <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
        
        <div className="col-span-1">
          <h4 className="font-semibold text-afro-gold mb-4">Join the Community</h4>
          <p className="text-gray-300 mb-4">
            Sign up to our newsletter to stay updated with the latest news and features.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none"
            />
            <button className="bg-afro-purple px-3 py-2 rounded-r-md">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-800 text-center text-gray-400">
        <p>© {new Date().getFullYear()} BlackTech Builders. All rights reserved.</p>
      </div>
    </footer>
  );
}
