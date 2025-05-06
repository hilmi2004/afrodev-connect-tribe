import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Validate environment variables
const requiredEnvVars = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file) => {
    try {
        if (!file?.path) {
            throw new Error('No file path provided');
        }

        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'profile_images',
            width: 500,
            height: 500,
            crop: 'fill'
        });

        // Clean up
        try {
            await fs.promises.unlink(file.path);
        } catch (cleanupError) {
            console.error('File cleanup error:', cleanupError);
        }

        return result;
    } catch (error) {
        console.error('Detailed Cloudinary error:', {
            error: error.message,
            stack: error.stack,
            environment: {
                cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
                api_key: !!process.env.CLOUDINARY_API_KEY,
                api_secret: !!process.env.CLOUDINARY_API_SECRET
            }
        });
        throw error;
    }
};