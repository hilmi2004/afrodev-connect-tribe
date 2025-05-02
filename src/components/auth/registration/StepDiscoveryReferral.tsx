
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Info, Star } from "lucide-react";
import { MotionDiv, fadeIn } from "@/components/ui/motion";
import { RegistrationData, referralSources, platformGoals } from "./types";

interface StepDiscoveryReferralProps {
  formData: RegistrationData;
  handleSelectChange: (value: string, name: keyof RegistrationData) => void;
  handleCheckboxChange: (value: string, arrayName: keyof RegistrationData) => void;
}

export const StepDiscoveryReferral: React.FC<StepDiscoveryReferralProps> = ({
  formData,
  handleSelectChange,
  handleCheckboxChange
}) => {
  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn()}
      className="space-y-6"
    >
      <div className="relative bg-gradient-to-r from-afro-purple to-afro-blue overflow-hidden h-40 rounded-xl mb-6">
        <img 
          src="https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1000&auto=format&fit=crop" 
          alt="Discovery" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <h2 className="text-white text-2xl font-bold">Discovery & Referral</h2>
          <p className="text-white text-opacity-80">Tell us how you found us and what you're looking for</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="flex items-center text-lg font-medium">
            <Info size={16} className="mr-2 text-afro-purple" />
            How did you hear about bLactech?
          </Label>
          <RadioGroup 
            value={formData.referralSource} 
            onValueChange={(value) => handleSelectChange(value, 'referralSource')}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {referralSources.map((source) => (
              <div key={source} className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-afro-purple/50 transition-colors">
                <RadioGroupItem value={source} id={source} />
                <Label htmlFor={source} className="cursor-pointer flex-grow">{source}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="space-y-3">
          <Label className="flex items-center text-lg font-medium">
            <Star size={16} className="mr-2 text-afro-purple" />
            What do you hope to gain from using BlackTECH?
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {platformGoals.map((goal) => (
              <div key={goal} className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 hover:border-afro-purple/50 transition-colors">
                <Checkbox 
                  id={`goal-${goal}`} 
                  checked={formData.platformGoals.includes(goal)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleCheckboxChange(goal, 'platformGoals');
                    } else {
                      handleCheckboxChange(goal, 'platformGoals');
                    }
                  }}
                />
                <Label htmlFor={`goal-${goal}`} className="cursor-pointer">{goal}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};
