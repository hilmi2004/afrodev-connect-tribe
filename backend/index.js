import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Routes and Middlewares
import authRoutes from './routes/authRoutes.js';
import projectRoutes from "./Routes/projectRoutes.js";
import tribeRoutes from "./Routes/tribeRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import errorHandler from './middlewares/error.js';
import { initializeSocket } from './sockets/socketManager.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Single CORS configuration (remove all others)
app.use(cors({
    origin: [
        'http://localhost:8080',
        'http://localhost:3000',
        process.env.CLIENT_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Socket.io configuration
const io = new Server(httpServer, {
    cors: {
        origin: [
            'http://localhost:8080',
            'http://localhost:3000',
            process.env.CLIENT_URL
        ].filter(Boolean),
        methods: ['GET', 'POST']
    }
});
initializeSocket(io);

// Database connection
const connectDB = async () => {
    try {
        const dbUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/blacktech';
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            retryWrites: true,
            w: 'majority'
        });
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ Database connection error:', err.message);
        process.exit(1);
    }
};

// Middlewares
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tribes', tribeRoutes);
app.use('/api/projects', projectRoutes);

// Health check
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
    res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    httpServer.close(() => process.exit(1));
});

startServer();