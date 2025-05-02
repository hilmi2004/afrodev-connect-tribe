
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ProgressBar } from "./registration/ProgressBar";
import { StepBasicInfo } from "./registration/StepBasicInfo";
import { StepDeveloperJourney } from "./registration/StepDeveloperJourney";
import { StepTechInterests } from "./registration/StepTechInterests";
import { StepLearningStyle } from "./registration/StepLearningStyle";
import { StepConnectCollaborate } from "./registration/StepConnectCollaborate";
import { StepDiscoveryReferral } from "./registration/StepDiscoveryReferral";
import { StepWorkCollaboration } from "./registration/StepWorkCollaboration";
import { StepFinalReview } from "./registration/StepFinalReview";
import { NavigationButtons } from "./registration/NavigationButtons";
import { RegistrationData } from "./registration/types";
import { useAuth } from "@/hooks/useAuth";

export const RegistrationFlow: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    experience: "",
    programmingLanguages: [],
    startYear: new Date().getFullYear().toString(),
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
    agreedToTerms: false
  });

  const totalSteps = 8;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: keyof RegistrationData) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value: string, arrayName: keyof RegistrationData) => {
    const array = formData[arrayName] as string[];
    const updatedArray = array.includes(value)
      ? array.filter(item => item !== value)
      : [...array, value];
    setFormData(prev => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleSingleCheckboxChange = (name: keyof RegistrationData, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // Validate form data
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreedToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "You must agree to the terms and conditions to register.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...registrationData } = formData;
      
      const success = await register(registrationData);
      
      if (success) {
        toast({
          title: "Registration Successful",
          description: "Welcome to AfroDevConnect! You are now logged in.",
          variant: "default",
        });
        navigate("/");
      } else {
        toast({
          title: "Registration Failed",
          description: "Please check your information and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the correct step
  const renderStep = () => {
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
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case 3:
        return (
          <StepTechInterests
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case 4:
        return (
          <StepLearningStyle
            formData={formData}
            handleSelectChange={handleSelectChange}
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
            handleSingleCheckboxChange={handleSingleCheckboxChange}
          />
        );
      case 8:
        return <StepFinalReview formData={formData} handleSingleCheckboxChange={handleSingleCheckboxChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <ProgressBar step={step} totalSteps={totalSteps} />
      
      <div className="min-h-[400px]">
        {renderStep()}
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
