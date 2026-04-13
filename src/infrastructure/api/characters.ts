import { ApiCharacterResponse, ApiCharacterArcResponse, ApiCharacterKnowledgeResponse, ApiCharacterInconsistencyResponse, ApiCharacterAppearancesResponse, ApiCharacterIntroductionResponse, ApiCharacterDensityResponse, ApiCharacterGoalsResponse, ApiCharacterKnowledgeMapResponse, mapResult } from "@/data/types";
import { toCharacterAppearancesResponse, toCharacterArcResponse, toCharacterDensityResponse, toCharacterGoalsResponse, toCharacterInconsistencyResponse, toCharacterIntroductionResponse, toCharacterKnowledgeMapResponse, toCharacterKnowledgeResponse, toCharacterResponse } from "@/compatability/transformers";
import fetchApi from "./client";


export const getCharacters = async (storyId: string) => {
    return mapResult(await fetchApi<ApiCharacterResponse>(`/stories/${storyId}/characters`), toCharacterResponse);
}

export const getCharacterArc = async (storyId: string, characterName: string) => {
    return mapResult(await fetchApi<ApiCharacterArcResponse>(`/stories/${storyId}/characters/${characterName}/arc`), toCharacterArcResponse);
}

export const getCharacterKnowledge = async (
    storyId: string, 
    characterName: string,
    chapterNumber?: number
) => {
    const url = chapterNumber
        ? `/stories/${storyId}/characters/${characterName}/knowledge?chapter_number=${chapterNumber}`
        : `/stories/${storyId}/characters/${characterName}/knowledge`;
    return mapResult(await fetchApi<ApiCharacterKnowledgeResponse>(url), toCharacterKnowledgeResponse);
}

export const getCharacterInconsistencies = async (storyId: string, characterName: string) => {
    return mapResult(await fetchApi<ApiCharacterInconsistencyResponse>(`/stories/${storyId}/characters/${characterName}/inconsistencies`), toCharacterInconsistencyResponse);
}

export const getCharacterPresenceMap = async (storyId: string) => {
    return mapResult(await fetchApi<ApiCharacterAppearancesResponse>(`/stories/${storyId}/characters/presence-map`), toCharacterAppearancesResponse);
}

export const getCharacterIntroductionRate = async (storyId: string) => {
    return mapResult(await fetchApi<ApiCharacterIntroductionResponse>(`/stories/${storyId}/characters/introduction-rate`), toCharacterIntroductionResponse);
}

export const getCastDensity = async (storyId: string) => {
    return mapResult(await fetchApi<ApiCharacterDensityResponse>(`/stories/${storyId}/characters/density`), toCharacterDensityResponse);
}

export const getCastManagementReport = async (storyId: string) => {
    return mapResult(await fetchApi<ApiCharacterDensityResponse>(`/stories/${storyId}/characters/cast-report`), toCharacterDensityResponse);
}

export const getGoalEvolution = async (storyId: string, characterName: string) => {
    return mapResult(await fetchApi<ApiCharacterGoalsResponse>(`/stories/${storyId}/characters/${characterName}/goals`), toCharacterGoalsResponse);
}

export const getKnowledgeAsymmetry = async (
    storyId: string, 
    characterName: string,
    chapterNumber?: number
) => {
    const url = chapterNumber
        ? `/stories/${storyId}/characters/${characterName}/knowledge-map?chapter_number=${chapterNumber}`
        : `/stories/${storyId}/characters/${characterName}/knowledge-map`;
    return mapResult(await fetchApi<ApiCharacterKnowledgeMapResponse>(url), toCharacterKnowledgeMapResponse);
}