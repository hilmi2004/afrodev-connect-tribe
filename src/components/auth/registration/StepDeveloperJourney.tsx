
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Code, Calendar } from "lucide-react";
import { MotionDiv, fadeIn } from "@/components/ui/motion";
import { RegistrationData, experienceLevels, programmingLanguages } from "./types";

interface StepDeveloperJourneyProps {
  formData: RegistrationData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (value: string, name: keyof RegistrationData) => void;
  handleCheckboxChange: (value: string, arrayName: keyof RegistrationData) => void;
}

export const StepDeveloperJourney: React.FC<StepDeveloperJourneyProps> = ({
  formData,
  handleInputChange,
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
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop" 
          alt="Developer journey" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <h2 className="text-white text-2xl font-bold">Your Developer Journey</h2>
          <p className="text-white text-opacity-80">Tell us about your experience</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="experience" className="flex items-center">
            <Briefcase size={16} className="mr-2 text-afro-purple" />
            What's your development experience level?
          </Label>
          <RadioGroup 
            value={formData.experience} 
            onValueChange={(value) => handleSelectChange(value, 'experience')}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {experienceLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-afro-purple/50 transition-colors">
                <RadioGroupItem value={level} id={level} />
                <Label htmlFor={level} className="cursor-pointer flex-grow">{level}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="space-y-3">
          <Label className="flex items-center">
            <Code size={16} className="mr-2 text-afro-purple" />
            Which programming languages are you comfortable with?
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {programmingLanguages.map((language) => (
              <div key={language} className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-gray-200 hover:border-afro-purple/50 transition-colors">
                <Checkbox 
                  id={language} 
                  checked={formData.programmingLanguages.includes(language)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleCheckboxChange(language, 'programmingLanguages');
                    } else {
                      handleCheckboxChange(language, 'programmingLanguages');
                    }
                  }}
                />
                <Label htmlFor={language} className="cursor-pointer">{language}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="startYear" className="flex items-center">
            <Calendar size={16} className="mr-2 text-afro-purple" />
            When did you start coding?
          </Label>
          <Select value={formData.startYear} onValueChange={(value) => handleSelectChange(value, 'startYear')}>
            <SelectTrigger id="startYear">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i)
                .map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              <SelectItem value="earlier">Earlier</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </MotionDiv>
  );
};
