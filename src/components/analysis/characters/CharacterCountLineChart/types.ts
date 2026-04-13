import { CharacterIntroductionCount } from "@/data/types"

export interface CharacterCountLineChartProps {
    counts: CharacterIntroductionCount[]
    storyId: string
}

export interface ChapterTooltipProps {
    active?: boolean
    payload?: Array<{ payload: CharacterIntroductionCount }>
    storyId: string
}