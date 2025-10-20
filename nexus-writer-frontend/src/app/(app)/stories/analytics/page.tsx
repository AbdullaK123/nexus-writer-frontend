'use client'
import { useStories } from "@/app/hooks/useStories";
import styles from './page.module.css'
import StoryList from "@/components/ui/StoryList/StoryList";
import { useToast } from "@/app/hooks/useToast";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Frequency } from "@/app/types";

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
            console.log('🔍 All story IDs:', storyListItems.map(s => s.storyId))
            console.log('🎯 Selected story ID:', firstStoryId)
            setSelectedStoryId(firstStoryId)
        }
    }, [storyListItems, listItemsSuccess])

    
    const {
        data: storyAnalytics,
        isLoading: storyAnalyticsLoading,
        isError: storyAnalyticsError,
        isSuccess: storyAnalyticsSuccess
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
                    onSelectStory={(storyId: string) => setSelectedStoryId(storyId)}
                />
            </div>
            <div>
                {selectedStoryId && (
                    <p>{`I am selecting story: ${selectedStoryId}`}</p>
                )}
                <select
                    value={selectedFilter.frequency}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedFilter(prev => ({ ...prev, frequency: e.target.value as Frequency}))}
                >
                    <option label="daily" value={"Daily"}>Daily</option>
                    <option label="weekly" value={"Weekly"}>Weekly</option>
                    <option label="monthly" value={"Monthly"}>Monthly</option>
                </select>
                <pre>
                    {JSON.stringify(storyAnalytics, null, 2)}
                </pre>
            </div>
        </div>
    );
}
