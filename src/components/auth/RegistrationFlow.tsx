
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Check, User, Mail, Lock, MapPin, Briefcase, Code, Calendar, Heart, MessageSquare, Star, Headphones, Info } from "lucide-react";
import { toast } from "sonner";
import { MotionDiv, fadeIn, slideInUp } from "@/components/ui/motion";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  experience: string;
  programmingLanguages: string[];
  startYear: string;
  learningStyle: string;
  interests: string[];
  careerGoals: string;
  communicationPreference: string;
  githubUsername: string;
  referralSource: string;
  platformGoals: string[];
  preferredCommunication: string;
  timeZone: string;
  workStyle: string;
  meetupInterest: boolean;
  mentorInterest: string;
  expectationsFromPlatform: string;
  agreedToTerms: boolean;
}

const experienceLevels = [
  "Beginner (0-1 years)",
  "Intermediate (1-3 years)",
  "Advanced (3-5 years)",
  "Senior (5+ years)"
];

const programmingLanguages = [
  "JavaScript", "Python", "Java", "C#", "PHP", "TypeScript", "Go", "Rust", "Swift", "Kotlin"
];

const learningStyles = [
  "Visual (videos, diagrams)", 
  "Auditory (podcasts, discussions)", 
  "Reading/Writing (documentation)", 
  "Kinesthetic (hands-on projects)"
];

const interests = [
  "Web Development", "Mobile Development", "DevOps", "Data Science", 
  "Machine Learning", "UI/UX Design", "Game Development", "Blockchain"
];

const careerGoals = [
  "Start a tech company", 
  "Work at a large tech company", 
  "Freelance/Consulting", 
  "Teach/Mentor others", 
  "Open Source contribution"
];

const referralSources = [
  "Social Media", 
  "Search Engine", 
  "Friend/Colleague", 
  "Tech Event/Conference", 
  "Blog/Article", 
  "YouTube/Video", 
  "Tech Community", 
  "Other"
];

const platformGoals = [
  "Find collaborators for projects",
  "Learn new technologies",
  "Network with African developers",
  "Share knowledge/mentor others",
  "Stay updated on local tech trends",
  "Find job opportunities",
  "Build portfolio projects",
  "Participate in hackathons"
];

const timeZones = [
  "GMT (West Africa)",
  "GMT+1 (West/Central Africa)",
  "GMT+2 (Central/Southern Africa)",
  "GMT+3 (East Africa)",
  "Other"
];

const workStyles = [
  "Full-time employed developer",
  "Part-time developer",
  "Freelancer",
  "Student",
  "Career-switcher",
  "Hobbyist"
];

export const RegistrationFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    experience: "",
    programmingLanguages: [],
    startYear: "",
    learningStyle: "",
    interests: [],
    careerGoals: "",
    communicationPreference: "email",
    githubUsername: "",
    referralSource: "",
    platformGoals: [],
    preferredCommunication: "asynchronous",
    timeZone: "",
    workStyle: "",
    meetupInterest: false,
    mentorInterest: "both",
    expectationsFromPlatform: "",
    agreedToTerms: false,
  });
  
  const totalSteps = 8; // Updated to include new steps
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (value: string, arrayName: keyof RegistrationData) => {
    // For checkboxes in arrays (multiple selection)
    setFormData(prev => {
      const currentArray = prev[arrayName] as string[];
      if (currentArray.includes(value)) {
        return { 
          ...prev, 
          [arrayName]: currentArray.filter(item => item !== value) 
        };
      } else {
        return { 
          ...prev, 
          [arrayName]: [...currentArray, value] 
        };
      }
    });
  };
  
  const handleBooleanChange = (checked: boolean, name: keyof RegistrationData) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSelectChange = (value: string, name: keyof RegistrationData) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAgreedToTermsChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreedToTerms: checked }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.country) {
        toast.error("Please fill all fields in this step");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }
    
    if (step === totalSteps) {
      if (!formData.agreedToTerms) {
        toast.error("Please agree to the terms and conditions");
        return;
      }
      
      console.log("Final registration data:", formData);
      toast.success("Registration successful! Welcome to AfroDevConnect!");
      return;
    }
    
    setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
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
        
      case 2:
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
        
      case 3:
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
                  <strong>Did you know?</strong> Studies show that understanding your learning style can increase learning efficiency by up to 40%. At AfroDevConnect, we tailor content delivery based on your preferences!
                </p>
              </div>
            </div>
          </MotionDiv>
        );
        
      case 4:
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
        
      case 5:
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

      case 6: // NEW: Discover & Referral
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
                  How did you hear about AfroDevConnect?
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
                  What do you hope to gain from using AfroDevConnect?
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

      case 7: // NEW: Work & Collaboration
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
        
      case 8: // Final step (previously step 6)
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
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-500">
            Step {step} of {totalSteps}
          </div>
          <div className="text-sm font-medium text-gray-500">
            {(step / totalSteps * 100).toFixed(0)}% Complete
          </div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-afro-purple to-afro-gold"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      
      {renderStepContent()}
      
      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 1}
          className="border-afro-purple text-afro-purple hover:bg-afro-purple/10"
        >
          <ArrowLeft size={16} className="mr-2" />
          Previous
        </Button>
        
        <Button onClick={nextStep} className="bg-gradient-to-r from-afro-purple to-afro-gold hover:opacity-90">
          {step === totalSteps ? (
            <>
              <Check size={16} className="mr-2" />
              Complete Registration
            </>
          ) : (
            <>
              Next
              <ArrowRight size={16} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

// Missing import
import { Textarea } from "@/components/ui/textarea";
import { Clock } from "lucide-react";
