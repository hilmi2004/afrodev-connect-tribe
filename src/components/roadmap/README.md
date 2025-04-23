
# Enhanced Roadmap System

This folder contains components for the roadmap creation and viewing system.

## Components

- `EnhancedRoadmapCreator.tsx`: A modern, multi-step wizard for creating detailed learning roadmaps
- `RoadmapNode.tsx`: A component for individual roadmap steps that supports nested sub-steps
- `RoadmapList.tsx`: A grid display of available roadmaps with filtering and search
- `RoadmapDetail.tsx`: A detailed view of a specific roadmap with all steps and resources

## Implementation Notes

When implementing the enhanced roadmap system:

1. The creator uses a multi-tab approach:
   - Basic Info: Title, description, category, visibility settings
   - Steps: Adding main steps and sub-steps with resources
   - Preview: A real-time preview of the roadmap before saving

2. Each roadmap step supports:
   - Title and description
   - External resource links
   - Nested sub-steps
   
3. The roadmap detail view displays:
   - Hierarchical steps with visual connectors
   - Resource links for each step
   - Author information and metadata

## Usage

```tsx
// In your page component
import { EnhancedRoadmapCreator } from "@/components/roadmap/EnhancedRoadmapCreator";
import { RoadmapList } from "@/components/roadmap/RoadmapList";
import { RoadmapDetail } from "@/components/roadmap/RoadmapDetail";

// For creating roadmaps
<EnhancedRoadmapCreator />

// For browsing roadmaps
<RoadmapList />

// For viewing a specific roadmap
<RoadmapDetail />
```

## Animations

The roadmap components use Framer Motion for smooth animations:
- Fade-in effects for steps
- Staggered animations for lists
- Slide transitions between tabs
- Interactive hover and active states
