
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Briefcase } from "lucide-react";
import { MotionDiv, fadeIn } from "@/components/ui/motion";
import { RegistrationData, timeZones, workStyles } from "./types";

interface StepWorkCollaborationProps {
  formData: RegistrationData;
  handleSelectChange: (value: string, name: keyof RegistrationData) => void;
  handleBooleanChange: (checked: boolean, name: keyof RegistrationData) => void;
}

export const StepWorkCollaboration: React.FC<StepWorkCollaborationProps> = ({
  formData,
  handleSelectChange,
  handleBooleanChange
}) => {
  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn()}
      className="space-y-6"
    >
      <div className="relative bg-gradient-to-r from-afro-green to-afro-red overflow-hidden h-40 rounded-xl mb-6">
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop" 
          alt="Collaboration" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <h2 className="text-white text-2xl font-bold">Work & Collaboration</h2>
          <p className="text-white text-opacity-80">Help us understand your work preferences</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="flex items-center text-lg font-medium">
            <Clock size={16} className="mr-2 text-afro-purple" />
            What time zone are you in?
          </Label>
          <RadioGroup 
            value={formData.timeZone} 
            onValueChange={(value) => handleSelectChange(value, 'timeZone')}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {timeZones.map((tz) => (
              <div key={tz} className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-afro-purple/50 transition-colors">
                <RadioGroupItem value={tz} id={tz} />
                <Label htmlFor={tz} className="cursor-pointer flex-grow">{tz}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="space-y-3">
          <Label className="flex items-center text-lg font-medium">
            <Briefcase size={16} className="mr-2 text-afro-purple" />
            Which best describes your current work style?
          </Label>
          <RadioGroup 
            value={formData.workStyle} 
            onValueChange={(value) => handleSelectChange(value, 'workStyle')}
            className="space-y-2"
          >
            {workStyles.map((style) => (
              <div key={style} className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-afro-purple/50 transition-colors">
                <RadioGroupItem value={style} id={style} />
                <Label htmlFor={style} className="cursor-pointer flex-grow">{style}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="space-y-3">
          <Label className="text-lg font-medium">Meetups & Mentorship</Label>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="meetupInterest"
                checked={formData.meetupInterest}
                onCheckedChange={(checked) => handleBooleanChange(checked as boolean, 'meetupInterest')}
              />
              <Label htmlFor="meetupInterest">I'm interested in attending in-person tech meetups</Label>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">I'm interested in:</Label>
              <RadioGroup 
                value={formData.mentorInterest} 
                onValueChange={(value) => handleSelectChange(value, 'mentorInterest')}
                className="space-y-2 pl-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mentor" id="mentor" />
                  <Label htmlFor="mentor">Being a mentor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mentee" id="mentee" />
                  <Label htmlFor="mentee">Being a mentee</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">Both mentoring and being mentored</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neither" id="neither" />
                  <Label htmlFor="neither">Neither at this time</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};
