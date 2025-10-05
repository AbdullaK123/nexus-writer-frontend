// src/app/hooks/useStories.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as storyService from '../services/storyService';

export function useStories() {
    const queryClient = useQueryClient();

    // This query is now much simpler!
    const { 
        data: stories, 
        isLoading, 
        isError, 
        isSuccess 
    } = useQuery({
        queryKey: ['stories'],
        queryFn: storyService.getStories
    });

    const useStory = (storyId: string) => useQuery({
        queryKey: ['stories', storyId],
        queryFn: () => storyService.getStory(storyId)
    });

    const createStoryMutation = useMutation({
        mutationFn: storyService.createStory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories'] })
    });

    const deleteStoryMutation = useMutation({
        mutationFn: storyService.deleteStory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories'] })
    });

    const updateStoryMutation = useMutation({
        mutationFn: storyService.updateStory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories'] })
    });

    // The rest of the hook remains the same...
    return {
        stories,
        useStory,
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
        isDeleted: deleteStoryMutation.isSuccess
    };
}