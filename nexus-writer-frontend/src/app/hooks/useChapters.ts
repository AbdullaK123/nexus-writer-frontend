import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
    ApiChapterListItem, 
    CreateChapterRequest,
    ApiChapterListResponse,
    ApiChapterContentResponse,
    UpdateMutationArgs
} from '../types/interfaces'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

export function useChapters(storyId: string) {

    const queryClient = useQueryClient()

    // get query - FIXED: Include storyId in query key
    const {
         data: chapters, 
         isLoading, 
         isError, 
         isSuccess
    } = useQuery({
        queryKey: ['chapters', storyId], // Include storyId in query key
        queryFn:  () => fetch(`${API_URL}/stories/${storyId}/chapters`, {
            'credentials': 'include'
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to fetch chapters.')
            return res.json()
        }).then((data: ApiChapterListResponse) => {
            const rawChapterListItems = data.chapters
            const transformedChapterListItems = rawChapterListItems?.map((item: ApiChapterListItem) => {
                return {
                    ...item,
                    wordCount: item.word_count,
                    updatedAt: new Date(item.updated_at + 'Z')
                }
            }) || []
            return {
                storyId: storyId,
                storyTitle: data.story_title,
                storyStatus: data.story_status,
                storyLastUpdated: new Date(data.story_last_updated + 'Z'),
                chapters: transformedChapterListItems
            }
        }),
        enabled: !!storyId, // Only run query when storyId exists
    })

    const getChapter = (chapterId: string) => useQuery({
        queryKey: ['chapters', chapterId],
        queryFn: () => fetch(`${API_URL}/chapters/${chapterId}`, {
            credentials: 'include'
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to create new chapter.')
            return res.json()
        }).then((data: ApiChapterContentResponse) => {
            const transformedChapter = {
                id: data.id,
                title: data.title,
                content: data.content,
                published: data.published,
                storyId: data.story_id,
                storyTitle: data.story_title,
                createdAt: new Date(data.created_at + 'Z'),
                updatedAt: new Date(data.updated_at + 'Z'),
                previousChapterId: data.previous_chapter_id,
                nextChapterId: data.next_chapter_id
            }
            return transformedChapter
        })
    })

    // create mutation - FIXED: Invalidate the correct query key
    const createMutation = useMutation({
        mutationFn: (chapterInfo: CreateChapterRequest) => fetch(`${API_URL}/stories/${storyId}/chapters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(chapterInfo)
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to create new chapter.')
            return res.json()
        }).then((data: ApiChapterContentResponse) => {
            const transformedChapter = {
                id: data.id,
                title: data.title,
                content: data.content,
                published: data.published,
                storyId: data.story_id,
                storyTitle: data.story_title,
                createdAt: new Date(data.created_at + 'Z'),
                updatedAt: new Date(data.updated_at + 'Z'),
                previousChapterId: data.previous_chapter_id,
                nextChapterId: data.next_chapter_id
            }
            return transformedChapter
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['chapters', storyId]})
        },
        onMutate: async (newChapter: any) => {
            // cancel all active queries
            await queryClient.cancelQueries({ queryKey: ['chapters', storyId]})

            // snapshot current query
            const previousChapters = queryClient.getQueryData(['chapters', storyId])

            // manually update cache
            queryClient.setQueryData(['chapters', storyId], (oldData: any) => {
                if (!oldData) return oldData

                 const optimisticChapter = {
                    id: `temp-${Date.now()}`,
                    title: newChapter.title,
                    published: false,
                    wordCount: 0,
                    updatedAt: new Date(),
                    isOptimistic: true,
                    
                    // ADD THE MISSING REQUIRED PROPERTIES:
                    chapterNumber: oldData.chapters.length + 1, // Next chapter number
                    status: "draft" as const, // Required status
                    handleOnClick: () => {
                        // Temporary click handler (could show a message or do nothing)
                        console.log('Optimistic chapter clicked');
                    }
                };

                return {
                    ...oldData,
                    chapters: [...oldData.chapters, optimisticChapter]
                }

            })

            // return snap of curren query in case of rollback
            return { previousChapters }
        },
        onError: (error, variables, context) => {
            if (context?.previousChapters) {
                queryClient.setQueryData(['chapters', storyId], context.previousChapters)
            }
        }
    })

    // update mutation - FIXED: Invalidate the correct query key
    const updateMutation = useMutation({
        mutationFn: ({ chapterId, requestBody }: UpdateMutationArgs) => fetch(`${API_URL}/chapters/${chapterId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to update chapter')
            return res.json()
        }).then((data: ApiChapterContentResponse) => {
             const transformedChapter = {
                id: data.id,
                title: data.title,
                content: data.content,
                published: data.published,
                storyId: data.story_id,
                storyTitle: data.story_title,
                createdAt: new Date(data.created_at + 'Z'),
                updatedAt: new Date(data.updated_at + 'Z'),
                previousChapterId: data.previous_chapter_id,
                nextChapterId: data.next_chapter_id
            }
            return transformedChapter
        }),
        onSuccess: (data) => {
            // FIXED: Invalidate both the chapter list and the individual chapter
            queryClient.invalidateQueries({ queryKey: ['chapters', storyId] })
            queryClient.invalidateQueries({ queryKey: ['chapters', data.id] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (chapterId: string) => fetch(`${API_URL}/chapters/${chapterId}`, {
            method: 'DELETE',
            credentials: 'include',
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to delete chapter')
            return res.json()
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chapters', storyId] })
        }
    })

    // return everything
    return {
        chapters,
        isLoading,
        isError,
        isSuccess,
        getChapter,
        create: createMutation.mutate,
        isCreating: createMutation.isPending,
        creationError: createMutation.isError,
        creationSuccess: createMutation.isSuccess,
        update: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
        updateError: updateMutation.isError,
        updateSucess: updateMutation.isSuccess,
        delete: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
        deleteError: deleteMutation.isError,
        deleteSuccess: deleteMutation.isSuccess
    }
}