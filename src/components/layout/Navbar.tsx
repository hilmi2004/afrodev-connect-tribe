
import { Logo } from "./nav/Logo";
import { MainNav } from "./nav/MainNav";
import { NavActions } from "./nav/NavActions";

export function Navbar() {
  return (
   <div className="flex items-center justify-between w-full px-4 overflow-hidden">
  <div className="flex items-center flex-1 min-w-0">
    <MainNav />
  </div>
  <div className="flex-shrink-0">
    <NavActions />
  </div>
</div>
  );
}
