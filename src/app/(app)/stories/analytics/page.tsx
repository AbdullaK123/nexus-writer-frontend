'use client'
import { useStories } from "@/app/hooks/stories/useStories";
import styles from './page.module.css'
import StoryList from "@/components/analytics/StoryList/StoryList";
import AnalyticsFilter from "@/components/analytics/AnalyticsFilter";
import { useToast } from "@/app/hooks/common/useToast";
import React, { useEffect, useState } from "react";
import { Frequency } from "@/app/types";
import TotalWordsKpiCard from "@/components/analytics/TotalWordsKpiCard/TotalWordsKpiCard";
import TotalDurationKpiCard from "@/components/analytics/TotalDurationKpiCard/TotalDurationKpiCard";
import AverageWordsPerMinuteCard from "@/components/analytics/AverageWordsPerMinuteCard/AverageWordsPerMinuteKpiCard";
import dynamic from 'next/dynamic';
import { ClipLoader } from 'react-spinners';

const WordCountOverTimeChart = dynamic(
    () => import('@/components/analytics/WordCountOverTimeChart/WordCountOverTimeChart'),
    { ssr: false, loading: () => <div className="loading-center"><ClipLoader size={30} color="#00d4ff" /></div> }
);

type Filter = {
    frequency: Frequency,
    fromDate: string,
    toDate: string
}


export default function AnalyticsPage() {

    const [selectedStoryId, setSelectedStoryId] = useState<string>()

    const [selectedFilter, setSelectedFilter] = useState<Filter>({
        frequency: "Daily",
        fromDate: new Date().toISOString(),
        toDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
    })
    
    const {
        useStoryAnalytics,
        storyListItems,
        isLoadingListItems,
        listItemsError,
        listItemsSuccess
    } = useStories()

    const { showToast } = useToast()

    useEffect(() => {
        if (listItemsError) {
            showToast("Failed to load stories. The server might be experiencing issues.", "error")
        }
    }, [listItemsError, showToast])

    useEffect(() => {
        if (storyListItems && storyListItems.length > 0 && listItemsSuccess) {
            const firstStoryId = storyListItems[0].storyId
            setSelectedStoryId(firstStoryId)
        }
    }, [storyListItems, listItemsSuccess])


    
    const {
        data: storyAnalytics,
        isError: storyAnalyticsError,
        isSuccess: storyAnalyticsSuccess
    } = useStoryAnalytics(
        selectedStoryId, 
        selectedFilter.frequency, 
        selectedFilter.fromDate, 
        selectedFilter.toDate
    )

    useEffect(() => {
        if (storyAnalyticsSuccess) {
            // Analytics data loaded successfully
        }
    }, [storyAnalyticsSuccess, storyAnalytics])

    useEffect(() => {
        if (storyAnalyticsError) {
            showToast("Failed to fetch story analytics. The server might be experiencing issues.", "error")
        }
    }, [showToast, storyAnalyticsError])


    return (
        <div className={styles['analytics-page-content']}>
            <div className={styles['story-sidebar']}>
                <h2>My Stories</h2>
                <StoryList 
                    storiesLoading={isLoadingListItems}
                    stories={storyListItems}
                    selectedStoryId={selectedStoryId}
                    onSelectStory={(storyId: string) => setSelectedStoryId(storyId)}
                />
            </div>
            <div className={styles['dashboard-container']}>
                <AnalyticsFilter
                    frequency={selectedFilter.frequency}
                    fromDate={selectedFilter.fromDate}
                    toDate={selectedFilter.toDate}
                    onFrequencyChange={(frequency) => setSelectedFilter(prev => ({ ...prev, frequency }))}
                    onFromDateChange={(fromDate) => setSelectedFilter(prev => ({ ...prev, fromDate }))}
                    onToDateChange={(toDate) => setSelectedFilter(prev => ({ ...prev, toDate }))}
                />
                <div className={styles['kpi-cards-container']}>
                    {storyAnalytics && storyAnalytics.kpis && (
                        <>
                            <TotalWordsKpiCard
                                totalWords={storyAnalytics.kpis.totalWords}
                                target={storyAnalytics.target.quota}
                                frequency={storyAnalytics.target.frequency}
                            />
                            <TotalDurationKpiCard 
                                duration={storyAnalytics.kpis.totalDuration}
                            />
                            <AverageWordsPerMinuteCard 
                                avgWordsPerMinute={storyAnalytics.kpis.avgWordsPerMinute}
                            />
                        </>
                    )}
                </div>
                <div className={styles['barchart-container']}>
                    {storyAnalytics && storyAnalytics.wordsOverTime && storyAnalytics.target && (
                        <WordCountOverTimeChart
                            data={storyAnalytics.wordsOverTime}
                            target={storyAnalytics.target.quota}
                            frequency={storyAnalytics.target.frequency}  
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
