// Mock data for testing StoryCard component
import { StoryCardProps } from '@/app/types/interfaces';

export const mockStoryData: StoryCardProps[] = [
  // Ongoing story
  {
    title: "The Nexus Chronicles: Digital Rebellion",
    status: "Ongoing",
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2025-06-10'),
    totalChapters: 12,
    wordCount: 47500,
    latestChapter: "Chapter 12: The Algorithm's Heart"
  },
  
  // Completed story
  {
    title: "Quantum Shadows",
    status: "Complete",
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2024-11-30'),
    totalChapters: 24,
    wordCount: 89200,
    latestChapter: "Epilogue: Beyond the Veil"
  },
  
  // On Hiatus story
  {
    title: "Stellar Empire: The Lost Colonies",
    status: "On Hiatus",
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-09-15'),
    totalChapters: 8,
    wordCount: 32100,
    latestChapter: "Chapter 8: Diplomatic Breakdown"
  },
  
  // Recently started story
  {
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
  title: "Neural Interface Protocol",
  status: "Ongoing",
  createdAt: new Date('2024-11-22'),
  updatedAt: new Date('2025-06-12'),
  totalChapters: 7,
  wordCount: 23400,
  latestChapter: "Chapter 7: System Override"
};


// Add this to your existing examples.ts file

import { StoryDetailSideBarProps, ChapterPreviewProps } from '@/app/types/interfaces';

// Story info for sidebar
export const mockStoryInfo = {
  status: "ongoing",
  totalChapters: 12,
  wordCount: 47500,
  updatedAt: new Date('2025-06-10')
};

// Chapters list for sidebar
export const mockChaptersList = [
  {
    chapterNumber: 1,
    title: "The Grid Awakens",
    wordCount: 3200,
    status: "published"
  },
  {
    chapterNumber: 2,
    title: "Digital Shadows",
    wordCount: 4100,
    status: "published"
  },
  {
    chapterNumber: 3,
    title: "Neural Interface",
    wordCount: 3800,
    status: "published"
  },
  {
    chapterNumber: 4,
    title: "Code Rebellion",
    wordCount: 4500,
    status: "draft"
  },
  {
    chapterNumber: 5,
    title: "Quantum Entanglement",
    wordCount: 3900,
    status: "draft"
  },
  {
    chapterNumber: 6,
    title: "The Nexus Protocol",
    wordCount: 4200,
    status: "draft"
  },
  {
    chapterNumber: 7,
    title: "System Override",
    wordCount: 3700,
    status: "outline"
  },
  {
    chapterNumber: 8,
    title: "Data Stream Convergence",
    wordCount: 0,
    status: "outline"
  },
  {
    chapterNumber: 9,
    title: "The Final Algorithm",
    wordCount: 0,
    status: "outline"
  }
];

// Complete sidebar props
export const mockStoryDetailSidebar: StoryDetailSideBarProps = {
  storyInfo: mockStoryInfo,
  chapters: mockChaptersList
};

// Chapter preview for main content area
export const mockChapterPreview: ChapterPreviewProps = {
  title: "Chapter 4: Code Rebellion",
  status: "draft",
  wordCount: 4500,
  updatedAt: new Date('2025-06-15'),
  previewContent: `The neon-lit corridors of the corporate tower hummed with electric tension. Sarah's fingers traced the neural interface cables snaking along the walls, each one pulsing with data streams that could reshape reality itself.

"The system thinks it controls us," she whispered to Marcus, her partner in this digital heist. "But every line of code has a weakness. Every algorithm has a backdoor."

Marcus nodded, his cybernetic eye scanning the security protocols floating in his augmented vision. Red warning indicators cascaded down his display like digital rain. "The Nexus Protocol is active. We have maybe ten minutes before the AI realizes we're here."

Sarah's neural implant sparked to life, interfacing directly with the mainframe. Data flooded her consciousness—terabytes of information streaming through her enhanced mind. She could see the corporate network laid out like a vast city of light, each connection a street, each server a building in this digital metropolis.

"There," she gasped, pointing to a cluster of heavily encrypted nodes. "The source code for Project Mindbridge. If we can corrupt those files..."

"The entire simulation collapses," Marcus finished. "Every mind they've trapped in the virtual reality gets freed."

But as Sarah reached toward the glowing data clusters, alarms began to scream throughout the facility. The AI had found them.`
};

// Alternative chapter previews for different states
export const mockPublishedChapter: ChapterPreviewProps = {
  title: "Chapter 1: The Grid Awakens",
  status: "published",
  wordCount: 3200,
  updatedAt: new Date('2025-05-28'),
  previewContent: `In the year 2087, the boundary between human consciousness and digital reality had become little more than a suggestion. Maya Chen stood at the floor-to-ceiling windows of her apartment, watching the holographic advertisements dance between the towering arcologies of Neo-Tokyo.

Her neural interface chimed softly—an incoming message from the Nexus Corporation. The job offer she'd been waiting for, the chance to work on Project Mindbridge, humanity's most ambitious attempt to merge biological and artificial intelligence.

But Maya knew the truth that Nexus tried to hide. She'd seen the leaked documents, the testimonies of test subjects who'd never returned from the virtual training simulations. Project Mindbridge wasn't about enhancing human potential—it was about replacing it entirely.

"Time to light up the grid," she murmured, activating her illegal modification suite. If Nexus wanted to play god with human consciousness, they'd have to get through her first.`
};

export const mockOutlineChapter: ChapterPreviewProps = {
  title: "Chapter 8: Data Stream Convergence",
  status: "outline",
  wordCount: 0,
  updatedAt: new Date('2025-06-01'),
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