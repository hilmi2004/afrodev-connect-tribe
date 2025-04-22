
import { Logo } from "./nav/Logo";
import { MainNav } from "./nav/MainNav";
import { NavActions } from "./nav/NavActions";

export function Navbar() {
  return (
    <header className="w-full py-3 px-2 md:px-6 flex items-center justify-between bg-white shadow-sm border-b border-gray-200 relative z-20">
      <Logo />
      <MainNav />
      <NavActions />
    </header>
  );
}
