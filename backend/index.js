// backend/index.js
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import path from 'path';
import { fileURLToPath } from 'url';

// Remove xss-clean and use helmet's built-in XSS protection instead
// import xss from 'xss-clean'; // Remove this line

// Routes
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import tribeRoutes from './routes/tribeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from "./Routes/articleRoutes.js";
import followRoutes from "./Routes/followRoutes.js";
import newsRoutes from "./Routes/newsRoutes.js";
import rssRoutes from "./Routes/rssRoutes.js";
import {commentRoutes} from "./Routes/commentRoutes.js";
import profileRoutes from "./Routes/profileRoutes.js";
import {protect} from "./Middlewares/auth.js";
import developersRouter from "./Routes/developers.js"
import {scheduleNewsRefresh} from "./jobs/newsRefreshJob.js";
// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// Database connection
const connectDB = async () => {
    try {
        const dbUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blacktech';
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ Database connection error:', err.message);
        process.exit(1);
    }
};

// scheduleNewsRefresh();
console.log('News refresh job scheduled');
// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: 'Too many requests from this IP, please try again later'
});

// Security middlewares
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://*"],
            connectSrc: ["'self'", process.env.CLIENT_URL || 'http://localhost:3000']
        }
    },
    xssFilter: true // Enable XSS protection in helmet
}));

app.use(hpp());
app.use(limiter);
app.use(compression());

// CORS configuration
// CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:8080',
        'http://localhost:3000',
        'http://localhost:5000',
        process.env.CLIENT_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization','X-Debug'],
    exposedHeaders: ['Authorization']
};
app.use(cors(corsOptions));

// Socket.io configuration
const io = new Server(httpServer, {
    cors: corsOptions,
    pingTimeout: 60000,
    serveClient: false
});

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tribes', tribeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/rss', rssRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/developers', developersRouter);
app.use('/api/profile', protect, profileRoutes);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        path: req.originalUrl
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Start server
const startServer = async () => {
    await connectDB();
    console.log('✅ Database connected, scheduling jobs...');

    try {
        scheduleNewsRefresh();
        console.log('✅ News refresh job scheduled');
    } catch (err) {
        console.error('❌ Failed to schedule news refresh:', err);
    }

    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer();