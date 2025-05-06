// services/developerService.js
import User from "../../backend/Models/User.js";

export const searchDevelopers = async (searchParams) => {
    try {
        const { search, country, skill, limit = 20, skip = 0 } = searchParams;

        // Build the query
        const query = {};

        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { bio: { $regex: search, $options: 'i' } }
            ];
        }

        if (country) {
            query.country = { $regex: country, $options: 'i' };
        }

        if (skill) {
            query.programmingLanguages = { $in: [skill] };
        }

        // Get developers with pagination
        const developers = await User.find(query)
            .select('fullName country bio interests programmingLanguages languages  profileImage followers following available')
            .limit(parseInt(limit))
            .skip(parseInt(skip));

        const total = await User.countDocuments(query);

        return {
            success: true,
            data: developers,
            total,
            limit: parseInt(limit),
            skip: parseInt(skip)
        };
    } catch (error) {
        console.error('Error searching developers:', error);
        return {
            success: false,
            message: error.message
        };
    }
};

export const getDeveloperById = async (userId) => {
    try {
        const developer = await User.findById(userId)
            .select('-password') // Exclude password
            .populate('followers', 'fullName profileImage')
            .populate('following', 'fullName profileImage');

        if (!developer) {
            return { success: false, message: 'Developer not found' };
        }

        return { success: true, developer };
    } catch (error) {
        console.error('Error fetching developer:', error);
        return { success: false, message: error.message };
    }
};

export const getDeveloperFollowers = async (userId, limit = 20, skip = 0) => {
    try {
        const developer = await User.findById(userId)
            .select('followers')
            .populate({
                path: 'followers',
                select: 'fullName profileImage bio',
                options: {
                    limit: parseInt(limit),
                    skip: parseInt(skip)
                }
            });

        if (!developer) {
            return { success: false, message: 'Developer not found' };
        }

        const total = developer.followers.length;

        return {
            success: true,
            followers: developer.followers,
            total,
            limit: parseInt(limit),
            skip: parseInt(skip)
        };
    } catch (error) {
        console.error('Error fetching followers:', error);
        return { success: false, message: error.message };
    }
};

export const getDeveloperFollowing = async (userId, limit = 20, skip = 0) => {
    try {
        const developer = await User.findById(userId)
            .select('following')
            .populate({
                path: 'following',
                select: 'fullName profileImage bio',
                options: {
                    limit: parseInt(limit),
                    skip: parseInt(skip)
                }
            });

        if (!developer) {
            return { success: false, message: 'Developer not found' };
        }

        const total = developer.following.length;

        return {
            success: true,
            following: developer.following,
            total,
            limit: parseInt(limit),
            skip: parseInt(skip)
        };
    } catch (error) {
        console.error('Error fetching following:', error);
        return { success: false, message: error.message };
    }
};

export const followDeveloper = async (userId, developerId) => {
    try {
        // Add to user's following
        await User.findByIdAndUpdate(userId, {
            $addToSet: { following: developerId }
        });

        // Add to developer's followers
        await User.findByIdAndUpdate(developerId, {
            $addToSet: { followers: userId }
        });

        return { success: true };
    } catch (error) {
        console.error('Error following developer:', error);
        return { success: false, message: error.message };
    }
};

export const unfollowDeveloper = async (userId, developerId) => {
    try {
        // Remove from user's following
        await User.findByIdAndUpdate(userId, {
            $pull: { following: developerId }
        });

        // Remove from developer's followers
        await User.findByIdAndUpdate(developerId, {
            $pull: { followers: userId }
        });

        return { success: true };
    } catch (error) {
        console.error('Error unfollowing developer:', error);
        return { success: false, message: error.message };
    }
};