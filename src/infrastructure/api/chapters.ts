// src/app/services/chapterService.ts
import fetchApi from './client';
import { 
    CreateChapterRequest,
    ApiChapterListResponse,
    ApiChapterContentResponse,
    UpdateChapterRequest,
    ApiChapterEdit,
    ChapterEdit,
    Result,
    ApiError,
    mapResult,
} from '@/data/types';
import { transformChapterList, transformChapterContent, transformChapterEdit, TransformedChapterList, TransformedChapterContent } from '@/compatability/transformers';

export interface UpdateMutationArgs {
  chapterId: string;
  requestBody: UpdateChapterRequest
}

export type { TransformedChapterList, TransformedChapterContent } from '@/compatability/transformers';


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