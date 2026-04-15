'use client'
import { toContradictionTrackerProps, toFactDensityChartProps, toWorldConsistencyReportCardProps, toWorldFactsTableProps } from "@/compatability/transformers";
import { ContradictionTracker, FactDensityChart, WorldConsistencyReportCard, WorldFactsTable } from "@/components/analysis";
import { AsyncBoundary } from "@/components/common";
import { useEntityRegistry, useWorld } from "@/data/hooks";
import { useParams } from "next/navigation";
import styles from "../AnalysisPage.module.css";


export default function WorldPageContent() {
    const params = useParams()
    const storyId = params.id as string

    const {
        // contradictions
        contradictions,
        contradictionsLoading,
        contradictionsError,
        // fact density
        factDensity,
        factDensityLoading,
        factDensityError,
        // world consistency report
        worldConsistencyReport,
        worldConsistencyReportLoading,
        worldConsistencyReportError,
    } = useWorld(storyId)

    const {
        entityRegistry,
        entityRegistryLoading,
        entityRegistryError,
    } = useEntityRegistry(storyId)

    return (
        <div className={styles.page}>
            <h2>World Analysis</h2>
            <div className={styles.section}>
                <h3>Fact Density</h3>
                <AsyncBoundary
                    data={factDensity}
                    isLoading={factDensityLoading}
                    isError={factDensityError}
                    errorMessage="Failed to load fact density chart"
                >
                    {(data) => (
                        <FactDensityChart {...toFactDensityChartProps(storyId, data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>World Facts</h3>
                <AsyncBoundary
                    data={entityRegistry}
                    isLoading={entityRegistryLoading}
                    isError={entityRegistryError}
                    errorMessage="Failed to load world facts"
                >
                    {(data) => (
                        <WorldFactsTable {...toWorldFactsTableProps(storyId, data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Contradictions</h3>
                <AsyncBoundary
                    data={contradictions}
                    isLoading={contradictionsLoading}
                    isError={contradictionsError}
                    errorMessage="Failed to load contradiction tracker"
                >
                    {(data) => (
                        <ContradictionTracker {...toContradictionTrackerProps(storyId, data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>World Consistency Report</h3>
                <AsyncBoundary
                    data={worldConsistencyReport}
                    isLoading={worldConsistencyReportLoading}
                    isError={worldConsistencyReportError}
                    errorMessage="Failed to load world consistency report"
                >
                    {(data) => (
                        <WorldConsistencyReportCard {...toWorldConsistencyReportCardProps(data)} />
                    )}
                </AsyncBoundary>
            </div>
        </div>
    )
}
