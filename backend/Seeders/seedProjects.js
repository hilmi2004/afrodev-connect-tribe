import mongoose from 'mongoose';
import Project from '../models/Project.js';
import User from '../models/User.js';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/blacktech');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

const sampleProjects = [
    {
        title: "AfroDev Community Platform",
        description: "A platform connecting African developers with opportunities",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Kwame Nkrumah",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=400",
        repoUrl: "https://github.com/example/afrodev",
        demoUrl: "https://afrodev.example.com",
        techStack: ["React", "Node.js", "MongoDB"],
        category: "Web Development",
        status: "in-progress",
        lookingForContributors: true,
        tags: ["community", "platform", "africa"]
    },
    {
        title: "E-commerce for African Artisans",
        description: "Marketplace for traditional African crafts",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Amina Mohamed",
        image: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D",
        techStack: ["Next.js", "Stripe", "Firebase"],
        category: "E-commerce",
        status: "idea",
        tags: ["ecommerce", "artisans"]
    },
    {
        title: "Agricultural IoT Solution",
        description: "IoT devices for small-scale farmers in Africa",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Chinedu Okeke",
        repoUrl: "https://github.com/example/agri-iot",
        image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        techStack: ["Python", "Raspberry Pi", "Django"],
        category: "IoT",
        status: "seeking-help",
        lookingForContributors: true,
        tags: ["agriculture", "iot", "hardware"]
    },
    {
        title: "African Language Learning App",
        description: "Interactive app for learning African languages",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Nadia Kamau",
        image: "https://images.unsplash.com/photo-1683822156986-ce59ca2e39ca?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWZyaWNhbiUyMGxhbmd1YWdlfGVufDB8fDB8fHww",
        demoUrl: "https://langlearn.example.com",
        techStack: ["Flutter", "Firebase"],
        category: "Mobile Development",
        status: "in-progress",
        tags: ["education", "languages"]
    },
    {
        title: "Renewable Energy Tracker",
        description: "Dashboard for tracking renewable energy projects in Africa",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Tunde Adeleke",
        image: "https://plus.unsplash.com/premium_photo-1678743133487-d501f3b0696b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVuZXdhYmxlJTIwZW5lcmd5fGVufDB8fDB8fHww",
        techStack: ["Vue.js", "Python", "PostgreSQL"],
        category: "Data Visualization",
        status: "completed",
        tags: ["energy", "sustainability"]
    },
    {
        title: "Health Clinic Management System",
        description: "Open source system for rural health clinics",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Dr. Fatoumata Diallo",
        repoUrl: "https://github.com/example/clinic-system",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoJTIwY2xpbmljfGVufDB8fDB8fHww",
        techStack: ["Java", "Spring Boot", "MySQL"],
        category: "Healthcare",
        status: "in-progress",
        lookingForContributors: true,
        tags: ["healthcare", "open-source"]
    },
    {
        title: "African Recipe Sharing Platform",
        description: "Community for sharing authentic African recipes",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Zanele Dlamini",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWZyaWNhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
        techStack: ["React Native", "Node.js"],
        category: "Food Tech",
        status: "idea",
        tags: ["food", "culture"]
    },

    // Additional Projects from your JSON block
    {
        title: "AfriEats Food Delivery",
        description: "A food delivery platform for local African cuisines with realtime tracking and payment integration.",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Chioma Eze",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400",
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        category: "Food Tech",
        status: "completed",
        tags: ["delivery", "payments"]
    },
    {
        title: "SavannahPay",
        description: "A mobile payment solution designed for small businesses across East Africa with low bandwidth requirements.",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Mark Ochieng",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=400",
        techStack: ["Flutter", "Firebase", "M-Pesa API"],
        category: "FinTech",
        status: "completed",
        tags: ["payments", "mobile", "africa"]
    },
    {
        title: "EduConnect",
        description: "An education platform connecting students with tutors, featuring offline capabilities for rural areas.",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Aisha Diallo",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400",
        techStack: ["Vue.js", "Django", "PostgreSQL"],
        category: "EdTech",
        status: "in-progress",
        tags: ["education", "offline"]
    },
    {
        title: "HealthConnect Africa",
        description: "Telemedicine platform connecting rural communities with healthcare professionals.",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "David Mensah",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400",
        techStack: ["React Native", "Express", "MongoDB", "WebRTC"],
        category: "Healthcare",
        status: "in-progress",
        tags: ["telemedicine", "rural"]
    },
    {
        title: "EcoTrack",
        description: "Environmental monitoring system for tracking pollution levels in major African cities.",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Sarah Kimani",
        image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=600&h=400",
        techStack: ["IoT", "Python", "TensorFlow", "AWS"],
        category: "Environmental",
        status: "in-progress",
        tags: ["pollution", "iot", "monitoring"]
    },
    {
        title: "AgriTech Solutions",
        description: "Smart farming platform using AI to optimize crop yields for small-scale farmers.",
        creator: new mongoose.Types.ObjectId(),
        creatorName: "Emmanuel Tamba",
        image: "https://images.unsplash.com/photo-1590682687861-89c0c62f3b51?auto=format&fit=crop&w=600&h=400",
        techStack: ["Machine Learning", "Django", "PostgreSQL"],
        category: "AgriTech",
        status: "completed",
        tags: ["farming", "ai", "smart"]
    }
];

const seedProjects = async () => {
    await connectDB();

    try {
        await Project.deleteMany({});
        console.log('Cleared existing projects');

        const createdProjects = await Project.insertMany(sampleProjects);
        console.log(`Successfully seeded ${createdProjects.length} projects`);

        process.exit(0);
    } catch (err) {
        console.error('Error seeding projects:', err);
        process.exit(1);
    }
};

seedProjects();
