import { toDevelopmentalReportResponse, toEmotionalBeatsResponse, toPacingCurveResponse, toPOVBalanceResponse, toSceneIndexResponse, toSceneTypeDistributionResponse, toStructuralArcResponse, toThemeDistributionResponse, toWeakScenesResponse } from "../types";
import fetchApi from "./api";


export const getSceneIndex = async (
    storyId: string,
    sceneType?: string,
    pov?: string,
    location?: string
) => {
    const params = new URLSearchParams();
    if (sceneType) params.set('scene_type', sceneType);
    if (pov) params.set('pov', pov);
    if (location) params.set('location', location);
    const query = params.toString();
    const url = `/stories/${storyId}/structure/scenes${query ? `?${query}` : ''}`;
    const data = await fetchApi(url);
    return toSceneIndexResponse(data);
}

export const getWeakScenes = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/structure/scenes/weak`);
    return toWeakScenesResponse(data);
}

export const getSceneTypeDistribution = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/structure/scenes/distribution`);
    return toSceneTypeDistributionResponse(data);
}

export const getPOVBalance = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/structure/pov-balance`);
    return toPOVBalanceResponse(data);
}

export const getPacingCurve = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/structure/pacing`);
    return toPacingCurveResponse(data);
}

export const getStructuralArc = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/structure/arc`);
    return toStructuralArcResponse(data);
}

export const getThemeDistribution = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/structure/themes`);
    return toThemeDistributionResponse(data);
}

export const getEmotionalBeats = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/structure/emotional-beats`);
    return toEmotionalBeatsResponse(data);
}

export const getDevelopmentalReport = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/structure/report`);
    return toDevelopmentalReportResponse(data);
}