import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { StoryCreateRequest, StoryUpdateRequest } from "../types/story"
import { ApiStory } from "../types/misc"


const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN


export function useStories() {

    const queryClient = useQueryClient()

    // getting all stories for a user
    const { 
        data: stories, 
        isLoading, 
        isError, 
        isSuccess 
    } = useQuery({
        queryKey: ['stories'],
        queryFn: () => fetch(`${API_URL}/stories`, {
            credentials: 'include'
        }).then((res) => {
            if (!res.ok) throw new Error("Failed to fetch stories")
            return res.json()
        }).then((data) => {
            const rawStories = data.stories
            const transformedStories = rawStories?.map((story: ApiStory) => ({
                ...story,
                latestChapterId: story.latest_chapter_id,
                createdAt: new Date(story.created_at + 'Z'),
                updatedAt: new Date(story.updated_at + 'Z'),
                totalChapters: story.total_chapters,
                wordCount: story.word_count
            }))
            console.log(JSON.stringify(transformedStories))
            return transformedStories || []
        })
    })

    // single story fetch
    const useStory = (storyId: string) => useQuery({
        queryKey: ['stories', storyId],
        queryFn: () => fetch(`${API_URL}/stories/${storyId}`, {
            credentials: 'include'
        }).then((res) => {
            if (!res.ok) throw new Error("Failed to fetch story")
            return res.json()
        })
    })


    // post mutation
    const createStoryMutation = useMutation({
        mutationFn: (storyInfo : StoryCreateRequest) => fetch(`${API_URL}/stories`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(storyInfo)
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to create story')
            return res.json()
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories'] })
    })


    // delete mutation
    const deleteStoryMutation = useMutation({
        mutationFn: (storyId : string) => fetch(`${API_URL}/stories/${storyId}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to delete story')
            return res.json()
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories'] })
    })


    // put mutation
    const updateStoryMutation = useMutation({
        mutationFn: ({ body, storyId } : StoryUpdateRequest) => fetch(`${API_URL}/stories/${storyId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to update story')
            return res.json()
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories'] })
    })


    // return everything
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
    }

}