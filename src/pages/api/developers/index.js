// pages/api/developers/index.js
import { searchDevelopers } from '../../../services/developerService';
import connectDB from "../../../../backend/config/db.js";

export default async function handler(req, res) {
    // Connect to DB first
    await connectDB();

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const result = await searchDevelopers(req.query);

    if (!result.success) {
        return res.status(500).json({
            success: false,
            message: result.message
        });
    }

    return res.status(200).json(result);
}