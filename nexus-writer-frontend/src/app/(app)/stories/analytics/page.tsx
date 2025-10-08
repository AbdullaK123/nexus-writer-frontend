'use client'
import { useStories } from "@/app/hooks/useStories";
import { useAnalyticsPage } from "@/app/hooks/useAnalyticsPage";
import { useAllTargets } from "@/app/hooks/useAllTargets";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BarChartConfig, DataPoint, StoryCardProps, TargetResponse, WordsWrittenRecord } from "@/app/types";
import StoryList from "@/components/ui/StoryList/StoryList";
import { TargetsList } from "@/components/ui/TargetsList";
import DashboardFilterBar from "@/components/ui/DashboardFilterBar/DashboardFilterBar";
import TotalWordsCard from "@/components/ui/TotalWordsCard/TotalWordsCard";
import AverageWordsPerMinuteCard from "@/components/ui/AverageWordsPerMinuteCard/AverageWordsPerMinuteCard";
import TotalDurationCard from "@/components/ui/TotalDurationCard/TotalDurationCard";
import BarChart from "@/components/ui/BarChart/BarChart";
import TargetForm from "@/components/ui/TargetForm/TargetForm";
import AnalyticsPageHeader from "./components/AnalyticsPageHeader/AnalyticsPageHeader";
import LoadingSkeleton from "./components/LoadingSkeleton/LoadingSkeleton";
import EmptyAnalyticsState from "./components/EmptyAnalyticsState/EmptyAnalyticsState";
import styles from './page.module.css'

type FormVisibilityState = {
    visible: boolean,
    mode: 'creating' | 'editing' | 'deleting',
    selectedTarget?: TargetResponse,
    storyId?: string
}

