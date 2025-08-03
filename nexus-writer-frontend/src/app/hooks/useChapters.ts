import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCacheInvalidation } from './useCacheInvalidation'
import { 
    ApiChapterListItem, 
    CreateChapterRequest,
    ApiChapterListResponse,
    ApiChapterContentResponse,
    UpdateMutationArgs
} from '../types/misc'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

export function useChapters(storyId: string) {
    const queryClient = useQueryClient()
    const { 
        invalidateChapter, 
        optimisticChapterUpdate
    } = useCacheInvalidation()

    // ========================================
    // OPTIMIZED CACHE KEYS
    // ========================================
    
    const getChapterCacheKey = (chapterId: string, asLexicalJson: boolean = true) => {
        return ['chapters', chapterId, asLexicalJson ? 'True' : 'False']
    }

    const getChapterListCacheKey = (storyId: string) => {
        return ['chapters', storyId]
    }

    // ========================================
    // QUERIES WITH SMART STALE TIME
    // ========================================

    // Get all chapters for a story
    const {
         data: chapters, 
         isLoading, 
         isError, 
         isSuccess
    } = useQuery({
        queryKey: getChapterListCacheKey(storyId),
        queryFn: async () => {
            const response = await fetch(`${API_URL}/stories/${storyId}/chapters`, {
                credentials: 'include'
            })
            if (!response.ok) throw new Error('Failed to fetch chapters.')
            return response.json()
        },
        enabled: !!storyId,
        staleTime: 30 * 1000, // Chapter lists can be slightly stale (30s)
        gcTime: 10 * 60 * 1000, // Keep longer since frequently accessed
        select: (data: ApiChapterListResponse) => {
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
        }
    })

    // Get individual chapter with prefetching
    const getChapter = (chapterId: string, as_lexical_json: boolean) => useQuery({
        queryKey: getChapterCacheKey(chapterId, as_lexical_json),
        queryFn: async () => {
            const response = await fetch(`${API_URL}/chapters/${chapterId}/?as_lexical_json=${as_lexical_json ? 'True' : 'False'}`, {
                credentials: 'include'
            })
            if (!response.ok) throw new Error('Failed to fetch chapter.')
            return response.json()
        },
        staleTime: 0, // Individual chapters should always be fresh
        gcTime: 5 * 60 * 1000,
        select: (data: ApiChapterContentResponse) => {
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
        }
    })

    // ========================================
    // OPTIMIZED MUTATIONS WITH OPTIMISTIC UPDATES
    // ========================================

    // Create mutation with immediate UI feedback
    const createMutation = useMutation({
        mutationKey: ['createChapter', storyId],
        mutationFn: async (chapterInfo: CreateChapterRequest) => {
            const response = await fetch(`${API_URL}/stories/${storyId}/chapters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(chapterInfo)
            })
            if (!response.ok) throw new Error('Failed to create new chapter.')
            return response.json()
        },
        onMutate: async (newChapter) => {
            // stop any background refetches from ruining the optimistic update!
            await queryClient.cancelQueries({ queryKey: getChapterListCacheKey(storyId) })
            
            // in case the update fails
            const previousChapters = queryClient.getQueryData(getChapterListCacheKey(storyId))
            
            // directly modify cache
            queryClient.setQueryData(getChapterListCacheKey(storyId), (old: any) => {
                if (!old) return old
                
                const optimisticChapter = {
                    id: `temp-${Date.now()}`,
                    title: newChapter.title,
                    published: false,
                    wordCount: 0,
                    updatedAt: new Date()
                }
                
                return {
                    ...old,
                    chapters: [...old.chapters, optimisticChapter]
                }
            })
            
            // pass fallback to onError
            return { previousChapters }
        },
        onError: (err, newChapter, context) => {
            // Revert optimistic update
            if (context?.previousChapters) {
                queryClient.setQueryData(getChapterListCacheKey(storyId), context.previousChapters)
            }
        },
        onSettled: () => {
            // Always refetch after mutation settles
            queryClient.invalidateQueries({ queryKey: getChapterListCacheKey(storyId) })
        }
    })

    // Update mutation with optimistic updates
    const updateMutation = useMutation({
        mutationKey: ['updateChapter'],
        mutationFn: async ({ chapterId, requestBody }: UpdateMutationArgs) => {
            const response = await fetch(`${API_URL}/chapters/${chapterId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            if (!response.ok) throw new Error('Failed to update chapter')
            return response.json()
        },
        onMutate: async ({ chapterId, requestBody }) => {
            // ⚡ Apply optimistic update immediately
            optimisticChapterUpdate(chapterId, requestBody)
            
            return { chapterId, requestBody }
        },
        onSuccess: (data, { chapterId }) => {
            // Invalidate affected caches
            invalidateChapter(chapterId, storyId)
        },
        onError: (error, { chapterId }) => {
            console.error('Chapter update failed:', error)
            // Revalidate to get correct data
            invalidateChapter(chapterId, storyId)
        }
    })

    // Delete mutation
    const deleteMutation = useMutation({
        mutationKey: ['deleteChapter'],
        mutationFn: async (chapterId: string) => {
            const response = await fetch(`${API_URL}/chapters/${chapterId}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Failed to delete chapter')
            return response.json()
        },
        onSuccess: (data, chapterId) => {
            // Remove from cache immediately
            queryClient.removeQueries({ queryKey: ['chapters', chapterId] })
            // Invalidate chapter list
            queryClient.invalidateQueries({ queryKey: getChapterListCacheKey(storyId) })
            // Invalidate story list (chapter count changed)
            queryClient.invalidateQueries({ queryKey: ['stories'] })
        }
    })

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
        createdChapter: createMutation.data, 
        update: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
        updateError: updateMutation.isError,
        updateSuccess: updateMutation.isSuccess,
        deleteChapter: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
        deleteError: deleteMutation.isError,
        deleteSuccess: deleteMutation.isSuccess,
    }
}