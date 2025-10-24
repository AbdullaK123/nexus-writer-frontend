'use client'
import { useStories } from "@/app/hooks/useStories";
import styles from './page.module.css'
import StoryList from "@/components/ui/StoryList/StoryList";
import AnalyticsFilter from "@/components/ui/AnalyticsFilter";
import { useToast } from "@/app/hooks/useToast";
import React, { useEffect, useState } from "react";
import { Frequency } from "@/app/types";
import TotalWordsKpiCard from "@/components/ui/TotalWordsKpiCard/TotalWordsKpiCard";
import TotalDurationKpiCard from "@/components/ui/TotalDurationKpiCard/TotalDurationKpiCard";
import AverageWordsPerMinuteCard from "@/components/ui/AverageWordsPerMinuteCard/AverageWordsPerMinuteKpiCard";
import WordCountOverTimeChart from "@/components/ui/WordCountOverTimeChart/WordCountOverTimeChart";

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
            console.log('Setting selectedStoryId to:', firstStoryId);
            setSelectedStoryId(firstStoryId)
        }
    }, [storyListItems, listItemsSuccess])

    useEffect(() => {
        console.log('selectedStoryId changed to:', selectedStoryId);
    }, [selectedStoryId]);

    
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
            console.log("Data retrieved!")
            console.log(JSON.stringify(storyAnalytics, null, 2))
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
