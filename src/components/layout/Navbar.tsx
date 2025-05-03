
import { Logo } from "./nav/Logo";
import { MainNav } from "./nav/MainNav";
import { NavActions } from "./nav/NavActions";

export function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0 mr-4">
            <Logo />
          </div>
          <div className="hidden md:flex flex-1 items-center justify-center">
            <MainNav />
          </div>
          <div className="flex items-center">
            <NavActions />
          </div>
        </div>
      </div>
    </header>
  );
}
