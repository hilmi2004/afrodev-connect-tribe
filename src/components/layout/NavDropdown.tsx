
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { ChevronDown } from "lucide-react"; // <-- NEW

interface DropdownItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isCTA?: boolean;
  external?: boolean;
}

interface NavDropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  image: string;
  imageAlt: string;
  visualLabel?: string;
}

export function NavDropdown({
  trigger,
  items,
  image,
  imageAlt,
  visualLabel,
}: NavDropdownProps) {
  const [open, setOpen] = React.useState(false);

  // Handle hover open on parent
  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
      >
        <DropdownMenuTrigger asChild>
          <button
            className={clsx(
              "flex items-center gap-1 px-2 py-1 font-medium text-gray-700 hover:text-afro-purple focus:outline-none focus:text-afro-purple transition-colors hover-scale"
            )}
            tabIndex={-1}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            {/* Trigger content with ChevronDown icon */}
            <span className="flex items-center gap-1">
              {trigger}
              <ChevronDown className="ml-1" size={16} />
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className={clsx(
            "min-w-[340px] p-0 flex z-[100]",
            "border-none bg-white shadow-2xl"
          )}
          sideOffset={12}
        >
          <div className="w-2/3 flex flex-col py-2">
            {items.map((item) =>
              item.external ? (
                <a
                  href={item.href}
                  key={item.label}
                  className={clsx(
                    "flex items-center px-5 py-2 text-base group transition-colors cursor-pointer rounded-md",
                    "hover:bg-afro-purple/10 hover:text-afro-purple hover:underline",
                    item.isCTA &&
                      "bg-afro-purple text-white rounded-md hover:bg-afro-purple/80 font-semibold my-1 shadow-md"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <span>{item.label}</span>
                </a>
              ) : item.href ? (
                <Link
                  to={item.href}
                  key={item.label}
                  className={clsx(
                    "flex items-center px-5 py-2 text-base group transition-colors cursor-pointer rounded-md",
                    "hover:bg-afro-purple/10 hover:text-afro-purple hover:underline",
                    item.isCTA &&
                      "bg-afro-purple text-white rounded-md hover:bg-afro-purple/80 font-semibold my-1 shadow-md"
                  )}
                  onClick={item.onClick}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <DropdownMenuItem key={item.label} className="px-5 py-2 hover:bg-afro-purple/10 hover:text-afro-purple hover:underline">
                  {item.label}
                </DropdownMenuItem>
              )
            )}
          </div>
          {/* Visual/Image on the right */}
          <div className="w-1/3 hidden md:flex items-center justify-center bg-gradient-to-tl from-afro-purple/30 to-white rounded-tr-md rounded-br-md p-3 min-h-[180px]">
            <img
              src={image}
              alt={imageAlt}
              className="object-cover rounded-lg shadow-md max-h-32"
              style={{
                minWidth: "110px",
                background: "#E5DEFF",
                border: "2px solid #fff"
              }}
            />
          </div>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
