import { ApiContradictionResponse, ApiEntityFactResponse, ApiEntityTimelineResponse, ApiStoryFactCountsResponse, ApiWorldConsistencyReport, toContradictionResponse, toEntityFactResponse, toEntityTimelineResponse, toStoryFactCountsResponse, toWorldConsistencyReport, mapResult } from "../types";
import fetchApi from "./api";


export const getContradictions = async (storyId: string) => {
    return mapResult(await fetchApi<ApiContradictionResponse>(`/stories/${storyId}/world/contradictions`), toContradictionResponse);
}

export const getEntityRegistry = async (storyId: string, entities?: string[]) => {
    const params = new URLSearchParams();
    if (entities) {
        entities.forEach(e => params.append('entities', e));
    }
    const query = params.toString();
    const url = `/stories/${storyId}/world/entities${query ? `?${query}` : ''}`;
    return mapResult(await fetchApi<ApiEntityFactResponse[]>(url), data => data.map(toEntityFactResponse));
}

export const getEntityTimeline = async (storyId: string, entity: string) => {
    return mapResult(await fetchApi<ApiEntityTimelineResponse>(`/stories/${storyId}/world/entities/${encodeURIComponent(entity)}/timeline`), toEntityTimelineResponse);
}

export const getFactDensity = async (storyId: string) => {
    return mapResult(await fetchApi<ApiStoryFactCountsResponse>(`/stories/${storyId}/world/fact-density`), toStoryFactCountsResponse);
}

export const getWorldConsistencyReport = async (storyId: string) => {
    return mapResult(await fetchApi<ApiWorldConsistencyReport>(`/stories/${storyId}/world/report`), toWorldConsistencyReport);
}