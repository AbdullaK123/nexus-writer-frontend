import { toCharacterAppearancesResponse, toCharacterArcResponse, toCharacterDensityResponse, toCharacterGoalsResponse, toCharacterInconsistencyResponse, toCharacterIntroductionResponse, toCharacterKnowledgeMapResponse, toCharacterKnowledgeResponse, toCharacterResponse } from "../types";
import fetchApi from "./api";


export const getCharacters = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/characters`);
    return toCharacterResponse(data)
}

export const getCharacterArc = async (storyId: string, characterName: string) => {
    const data = await fetchApi(`/stories/${storyId}/characters/${characterName}/arc`);
    return toCharacterArcResponse(data)
}

export const getCharacterKnowledge = 
async (
    storyId: string, 
    characterName: string,
    chapterNumber?: number
) => {
    const url = 
        chapterNumber ? 
            `/stories/${storyId}/characters/${characterName}/knowledge?chapter_number=${chapterNumber}`
            : `/stories/${storyId}/characters/${characterName}/knowledge`
    const data = await fetchApi(url)
    return toCharacterKnowledgeResponse(data)
}

export const getCharacterInconsistencies = async (storyId: string, characterName: string) => {
    const data = await fetchApi(`/stories/${storyId}/characters/${characterName}/inconsistencies`)
    return toCharacterInconsistencyResponse(data)
}

export const getCharacterPresenceMap = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/characters/presence-map`)
    return toCharacterAppearancesResponse(data)
}

export const getCharacterIntroductionRate = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/characters/introduction-rate`)
    return toCharacterIntroductionResponse(data)
}

export const getCastDensity = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/characters/density`)
    return toCharacterDensityResponse(data)
}

export const getCastManagementReport = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/characters/cast-report`)
    return toCharacterDensityResponse(data)
}

export const getGoalEvolution = async (storyId: string, characterName: string) => {
    const data = await fetchApi(`/stories/${storyId}/characters/${characterName}/goals`)
    return toCharacterGoalsResponse(data)
}

export const getKnowledgeAsymmetry = 
async (
    storyId: string, 
    characterName: string,
    chapterNumber?: number
) => {
    const url = 
        chapterNumber ? 
            `/stories/${storyId}/characters/${characterName}/knowledge-map?chapter_number=${chapterNumber}`
            : `/stories/${storyId}/characters/${characterName}/knowledge-map`
    const data = await fetchApi(url)
    return toCharacterKnowledgeMapResponse(data)
}