
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from "@/components/ui/button";

export const fadeIn = (delay: number = 0.1) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5
    }
  }
});

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const scaleIn = (delay: number = 0) => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      duration: 0.4,
      ease: "easeOut"
    }
  }
});

export const slideInLeft = (delay: number = 0) => ({
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut"
    }
  }
});

export const slideInRight = (delay: number = 0) => ({
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut"
    }
  }
});

export const slideInUp = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut"
    }
  }
});

export const rotateIn = (delay: number = 0) => ({
  hidden: { opacity: 0, rotate: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: "easeOut"
    }
  }
});

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity }
};

export const shimmerAnimation = {
  x: ["0%", "100%"],
  transition: { 
    duration: 1.5, 
    repeat: Infinity, 
    repeatType: "mirror" as const
  }
};

export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const loadMoreAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionImage = motion.img;
export const MotionHeading = motion.h1;
export const MotionCard = motion.div;
export const MotionSpan = motion.span;
export const MotionP = motion.p;
export const MotionUl = motion.ul;
export const MotionLi = motion.li;
export const MotionA = motion.a;
export const MotionSection = motion.section;

// Custom component to support Shadcn Button props with motion
type MotionButtonWithVariantProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  whileHover?: any;
  whileTap?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
};

export const MotionButtonWithVariant = motion(forwardRef<HTMLButtonElement, MotionButtonWithVariantProps>(
  ({ children, variant, size, className, whileHover, whileTap, initial, animate, exit, transition, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        {...props}
      >
        {children}
      </Button>
    );
  }
));
MotionButtonWithVariant.displayName = "MotionButtonWithVariant";
