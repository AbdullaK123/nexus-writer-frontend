import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useChapters } from './useChapters';
import { useSelectedChapter } from './useSelectedChapter';
import { CreateChapterRequest } from '../types';
import { getChapterStatus } from '../lib/utils';

export function useStoryDetail() {
    const router = useRouter();
    const params = useParams();
    const storyId = params?.id as string;

    const [filter, setFilter] = useState('');

    const {
        chapters: chapterData,
        isLoading: isLoadingChapters,
        isError,
        create,
        isCreating,
        creationError,
        creationSuccess,
    } = useChapters(storyId);

    const { 
        selectedChapter, 
        selectChapter, 
        isLoadingChapter,
        clearSelection
     } = useSelectedChapter(storyId);

    useEffect(() => {
        if (isError) {
            alert(`Error fetching chapters for story: ${storyId}. The server might be experiencing issues`);
            router.push('/dashboard');
        }
    }, [isError, router, storyId]);

    useEffect(() => {
          if (creationError) {
              alert('Failed to create chapter. Please check the server logs');
          }
    }, [creationError]);

    const handleChapterStatusUpdate = useCallback(() => {
        if (selectedChapter?.id) {
            selectChapter(selectedChapter.id);
        }
    }, [selectedChapter, selectChapter]);

    const chapters = useMemo(() => {
        if (!chapterData?.chapters) return [];

        const chaptersWithStatusAndNumbers = chapterData.chapters.map((chapter, index) => ({
            ...chapter,
            storyId: storyId,
            chapterNumber: index + 1,
            status: getChapterStatus(chapter.published, chapter.wordCount > 0),
            handleOnClick: () => selectChapter(chapter.id),
            handleClearSelection: clearSelection,
        }));

        if (!filter) return chaptersWithStatusAndNumbers;
        return chaptersWithStatusAndNumbers.filter((chapter) => chapter.status === filter);
    }, [chapterData, filter, storyId, selectChapter, clearSelection]);

    const storyInfo = useMemo(() => {
        if (!chapterData) return null;
        return {
            status: chapterData.storyStatus || "Ongoing",
            totalChapters: chapterData.chapters.length,
            wordCount: chapterData.chapters.reduce((acc, current) => acc + current.wordCount, 0),
            updatedAt: chapterData.storyLastUpdated || new Date(),
        };
    }, [chapterData]);

    const onCreateChapter = (chapterInfo: CreateChapterRequest) => {
        if(!chapterInfo.title.trim()) {
            alert('Chapter title can not be empty!')
            return
        }
        create(chapterInfo)
    }

    return {
        storyId,
        isLoading: isLoadingChapters || !storyId,
        storyInfo,
        chaptersToShow: chapters,
        title: chapterData?.storyTitle,
        onFilterChange: setFilter,
        onCreateChapter,
        isCreating,
        creationSuccess,
        selectedChapter,
        isLoadingChapter,
        handleChapterStatusUpdate,
    };
}