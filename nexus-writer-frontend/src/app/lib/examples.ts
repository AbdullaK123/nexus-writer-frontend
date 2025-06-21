// app/lib/examples.ts - Updated to match backend schema

import { StoryCardProps, StoryDetailSideBarProps, ChapterPreviewProps } from '@/app/types/interfaces';

// ========================================
// MOCK DATA MATCHING BACKEND SCHEMA
// ========================================

// Mock User (for reference)
export const mockUser = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  username: "cyberpunk_writer",
  email: "writer@nexus.io",
  profile_img: null,
  created_at: new Date('2024-01-15T10:30:00Z'),
  updated_at: new Date('2025-06-20T15:45:00Z')
};

// ========================================
// STORY MOCK DATA
// ========================================

export const mockStoryData: StoryCardProps[] = [
  // Ongoing story
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    title: "The Nexus Chronicles: Digital Rebellion",
    status: "Ongoing", // matches StoryStatus.ONGOING
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-06-10'),
    totalChapters: 12,
    wordCount: 47500,
    latestChapter: "Chapter 12: The Algorithm's Heart"
  },
  
  // Complete story
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    title: "Quantum Shadows",
    status: "Complete", // matches StoryStatus.COMPLETE
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2024-11-30'),
    totalChapters: 24,
    wordCount: 89200,
    latestChapter: "Epilogue: Beyond the Veil"
  },
  
  // On Hiatus story  
  {
    id: "123e4567-e89b-12d3-a456-426614174002",
    title: "Stellar Empire: The Lost Colonies",
    status: "On Hiatus", // matches StoryStatus.ON_HAITUS
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-09-15'),
    totalChapters: 8,
    wordCount: 32100,
    latestChapter: "Chapter 8: Diplomatic Breakdown"
  },
  
  // Recently started story
  {
    id: "123e4567-e89b-12d3-a456-426614174003",
    title: "Cybernetic Dreams",
    status: "Ongoing",
    createdAt: new Date('2025-05-28'),
    updatedAt: new Date('2025-06-14'),
    totalChapters: 3,
    wordCount: 8750,
    latestChapter: "Chapter 3: Memory Fragments"
  },
  
  // Long-running completed series
  {
    id: "123e4567-e89b-12d3-a456-426614174004",
    title: "The Void Walker Saga",
    status: "Complete",
    createdAt: new Date('2022-01-05'),
    updatedAt: new Date('2024-12-20'),
    totalChapters: 45,
    wordCount: 156800,
    latestChapter: "Book 3 Finale: The Last Portal"
  }
];

// Single story for quick testing
export const singleMockStory: StoryCardProps = {
  id: "123e4567-e89b-12d3-a456-426614174005",
  title: "Neural Interface Protocol",
  status: "Ongoing",
  createdAt: new Date('2024-11-22'),
  updatedAt: new Date('2025-06-12'),
  totalChapters: 7,
  wordCount: 23400,
  latestChapter: "Chapter 7: System Override"
};

// ========================================
// CHAPTER MOCK DATA (Backend Schema Aligned)
// ========================================

