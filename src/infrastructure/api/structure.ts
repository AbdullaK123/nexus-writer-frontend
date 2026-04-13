import { ApiSceneIndexResponse, ApiWeakScenesResponse, ApiSceneTypeDistributionResponse, ApiPOVBalanceResponse, ApiPacingCurveResponse, ApiStructuralArcResponse, ApiThemeDistributionResponse, ApiEmotionalBeatsResponse, ApiDevelopmentalReportResponse, mapResult } from "@/data/types";
import { toDevelopmentalReportResponse, toEmotionalBeatsResponse, toPacingCurveResponse, toPOVBalanceResponse, toSceneIndexResponse, toSceneTypeDistributionResponse, toStructuralArcResponse, toThemeDistributionResponse, toWeakScenesResponse } from "@/compatability/transformers";
import fetchApi from "./client";


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
    return mapResult(await fetchApi<ApiSceneIndexResponse>(url), toSceneIndexResponse);
}

export const getWeakScenes = async (storyId: string) => {
    return mapResult(await fetchApi<ApiWeakScenesResponse>(`/stories/${storyId}/structure/scenes/weak`), toWeakScenesResponse);
}

export const getSceneTypeDistribution = async (storyId: string) => {
    return mapResult(await fetchApi<ApiSceneTypeDistributionResponse>(`/stories/${storyId}/structure/scenes/distribution`), toSceneTypeDistributionResponse);
}

export const getPOVBalance = async (storyId: string) => {
    return mapResult(await fetchApi<ApiPOVBalanceResponse>(`/stories/${storyId}/structure/pov-balance`), toPOVBalanceResponse);
}

export const getPacingCurve = async (storyId: string) => {
    return mapResult(await fetchApi<ApiPacingCurveResponse>(`/stories/${storyId}/structure/pacing`), toPacingCurveResponse);
}

export const getStructuralArc = async (storyId: string) => {
    return mapResult(await fetchApi<ApiStructuralArcResponse>(`/stories/${storyId}/structure/arc`), toStructuralArcResponse);
}

export const getThemeDistribution = async (storyId: string) => {
    return mapResult(await fetchApi<ApiThemeDistributionResponse>(`/stories/${storyId}/structure/themes`), toThemeDistributionResponse);
}

export const getEmotionalBeats = async (storyId: string) => {
    return mapResult(await fetchApi<ApiEmotionalBeatsResponse>(`/stories/${storyId}/structure/emotional-beats`), toEmotionalBeatsResponse);
}

export const getDevelopmentalReport = async (storyId: string) => {
    return mapResult(await fetchApi<ApiDevelopmentalReportResponse>(`/stories/${storyId}/structure/report`), toDevelopmentalReportResponse);
}