export default function AnalyticsPage() {
    const router = useRouter()
    const { stories, isLoading: isLoadingStories, isError: storiesError } = useStories()
    
    const {
        filters,
        selectedStoryAnalytics,
        selectedStoryId,
        isLoadingStoryAnalytics,
        error: analyticsError,
        handleStorySelect,
        handleFilterChange,
        handleTargetUpdate,
        clearSelection
    } = useAnalyticsPage()

    const { targets, isLoading: isLoadingTargets, invalidateTargets } = useAllTargets(selectedStoryId)

    const [formVisibilityState, setFormVisibilityState] = useState<FormVisibilityState>({
        visible: false,
        mode: 'creating',
        selectedTarget: undefined,
        storyId: undefined
    })

    // Get current story details
    const currentStory = stories?.find(s => s.id === selectedStoryId)

    // Transform time series data for chart
    const getTransformedTimeSeries = (data: WordsWrittenRecord[]): DataPoint[] => {
        return data.map((record) => ({
            name: record.date.toISOString().split('T')[0],
            wordsWritten: record.totalWords
        }))
    }

    // Check if we have complete analytics data
    const hasCompleteAnalytics = !!(
        selectedStoryAnalytics?.kpis &&
        selectedStoryAnalytics?.target &&
        typeof selectedStoryAnalytics.kpis.totalWords === 'number' &&
        typeof selectedStoryAnalytics.kpis.totalDuration === 'number' &&
        typeof selectedStoryAnalytics.kpis.avgWordsPerMinute === 'number'
    )

    const hasTarget = !!selectedStoryAnalytics?.target

    // Bar chart configuration
    const BARCHART_CONFIG: BarChartConfig = {
        width: 800,
        height: 400,
        dataKey: 'wordsWritten',
        barFill: 'url(#barGradient)',
        referenceLineConfig: {
            value: selectedStoryAnalytics?.target?.quota || 0,
            stroke: '#ff7300',
            strokeWidth: 2,
            strokeDashArray: '5 5',
            label: {
                value: 'Target',
                position: 'right',
                fill: '#ff7300',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'inherit',
                offset: 10
            }
        }
    }

    // Story list item props
    const getStoryListItemProps = () => {
        if (!stories) return []
        return stories.map((story: StoryCardProps) => ({
            storyId: story.id,
            title: story.title,
            status: story.status,
            wordCount: story.wordCount || 0,
            handleOnClick: () => handleStorySelect(story.id),
            handleClearSelection: clearSelection,
            handleOnShowTargetForm: (
                mode: 'creating' | 'editing' | 'deleting',
                selectedTarget?: TargetResponse,
                storyId?: string
            ) => {
                // For delete/edit, use the current story's target from analytics if available
                const targetToUse = (mode === 'deleting' || mode === 'editing') && story.id === selectedStoryId
                    ? selectedStoryAnalytics?.target
                    : selectedTarget;
                
                setFormVisibilityState({
                    visible: true,
                    mode,
                    selectedTarget: targetToUse,
                    storyId: storyId || story.id
                })
            }
        }))
    }

    // Handle target form actions
    const handleSetTarget = () => {
        setFormVisibilityState({
            visible: true,
            mode: 'creating',
            storyId: selectedStoryId
        })
    }

    const handleViewStory = () => {
        if (selectedStoryId) {
            router.push(`/stories/${selectedStoryId}`)
        }
    }

    const handleFormClose = () => {
        setFormVisibilityState({
            visible: false,
            mode: 'creating',
            selectedTarget: undefined,
            storyId: undefined
        })
        // Refresh analytics and targets after changes
        handleTargetUpdate()
        invalidateTargets()
    }

    const handleTargetEdit = (target: TargetResponse) => {
        setFormVisibilityState({
            visible: true,
            mode: 'editing',
            selectedTarget: target,
            storyId: target.storyId
        })
    }

    const handleTargetDelete = (target: TargetResponse) => {
        setFormVisibilityState({
            visible: true,
            mode: 'deleting',
            selectedTarget: target,
            storyId: target.storyId
        })
    }

    return (
        <div className={styles['page-wrapper']}>
            <div className={styles['story-analytics-page']}>
                {/* Sidebar with story list and targets */}
                <aside className={styles['sidebar']}>
                    {isLoadingStories ? (
                        <LoadingSkeleton type="list" />
                    ) : (
                        <>
                            <StoryList
                                storiesLoading={isLoadingStories}
                                stories={getStoryListItemProps()}
                            />
                            
                            {/* Show targets list when a story is selected */}
                            {selectedStoryId && !isLoadingTargets && targets.length > 0 && (
                                <TargetsList
                                    targets={targets}
                                    onEdit={handleTargetEdit}
                                    onDelete={handleTargetDelete}
                                />
                            )}
                        </>
                    )}
                </aside>

                {/* Main dashboard content */}
                <main className={styles['dashboard-container']}>
                    {/* Header */}
                    <AnalyticsPageHeader
                        story={currentStory}
                        onSetTarget={handleSetTarget}
                        onViewStory={handleViewStory}
                        hasTarget={hasTarget}
                        targetCount={targets.length}
                    />

                    {/* Filter Bar */}
                    {selectedStoryId && (
                        <DashboardFilterBar
                            filter={filters}
                            onFilterChange={handleFilterChange}
                        />
                    )}

                    {/* Loading State */}
                    {isLoadingStoryAnalytics && (
                        <div className={styles['content-area']}>
                            <div className={styles['kpi-cards']}>
                                <LoadingSkeleton type="kpi" />
                                <LoadingSkeleton type="kpi" />
                                <LoadingSkeleton type="kpi" />
                            </div>
                            <LoadingSkeleton type="chart" />
                        </div>
                    )}

                    {/* Empty States */}
                    {!selectedStoryId && !isLoadingStoryAnalytics && (
                        <EmptyAnalyticsState type="no-selection" />
                    )}

                    {selectedStoryId && !isLoadingStoryAnalytics && !hasTarget && !analyticsError && (
                        <EmptyAnalyticsState
                            type="no-target"
                            onAction={handleSetTarget}
                            actionLabel="➕ Set Target"
                        />
                    )}

                    {selectedStoryId && !isLoadingStoryAnalytics && hasTarget && !hasCompleteAnalytics && !analyticsError && (
                        <EmptyAnalyticsState
                            type="no-data"
                            message="No writing activity recorded yet. Start writing to see your analytics!"
                        />
                    )}

                    {selectedStoryId && !isLoadingStoryAnalytics && analyticsError && (
                        <EmptyAnalyticsState
                            type="error"
                            message={analyticsError}
                            onAction={() => handleStorySelect(selectedStoryId)}
                            actionLabel="🔄 Retry"
                        />
                    )}

                    {/* Analytics Dashboard */}
                    {hasCompleteAnalytics && !isLoadingStoryAnalytics && (
                        <div className={styles['content-area']}>
                            {/* KPI Cards */}
                            <div className={styles['kpi-cards']}>
                                <TotalWordsCard
                                    totalWords={selectedStoryAnalytics.kpis.totalWords}
                                    quota={selectedStoryAnalytics.target.quota}
                                />
                                <AverageWordsPerMinuteCard
                                    averageWordsPerMinute={selectedStoryAnalytics.kpis.avgWordsPerMinute}
                                />
                                <TotalDurationCard
                                    totalDuration={selectedStoryAnalytics.kpis.totalDuration}
                                />
                            </div>

                            {/* Chart */}
                            <div className={styles['chart-section']}>
                                <h2 className={styles['section-title']}>📈 Writing Progress Over Time</h2>
                                <BarChart
                                    data={getTransformedTimeSeries(selectedStoryAnalytics.wordsOverTime)}
                                    config={BARCHART_CONFIG}
                                />
                            </div>
                        </div>
                    )}

                    {/* Errors */}
                    {storiesError && (
                        <div className={styles['error-message']}>
                            Failed to load stories. Please refresh the page.
                        </div>
                    )}
                </main>
            </div>

            {/* Target Form Modal */}
            {formVisibilityState.visible && formVisibilityState.storyId && (
                <TargetForm
                    storyId={formVisibilityState.storyId}
                    isOpen={formVisibilityState.visible}
                    mode={formVisibilityState.mode}
                    target={formVisibilityState.selectedTarget}
                    onClose={handleFormClose}
                    onSave={handleFormClose}
                    onCancel={handleFormClose}
                />
            )}
        </div>
    )
}