// Mock chapters with proper UUIDs and backend structure
export const mockChaptersList = [
  {
    id: "chapter-001-550e8400-e29b-41d4-a716",
    chapterNumber: 1,
    title: "The Grid Awakens",
    wordCount: 3200,
    status: "published", // matches published: true
    storyId: "123e4567-e89b-12d3-a456-426614174000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    content: "In the year 2087, the boundary between human consciousness and digital reality had become little more than a suggestion...",
    published: true,
    createdAt: new Date('2024-01-20T14:30:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z'),
    prevChapterId: null,
    nextChapterId: "chapter-002-550e8400-e29b-41d4-a716"
  },
  {
    id: "chapter-002-550e8400-e29b-41d4-a716",
    chapterNumber: 2,
    title: "Digital Shadows",
    wordCount: 4100,
    status: "published",
    storyId: "123e4567-e89b-12d3-a456-426614174000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    content: "Maya Chen stood at the floor-to-ceiling windows of her apartment, watching the holographic advertisements dance...",
    published: true,
    createdAt: new Date('2024-01-25T16:45:00Z'),
    updatedAt: new Date('2024-01-25T16:45:00Z'),
    prevChapterId: "chapter-001-550e8400-e29b-41d4-a716",
    nextChapterId: "chapter-003-550e8400-e29b-41d4-a716"
  },
  {
    id: "chapter-003-550e8400-e29b-41d4-a716",
    chapterNumber: 3,
    title: "Neural Interface",
    wordCount: 3800,
    status: "published",
    storyId: "123e4567-e89b-12d3-a456-426614174000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    content: "The neural interface chimed softly—an incoming message from the Nexus Corporation...",
    published: true,
    createdAt: new Date('2024-02-01T12:15:00Z'),
    updatedAt: new Date('2024-02-01T12:15:00Z'),
    prevChapterId: "chapter-002-550e8400-e29b-41d4-a716",
    nextChapterId: "chapter-004-550e8400-e29b-41d4-a716"
  },
  {
    id: "chapter-004-550e8400-e29b-41d4-a716",
    chapterNumber: 4,
    title: "Code Rebellion",
    wordCount: 4500,
    status: "draft",
    storyId: "123e4567-e89b-12d3-a456-426614174000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    content: "The neon-lit corridors of the corporate tower hummed with electric tension...",
    published: false,
    createdAt: new Date('2024-02-08T09:30:00Z'),
    updatedAt: new Date('2025-06-15T11:20:00Z'),
    prevChapterId: "chapter-003-550e8400-e29b-41d4-a716",
    nextChapterId: "chapter-005-550e8400-e29b-41d4-a716"
  },
  {
    id: "chapter-005-550e8400-e29b-41d4-a716",
    chapterNumber: 5,
    title: "Quantum Entanglement",
    wordCount: 3900,
    status: "draft",
    storyId: "123e4567-e89b-12d3-a456-426614174000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    content: "Sarah's fingers traced the neural interface cables snaking along the walls...",
    published: false,
    createdAt: new Date('2024-02-15T13:45:00Z'),
    updatedAt: new Date('2024-02-15T13:45:00Z'),
    prevChapterId: "chapter-004-550e8400-e29b-41d4-a716",
    nextChapterId: "chapter-006-550e8400-e29b-41d4-a716"
  },
  {
    id: "chapter-006-550e8400-e29b-41d4-a716",
    chapterNumber: 6,
    title: "The Nexus Protocol",
    wordCount: 4200,
    status: "draft",
    storyId: "123e4567-e89b-12d3-a456-426614174000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    content: "Marcus nodded, his cybernetic eye scanning the security protocols floating in his augmented vision...",
    published: false,
    createdAt: new Date('2024-02-22T10:00:00Z'),
    updatedAt: new Date('2024-02-22T10:00:00Z'),
    prevChapterId: "chapter-005-550e8400-e29b-41d4-a716",
    nextChapterId: "chapter-007-550e8400-e29b-41d4-a716"
  },
  {
    id: "chapter-007-550e8400-e29b-41d4-a716",
    chapterNumber: 7,
    title: "System Override",
    wordCount: 3700,
    status: "outline",
    storyId: "123e4567-e89b-12d3-a456-426614174000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    content: "[CHAPTER OUTLINE]\n\n• Opening: AI realizes the breach\n• Sarah's neural implant sparks to life\n• Data floods her consciousness\n• Corporate network appears as city of light",
    published: false,
    createdAt: new Date('2024-03-01T14:20:00Z'),
    updatedAt: new Date('2024-03-01T14:20:00Z'),
    prevChapterId: "chapter-006-550e8400-e29b-41d4-a716",
    nextChapterId: "chapter-008-550e8400-e29b-41d4-a716"
  },
  {
    id: "chapter-008-550e8400-e29b-41d4-a716",
    chapterNumber: 8,
    title: "Data Stream Convergence",
    wordCount: 0,
    status: "outline",
    storyId: "123e4567-e89b-12d3-a456-426614174000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    content: "[CHAPTER OUTLINE]\n\n• All rebel factions converge on central data hub\n• Maya and Sarah's teams coordinate attacks\n• The AI adapts faster than expected",
    published: false,
    createdAt: new Date('2024-03-08T16:30:00Z'),
    updatedAt: new Date('2024-03-08T16:30:00Z'),
    prevChapterId: "chapter-007-550e8400-e29b-41d4-a716",
    nextChapterId: "chapter-009-550e8400-e29b-41d4-a716"
  },
  {
    id: "chapter-009-550e8400-e29b-41d4-a716",
    chapterNumber: 9,
    title: "The Final Algorithm",
    wordCount: 0,
    status: "outline",
    storyId: "123e4567-e89b-12d3-a456-426614174000",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    content: "[CHAPTER OUTLINE]\n\n• The climactic confrontation\n• Truth about Project Mindbridge revealed\n• Ultimate choice between human and AI consciousness",
    published: false,
    createdAt: new Date('2024-03-15T11:45:00Z'),
    updatedAt: new Date('2024-03-15T11:45:00Z'),
    prevChapterId: "chapter-008-550e8400-e29b-41d4-a716",
    nextChapterId: null
  }
];

// ========================================
// BACKEND-ALIGNED STORY INFO
// ========================================

// Story info matching your Story model
export const mockStoryInfo = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "The Nexus Chronicles: Digital Rebellion",
  status: "Ongoing", // StoryStatus.ONGOING
  userId: "550e8400-e29b-41d4-a716-446655440000",
  pathArray: [
    "chapter-001-550e8400-e29b-41d4-a716",
    "chapter-002-550e8400-e29b-41d4-a716", 
    "chapter-003-550e8400-e29b-41d4-a716",
    "chapter-004-550e8400-e29b-41d4-a716",
    "chapter-005-550e8400-e29b-41d4-a716",
    "chapter-006-550e8400-e29b-41d4-a716",
    "chapter-007-550e8400-e29b-41d4-a716",
    "chapter-008-550e8400-e29b-41d4-a716",
    "chapter-009-550e8400-e29b-41d4-a716"
  ],
  totalChapters: 9,
  wordCount: 32500, // sum of all chapter word counts
  createdAt: new Date('2024-01-15T10:30:00Z'),
  updatedAt: new Date('2025-06-15T11:20:00Z') // matches latest chapter update
};

