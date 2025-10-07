/* 
This is where the analytics page for each story will go. 

What we need:

    1. A sidebar where users can select a story and see its dashboard
    2. The context menu from the dashboard should take them here
    3. We assemble the dashboard from kpi cards and a line chart
    4. The navbar should also take the user here

The Components we need:

    1. StoryListItem -> accepts the setter for selected story state. Like the ChapterListItem Component, make sure we use a ref to the latest setter to avoid infinite loops.
    2. StoryList -> Render a list of StoryListItem Components.
    3. AnalyticsDashboard -> Renders the dashboard. It consists of a filter bar, three kpi cards, and a bar chart. 
       If the story fetched from the storyId prop doesn't have a target it renders a modal form instead prompting the user
       for a target and its frequency
    4. TotalWordsCard -> KPI card for total words (should show if the user is above or below the target)
    5. TotalDurationCard -> KPI card for total time spent writing (maybe we can add new types of targets for time?)
    6. AverageWordsPerMinuteCard -> KPI Card for displaying average words per minute to measure consistency (maybe its helpful metric to see how focused a writer is)
    7. BarChart -> Displays writing output over time. Reacts to changes in the FilterBar component (well all dashboard components do). The target line should be visible and indicate
       how often and when the user is going above or below the target
    8. FilterBar -> Dynamic filter for dashboard. User can filter select different frequencies (daily, weekly, monthly), along with date ranges.
    9. TargetForm -> Form where user can create, edit, or delete targets for a story. It is wrapped in a modal, and it gets triggered whenever a user clicks on a StoryListItem corresponding to a
       story with no target set. We need extensive error handling to stay in line with the backend. We need think about how we handle the create, edit, and delete states. Maybe a seperate form for each?
    10. AnalyticsContextMenu.tsx -> A context menu that appears when we right click a StoryListItem Component. It provides access to the Target Form Component and the options should be
        Create Target, Update Target, Delete Target. Each option takes us to the appropriate modal form.

The hooks we will need:

    1. useStoryAnalytics -> uses react query to fetch analytics data from /stories/analytics/ in the backend. It should have everything we need for all dashboard components
    2. useSelectedStory -> very similar to useSelectedChapter. It will power selection for different story analytics dashboards.
    3. useTargets -> Will be essential for the TargetForm Component
    4. useContextMenu -> This hook already exists but we will need to reuse it.
    5. useModal -> To manage the modal wrapper around TargetForm
    6. useStories -> To fetch a user's stories and their titles.
*/
'use client'
import {useStories} from "@/app/hooks/useStories";
import {useStoryAnalytics} from "@/app/hooks/useStoryAnalytics";
import {
    BarChartConfig,
    DashboardFilter,
    DataPoint, Frequency,
    StoryCardProps,
    TargetResponse,
    WordsWrittenRecord
} from "@/app/types";
import {useEffect, useState} from "react";
import StoryList from "@/components/ui/StoryList/StoryList";
import DashboardFilterBar from "@/components/ui/DashboardFilterBar/DashboardFilterBar";
import TotalWordsCard from "@/components/ui/TotalWordsCard/TotalWordsCard";
import AverageWordsPerMinuteCard from "@/components/ui/AverageWordsPerMinuteCard/AverageWordsPerMinuteCard";
import TotalDurationCard from "@/components/ui/TotalDurationCard/TotalDurationCard";
import BarChart from "@/components/ui/BarChart/BarChart";
import TargetForm from "@/components/ui/TargetForm/TargetForm";

type FormVisibilityState = {
    visible: boolean,
    mode: 'creating' | 'editing' | 'deleting',
    selectedTarget?: TargetResponse
}

