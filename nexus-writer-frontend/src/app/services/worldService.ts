import { toContradictionResponse, toEntityFactResponse, toEntityTimelineResponse, toStoryFactCountsResponse, toWorldConsistencyReport } from "../types";
import fetchApi from "./api";


export const getContradictions = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/world/contradictions`);
    return toContradictionResponse(data);
}

export const getEntityRegistry = async (storyId: string, entities?: string[]) => {
    const params = new URLSearchParams();
    if (entities) {
        entities.forEach(e => params.append('entities', e));
    }
    const query = params.toString();
    const url = `/stories/${storyId}/world/entities${query ? `?${query}` : ''}`;
    const data = await fetchApi(url);
    return (data as unknown[]).map(toEntityFactResponse);
}

export const getEntityTimeline = async (storyId: string, entity: string) => {
    const data = await fetchApi(`/stories/${storyId}/world/entities/${encodeURIComponent(entity)}/timeline`);
    return toEntityTimelineResponse(data);
}

export const getFactDensity = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/world/fact-density`);
    return toStoryFactCountsResponse(data);
}

export const getWorldConsistencyReport = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/world/report`);
    return toWorldConsistencyReport(data);
}