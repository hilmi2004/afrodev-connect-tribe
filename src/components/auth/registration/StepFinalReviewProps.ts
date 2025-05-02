
import { RegistrationData } from "./types";

export interface StepFinalReviewProps {
  formData: RegistrationData;
  handleSingleCheckboxChange: (name: keyof RegistrationData, checked: boolean) => void;
}
