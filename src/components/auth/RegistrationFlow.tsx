
import React from "react";
import { ProgressBar } from "./registration/ProgressBar";
import { NavigationButtons } from "./registration/NavigationButtons";
import { StepRenderer } from "./registration/StepRenderer";
import { useRegistrationState } from "./registration/useRegistrationState";

export const RegistrationFlow: React.FC = () => {
  const {
    step,
    totalSteps,
    formData,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSingleCheckboxChange,
    handlePrevious,
    handleNext
  } = useRegistrationState();

  return (
    <div className="space-y-6">
      <ProgressBar step={step} totalSteps={totalSteps} />
      
      <div className="min-h-[400px]">
        <StepRenderer
          step={step}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSingleCheckboxChange={handleSingleCheckboxChange}
        />
      </div>
      
      <NavigationButtons 
        step={step} 
        totalSteps={totalSteps} 
        onPrevious={handlePrevious} 
        onNext={isSubmitting ? () => {} : handleNext} 
      />
    </div>
  );
};
