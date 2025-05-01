
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Code } from "lucide-react";
import { MotionDiv, fadeIn } from "@/components/ui/motion";
import { RegistrationData } from "./types";

interface StepConnectCollaborateProps {
  formData: RegistrationData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (value: string, name: keyof RegistrationData) => void;
}

export const StepConnectCollaborate: React.FC<StepConnectCollaborateProps> = ({
  formData,
  handleInputChange,
  handleSelectChange
}) => {
  return (
    <MotionDiv
      initial="hidden"
      animate="visible"
      variants={fadeIn()}
      className="space-y-6"
    >
      <div className="relative bg-gradient-to-r from-afro-blue to-afro-green overflow-hidden h-40 rounded-xl mb-6">
        <img 
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop" 
          alt="Tech connections" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <h2 className="text-white text-2xl font-bold">Connect & Collaborate</h2>
          <p className="text-white text-opacity-80">How can we help you connect with others?</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-lg font-medium">How would you prefer to receive communications?</Label>
          <RadioGroup 
            value={formData.communicationPreference} 
            onValueChange={(value) => handleSelectChange(value, 'communicationPreference')}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200">
              <RadioGroupItem value="email" id="email-pref" />
              <Label htmlFor="email-pref">Email</Label>
            </div>
            <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200">
              <RadioGroupItem value="slack" id="slack-pref" />
              <Label htmlFor="slack-pref">Slack</Label>
            </div>
            <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200">
              <RadioGroupItem value="discord" id="discord-pref" />
              <Label htmlFor="discord-pref">Discord</Label>
            </div>
            <div className="flex items-center space-x-2 bg-white p-3 rounded-lg border border-gray-200">
              <RadioGroupItem value="whatsapp" id="whatsapp-pref" />
              <Label htmlFor="whatsapp-pref">WhatsApp</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="githubUsername" className="flex items-center">
            <Code size={16} className="mr-2 text-afro-purple" />
            GitHub Username (optional)
          </Label>
          <Input 
            id="githubUsername" 
            name="githubUsername"
            placeholder="yourname" 
            value={formData.githubUsername}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </MotionDiv>
  );
};
