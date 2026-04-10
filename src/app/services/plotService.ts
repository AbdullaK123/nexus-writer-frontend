import { ApiPlotThreadsResponse, ApiStoryQuestionsResponse, ApiSetupResponse, ApiDeusExMachinaResponse, ApiPlotStructuralReportResponse, ApiThreadTimelineResponse, ApiDormantThreadsResponse, ApiEventDensityResponse, ApiSetupPayoffMap, ApiPlotDensityResponse, ApiPlotRhythmReportResponse, toDeusExMachinaResponse, toDormantThreadsResponse, toEventDensityResponse, toPlotDensityResponse, toPlotRhythmReportResponse, toPlotStructuralReportResponse, toPlotThreadsResponse, toSetupPayoffMap, toSetupResponse, toStoryQuestionsResponse, toThreadTimelineResponse, mapResult } from "../types";
import fetchApi from "./api";


export const getUnresolvedPlotThreads = async (storyId: string) => {
    return mapResult(await fetchApi<ApiPlotThreadsResponse>(`/stories/${storyId}/plot/threads`), toPlotThreadsResponse);
}

export const getUnansweredQuestions = async (storyId: string) => {
    return mapResult(await fetchApi<ApiStoryQuestionsResponse>(`/stories/${storyId}/plot/questions`), toStoryQuestionsResponse);
}

export const getSetupsWithNoPayoff = async (storyId: string) => {
    return mapResult(await fetchApi<ApiSetupResponse>(`/stories/${storyId}/plot/setups`), toSetupResponse);
}

export const getDeusExMachinas = async (storyId: string) => {
    return mapResult(await fetchApi<ApiDeusExMachinaResponse>(`/stories/${storyId}/plot/deus-ex-machinas`), toDeusExMachinaResponse);
}

export const getPlotReport = async (storyId: string) => {
    return mapResult(await fetchApi<ApiPlotStructuralReportResponse>(`/stories/${storyId}/plot/report`), toPlotStructuralReportResponse);
}

export const getThreadTimeline = async (storyId: string, threadName: string) => {
    return mapResult(await fetchApi<ApiThreadTimelineResponse>(`/stories/${storyId}/plot/thread-timeline?thread_name=${encodeURIComponent(threadName)}`), toThreadTimelineResponse);
}

export const getDormantThreads = async (storyId: string, minGap: number = 3) => {
    return mapResult(await fetchApi<ApiDormantThreadsResponse>(`/stories/${storyId}/plot/dormant-threads?min_gap=${minGap}`), toDormantThreadsResponse);
}

export const getEventDensity = async (storyId: string) => {
    return mapResult(await fetchApi<ApiEventDensityResponse>(`/stories/${storyId}/plot/event-density`), toEventDensityResponse);
}

export const getSetupPayoffMap = async (storyId: string) => {
    return mapResult(await fetchApi<ApiSetupPayoffMap[]>(`/stories/${storyId}/plot/setup-payoff-map`), data => data.map(toSetupPayoffMap));
}

export const getPlotDensity = async (storyId: string) => {
    return mapResult(await fetchApi<ApiPlotDensityResponse>(`/stories/${storyId}/plot/density`), toPlotDensityResponse);
}

export const getPlotRhythmReport = async (storyId: string) => {
    return mapResult(await fetchApi<ApiPlotRhythmReportResponse>(`/stories/${storyId}/plot/rhythm-report`), toPlotRhythmReportResponse);
}