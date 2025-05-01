
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Lock, MapPin } from "lucide-react";
import { MotionDiv, fadeIn } from "@/components/ui/motion";
import { RegistrationData } from "./types";

interface StepBasicInfoProps {
  formData: RegistrationData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (value: string, name: keyof RegistrationData) => void;
}

export const StepBasicInfo: React.FC<StepBasicInfoProps> = ({
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
      <div className="relative bg-gradient-to-r from-afro-purple to-afro-gold overflow-hidden h-40 rounded-xl mb-6">
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop" 
          alt="Developer working" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <h2 className="text-white text-2xl font-bold">Welcome to AfroDevConnect!</h2>
          <p className="text-white text-opacity-80">Let's get started with your basic info</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center">
            <User size={16} className="mr-2 text-afro-purple" />
            Full Name
          </Label>
          <Input 
            id="fullName" 
            name="fullName"
            placeholder="John Doe" 
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center">
            <Mail size={16} className="mr-2 text-afro-purple" />
            Email
          </Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            placeholder="name@example.com" 
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center">
              <Lock size={16} className="mr-2 text-afro-purple" />
              Password
            </Label>
            <Input 
              id="password" 
              name="password"
              type="password" 
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              name="confirmPassword"
              type="password" 
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country" className="flex items-center">
            <MapPin size={16} className="mr-2 text-afro-purple" />
            Country
          </Label>
          <Select value={formData.country} onValueChange={(value) => handleSelectChange(value, 'country')}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nigeria">Nigeria</SelectItem>
              <SelectItem value="Kenya">Kenya</SelectItem>
              <SelectItem value="South Africa">South Africa</SelectItem>
              <SelectItem value="Ghana">Ghana</SelectItem>
              <SelectItem value="Ethiopia">Ethiopia</SelectItem>
              <SelectItem value="Egypt">Egypt</SelectItem>
              <SelectItem value="Other">Other African Country</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </MotionDiv>
  );
};
