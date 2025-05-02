
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface NavigationButtonsProps {
  step: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  step,
  totalSteps,
  onPrevious,
  onNext
}) => {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={step === 1}
        className="border-afro-purple text-afro-purple hover:bg-afro-purple/10"
      >
        <ArrowLeft size={16} className="mr-2" />
        Previous
      </Button>
      
      <Button onClick={onNext} className="bg-gradient-to-r from-afro-purple to-afro-gold hover:opacity-90">
        {step === totalSteps ? (
          <>
            <Check size={16} className="mr-2" />
            Complete Registration
          </>
        ) : (
          <>
            Next
            <ArrowRight size={16} className="ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};
