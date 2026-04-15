import type {
    ContradictionResponse,
    StoryFactCountsResponse,
    WorldConsistencyReport,
    EntityFactResponse,
    EntityTimelineResponse,
} from "./world"
import type { ContradictionTrackerProps } from "@/components/analysis/world/ContradictionTracker/types"
import type { FactDensityChartProps } from "@/components/analysis/world/FactDensityChart/types"
import type { WorldConsistencyReportCardProps } from "@/components/analysis/world/WorldConsistencyReportCard/types"
import type { WorldFactsTableProps } from "@/components/analysis/world/WorldFactsTable/types"
import type { EntityFactCardProps } from "@/components/analysis/world/EntityFactCard/types"
import type { EntityTimelineProps } from "@/components/analysis/world/EntityTimeline/types"

// ─── useWorld → Component Props ──────────────────────────────

export const toContradictionTrackerProps = (
    storyId: string,
    data: ContradictionResponse,
): ContradictionTrackerProps => ({
    storyId,
    contradictions: data.contradictions,
})

export const toFactDensityChartProps = (
    storyId: string,
    data: StoryFactCountsResponse,
): FactDensityChartProps => ({
    storyId,
    counts: data.counts,
})

export const toWorldConsistencyReportCardProps = (
    data: WorldConsistencyReport,
): WorldConsistencyReportCardProps => ({
    report: data,
})

// ─── useEntityRegistry → Component Props ─────────────────────

export const toWorldFactsTableProps = (
    storyId: string,
    data: EntityFactResponse[],
): WorldFactsTableProps => ({
    storyId,
    entries: data,
})

export const toEntityFactCardProps = (
    data: EntityFactResponse,
): EntityFactCardProps => ({
    entity: data.entity,
    facts: data.facts,
})

// ─── useEntityTimeline → Component Props ─────────────────────

export const toEntityTimelineProps = (
    storyId: string,
    data: EntityTimelineResponse,
): EntityTimelineProps => ({
    storyId,
    chapterFacts: data.chapterFacts,
})
