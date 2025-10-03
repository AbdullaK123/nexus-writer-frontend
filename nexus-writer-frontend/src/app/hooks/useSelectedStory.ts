import {useQueryClient} from "@tanstack/react-query";
import {useCallback, useState} from "react";
import {StoryAnalytics} from "@/app/types";
import {transformStoryAnalyticResponse} from "@/app/lib/utils";


const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

export function useSelectedStory() {
    const [selectedStoryAnalytics, setSelectedStoryAnalytics] = useState<StoryAnalytics>()
    const [isLoadingStoryAnalytics, setIsLoadingStoryAnalytics] = useState(false)
    const queryClient = useQueryClient();

    const selectStory = useCallback( async (storyId: string) => {
        setIsLoadingStoryAnalytics(true)
        try {
            const response = await queryClient.fetchQuery({
                queryKey: ['analytics', storyId],
                queryFn: () => fetch(`${API_URL}/stories/${storyId}/analytics`, {
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