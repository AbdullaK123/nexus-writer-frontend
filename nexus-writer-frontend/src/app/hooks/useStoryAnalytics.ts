import {useQueryClient} from "@tanstack/react-query";
import {useCallback, useState} from "react";
import {DashboardFilter, StoryAnalytics} from "@/app/types";
import {transformStoryAnalyticResponse} from "@/app/lib/utils";


const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

function getUrl(storyId: string, filters: DashboardFilter): string {
    const formattedFromDate = filters.fromDate.toISOString().split('T')[0]
    const formattedToDate = filters.toDate.toISOString().split('T')[0]
    return `${API_URL}/stories/${storyId}/analytics?frequency=${filters.frequency}&from_date=${formattedFromDate}&to_date=${formattedToDate}`
}

function getQueryKey(storyId: string, filters: DashboardFilter): string[] {
    return [
        'analytics', 
        storyId, 
        filters.frequency,
        filters.fromDate.toISOString().split('T')[0],
        filters.toDate.toISOString().split('T')[0]
    ]
}

export function useStoryAnalytics() {
    const [selectedStoryAnalytics, setSelectedStoryAnalytics] = useState<StoryAnalytics | undefined>()
    const [selectedStoryId, setSelectedStoryId] = useState<string | undefined>()
    const [isLoadingStoryAnalytics, setIsLoadingStoryAnalytics] = useState(false)
    const [error, setError] = useState<string | undefined>()
    const queryClient = useQueryClient();

    const selectStory = useCallback(async (storyId: string, filters: DashboardFilter) => {
        setIsLoadingStoryAnalytics(true)
        setError(undefined)
        setSelectedStoryId(storyId)
        
        try {
            const response = await queryClient.fetchQuery({
                queryKey: getQueryKey(storyId, filters),
                queryFn: () => fetch(getUrl(storyId, filters), {
                    credentials: 'include'
                }).then(async (response) => {
                    // 404 means no analytics data yet - this is valid, not an error
                    if (response.status === 404) {
                        return null
                    }
                    if (!response.ok) {
                        throw new Error("Failed to fetch story analytics")
                    }
                    return response.json()
                }),
                staleTime: 2 * 60 * 1000, // 2 minutes
                gcTime: 5 * 60 * 1000 // 5 minutes
            })
            
            if (response) {
                setSelectedStoryAnalytics(transformStoryAnalyticResponse(response))
            } else {
                // 404 case - no data yet
                setSelectedStoryAnalytics(undefined)
            }
        } catch (error) {
            console.error("Failed to fetch story analytics", error)
            setError(error instanceof Error ? error.message : "Failed to fetch analytics")
            setSelectedStoryAnalytics(undefined)
        } finally {
            setIsLoadingStoryAnalytics(false)
        }
    }, [queryClient])

    const invalidateAnalytics = useCallback((storyId?: string) => {
        if (storyId) {
            queryClient.invalidateQueries({ queryKey: ['analytics', storyId] })
        } else {
            queryClient.invalidateQueries({ queryKey: ['analytics'] })
        }
    }, [queryClient])

    const clearSelection = useCallback(() => {
        setSelectedStoryAnalytics(undefined)
        setSelectedStoryId(undefined)
        setError(undefined)
    }, [])

    return {
        selectedStoryAnalytics,
        selectedStoryId,
        selectStory,
        isLoadingStoryAnalytics,
        error,
        invalidateAnalytics,
        clearSelection
    }
}