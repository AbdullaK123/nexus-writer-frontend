// app/hooks/useCacheInvalidation.ts - SMART CACHE MANAGEMENT
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export function useCacheInvalidation() {
    const queryClient = useQueryClient()

    // 🎯 TARGETED INVALIDATION - Only what changed
    const invalidateChapter = useCallback(async (chapterId: string, storyId: string) => {
        const invalidations = [
            // Individual chapter (both formats)
            queryClient.invalidateQueries({ queryKey: ['chapters', chapterId, 'True'] }),
            queryClient.invalidateQueries({ queryKey: ['chapters', chapterId, 'False'] }),
            // Chapter list for the story
            queryClient.invalidateQueries({ queryKey: ['chapters', storyId] }),
            // Story list (chapter count/word count might have changed)
            queryClient.invalidateQueries({ queryKey: ['stories'] })
        ]
        
        await Promise.all(invalidations)
        console.log(`🔄 Invalidated caches for chapter ${chapterId}`)
    }, [queryClient])

    // 🗑️ STORY DELETION - Nuclear invalidation
    const invalidateStory = useCallback(async (storyId: string) => {
        const invalidations = [
            // All chapters for this story
            queryClient.invalidateQueries({ queryKey: ['chapters', storyId] }),
            // Story list
            queryClient.invalidateQueries({ queryKey: ['stories'] }),
            // Remove any individual chapters from cache
            queryClient.removeQueries({ 
                queryKey: ['chapters'], 
                predicate: (query) => {
                    // Remove any chapter cache that belongs to this story
                    return query.queryKey.length >= 3 && query.state.data?.story_id === storyId
                }
            })
        ]
        
        await Promise.all(invalidations)
        console.log(`🗑️ Invalidated all caches for story ${storyId}`)
    }, [queryClient])

    // ⚡ OPTIMISTIC UPDATES - Update cache immediately, revalidate later
    const optimisticChapterUpdate = useCallback((chapterId: string, updates: Partial<any>) => {
        // Update both formats of the chapter cache
        queryClient.setQueriesData(
            { queryKey: ['chapters', chapterId] },
            (oldData: any) => {
                if (!oldData) return oldData
                return { ...oldData, ...updates, updated_at: new Date().toISOString() }
            }
        )
        
        // Update chapter in lists
        queryClient.setQueriesData(
            { queryKey: ['chapters'], exact: false },
            (oldData: any) => {
                if (!oldData?.chapters) return oldData
                return {
                    ...oldData,
                    chapters: oldData.chapters.map((chapter: any) => 
                        chapter.id === chapterId 
                            ? { ...chapter, ...updates, updated_at: new Date().toISOString() }
                            : chapter
                    )
                }
            }
        )
        
        console.log(`⚡ Optimistic update applied to chapter ${chapterId}`)
    }, [queryClient])

    // 🔄 BACKGROUND SYNC - Manually trigger fresh data
    const syncChapterData = useCallback(async (chapterId: string, storyId: string) => {
        const queries = [
            ['chapters', chapterId, 'True'],
            ['chapters', chapterId, 'False'],
            ['chapters', storyId]
        ]
        
        await Promise.all(
            queries.map(queryKey => 
                queryClient.refetchQueries({ queryKey, type: 'active' })
            )
        )
        
        console.log(`🔄 Background sync completed for chapter ${chapterId}`)
    }, [queryClient])

    // 🧹 MEMORY MANAGEMENT - Clean up old cache entries
    const cleanupOldCache = useCallback(() => {
        // Remove queries that haven't been used in 15 minutes
        queryClient.getQueryCache().clear()
        
        // Or more selectively:
        queryClient.removeQueries({
            predicate: (query) => {
                const lastUsed = query.state.dataUpdatedAt
                const fifteenMinutesAgo = Date.now() - (15 * 60 * 1000)
                return lastUsed < fifteenMinutesAgo
            }
        })
        
        console.log('🧹 Cleaned up old cache entries')
    }, [queryClient])

    // 🎮 PREFETCH STRATEGIES - Load data before user needs it
    const prefetchAdjacentChapters = useCallback(async (currentChapterId: string, storyId: string) => {
        // Get current chapter to find adjacent ones
        const currentChapter = queryClient.getQueryData(['chapters', currentChapterId, 'True'])
        
        if (currentChapter && typeof currentChapter === 'object' && 'previous_chapter_id' in currentChapter) {
            const { previous_chapter_id, next_chapter_id } = currentChapter as any
            
            const prefetches = []
            
            // Prefetch previous chapter
            if (previous_chapter_id) {
                prefetches.push(
                    queryClient.prefetchQuery({
                        queryKey: ['chapters', previous_chapter_id, 'True'],
                        queryFn: () => fetch(`/api/chapters/${previous_chapter_id}?as_lexical_json=True`).then(r => r.json()),
                        staleTime: 5 * 60 * 1000 // 5 minutes
                    })
                )
            }
            
            // Prefetch next chapter
            if (next_chapter_id) {
                prefetches.push(
                    queryClient.prefetchQuery({
                        queryKey: ['chapters', next_chapter_id, 'True'],
                        queryFn: () => fetch(`/api/chapters/${next_chapter_id}?as_lexical_json=True`).then(r => r.json()),
                        staleTime: 5 * 60 * 1000
                    })
                )
            }
            
            await Promise.all(prefetches)
            console.log(`🎮 Prefetched adjacent chapters for ${currentChapterId}`)
        }
    }, [queryClient])

    // 📊 CACHE ANALYTICS - Debug cache performance
    const getCacheStats = useCallback(() => {
        const cache = queryClient.getQueryCache()
        const queries = cache.getAll()
        
        const stats = {
            totalQueries: queries.length,
            activeQueries: queries.filter(q => q.getObserversCount() > 0).length,
            staleQueries: queries.filter(q => q.isStale()).length,
            errorQueries: queries.filter(q => q.state.status === 'error').length,
            loadingQueries: queries.filter(q => q.state.status === 'pending').length,
            cacheSize: queries.reduce((acc, q) => acc + JSON.stringify(q.state.data || {}).length, 0)
        }
        
        console.table(stats)
        return stats
    }, [queryClient])

    return {
        // Targeted invalidation
        invalidateChapter,
        invalidateStory,
        
        // Performance optimizations
        optimisticChapterUpdate,
        syncChapterData,
        prefetchAdjacentChapters,
        
        // Maintenance
        cleanupOldCache,
        getCacheStats
    }
}