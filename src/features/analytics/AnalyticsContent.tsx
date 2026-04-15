'use client'
import { useStories } from "@/data/hooks/useStories";
import styles from './AnalyticsContent.module.css'
import StoryList from "@/components/analytics/StoryList/StoryList";
import AnalyticsFilter from "@/components/analytics/AnalyticsFilter";
import { useToast } from "@/shared/providers/ToastProvider";
import React, { useEffect, useState } from "react";
import { Frequency } from "@/data/types";
import TotalWordsKpiCard from "@/components/analytics/TotalWordsKpiCard/TotalWordsKpiCard";
import TotalDurationKpiCard from "@/components/analytics/TotalDurationKpiCard/TotalDurationKpiCard";
import AverageWordsPerMinuteCard from "@/components/analytics/AverageWordsPerMinuteCard/AverageWordsPerMinuteKpiCard";
import dynamic from 'next/dynamic';
import { ClipLoader } from 'react-spinners';
import { AsyncBoundary } from '@/components/common';
import { toTotalWordsKpiCardProps, toTotalDurationKpiCardProps, toAverageWordsPerMinuteCardProps, toWordCountOverTimeChartProps } from '@/compatability/transformers';

const WordCountOverTimeChart = dynamic(
    () => import('@/components/analytics/WordCountOverTimeChart/WordCountOverTimeChart'),
    { ssr: false, loading: () => <div className="loading-center"><ClipLoader size={30} color="#00d4ff" /></div> }
);

type Filter = {
    frequency: Frequency,
    fromDate: string,
    toDate: string
}

export default function AnalyticsContent() {

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
        isLoading: storyAnalyticsLoading
    } = useStoryAnalytics(
        selectedStoryId, 
        selectedFilter.frequency, 
        selectedFilter.fromDate, 
        selectedFilter.toDate
    )

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
                <AsyncBoundary
                    data={storyAnalytics}
                    isLoading={storyAnalyticsLoading}
                    isError={storyAnalyticsError}
                    errorMessage="Failed to fetch story analytics."
                >
                    {(analytics) => (
                        <>
                            <div className={styles['kpi-cards-container']}>
                                <TotalWordsKpiCard {...toTotalWordsKpiCardProps(analytics)} />
                                <TotalDurationKpiCard {...toTotalDurationKpiCardProps(analytics)} />
                                <AverageWordsPerMinuteCard {...toAverageWordsPerMinuteCardProps(analytics)} />
                            </div>
                            <div className={styles['barchart-container']}>
                                <WordCountOverTimeChart {...toWordCountOverTimeChartProps(analytics)} />
                            </div>
                        </>
                    )}
                </AsyncBoundary>
            </div>
        </div>
    );
}
