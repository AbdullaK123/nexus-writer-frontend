import { useState, useCallback, useEffect } from "react";
import { DashboardFilter, Frequency } from "@/app/types";
import { useStoryAnalytics } from "./useStoryAnalytics";

export function useAnalyticsPage() {
    const [filters, setFilters] = useState<DashboardFilter>({
        frequency: 'Daily' as Frequency,
        fromDate: new Date(new Date().setDate(new Date().getDate() - 30)),
        toDate: new Date()
    })

    const {
        selectedStoryAnalytics,
        selectedStoryId,
        selectStory,
        isLoadingStoryAnalytics,
        error,
        invalidateAnalytics,
        clearSelection
    } = useStoryAnalytics()

    // Re-fetch analytics when filters change
    useEffect(() => {
        if (selectedStoryId) {
            selectStory(selectedStoryId, filters)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.frequency, filters.fromDate, filters.toDate, selectedStoryId])

    const handleStorySelect = useCallback((storyId: string) => {
        selectStory(storyId, filters)
    }, [selectStory, filters])

    const handleFilterChange = useCallback((newFilters: DashboardFilter) => {
        setFilters(newFilters)
    }, [])

    const handleTargetUpdate = useCallback(() => {
        // Invalidate and refetch current story
        if (selectedStoryId) {
            invalidateAnalytics(selectedStoryId)
            selectStory(selectedStoryId, filters)
        }
    }, [selectedStoryId, invalidateAnalytics, selectStory, filters])

    const applyFilterPreset = useCallback((preset: 'week' | 'month' | 'quarter' | 'year') => {
        const today = new Date()
        let fromDate: Date

        switch (preset) {
            case 'week':
                fromDate = new Date(today.setDate(today.getDate() - 7))
                break
            case 'month':
                fromDate = new Date(today.setDate(today.getDate() - 30))
                break
            case 'quarter':
                fromDate = new Date(today.setDate(today.getDate() - 90))
                break
            case 'year':
                fromDate = new Date(today.setDate(today.getDate() - 365))
                break
        }

        setFilters({
            ...filters,
            fromDate,
            toDate: new Date()
        })
    }, [filters])

    return {
        // State
        filters,
        selectedStoryAnalytics,
        selectedStoryId,
        isLoadingStoryAnalytics,
        error,

        // Actions
        handleStorySelect,
        handleFilterChange,
        handleTargetUpdate,
        applyFilterPreset,
        clearSelection
    }
}
