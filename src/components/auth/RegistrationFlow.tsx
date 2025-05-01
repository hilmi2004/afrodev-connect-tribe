
import React, { useState } from "react";
import { toast } from "sonner";

// Import registration step components
import { StepBasicInfo } from "./registration/StepBasicInfo";
import { StepDeveloperJourney } from "./registration/StepDeveloperJourney";
import { StepLearningStyle } from "./registration/StepLearningStyle";
import { StepTechInterests } from "./registration/StepTechInterests";
import { StepConnectCollaborate } from "./registration/StepConnectCollaborate";
import { StepDiscoveryReferral } from "./registration/StepDiscoveryReferral";
import { StepWorkCollaboration } from "./registration/StepWorkCollaboration";
import { StepFinalReview } from "./registration/StepFinalReview";
import { ProgressBar } from "./registration/ProgressBar";
import { NavigationButtons } from "./registration/NavigationButtons";

// Import types
import { RegistrationData } from "./registration/types";

export const RegistrationFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    experience: "",
    programmingLanguages: [],
    startYear: "",
    learningStyle: "",
    interests: [],
    careerGoals: "",
    communicationPreference: "email",
    githubUsername: "",
    referralSource: "",
    platformGoals: [],
    preferredCommunication: "asynchronous",
    timeZone: "",
    workStyle: "",
    meetupInterest: false,
    mentorInterest: "both",
    expectationsFromPlatform: "",
    agreedToTerms: false,
  });
  
  const totalSteps = 8; 
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (value: string, arrayName: keyof RegistrationData) => {
    // For checkboxes in arrays (multiple selection)
    setFormData(prev => {
      const currentArray = prev[arrayName] as string[];
      if (currentArray.includes(value)) {
        return { 
          ...prev, 
          [arrayName]: currentArray.filter(item => item !== value) 
        };
      } else {
        return { 
          ...prev, 
          [arrayName]: [...currentArray, value] 
        };
      }
    });
  };
  
  const handleBooleanChange = (checked: boolean, name: keyof RegistrationData) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (value: string, name: keyof RegistrationData) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAgreedToTermsChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreedToTerms: checked }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.country) {
        toast.error("Please fill all fields in this step");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }
    
    if (step === totalSteps) {
      if (!formData.agreedToTerms) {
        toast.error("Please agree to the terms and conditions");
        return;
      }
      
      console.log("Final registration data:", formData);
      toast.success("Registration successful! Welcome to AfroDevConnect!");
      return;
    }
    
    setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <StepBasicInfo 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleSelectChange={handleSelectChange} 
          />
        );
        
      case 2:
        return (
          <StepDeveloperJourney 
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
        
      case 3:
        return (
          <StepLearningStyle 
            formData={formData}
            handleSelectChange={handleSelectChange}
          />
        );
        
      case 4:
        return (
          <StepTechInterests 
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
        
      case 5:
        return (
          <StepConnectCollaborate 
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        );

      case 6:
        return (
          <StepDiscoveryReferral 
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        );

      case 7:
        return (
          <StepWorkCollaboration 
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleBooleanChange={handleBooleanChange}
          />
        );
        
      case 8:
        return (
          <StepFinalReview 
            formData={formData}
            handleInputChange={handleInputChange}
            handleAgreedToTermsChange={handleAgreedToTermsChange}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ProgressBar currentStep={step} totalSteps={totalSteps} />
      
      {renderStepContent()}
      
      <div className="mt-8">
        <NavigationButtons 
          step={step} 
          totalSteps={totalSteps} 
          onPrevious={prevStep} 
          onNext={nextStep} 
        />
      </div>
    </div>
  );
};
