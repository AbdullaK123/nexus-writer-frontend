import { ChapterEmotionalState } from "@/data/types";


export interface CharacterEmotionalStateTrackerProps {
    storyId: string;
    states: ChapterEmotionalState[]
}