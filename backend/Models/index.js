import mongoose from 'mongoose';
import User from './User.js';
import Project from './Project.js';
import Tribe from './Tribe.js';
import Comment from './Comment.js';
import Bookmark from './Bookmark.js';
import Like from './Like.js';

// This ensures all models are registered before they're referenced
export { User, Project, Tribe, Comment, Bookmark, Like };