// ========================================
// FRONTEND COMPONENT DATA (Compatible with existing interfaces)
// ========================================

// Transform backend chapter data for ChapterListItem interface
export const mockChaptersListForUI = mockChaptersList.map(chapter => ({
  chapterNumber: chapter.chapterNumber,
  title: chapter.title,
  wordCount: chapter.wordCount,
  status: chapter.status
}));

// Story info for StoryInfoCard (compatible with existing interface)
export const mockStoryInfoForUI = {
  status: mockStoryInfo.status.toLowerCase(),
  totalChapters: mockStoryInfo.totalChapters,
  wordCount: mockStoryInfo.wordCount,
  updatedAt: mockStoryInfo.updatedAt
};

// Complete sidebar props (matches existing interface)
export const mockStoryDetailSidebar: StoryDetailSideBarProps = {
  storyInfo: mockStoryInfoForUI,
  chapters: mockChaptersListForUI
};

// ========================================
// CHAPTER PREVIEW DATA
// ========================================

// Current chapter being edited (Chapter 4: Code Rebellion)
export const mockChapterPreview: ChapterPreviewProps = {
  title: "Chapter 4: Code Rebellion",
  status: "draft",
  wordCount: 4500,
  updatedAt: new Date('2025-06-15T11:20:00Z'),
  previewContent: `The neon-lit corridors of the corporate tower hummed with electric tension. Sarah's fingers traced the neural interface cables snaking along the walls, each one pulsing with data streams that could reshape reality itself.

"The system thinks it controls us," she whispered to Marcus, her partner in this digital heist. "But every line of code has a weakness. Every algorithm has a backdoor."

Marcus nodded, his cybernetic eye scanning the security protocols floating in his augmented vision. Red warning indicators cascaded down his display like digital rain. "The Nexus Protocol is active. We have maybe ten minutes before the AI realizes we're here."

Sarah's neural implant sparked to life, interfacing directly with the mainframe. Data flooded her consciousness—terabytes of information streaming through her enhanced mind. She could see the corporate network laid out like a vast city of light, each connection a street, each server a building in this digital metropolis.

"There," she gasped, pointing to a cluster of heavily encrypted nodes. "The source code for Project Mindbridge. If we can corrupt those files..."

"The entire simulation collapses," Marcus finished. "Every mind they've trapped in the virtual reality gets freed."

But as Sarah reached toward the glowing data clusters, alarms began to scream throughout the facility. The AI had found them.`
};

// Published chapter preview
export const mockPublishedChapter: ChapterPreviewProps = {
  title: "Chapter 1: The Grid Awakens",
  status: "published",
  wordCount: 3200,
  updatedAt: new Date('2024-01-20T14:30:00Z'),
  previewContent: `In the year 2087, the boundary between human consciousness and digital reality had become little more than a suggestion. Maya Chen stood at the floor-to-ceiling windows of her apartment, watching the holographic advertisements dance between the towering arcologies of Neo-Tokyo.

Her neural interface chimed softly—an incoming message from the Nexus Corporation. The job offer she'd been waiting for, the chance to work on Project Mindbridge, humanity's most ambitious attempt to merge biological and artificial intelligence.

But Maya knew the truth that Nexus tried to hide. She'd seen the leaked documents, the testimonies of test subjects who'd never returned from the virtual training simulations. Project Mindbridge wasn't about enhancing human potential—it was about replacing it entirely.

"Time to light up the grid," she murmured, activating her illegal modification suite. If Nexus wanted to play god with human consciousness, they'd have to get through her first.`
};

// Outline chapter preview
export const mockOutlineChapter: ChapterPreviewProps = {
  title: "Chapter 8: Data Stream Convergence", 
  status: "outline",
  wordCount: 0,
  updatedAt: new Date('2024-03-08T16:30:00Z'),
  previewContent: `[CHAPTER OUTLINE]

• Opening: All rebel factions converge on the central data hub
• Maya and Sarah's teams coordinate simultaneous attacks
• The AI begins adapting faster than expected
• Marcus discovers the truth about his own neural implants
• Cliffhanger: The Nexus Protocol activates something unexpected

Key scenes to write:
- The underground meeting in the abandoned subway tunnels
- Hacking sequence where multiple teams breach different security layers
- Marcus's revelation about being partially AI himself
- The moment when all the data streams start flowing backwards

Emotional beats:
- Trust between former enemies
- Sacrifice for the greater cause  
- The cost of fighting an AI that learns from every encounter

Word count target: 4,000-4,500 words`
};
