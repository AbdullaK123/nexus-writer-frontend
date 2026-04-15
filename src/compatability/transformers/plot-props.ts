import type {
    PlotThreadsResponse,
    StoryQuestionsResponse,
    SetupResponse,
    DeusExMachinaResponse,
    PlotStructuralReportResponse,
    EventDensityResponse,
    SetupPayoffMap,
    PlotDensityResponse,
    PlotRhythmReportResponse,
    ThreadTimelineResponse,
    DormantThreadsResponse,
} from "./plot"
import type { PlotThreadsTrackerProps } from "@/components/analysis/plot/PlotThreadsTracker/types"
import type { StoryQuestionsTrackerProps } from "@/components/analysis/plot/StoryQuestionsTracker/types"
import type { SetupTrackerProps } from "@/components/analysis/plot/SetupTracker/types"
import type { DeusExMachinaTrackerProps } from "@/components/analysis/plot/DeusExMachinaTracker/types"
import type { PlotReportCardProps } from "@/components/analysis/plot/PlotReportCard/types"
import type { EventDensityChartProps } from "@/components/analysis/plot/EventDensityChart/types"
import type { SetupPayoffTrackerProps } from "@/components/analysis/plot/SetupPayoffTracker/types"
import type { ChapterDistributionLineChartProps } from "@/components/analysis/plot/ChapterDistributionLineChart/types"
import type { PlotRhythmReportCardProps } from "@/components/analysis/plot/PlotRhythmReportCard/types"
import type { ThreadTimelineTrackerProps } from "@/components/analysis/plot/ThreadTimelineTracker/types"
import type { DormantThreadsTrackerProps } from "@/components/analysis/plot/DormantThreadTracker/types"

// ─── usePlot → Component Props ───────────────────────────────

export const toPlotThreadsTrackerProps = (
    storyId: string,
    data: PlotThreadsResponse,
): PlotThreadsTrackerProps => ({
    storyId,
    threads: data.plotThreads,
})

export const toStoryQuestionsTrackerProps = (
    data: StoryQuestionsResponse,
): StoryQuestionsTrackerProps => ({
    questions: data.questions,
})

export const toSetupTrackerProps = (
    data: SetupResponse,
): SetupTrackerProps => ({
    setups: data.setups,
})

export const toDeusExMachinaTrackerProps = (
    data: DeusExMachinaResponse,
): DeusExMachinaTrackerProps => ({
    problems: data.problems,
})

export const toPlotReportCardProps = (
    data: PlotStructuralReportResponse,
): PlotReportCardProps => ({
    report: data,
})

export const toEventDensityChartProps = (
    storyId: string,
    data: EventDensityResponse,
): EventDensityChartProps => ({
    storyId,
    chapterCounts: data.chapterCounts,
})

export const toSetupPayoffTrackerProps = (
    storyId: string,
    data: SetupPayoffMap[],
): SetupPayoffTrackerProps => ({
    storyId,
    setups: data,
})

export const toChapterDistributionLineChartProps = (
    storyId: string,
    data: PlotDensityResponse,
): ChapterDistributionLineChartProps => ({
    storyId,
    distributions: data.distributions,
})

export const toPlotRhythmReportCardProps = (
    data: PlotRhythmReportResponse,
): PlotRhythmReportCardProps => ({
    report: data,
})

// ─── usePlotThreadTimeline → Component Props ─────────────────

export const toThreadTimelineTrackerProps = (
    storyId: string,
    data: ThreadTimelineResponse,
): ThreadTimelineTrackerProps => ({
    storyId,
    data,
})

// ─── useDormantThreads → Component Props ─────────────────────

export const toDormantThreadsTrackerProps = (
    storyId: string,
    data: DormantThreadsResponse,
): DormantThreadsTrackerProps => ({
    storyId,
    threads: data.threads,
})
