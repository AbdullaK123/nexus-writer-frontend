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

export function useStoryAnalytics() {
    const [selectedStoryAnalytics, setSelectedStoryAnalytics] = useState<StoryAnalytics>()
    const [isLoadingStoryAnalytics, setIsLoadingStoryAnalytics] = useState(false)
    const queryClient = useQueryClient();

    const selectStory = useCallback( async (storyId: string, filters: DashboardFilter) => {
        setIsLoadingStoryAnalytics(true)
        try {
            const response = await queryClient.fetchQuery({
                queryKey: ['analytics', storyId],
                queryFn: () => fetch(getUrl(storyId, filters), {
                    credentials: 'include'
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch story analytics")
                    }
                    return response.json()
                }),
                staleTime: 5 * 60 * 1000
            })
            if (response) {
                setSelectedStoryAnalytics(transformStoryAnalyticResponse(response))
            }
        } catch (error) {
            console.error("Failed to fetch story analytics", error)
            setSelectedStoryAnalytics(undefined)
        } finally {
            setIsLoadingStoryAnalytics(false)
        }
    }, [queryClient])

    return {
        selectedStoryAnalytics,
        selectStory,
        isLoadingStoryAnalytics,
        clearSelection: () => setSelectedStoryAnalytics(undefined)
    }
}