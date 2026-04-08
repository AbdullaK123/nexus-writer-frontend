/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { CreateChapterRequest, ChapterListItemProps, ApiChapterListResponse } from '../types';

// Centralized cache key management
const CACHE_KEYS = {
    stories: () => ['stories'],
    story: (id: string) => ['stories', id],
    chapterList: (storyId: string) => ['chapters', storyId],
    chapter: (id: string, asHtml: boolean) => ['chapters', id, asHtml ? 'True' : 'False'],
};

export function useCacheInvalidation() {
    const queryClient = useQueryClient();

    // --- CHAPTER OPTIMISTIC UPDATES ---

    const optimisticChapterCreate = useCallback(async (storyId: string, newChapter: CreateChapterRequest) => {
        const queryKey = CACHE_KEYS.chapterList(storyId);
        await queryClient.cancelQueries({ queryKey });
        const previousData = queryClient.getQueryData<ApiChapterListResponse>(queryKey);

        queryClient.setQueryData(queryKey, (oldData: any) => {
            const optimisticChapter: ChapterListItemProps = {
                id: `temp-${Date.now()}`,
                title: newChapter.title,
                wordCount: 0,
                status: 'outline',
                published: false,
                updatedAt: new Date(),
                storyId: storyId,
                chapterNumber: (oldData?.chapters?.length || 0) + 1,
                handleOnClick: () => {},
                handleClearSelection: () => {},
            };
            return oldData ? { ...oldData, chapters: [...oldData.chapters, optimisticChapter] } : { chapters: [optimisticChapter] };
        });

        return { previousData };
    }, [queryClient]);

    const optimisticChapterUpdate = useCallback(async (storyId: string, chapterId: string, updates: Partial<ChapterListItemProps>) => {
        const listKey = CACHE_KEYS.chapterList(storyId);
        const chapterKeyTrue = CACHE_KEYS.chapter(chapterId, true);
        const chapterKeyFalse = CACHE_KEYS.chapter(chapterId, false);


        await queryClient.cancelQueries({ queryKey: listKey });
        await queryClient.cancelQueries({ queryKey: chapterKeyTrue });
        await queryClient.cancelQueries({ queryKey: chapterKeyFalse });


        const previousListData = queryClient.getQueryData(listKey);
        const previousChapterDataTrue = queryClient.getQueryData(chapterKeyTrue);
        const previousChapterDataFalse = queryClient.getQueryData(chapterKeyFalse);


        // Update chapter in the list
        queryClient.setQueryData(listKey, (oldData: any) => {
            if (!oldData?.chapters) return oldData;
            return {
                ...oldData,
                chapters: oldData.chapters.map((chapter: ChapterListItemProps) =>
                    chapter.id === chapterId ? { ...chapter, ...updates } : chapter
                ),
            };
        });

        // Update individual chapter
        queryClient.setQueryData(chapterKeyTrue, (oldData: any) => oldData ? { ...oldData, ...updates } : undefined);
        queryClient.setQueryData(chapterKeyFalse, (oldData: any) => oldData ? { ...oldData, ...updates } : undefined);


        return { previousListData, previousChapterDataTrue, previousChapterDataFalse };
    }, [queryClient]);


    // --- GENERIC CACHE ACTIONS ---

    const invalidateStories = useCallback(() => {
        return queryClient.invalidateQueries({ queryKey: CACHE_KEYS.stories() });
    }, [queryClient]);

    const invalidateChapterList = useCallback((storyId: string) => {
        return queryClient.invalidateQueries({ queryKey: CACHE_KEYS.chapterList(storyId) });
    }, [queryClient]);

    const invalidateChapter = useCallback((chapterId: string) => {
        queryClient.invalidateQueries({queryKey: CACHE_KEYS.chapter(chapterId, true)});
        queryClient.invalidateQueries({ queryKey: CACHE_KEYS.chapter(chapterId, false) });
    }, [queryClient]);


    const rollback = useCallback((queryKey: any[], previousData: unknown) => {
        queryClient.setQueryData(queryKey, previousData);
    }, [queryClient]);


    return {
        CACHE_KEYS,
        optimisticChapterCreate,
        optimisticChapterUpdate,
        invalidateStories,
        invalidateChapterList,
        invalidateChapter,
        rollback,
    };
}