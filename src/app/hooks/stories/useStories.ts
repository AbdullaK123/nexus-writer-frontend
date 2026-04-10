// src/app/hooks/useStories.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as storyService from '@/app/services/storyService';
import { Frequency, StoryCreateRequest, StoryUpdateRequest, unwrapResult } from "@/app/types";

export function useStories() {
    const queryClient = useQueryClient();

    const { 
        data: stories, 
        isLoading, 
        isError, 
        isSuccess 
    } = useQuery({
        queryKey: ['stories'],
        queryFn: () => storyService.getStories().then(unwrapResult)
    });

    const {
        data: storyListItems,
        isLoading: isLoadingListItems,
        isError: listItemsError,
        isSuccess: listItemsSuccess
    } = useQuery({
        queryKey: ['stories', 'targets'],
        queryFn: () => storyService.getStoriesWithTargets().then(unwrapResult)
    })

    const useStoryAnalytics = (
        storyId: string,
        frequency: Frequency,
        fromDate: string,
        toDate: string,
    ) => useQuery({
        queryKey: ['stories', storyId, 'analytics', frequency, fromDate, toDate],
        queryFn: () => storyService.getStoryAnalytics(storyId, frequency, fromDate, toDate).then(unwrapResult),
        enabled: !!storyId
    })

    const useStory = (storyId: string) => useQuery({
        queryKey: ['stories', storyId],
        queryFn: () => storyService.getStory(storyId).then(unwrapResult)
    });

    const createStoryMutation = useMutation({
        mutationFn: (info: StoryCreateRequest) => storyService.createStory(info).then(unwrapResult),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories'] })
    });

    const deleteStoryMutation = useMutation({
        mutationFn: (storyId: string) => storyService.deleteStory(storyId).then(unwrapResult),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories'] })
    });

    const updateStoryMutation = useMutation({
        mutationFn: (args: StoryUpdateRequest) => storyService.updateStory(args).then(unwrapResult),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories'] })
    });

    // The rest of the hook remains the same...
    return {
        stories,
        useStory,
        useStoryAnalytics,
        create: createStoryMutation.mutate,
        update: updateStoryMutation.mutate,
        updatedStory: updateStoryMutation.data,
        deleteStory: deleteStoryMutation.mutate,
        isLoading,
        isCreating: createStoryMutation.isPending,
        isUpdating: updateStoryMutation.isPending,
        isDeleting: deleteStoryMutation.isPending,
        isError,
        creationError: createStoryMutation.isError,
        updateError: updateStoryMutation.isError,
        deleteError: deleteStoryMutation.isError,
        isSuccess,
        isCreated: createStoryMutation.isSuccess,
        isUpdated: updateStoryMutation.isSuccess,
        isDeleted: deleteStoryMutation.isSuccess,
        storyListItems,
        isLoadingListItems,
        listItemsError,
        listItemsSuccess
    };
}