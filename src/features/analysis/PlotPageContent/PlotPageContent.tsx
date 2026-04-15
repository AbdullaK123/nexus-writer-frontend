'use client'
import { toChapterDistributionLineChartProps, toDeusExMachinaTrackerProps, toDormantThreadsTrackerProps, toEventDensityChartProps, toPlotReportCardProps, toPlotRhythmReportCardProps, toPlotThreadsTrackerProps, toSetupPayoffTrackerProps, toSetupTrackerProps, toStoryQuestionsTrackerProps } from "@/compatability/transformers";
import { ChapterDistributionLineChart, DeusExMachinaTracker, DormantThreadTracker, EventDensityChart, PlotReportCard, PlotRhythmReportCard, PlotThreadsTracker, SetupPayoffTracker, SetupTracker, StoryQuestionsTracker } from "@/components/analysis";
import { AsyncBoundary } from "@/components/common";
import { useDormantThreads, usePlot } from "@/data/hooks";
import { useParams } from "next/navigation";
import styles from "../AnalysisPage.module.css";


export default function PlotPageContent() {
    const params = useParams()
    const storyId = params.id as string

    const {
         // plot threads
        plotThreads,
        plotThreadsLoading,
        plotThreadsError,
        // unanswered questions
        unansweredQuestions,
        unansweredQuestionsLoading,
        unansweredQuestionsError,
        // setups with no payoff
        setupsWithNoPayoff,
        setupsWithNoPayoffLoading,
        setupsWithNoPayoffError,
        // deus ex machinas
        deusExMachinas,
        deusExMachinasLoading,
        deusExMachinasError,
        // plot report
        plotReport,
        plotReportLoading,
        plotReportError,
        // event density
        eventDensity,
        eventDensityLoading,
        eventDensityError,
        // setup payoff map
        setupPayoffMap,
        setupPayoffMapLoading,
        setupPayoffMapError,
        // plot density
        plotDensity,
        plotDensityLoading,
        plotDensityError,
        // plot rhythm report
        plotRhythmReport,
        plotRhythmReportLoading,
        plotRhythmReportError
    } = usePlot(storyId)

    const {
        dormantThreads,
        dormantThreadsLoading,
        dormantThreadsError
    } = useDormantThreads(storyId)

    return (
        <div className={styles.page}>
            <h2>Plot Analysis</h2>
            <div className={styles.section}>
                <h3>Plot Overview</h3>
                <AsyncBoundary
                    data={eventDensity}
                    isLoading={eventDensityLoading}
                    isError={eventDensityError}
                    errorMessage="Failed to load event density chart"
                >
                    {(data) => (
                        <EventDensityChart {...toEventDensityChartProps(storyId, data)} />
                    )}
                </AsyncBoundary>
                <AsyncBoundary
                    data={plotDensity}
                    isLoading={plotDensityLoading}
                    isError={plotDensityError}
                    errorMessage="Failed to load chapter distribution chart"
                >
                    {(data) => (
                        <ChapterDistributionLineChart {...toChapterDistributionLineChartProps(storyId, data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Plot Threads</h3>
                <AsyncBoundary
                    data={plotThreads}
                    isLoading={plotThreadsLoading}
                    isError={plotThreadsError}
                    errorMessage="Failed to load plot threads tracker"
                >
                    {(data) => (
                        <PlotThreadsTracker {...toPlotThreadsTrackerProps(storyId, data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Dormant Threads</h3>
                <AsyncBoundary
                    data={dormantThreads}
                    isLoading={dormantThreadsLoading}
                    isError={dormantThreadsError}
                    errorMessage="Failed to load dormant threads tracker"
                >
                    {(data) => (
                        <DormantThreadTracker {...toDormantThreadsTrackerProps(storyId, data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Setups and Payoffs</h3>
                <AsyncBoundary
                    data={setupPayoffMap}
                    isLoading={setupPayoffMapLoading}
                    isError={setupPayoffMapError}
                    errorMessage="Failed to load setup payoff tracker"
                >
                    {(data) => (
                        <SetupPayoffTracker {...toSetupPayoffTrackerProps(storyId, data)} />
                    )}
                </AsyncBoundary>
                <AsyncBoundary
                    data={setupsWithNoPayoff}
                    isLoading={setupsWithNoPayoffLoading}
                    isError={setupsWithNoPayoffError}
                    errorMessage="Failed to load setups tracker"
                >
                    {(data) => (
                        <SetupTracker {...toSetupTrackerProps(data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Questions and Contrivances</h3>
                <AsyncBoundary
                    data={unansweredQuestions}
                    isLoading={unansweredQuestionsLoading}
                    isError={unansweredQuestionsError}
                    errorMessage="Failed to load story questions tracker"
                >
                    {(data) => (
                        <StoryQuestionsTracker {...toStoryQuestionsTrackerProps(data)} />
                    )}
                </AsyncBoundary>
                <AsyncBoundary
                    data={deusExMachinas}
                    isLoading={deusExMachinasLoading}
                    isError={deusExMachinasError}
                    errorMessage="Failed to load deus ex machina tracker"
                >
                    {(data) => (
                        <DeusExMachinaTracker {...toDeusExMachinaTrackerProps(data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Reports</h3>
                <AsyncBoundary
                    data={plotReport}
                    isLoading={plotReportLoading}
                    isError={plotReportError}
                    errorMessage="Failed to load plot report"
                >
                    {(data) => (
                        <PlotReportCard {...toPlotReportCardProps(data)} />
                    )}
                </AsyncBoundary>
                <AsyncBoundary
                    data={plotRhythmReport}
                    isLoading={plotRhythmReportLoading}
                    isError={plotRhythmReportError}
                    errorMessage="Failed to load plot rhythm report"
                >
                    {(data) => (
                        <PlotRhythmReportCard {...toPlotRhythmReportCardProps(data)} />
                    )}
                </AsyncBoundary>
            </div>
        </div>
    )
}