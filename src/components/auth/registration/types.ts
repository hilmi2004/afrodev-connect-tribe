
export interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  experience: string;
  programmingLanguages: string[];
  languages: string[];
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

export const experienceLevels = [
  "Beginner (0-1 years)",
  "Intermediate (1-3 years)",
  "Advanced (3-5 years)",
  "Senior (5+ years)"
];

export const programmingLanguages = [
  "JavaScript", "Python", "Java", "C#", "PHP", "TypeScript", "Go", "Rust", "Swift", "Kotlin"
];

export const learningStyles = [
  "Visual (videos, diagrams)", 
  "Auditory (podcasts, discussions)", 
  "Reading/Writing (documentation)", 
  "Kinesthetic (hands-on projects)"
];

export const interests = [
  "Web Development", "Mobile Development", "DevOps", "Data Science", 
  "Machine Learning", "UI/UX Design", "Game Development", "Blockchain"
];

// export const languages = [
//     "English", "Swahili","Hausa","Igbo","Yoruba","Ebira","French"
// ];

export const careerGoals = [
  "Start a tech company", 
  "Work at a large tech company", 
  "Freelance/Consulting", 
  "Teach/Mentor others", 
  "Open Source contribution"
];

export const referralSources = [
  "Social Media", 
  "Search Engine", 
  "Friend/Colleague", 
  "Tech Event/Conference", 
  "Blog/Article", 
  "YouTube/Video", 
  "Tech Community", 
  "Other"
];

export const platformGoals = [
  "Find collaborators for projects",
  "Learn new technologies",
  "Network with African developers",
  "Share knowledge/mentor others",
  "Stay updated on local tech trends",
  "Find job opportunities",
  "Build portfolio projects",
  "Participate in hackathons"
];

export const timeZones = [
  "GMT (West Africa)",
  "GMT+1 (West/Central Africa)",
  "GMT+2 (Central/Southern Africa)",
  "GMT+3 (East Africa)",
  "Other"
];

export const workStyles = [
  "Full-time employed developer",
  "Part-time developer",
  "Freelancer",
  "Student",
  "Career-switcher",
  "Hobbyist"
];
