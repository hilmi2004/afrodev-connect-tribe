
import { Logo } from "./nav/Logo";
import { MainNav } from "./nav/MainNav";
import { NavActions } from "./nav/NavActions";

export function Navbar() {
  return (
    <header
      className="w-full sticky top-0 left-0 z-40 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-2 md:px-8 py-3 md:py-4 transition-all backdrop-blur-md"
      style={{ minHeight: "68px" }}
    >
      <Logo />
      <MainNav />
      <NavActions />
    </header>
  );
}

