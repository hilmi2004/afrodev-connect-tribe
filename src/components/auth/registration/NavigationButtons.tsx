
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

interface NavigationButtonsProps {
  step: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  step,
  totalSteps,
  onPrevious,
  onNext,
  isSubmitting = false
}) => {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={step === 1 || isSubmitting}
        className="border-afro-purple text-afro-purple hover:bg-afro-purple/10"
      >
        <ArrowLeft size={16} className="mr-2" />
        Previous
      </Button>
      
      <Button 
        onClick={onNext} 
        disabled={isSubmitting}
        className="bg-gradient-to-r from-afro-purple to-afro-gold hover:opacity-90"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Processing...
          </>
        ) : step === totalSteps ? (
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
