
import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCTA?: boolean;
}

export interface StackItem {
  label: string;
  icon: React.ReactNode;
}

export interface NavImageMap {
  [key: string]: string;
}

