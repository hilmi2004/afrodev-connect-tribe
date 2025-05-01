
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart } from "lucide-react";
import { MotionDiv, fadeIn } from "@/components/ui/motion";
import { RegistrationData, interests, careerGoals } from "./types";

interface StepTechInterestsProps {
  formData: RegistrationData;
  handleSelectChange: (value: string, name: keyof RegistrationData) => void;
  handleCheckboxChange: (value: string, arrayName: keyof RegistrationData) => void;
}

export const StepTechInterests: React.FC<StepTechInterestsProps> = ({
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
      <div className="relative bg-gradient-to-r from-afro-gold to-afro-red overflow-hidden h-40 rounded-xl mb-6">
        <img 
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop" 
          alt="Tech interests" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <h2 className="text-white text-2xl font-bold">Your Tech Interests</h2>
          <p className="text-white text-opacity-80">What tech areas excite you the most?</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="flex items-center text-lg font-medium">
            <Heart size={16} className="mr-2 text-afro-purple" />
            Select your tech interests
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            {interests.map((interest) => (
              <div key={interest} className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-afro-purple/50 transition-colors">
                <Checkbox 
                  id={interest} 
                  checked={formData.interests.includes(interest)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleCheckboxChange(interest, 'interests');
                    } else {
                      handleCheckboxChange(interest, 'interests');
                    }
                  }}
                />
                <Label htmlFor={interest} className="cursor-pointer">{interest}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="careerGoals" className="text-lg font-medium">What's your primary career goal?</Label>
          <RadioGroup 
            value={formData.careerGoals} 
            onValueChange={(value) => handleSelectChange(value, 'careerGoals')}
            className="space-y-3"
          >
            {careerGoals.map((goal) => (
              <div key={goal} className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-afro-purple/50 transition-colors">
                <RadioGroupItem value={goal} id={goal} />
                <Label htmlFor={goal} className="cursor-pointer flex-grow">{goal}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </MotionDiv>
  );
};
