import User from '../models/User.js';

export const followUser = async (req, res) => {
    try {
        const { userId } = req.params; // ID of user to follow
        const currentUserId = req.user._id; // ID of logged-in user

        // Add to following list
        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { following: userId }
        });

        // Add to followers list
        await User.findByIdAndUpdate(userId, {
            $addToSet: { followers: currentUserId }
        });

        res.status(200).json({
            success: true,
            message: 'Successfully followed user'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to follow user'
        });
    }
};

export const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user._id;

        // Remove from following list
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { following: userId }
        });

        // Remove from followers list
        await User.findByIdAndUpdate(userId, {
            $pull: { followers: currentUserId }
        });

        res.status(200).json({
            success: true,
            message: 'Successfully unfollowed user'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to unfollow user'
        });
    }
};

export const getFollowers = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('followers', 'fullName profileImage username');

        res.status(200).json({
            success: true,
            followers: user.followers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch followers'
        });
    }
};

export const getFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('following', 'fullName profileImage username');

        res.status(200).json({
            success: true,
            following: user.following
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch following'
        });
    }
};