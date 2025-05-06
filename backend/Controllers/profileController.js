import User from '../models/User.js';
import mongoose from 'mongoose';
import { uploadToCloudinary } from '../utils/cloudinary.js';

// Get user profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate('joinedTribes', 'name image members')
            .populate('createdRoadmaps', 'title description')
            .populate('savedRoadmaps', 'title description');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error when fetching profile'
        });
    }
};

// Update profile
export const updateProfile = async (req, res) => {
    try {
        const {
            fullName,
            bio,
            country,
            programmingLanguages,
            socialLinks,
            experience,
            education
        } = req.body;

        // Build update object
        const updateData = {};
        if (fullName) updateData.fullName = fullName;
        if (bio) updateData.bio = bio;
        if (country) updateData.country = country;
        if (programmingLanguages) updateData.programmingLanguages = programmingLanguages;
        if (socialLinks) updateData.socialLinks = socialLinks;
        if (experience) updateData.experience = experience;
        if (education) updateData.education = education;

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error when updating profile'
        });
    }
};

// Update profile image
// Update profile image
export const updateProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided or file upload failed'
            });
        }

        // Check file size
        if (req.file.size > 5 * 1024 * 1024) {
            return res.status(400).json({
                success: false,
                message: 'File size exceeds 5MB limit'
            });
        }

        // Upload to Cloudinary
        let result;
        try {
            result = await uploadToCloudinary(req.file);
        } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return res.status(500).json({
                success: false,
                message: 'Failed to upload image to cloud storage'
            });
        }

        // Update user profile image
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { profileImage: result.secure_url } },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Profile image updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error updating profile image:', error);
        res.status(500).json({
            success: false,
            message: 'Server error when updating profile image',
            error: error.message
        });
    }
};