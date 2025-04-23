
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { loadMoreAnimation } from "@/components/ui/motion";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

interface AnimatedLoadMoreProps {
  initialProjects: ProjectCardProps[];
  additionalProjects: ProjectCardProps[];
  renderProjectCard: (project: ProjectCardProps, index: number) => JSX.Element;
  columns?: number;
}

const AnimatedLoadMore = ({
  initialProjects,
  additionalProjects,
  renderProjectCard,
  columns = 3
}: AnimatedLoadMoreProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState(initialProjects);
  
  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedProjects([...initialProjects, ...additionalProjects]);
      setShowMore(true);
      setIsLoading(false);
    }, 1000);
  };
  
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };
  
  return (
    <div className="w-full space-y-10">
      <div className={`grid ${colClasses[columns as keyof typeof colClasses]} gap-6`}>
        {displayedProjects.slice(0, initialProjects.length).map((project, index) => 
          renderProjectCard(project, index)
        )}
      </div>
      
      <AnimatePresence>
        {showMore && (
          <motion.div
            variants={loadMoreAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`grid ${colClasses[columns as keyof typeof colClasses]} gap-6 mt-10`}
          >
            {displayedProjects.slice(initialProjects.length).map((project, index) => 
              renderProjectCard(project, index + initialProjects.length)
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {!showMore && (
        <div className="text-center mt-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={handleLoadMore} 
              disabled={isLoading}
              className="relative overflow-hidden bg-afro-purple hover:bg-afro-purple/90 px-8 py-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-pulse">Loading more projects...</span>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 bg-afro-gold"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, repeat: 0 }}
                  />
                </>
              ) : (
                'Show More Projects'
              )}
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AnimatedLoadMore;
