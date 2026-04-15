'use client'
import { toDevelopmentalReportCardProps, toEmotionalBeatsChartProps, toPacingCurveChartProps, toPOVBalanceChartProps, toSceneIndexProps, toSceneTypeDistributionChartProps, toStructuralArcTrackerProps, toThemeDistributionChartProps, toWeakScenesTrackerProps } from "@/compatability/transformers";
import { DevelopmentalReportCard, EmotionalBeatsChart, PacingCurveChart, POVBalanceChart, SceneIndex, SceneTypeDistributionChart, StructuralArcTracker, ThemeDistributionChart, WeakScenesTracker } from "@/components/analysis";
import { AsyncBoundary } from "@/components/common";
import { useSceneIndex, useStructure } from "@/data/hooks";
import { useParams } from "next/navigation";
import styles from "../AnalysisPage.module.css";


export default function StructurePageContent() {
    const params = useParams()
    const storyId = params.id as string
    const {
           // weak scenes
        weakScenes,
        weakScenesLoading,
        weakScenesError,
        weakScenesSuccess,
        // scene type distribution
        sceneTypeDistribution,
        sceneTypeDistributionLoading,
        sceneTypeDistributionError,
        sceneTypeDistributionSuccess,
        // pov balance
        povBalance,
        povBalanceLoading,
        povBalanceError,
        povBalanceSuccess,
        // pacing curve
        pacingCurve,
        pacingCurveLoading,
        pacingCurveError,
        pacingCurveSuccess,
        // structural arc
        structuralArc,
        structuralArcLoading,
        structuralArcError,
        structuralArcSuccess,
        // theme distribution
        themeDistribution,
        themeDistributionLoading,
        themeDistributionError,
        themeDistributionSuccess,
        // emotional beats
        emotionalBeats,
        emotionalBeatsLoading,
        emotionalBeatsError,
        emotionalBeatsSuccess,
        // developmental report
        developmentalReport,
        developmentalReportLoading,
        developmentalReportError,
        developmentalReportSuccess,
    } = useStructure(storyId)

    const {
        sceneIndex,
        sceneIndexLoading,
        sceneIndexError,
        sceneIndexSuccess
    } = useSceneIndex(storyId)


    return (
        <div className={styles.page}>
            <div className={styles.section}>
                <h3>Structural Arc</h3>
                <AsyncBoundary
                    data={structuralArc}
                    isLoading={structuralArcLoading}
                    isError={structuralArcError}
                    errorMessage="Failed to load structural arc tracker"
                >
                    {(data) => (
                        <StructuralArcTracker {...toStructuralArcTrackerProps(storyId, data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Pacing Curve</h3>
                <AsyncBoundary
                    data={pacingCurve}
                    isLoading={pacingCurveLoading}
                    isError={pacingCurveError}
                    errorMessage="Failed to load pacing curve chart"
                >
                    {(data) => (
                        <PacingCurveChart {...toPacingCurveChartProps(storyId, data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Beats and Scenes</h3>
                <div className={styles['section-row']}>
                    <AsyncBoundary
                        data={emotionalBeats}
                        isLoading={emotionalBeatsLoading}
                        isError={emotionalBeatsError}
                        errorMessage="Failed to load emotional beats chart"
                    >
                        {(data) => (
                            <EmotionalBeatsChart {...toEmotionalBeatsChartProps(data)} />
                        )}
                    </AsyncBoundary>
                    <AsyncBoundary
                        data={sceneTypeDistribution}
                        isLoading={sceneTypeDistributionLoading}
                        isError={sceneTypeDistributionError}
                        errorMessage="Failed to load scene type distribution chart"
                    >
                        {(data) => (
                            <SceneTypeDistributionChart {...toSceneTypeDistributionChartProps(data)} />
                        )}
                    </AsyncBoundary>
                </div>
            </div>
            <div className={styles.section}>
                <h3>POV & Themes</h3>
                <div className={styles['section-row']}>
                    <AsyncBoundary
                        data={povBalance}
                        isLoading={povBalanceLoading}
                        isError={povBalanceError}
                        errorMessage="Failed to load pov balance chart"
                    >
                        {(data) => (
                            <POVBalanceChart {...toPOVBalanceChartProps(data)} />
                        )}
                    </AsyncBoundary>
                    <AsyncBoundary
                        data={themeDistribution}
                        isLoading={themeDistributionLoading}
                        isError={themeDistributionError}
                        errorMessage="Failed to load theme distribution chart"
                    >
                        {(data) => (
                            <ThemeDistributionChart {...toThemeDistributionChartProps(data)} />
                        )}
                    </AsyncBoundary>
                </div>
            </div>
            <div className={styles.section}>
                <h3>Weak Scenes</h3>
                <AsyncBoundary
                    data={weakScenes}
                    isLoading={weakScenesLoading}
                    isError={weakScenesError}
                    errorMessage="Failed to load"
                >
                    {(data) => (
                        <WeakScenesTracker {...toWeakScenesTrackerProps(storyId, data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Scene Index</h3>
                <AsyncBoundary
                    data={sceneIndex}
                    isLoading={sceneIndexLoading}
                    isError={sceneIndexError}
                    errorMessage="Failed to load scene index"
                >
                    {(data) => (
                        <SceneIndex {...toSceneIndexProps(storyId, data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Developmental Report</h3>
                <AsyncBoundary
                    data={developmentalReport}
                    isLoading={developmentalReportLoading}
                    isError={developmentalReportError}
                    errorMessage="Failed to load developmental report card"
                >
                    {(data) => (
                        <DevelopmentalReportCard {...toDevelopmentalReportCardProps(data)} />
                    )}
                </AsyncBoundary>
            </div>
        </div>
    )
}