import { useQuery, useMutation} from '@tanstack/react-query';
import { useCacheInvalidation } from './useCacheInvalidation';
import * as chapterService from '../services/chapterService';
import { CreateChapterRequest } from '../types';

export function useChapters(storyId: string) {

    const cache = useCacheInvalidation();

    const { data: chapters, isLoading, isError, isSuccess } = useQuery({
        queryKey: cache.CACHE_KEYS.chapterList(storyId),
        queryFn: () => chapterService.getChaptersForStory(storyId),
        enabled: !!storyId,
    });

    const useChapter = (chapterId: string, asLexicalJson: boolean) => useQuery({
        queryKey: ['chapters', chapterId, asLexicalJson ? 'True' : 'False'], // This key is more specific, keep it here
        queryFn: () => chapterService.getChapter(chapterId, asLexicalJson),
    });

    const createMutation = useMutation({
        mutationFn: (chapterInfo: CreateChapterRequest) => chapterService.createChapter(storyId, chapterInfo),
        onMutate: (newChapter) => cache.optimisticChapterCreate(storyId, newChapter),
        onError: (err, variables, context) => {
            if (context?.previousData) {
                cache.rollback(cache.CACHE_KEYS.chapterList(storyId), context.previousData);
            }
        },
        onSettled: () => cache.invalidateChapterList(storyId),
    });

    const updateMutation = useMutation({
        mutationFn: chapterService.updateChapter,
        onMutate: async ({ chapterId, requestBody }) => {
            return cache.optimisticChapterUpdate(storyId, chapterId, requestBody);
        },
        onError: (err, variables, context) => {
            if (context?.previousListData) {
                cache.rollback(cache.CACHE_KEYS.chapterList(storyId), context.previousListData);
            }
            if (context?.previousChapterData) {
                cache.rollback(cache.CACHE_KEYS.chapter(variables.chapterId, true), context.previousChapterData);
                cache.rollback(cache.CACHE_KEYS.chapter(variables.chapterId, false), context.previousChapterData);
            }
        },
        onSettled: () => cache.invalidateChapterList(storyId),
    });

    const deleteMutation = useMutation({
        mutationFn: chapterService.deleteChapter,
        onSuccess: () => {
            // For delete, simple invalidation is often sufficient and safer
            cache.invalidateChapterList(storyId);
            cache.invalidateStories();
        },
    });

    return {
        chapters,
        isLoading,
        isError,
        isSuccess,
        useChapter,
        create: createMutation.mutate,
        isCreating: createMutation.isPending,
        creationSuccess: createMutation.isSuccess,
        creationError: createMutation.error,
        createdChapter: createMutation.data,
        update: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
        updateSuccess: updateMutation.isSuccess,
        updateError: updateMutation.isError,
        updatedChapter: updateMutation.data,
        deleteChapter: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
        deleteSuccess: deleteMutation.isSuccess,
        deleteError: deleteMutation.isError
    };
}