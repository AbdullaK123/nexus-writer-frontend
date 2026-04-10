// src/app/services/chapterService.ts
import fetchApi from './api';
import { 
    ApiChapterListItem, 
    CreateChapterRequest,
    ApiChapterListResponse,
    ApiChapterContentResponse,
    UpdateChapterRequest,
    ApiLineEdit,
    ApiChapterEdit,
    LineEdit,
    ChapterEdit,
    Result,
    ApiError,
    mapResult,
} from '../types';

export interface UpdateMutationArgs {
  chapterId: string;
  requestBody: UpdateChapterRequest
}

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

export type TransformedChapterList = ReturnType<typeof transformChapterList>;

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

export type TransformedChapterContent = ReturnType<typeof transformChapterContent>;

const transformChapterEdit = (data: ApiChapterEdit): ChapterEdit => ({
    edits: data.edits.map((edit: ApiLineEdit): LineEdit => ({
        paragraphIdx: edit.paragraph_idx,
        originalParagraph: edit.original_paragraph,
        editedParagraph: edit.edited_paragraph,
        justification: edit.justification
    })),
    lastGeneratedAt: new Date(data.last_generated_at + 'Z'),
    isStale: data.is_stale
})


export const getChaptersForStory = async (storyId: string): Promise<Result<TransformedChapterList, ApiError>> => {
    return mapResult(await fetchApi<ApiChapterListResponse>(`/stories/${storyId}/chapters`), transformChapterList);
};

export const getChapter = async (chapterId: string, asHtml: boolean): Promise<Result<TransformedChapterContent, ApiError>> => {
    return mapResult(await fetchApi<ApiChapterContentResponse>(`/chapters/${chapterId}/?as_html=${asHtml ? 'True' : 'False'}`), transformChapterContent);
};

export const getEdits = async (chapterId: string): Promise<Result<ChapterEdit, ApiError>> => {
    return mapResult(await fetchApi<ApiChapterEdit>(`/chapters/edit/${chapterId}`), transformChapterEdit);
}

export const createChapter = (storyId: string, chapterInfo: CreateChapterRequest): Promise<Result<ApiChapterContentResponse, ApiError>> => {
    return fetchApi<ApiChapterContentResponse>(`/stories/${storyId}/chapters`, {
        method: 'POST',
        body: JSON.stringify(chapterInfo),
    });
};

export const updateChapter = ({ chapterId, requestBody }: UpdateMutationArgs): Promise<Result<ApiChapterContentResponse, ApiError>> => {
    return fetchApi<ApiChapterContentResponse>(`/chapters/${chapterId}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
    });
};

export const deleteChapter = (chapterId: string): Promise<Result<void, ApiError>> => {
    return fetchApi(`/chapters/${chapterId}`, {
        method: 'DELETE',
    });
};