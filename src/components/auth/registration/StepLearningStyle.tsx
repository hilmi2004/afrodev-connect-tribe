
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MotionDiv, fadeIn } from "@/components/ui/motion";
import { RegistrationData, learningStyles } from "./types";

interface StepLearningStyleProps {
  formData: RegistrationData;
  handleSelectChange: (value: string, name: keyof RegistrationData) => void;
}

export const StepLearningStyle: React.FC<StepLearningStyleProps> = ({
  formData,
  handleSelectChange
}) => {
  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn()}
      className="space-y-6"
    >
      <div className="relative bg-gradient-to-r from-afro-green to-afro-gold overflow-hidden h-40 rounded-xl mb-6">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
          alt="Learning and growth" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <h2 className="text-white text-2xl font-bold">Learning & Growth</h2>
          <p className="text-white text-opacity-80">Help us understand how you learn best</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-lg font-medium">How do you learn best?</Label>
          <RadioGroup 
            value={formData.learningStyle} 
            onValueChange={(value) => handleSelectChange(value, 'learningStyle')}
            className="space-y-3"
          >
            {learningStyles.map((style) => (
              <div key={style} className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-afro-purple/50 transition-colors">
                <RadioGroupItem value={style} id={style} />
                <Label htmlFor={style} className="cursor-pointer flex-grow">{style}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="p-4 bg-afro-purple/5 rounded-xl border border-afro-purple/20">
          <p className="text-sm text-gray-600">
            <strong>Did you know?</strong> Studies show that understanding your learning style can increase learning efficiency by up to 40%. At BlackTech, we tailor content delivery based on your preferences!
          </p>
        </div>
      </div>
    </MotionDiv>
  );
};
