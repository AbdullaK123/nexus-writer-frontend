import type {
    WeakScenesResponse,
    SceneTypeDistributionResponse,
    POVBalanceResponse,
    PacingCurveResponse,
    StructuralArcResponse,
    ThemeDistributionResponse,
    EmotionalBeatsResponse,
    DevelopmentalReportResponse,
    SceneIndexResponse,
} from "./structure"
import type { WeakScenesTrackerProps } from "@/components/analysis/structure/WeakScenesTracker/types"
import type { SceneTypeDistributionChartProps } from "@/components/analysis/structure/SceneTypeDistributionChart/types"
import type { POVBalanceChartProps } from "@/components/analysis/structure/POVBalanceChart/types"
import type { PacingCurveChartProps } from "@/components/analysis/structure/PacingCurveChart/types"
import type { StructuralArcTrackerProps } from "@/components/analysis/structure/StructuralArcTracker/types"
import type { ThemeDistributionChartProps } from "@/components/analysis/structure/ThemeDistributionChart/types"
import type { EmotionalBeatsChartProps } from "@/components/analysis/structure/EmotionalBeatsChart/types"
import type { DevelopmentalReportCardProps } from "@/components/analysis/structure/DevelopmentalReportCard/types"
import type { SceneIndexProps } from "@/components/analysis/structure/SceneIndex/types"

// ─── useStructure → Component Props ─────────────────────────

export const toWeakScenesTrackerProps = (
    storyId: string,
    data: WeakScenesResponse,
): WeakScenesTrackerProps => ({
    storyId,
    weakScenes: data.weakScenes,
})

export const toSceneTypeDistributionChartProps = (
    data: SceneTypeDistributionResponse,
): SceneTypeDistributionChartProps => ({
    distributions: data.chapterDistributions,
})

export const toPOVBalanceChartProps = (
    data: POVBalanceResponse,
): POVBalanceChartProps => ({
    distributions: data.chapterDistributions,
})

export const toPacingCurveChartProps = (
    storyId: string,
    data: PacingCurveResponse,
): PacingCurveChartProps => ({
    storyId,
    distributions: data.chapterDistributions,
})

export const toStructuralArcTrackerProps = (
    storyId: string,
    data: StructuralArcResponse,
): StructuralArcTrackerProps => ({
    storyId,
    roles: data.roles,
})

export const toThemeDistributionChartProps = (
    data: ThemeDistributionResponse,
): ThemeDistributionChartProps => ({
    distributions: data.themeDistributions,
})

export const toEmotionalBeatsChartProps = (
    data: EmotionalBeatsResponse,
): EmotionalBeatsChartProps => ({
    distributions: data.chapterDistributions,
})

export const toDevelopmentalReportCardProps = (
    data: DevelopmentalReportResponse,
): DevelopmentalReportCardProps => ({
    report: data,
})

// ─── useSceneIndex → Component Props ─────────────────────────

export const toSceneIndexProps = (
    storyId: string,
    data: SceneIndexResponse,
): SceneIndexProps => ({
    storyId,
    scenes: data.scenes,
})
