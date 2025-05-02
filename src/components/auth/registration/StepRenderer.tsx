
import React from "react";
import { RegistrationData } from "./types";
import { StepBasicInfo } from "./StepBasicInfo";
import { StepDeveloperJourney } from "./StepDeveloperJourney";
import { StepTechInterests } from "./StepTechInterests";
import { StepLearningStyle } from "./StepLearningStyle";
import { StepConnectCollaborate } from "./StepConnectCollaborate";
import { StepDiscoveryReferral } from "./StepDiscoveryReferral";
import { StepWorkCollaboration } from "./StepWorkCollaboration";
import { StepFinalReview } from "./StepFinalReview";

interface StepRendererProps {
  step: number;
  formData: RegistrationData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (value: string, name: keyof RegistrationData) => void;
  handleCheckboxChange: (value: string, arrayName: keyof RegistrationData) => void;
  handleSingleCheckboxChange: (name: keyof RegistrationData, checked: boolean) => void;
}

export const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  formData,
  handleInputChange,
  handleSelectChange,
  handleCheckboxChange,
  handleSingleCheckboxChange
}) => {
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
      return (
        <StepFinalReview
          formData={formData}
          handleSingleCheckboxChange={handleSingleCheckboxChange}
        />
      );
    default:
      return null;
  }
};
