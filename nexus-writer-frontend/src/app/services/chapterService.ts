// src/app/services/chapterService.ts
import fetchApi from './api';
import { 
    ApiChapterListItem, 
    CreateChapterRequest,
    ApiChapterListResponse,
    ApiChapterContentResponse,
    UpdateMutationArgs
} from '../types';

// Transformation for a list of chapters
const transformChapterList = (data: ApiChapterListResponse) => {
    const transformedChapters = data.chapters?.map((item: ApiChapterListItem) => ({
        ...item,
        wordCount: item.word_count,
        updatedAt: new Date(item.updated_at + 'Z'),
    })) || [];

    return {
        storyId: data.story_id,
        storyTitle: data.story_title,
        storyStatus: data.story_status,
        storyLastUpdated: new Date(data.story_last_updated + 'Z'),
        chapters: transformedChapters,
    };
};

// Transformation for a single chapter's content
const transformChapterContent = (data: ApiChapterContentResponse) => ({
    id: data.id,
    title: data.title,
    content: data.content,
    published: data.published,
    storyId: data.story_id,
    storyTitle: data.story_title,
    createdAt: new Date(data.created_at + 'Z'),
    updatedAt: new Date(data.updated_at + 'Z'),
    previousChapterId: data.previous_chapter_id,
    nextChapterId: data.next_chapter_id,
});


export const getChaptersForStory = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/chapters`);
    return transformChapterList(data);
};

export const getChapter = async (chapterId: string, asHtml: boolean) => {
    const data = await fetchApi(`/chapters/${chapterId}/?as_html=${asHtml ? 'True' : 'False'}`);
    return transformChapterContent(data);
};

export const createChapter = (storyId: string, chapterInfo: CreateChapterRequest) => {
    return fetchApi(`/stories/${storyId}/chapters`, {
        method: 'POST',
        body: JSON.stringify(chapterInfo),
    });
};

export const updateChapter = ({ chapterId, requestBody }: UpdateMutationArgs) => {
    return fetchApi(`/chapters/${chapterId}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
    });
};

export const deleteChapter = (chapterId: string) => {
    return fetchApi(`/chapters/${chapterId}`, {
        method: 'DELETE',
    });
};