
import { motion } from "framer-motion";

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

export const MotionDiv = motion.div;
export const MotionButton = motion.button;
export const MotionImage = motion.img;
export const MotionHeading = motion.h1;
export const MotionCard = motion.div;
export const MotionSpan = motion.span;
