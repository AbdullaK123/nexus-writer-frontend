import type {
    CharacterResponse,
    CharacterAppearancesResponse,
    CharacterIntroductionResponse,
    CharacterDensityResponse,
    CastManagementReportResponse,
    CharacterArcResponse,
    CharacterKnowledgeResponse,
    CharacterInconsistencyResponse,
    CharacterGoalsResponse,
    CharacterKnowledgeMapResponse,
} from "./character"
import type { CharacterGridProps } from "@/components/analysis/characters/CharacterGrid/types"
import type { CharacterPresenceHeatmapProps } from "@/components/analysis/characters/CharacterPresenceHeatmap/types"
import type { CharacterCountLineChartProps } from "@/components/analysis/characters/CharacterCountLineChart/types"
import type { CharacterDensityChartProps } from "@/components/analysis/characters/CharacterDensityChart/types"
import type { CastManagementReportCardProps } from "@/components/analysis/characters/CastManagementReportCard/types"
import type { CharacterArcTableProps } from "@/components/analysis/characters/CharacterArcTable/types"
import type { CharacterKnowledgeSnapshotProps } from "@/components/analysis/characters/CharacterKnowledgeSnapshot/types"
import type { CharacterReportCardProps } from "@/components/analysis/characters/CharacterReportCard/types"
import type { CharacterGoalTimelineProps } from "@/components/analysis/characters/CharacterGoalTimeline/types"
import type { CharacterKnowledgeTimelineProps } from "@/components/analysis/characters/CharacterKnowledgeTimeline/types"

// ─── useCharacters → Component Props ─────────────────────────

export const toCharacterGridProps = (
    storyId: string,
    characters: CharacterResponse,
    appearances: CharacterAppearancesResponse,
): CharacterGridProps => ({
    props: characters.characters.map((character) => ({
        storyId,
        character,
        appearances: appearances.maps
            .find((m) => m.characterName === character.name)
            ?.appearances ?? [],
    })),
})

export const toCharacterPresenceHeatmapProps = (
    storyId: string,
    data: CharacterAppearancesResponse,
): CharacterPresenceHeatmapProps => ({
    storyId,
    maps: data.maps,
})

export const toCharacterCountLineChartProps = (
    storyId: string,
    data: CharacterIntroductionResponse,
): CharacterCountLineChartProps => ({
    storyId,
    counts: data.counts,
})

export const toCharacterDensityChartProps = (
    storyId: string,
    data: CharacterDensityResponse,
): CharacterDensityChartProps => ({
    storyId,
    counts: data.counts,
})

export const toCastManagementReportCardProps = (
    data: CastManagementReportResponse,
): CastManagementReportCardProps => ({
    report: data,
})

// ─── useCharacter → Component Props ──────────────────────────

export const toCharacterArcTableProps = (
    storyId: string,
    data: CharacterArcResponse,
): CharacterArcTableProps => ({
    storyId,
    arc: data,
})

export const toCharacterKnowledgeSnapshotProps = (
    data: CharacterKnowledgeResponse,
): CharacterKnowledgeSnapshotProps => ({
    data,
})

export const toCharacterReportCardProps = (
    data: CharacterInconsistencyResponse,
): CharacterReportCardProps => ({
    report: data,
})

export const toCharacterGoalTimelineProps = (
    storyId: string,
    data: CharacterGoalsResponse,
): CharacterGoalTimelineProps => ({
    storyId,
    data,
})

export const toCharacterKnowledgeTimelineProps = (
    storyId: string,
    data: CharacterKnowledgeMapResponse,
): CharacterKnowledgeTimelineProps => ({
    storyId,
    data,
})
