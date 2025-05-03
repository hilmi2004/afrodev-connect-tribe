
import Project from '../Models/Project.js';
import User from '../Models/User.js';

// Create a new project
export async function createProject(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const {
      title,
      description,
      category,
      image,
      repoUrl,
      demoUrl,
      techStack,
      status,
      lookingForContributors,
      tribeId,
      tags
    } = req.body;
    
    const newProject = new Project({
      title,
      description,
      creator: userId,
      creatorName: user.fullName,
      category,
      image,
      repoUrl,
      demoUrl,
      techStack,
      status,
      lookingForContributors,
      tribeId,
      tags
    });
    
    await newProject.save();
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: newProject
    });
    
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when creating project'
    });
  }
}

// Get a project by ID
export async function getProject(req, res) {
  try {
    const projectId = req.params.id;
    
    const project = await Project.findById(projectId)
      .populate('creator', 'fullName profileImage')
      .populate('contributors', 'fullName profileImage');
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      project
    });
    
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when fetching project'
    });
  }
}

// Update a project
export async function updateProject(req, res) {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;
    
    // Find the project first
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Check if the user is the creator or an admin
    if (project.creator.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this project'
      });
    }
    
    const {
      title,
      description,
      category,
      image,
      repoUrl,
      demoUrl,
      techStack,
      status,
      lookingForContributors,
      tribeId,
      tags
    } = req.body;
    
    // Build update object
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (image !== undefined) updateData.image = image;
    if (repoUrl !== undefined) updateData.repoUrl = repoUrl;
    if (demoUrl !== undefined) updateData.demoUrl = demoUrl;
    if (techStack) updateData.techStack = techStack;
    if (status) updateData.status = status;
    if (lookingForContributors !== undefined) updateData.lookingForContributors = lookingForContributors;
    if (tribeId !== undefined) updateData.tribeId = tribeId;
    if (tags) updateData.tags = tags;
    
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Project updated successfully',
      project: updatedProject
    });
    
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when updating project'
    });
  }
}

// Delete a project
export async function deleteProject(req, res) {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;
    
    // Find the project first
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Check if the user is the creator or an admin
    if (project.creator.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this project'
      });
    }
    
    await Project.findByIdAndDelete(projectId);
    
    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when deleting project'
    });
  }
}

// Get project contributors
export async function getProjectContributors(req, res) {
  try {
    const projectId = req.params.id;
    
    const project = await Project.findById(projectId)
      .populate('contributors', 'fullName profileImage');
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      contributors: project.contributors
    });
    
  } catch (error) {
    console.error('Error fetching project contributors:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when fetching contributors'
    });
  }
}

// Like a project
export async function likeProject(req, res) {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;
    
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Check if user already liked the project
    if (project.likedByUsers.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'You already liked this project'
      });
    }
    
    // Add user to likedByUsers and increment like count
    project.likedByUsers.push(userId);
    project.likes += 1;
    
    await project.save();
    
    res.json({
      success: true,
      message: 'Project liked successfully',
      likes: project.likes
    });
    
  } catch (error) {
    console.error('Error liking project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when liking project'
    });
  }
}

// Unlike a project
export async function unlikeProject(req, res) {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;
    
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Check if user has liked the project
    if (!project.likedByUsers.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'You have not liked this project'
      });
    }
    
    // Remove user from likedByUsers and decrement like count
    project.likedByUsers = project.likedByUsers.filter(
      id => id.toString() !== userId
    );
    project.likes = Math.max(0, project.likes - 1);
    
    await project.save();
    
    res.json({
      success: true,
      message: 'Project unliked successfully',
      likes: project.likes
    });
    
  } catch (error) {
    console.error('Error unliking project:', error);
    res.status(500).json({
      success: false,
      message: 'Server error when unliking project'
    });
  }
}
