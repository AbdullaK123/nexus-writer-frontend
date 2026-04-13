import { Character, CharacterAppearance } from "@/data/types";

export interface CharacterCardProps {
    storyId: string;
    character: Character;
    appearances: CharacterAppearance[]
}