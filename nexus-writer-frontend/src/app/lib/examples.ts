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