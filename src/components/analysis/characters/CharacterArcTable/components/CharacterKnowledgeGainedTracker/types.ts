import { ChapterKnowledgeGained } from "@/data/types";

export interface CharacterKnowledgeGainedTrackerProps {
    storyId: string;
    knowledgeGained: ChapterKnowledgeGained[]
}