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

// Routes
import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import tribeRoutes from './routes/tribeRoutes.js';
// import projectRoutes from './routes/projectRoutes.js';

// Middlewares
import errorHandler from './middlewares/error.js';
import { initializeSocket } from './sockets/socketManager.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const httpServer = createServer(app);

// Initialize Socket.io
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});
initializeSocket(io);

// Database connection
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MongoDB URI not configured in environment variables');
        }

        await mongoose.connect(process.env.MONGO_URI, {
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

// Apply middlewares
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// API Documentation (Swagger)
if (process.env.NODE_ENV === 'development') {
    const swaggerJsdoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'BlackTech Builders API',
                version: '1.0.0',
            },
        },
        apis: ['./routes/*.js'],
    };

    const specs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tribes', tribeRoutes);
app.use('/api/projects', projectRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const startServer = async () => {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        console.log(`📄 API Docs available at http://localhost:${PORT}/api-docs`);
    });
};

// Handle shutdown gracefully
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    httpServer.close(() => process.exit(1));
});

// Start the application
startServer();

export default app;