export default function Page() {

    const {
        stories,
        isLoading,
        isError
    } = useStories()

    const {
        selectedStoryAnalytics,
        isLoadingStoryAnalytics,
        selectStory,
        clearSelection
    } = useStoryAnalytics()

    const [filters, setFilters] = useState<DashboardFilter>({
        frequency: 'daily' as Frequency,
        fromDate: undefined,
        toDate: undefined
    })

    const [formVisibilityState, setFormVisibilityState] = useState<FormVisibilityState>({
        visible: false,
        mode: 'creating',
        selectedTarget: undefined
    })

    useEffect(() => {
        if (isError) {
            console.error('Error fetching analytics data:', isError);
            alert('Error fetching analytics data. Please try again later.');
        }
    }, [isError])

    const handleOnShowTargetForm = (
        mode: 'creating' | 'editing' | 'deleting',
        selectedTarget?: TargetResponse
    ) => {
        switch (mode) {
            case 'creating':
                setFormVisibilityState({
                    visible: true,
                    mode: 'creating',
                    selectedTarget: selectedTarget
                })
                break
            case 'editing':
                setFormVisibilityState({
                    visible: true,
                    mode: 'editing',
                    selectedTarget: selectedTarget
                })
                break
            case 'deleting':
                setFormVisibilityState({
                    visible: true,
                    mode: 'deleting',
                    selectedTarget: selectedTarget
                })
                break
            default:
                break
        }
    }

    const getStoryListItemProps = (stories: StoryCardProps[], filters: DashboardFilter) => {
        if (!stories) return []
        return stories.map((story: StoryCardProps) => {
                return {
                    storyId: story.id,
                    key: `${story.id}-${filters.frequency}-${filters.fromDate}-${filters.toDate}`,
                    title: story.title,
                    status: story.status,
                    wordCount: story.wordCount,
                    handleOnClick: () => selectStory(story.id, filters),
                    handleClearSelection: clearSelection,
                    handleOnShowTargetForm: handleOnShowTargetForm
                };
            }
        )
    }

    const getTransformedTimeSeries = (data: WordsWrittenRecord[]): DataPoint[] => {
        return data.map((record) => {
            return {
                name: record.date.toISOString().split('T')[0],
                wordsWritten: record.totalWords
            }
        })
    }

    const analyticsDataIsAvailable = (
        selectedStoryAnalytics
            && selectedStoryAnalytics.kpis.totalDuration
            && selectedStoryAnalytics.kpis.totalWords
            && selectedStoryAnalytics.target.quota
            && selectedStoryAnalytics.kpis.avgWordsPerMinute
            && selectedStoryAnalytics.wordsOverTime.length > 0
    )
        
    const BARCHART_CONFIG: BarChartConfig = {
        width: 800,
        height: 400,
        dataKey: 'wordsWritten',
        barFill: '#8884d8',
        // You can change this to match your app's color scheme
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

    return (
        <div>
            {/* Sidebar with story list items */}
            <StoryList
                storiesLoading={isLoading}
                stories={getStoryListItemProps(stories, filters)}
            />
            {/* container for dashboard */}
            <div>
                {/* Dashboard filter bar */}
                <DashboardFilterBar
                    filter={filters}
                    onFilterChange={(newFilters) => setFilters(newFilters)}
                />

                {isLoadingStoryAnalytics && (<div>Loading...</div>)}
                {analyticsDataIsAvailable && (
                    <>
                        {/* KPI cards */}
                        <div>
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
                        {/* Bar chart */}
                        <div>
                            <BarChart
                                data={getTransformedTimeSeries(selectedStoryAnalytics.wordsOverTime)}
                                config={BARCHART_CONFIG}
                            />
                        </div>
                    </>
                )}
            </div>
            {/* Modal for target form */}
            <TargetForm
                storyId={selectedStoryAnalytics.target.storyId}
                isOpen={formVisibilityState.visible}
                mode={formVisibilityState.mode}
                onClose={() => setFormVisibilityState({visible: false, mode: 'creating', selectedTarget: undefined})}
                onSave={() => setFormVisibilityState({visible: false, mode: 'creating', selectedTarget: undefined})}
                onCancel={() => setFormVisibilityState({visible: false, mode: 'creating', selectedTarget: undefined})}
            />
        </div>
    )
}