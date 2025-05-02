
import React from "react";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-500">
          Step {step} of {totalSteps}
        </div>
        <div className="text-sm font-medium text-gray-500">
          {progress.toFixed(0)}% Complete
        </div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-afro-purple to-afro-gold"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
