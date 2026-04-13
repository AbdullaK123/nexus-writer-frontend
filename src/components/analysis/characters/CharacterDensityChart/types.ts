import { ChapterCharacterDensity } from "@/data/types";

export interface CharacterDensityChartProps {
    storyId: string;
    counts: ChapterCharacterDensity[];
}

export interface DensityTooltipProps {
    active?: boolean;
    payload?: Array<{ payload: ChapterCharacterDensity }>;
    storyId: string;
}
