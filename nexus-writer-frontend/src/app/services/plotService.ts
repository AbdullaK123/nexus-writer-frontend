import { toDeusExMachinaResponse, toDormantThreadsResponse, toEventDensityResponse, toPlotDensityResponse, toPlotRhythmReportResponse, toPlotStructuralReportResponse, toPlotThreadsResponse, toSetupPayoffMap, toSetupResponse, toStoryQuestionsResponse, toThreadTimelineResponse } from "../types";
import fetchApi from "./api";


export const getUnresolvedPlotThreads = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/plot/threads`);
    return toPlotThreadsResponse(data);
}

export const getUnansweredQuestions = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/plot/questions`);
    return toStoryQuestionsResponse(data);
}

export const getSetupsWithNoPayoff = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/plot/setups`);
    return toSetupResponse(data);
}

export const getDeusExMachinas = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/plot/deus-ex-machinas`);
    return toDeusExMachinaResponse(data);
}

export const getPlotReport = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/plot/report`);
    return toPlotStructuralReportResponse(data);
}

export const getThreadTimeline = async (storyId: string, threadName: string) => {
    const data = await fetchApi(`/stories/${storyId}/plot/thread-timeline?thread_name=${encodeURIComponent(threadName)}`);
    return toThreadTimelineResponse(data);
}

export const getDormantThreads = async (storyId: string, minGap: number = 3) => {
    const data = await fetchApi(`/stories/${storyId}/plot/dormant-threads?min_gap=${minGap}`);
    return toDormantThreadsResponse(data);
}

export const getEventDensity = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/plot/event-density`);
    return toEventDensityResponse(data);
}

export const getSetupPayoffMap = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/plot/setup-payoff-map`);
    return (data as unknown[]).map(toSetupPayoffMap);
}

export const getPlotDensity = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/plot/density`);
    return toPlotDensityResponse(data);
}

export const getPlotRhythmReport = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}/plot/rhythm-report`);
    return toPlotRhythmReportResponse(data);
}