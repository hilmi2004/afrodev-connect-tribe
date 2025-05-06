
import User from '../Models/User.js';
import Project from '../Models/Project.js';
import TimelineEvent from '../Models/TimelineEvent.js';

// Get user profile
// Update getUserProfile to handle missing ID and wrong parameter name
export async function getUserProfile(req, res) {
  try {
    const userId = req.params.id || req.params.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Explicitly send response
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Update user profile
// Update user profile

// userController.js (updateUserProfile function)
export async function updateUserProfile(req, res) {
  try {
    const userId = req.params.id;

    if (userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this profile'
      });
    }

    // Clean and validate languages array
    let languages = [];
    if (Array.isArray(req.body.languages)) {
      languages = [...new Set(
          req.body.languages
              .map(l => typeof l === 'string' ? l.trim() : String(l).trim())
              .filter(l => l)
      )];
    }

    // Create update object
    const update = {
      ...req.body,
      languages // Use cleaned array
    };

    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        update,
        {
          new: true,
          runValidators: true,
          lean: true
        }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({
      success: false,
      message: process.env.NODE_ENV === 'development'
          ? error.message
          : 'Server error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
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
