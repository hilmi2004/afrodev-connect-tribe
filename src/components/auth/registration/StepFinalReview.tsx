
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import { MotionDiv, fadeIn } from "@/components/ui/motion";
import { RegistrationData } from "./types";

interface StepFinalReviewProps {
  formData: RegistrationData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAgreedToTermsChange: (checked: boolean) => void;
}

export const StepFinalReview: React.FC<StepFinalReviewProps> = ({
  formData,
  handleInputChange,
  handleAgreedToTermsChange
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
          src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1000&auto=format&fit=crop" 
          alt="Almost there" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <h2 className="text-white text-2xl font-bold">Almost There!</h2>
          <p className="text-white text-opacity-80">Review and finalize your registration</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="expectationsFromPlatform" className="text-lg font-medium flex items-center">
            <MessageSquare size={16} className="mr-2 text-afro-purple" />
            Any specific expectations from AfroDevConnect?
          </Label>
          <Textarea 
            id="expectationsFromPlatform"
            name="expectationsFromPlatform"
            placeholder="Share any specific expectations, suggestions, or questions you have..."
            value={formData.expectationsFromPlatform}
            onChange={handleInputChange}
            className="min-h-[100px]"
          />
        </div>
      
        <div className="bg-afro-purple/5 border border-afro-purple/20 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-xl text-afro-purple">Registration Summary</h3>
          
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="tech">Tech Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Basic Info</h4>
                  <p className="text-gray-900">{formData.fullName}</p>
                  <p className="text-gray-900">{formData.email}</p>
                  <p className="text-gray-900">{formData.country}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Work & Timezone</h4>
                  <p className="text-gray-900">Time Zone: {formData.timeZone || "Not specified"}</p>
                  <p className="text-gray-900">Work Style: {formData.workStyle || "Not specified"}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tech" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Developer Profile</h4>
                  <p className="text-gray-900">Experience: {formData.experience || "Not specified"}</p>
                  <p className="text-gray-900">Started coding: {formData.startYear || "Not specified"}</p>
                  <p className="text-gray-900">
                    Languages: {formData.programmingLanguages.join(", ") || "Not specified"}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Interests & Goals</h4>
                  <p className="text-gray-900">
                    Interests: {formData.interests.join(", ") || "Not specified"}
                  </p>
                  <p className="text-gray-900">
                    Career Goal: {formData.careerGoals || "Not specified"}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Learning & Communication</h4>
                  <p className="text-gray-900">
                    Learning Style: {formData.learningStyle || "Not specified"}
                  </p>
                  <p className="text-gray-900">
                    Communication: {formData.communicationPreference || "Not specified"}
                  </p>
                  {formData.githubUsername && (
                    <p className="text-gray-900">GitHub: {formData.githubUsername}</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Platform Usage</h4>
                  <p className="text-gray-900">
                    Heard about us: {formData.referralSource || "Not specified"}
                  </p>
                  <p className="text-gray-900">
                    Mentorship: {formData.mentorInterest || "Not specified"}
                  </p>
                  <p className="text-gray-900">
                    Meetups: {formData.meetupInterest ? "Interested" : "Not interested"}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="terms" 
            checked={formData.agreedToTerms}
            onCheckedChange={(checked) => handleAgreedToTermsChange(checked as boolean)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions
            </Label>
            <p className="text-xs text-muted-foreground">
              By checking this box, you agree to our{" "}
              <a href="#" className="text-afro-purple underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-afro-purple underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};
