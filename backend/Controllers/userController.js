
import User from '../Models/User.js';
import Project from '../Models/Project.js';
import TimelineEvent from '../Models/TimelineEvent.js';

// Get user profile
export async function getUserProfile(req, res) {
  try {
    const userId = req.params.id;
    
    // Check if requested user is the same as authenticated user or if authenticated user is admin
    const isOwnProfile = userId === req.user.id || req.user.role === 'admin';
    
    const user = await User.findById(userId)
      .select(isOwnProfile ? '-password' : 'fullName email bio profileImage socialLinks country experience programmingLanguages');
    
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
    console.error('Error fetching user profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error when fetching user profile' 
    });
  }
}

// Update user profile
export async function updateUserProfile(req, res) {
  try {
    const userId = req.params.id;
    
    // Only allow users to update their own profile (or admins)
    if (userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this profile'
      });
    }
    
    // Fields that can be updated
    const {
      fullName,
      country,
      bio,
      profileImage,
      socialLinks,
      experience,
      programmingLanguages,
      interests,
      timeZone,
      githubUsername
    } = req.body;
    
    // Build update object with only provided fields
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (country) updateData.country = country;
    if (bio) updateData.bio = bio;
    if (profileImage) updateData.profileImage = profileImage;
    if (socialLinks) updateData.socialLinks = socialLinks;
    if (experience) updateData.experience = experience;
    if (programmingLanguages) updateData.programmingLanguages = programmingLanguages;
    if (interests) updateData.interests = interests;
    if (timeZone) updateData.timeZone = timeZone;
    if (githubUsername) updateData.githubUsername = githubUsername;
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
    
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when updating profile'
    });
  }
}

// Get user projects
export async function getUserProjects(req, res) {
  try {
    const userId = req.params.id;
    
    const projects = await Project.find({ creator: userId })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      projects
    });
    
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when fetching user projects'
    });
  }
}

// Get user tribes
export async function getUserTribes(req, res) {
  try {
    const userId = req.params.id;
    
    const user = await User.findById(userId)
      .populate('joinedTribes', 'name description image members')
      .select('joinedTribes');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      tribes: user.joinedTribes
    });
    
  } catch (error) {
    console.error('Error fetching user tribes:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when fetching user tribes'
    });
  }
}

// Get user timeline events
export async function getUserTimeline(req, res) {
  try {
    const userId = req.params.id;
    
    const events = await TimelineEvent.find({ user: userId })
      .sort({ date: -1 });
    
    res.json({
      success: true,
      events
    });
    
  } catch (error) {
    console.error('Error fetching user timeline:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when fetching timeline events'
    });
  }
}

// Add timeline event
export async function addTimelineEvent(req, res) {
  try {
    const userId = req.user.id;
    
    // Only allow users to add events to their own timeline
    if (userId !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to add events to this timeline'
      });
    }
    
    const { title, type, date, description, link } = req.body;
    
    const newEvent = new TimelineEvent({
      user: userId,
      title,
      type,
      date,
      description,
      link
    });
    
    await newEvent.save();
    
    res.status(201).json({
      success: true,
      message: 'Timeline event added successfully',
      event: newEvent
    });
    
  } catch (error) {
    console.error('Error adding timeline event:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when adding timeline event'
    });
  }
}
