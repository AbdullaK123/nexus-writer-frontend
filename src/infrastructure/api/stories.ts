import { transformStoryAnalyticResponse, transformTarget, transformStory, transformStoryListItemResponse, TransformedStory } from '@/compatability/transformers';
import fetchApi from './client';
import { ApiStory, ApiStoryAnalyticsResponse, ApiStoryListItemResponse, ApiTargetResponse, Frequency, StoryAnalytics, StoryCreateRequest, StoryListItemResponse, StoryUpdateRequest, Result, ApiError, mapResult } from '@/data/types';

export type { TransformedStory } from '@/compatability/transformers';

export const getStoryAnalytics = async (
    storyId: string, 
    frequency: Frequency, 
    fromDate?: string, 
    toDate?: string
): Promise<Result<StoryAnalytics, ApiError>> => {
    let baseUrl = `/stories/${storyId}/analytics?frequency=${frequency}`
    if (fromDate) {
        baseUrl += `&from_date=${fromDate}`
    }
    if (toDate) {
        baseUrl += `&to_date=${toDate}`
    }
    return mapResult(await fetchApi<ApiStoryAnalyticsResponse>(baseUrl), transformStoryAnalyticResponse);
}

export const getStories = async (): Promise<Result<TransformedStory[], ApiError>> => {
    return mapResult(
        await fetchApi<{ stories: ApiStory[] }>('/stories'),
        data => data.stories ? data.stories.map(transformStory) : []
    );
};

export const getStoriesWithTargets = async (): Promise<Result<StoryListItemResponse[], ApiError>> => {
    return mapResult(
        await fetchApi<ApiStoryListItemResponse[]>('/stories/targets'),
        data => data.map(transformStoryListItemResponse)
    );
}

export const getStory = async (storyId: string): Promise<Result<TransformedStory, ApiError>> => {
    return mapResult(await fetchApi<ApiStory>(`/stories/${storyId}`), transformStory);
};

export const createStory = (storyInfo: StoryCreateRequest): Promise<Result<ApiStory, ApiError>> => {
    return fetchApi<ApiStory>('/stories', {
        method: 'POST',
        body: JSON.stringify(storyInfo),
    });
};

export const updateStory = ({ storyId, body }: StoryUpdateRequest): Promise<Result<ApiStory, ApiError>> => {
    return fetchApi<ApiStory>(`/stories/${storyId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
    });
};

export const deleteStory = (storyId: string): Promise<Result<void, ApiError>> => {
    return fetchApi(`/stories/${storyId}`, {
        method: 'DELETE',
    });
};