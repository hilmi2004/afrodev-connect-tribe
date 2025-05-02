
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { RegistrationData } from "./types";

export const useRegistrationState = () => {
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
    if (step < 8) { // 8 is the total number of steps
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

  return {
    step,
    totalSteps: 8,
    formData,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSingleCheckboxChange,
    handlePrevious,
    handleNext
  };
};
