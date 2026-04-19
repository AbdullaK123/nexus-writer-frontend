import { ApiJobQueuedResponse, ApiJobStatusResponse, Result, ApiError, mapResult } from "@/data/types";
import { JobQueuedResponse, JobStatusResponse, FlowEvent } from "@/data/types/jobs";
import { toJobStatusResponse, toJobQueuedResponse, toFlowEvent } from "@/compatability/transformers";
import fetchApi from "./client";


export const getJobStatus = async (jobId: string): Promise<Result<JobStatusResponse, ApiError>> => {
    return mapResult(await fetchApi<ApiJobStatusResponse>(`/jobs/${jobId}`), toJobStatusResponse);
};

export const drainJobEvents = async (): Promise<FlowEvent[]> => {
    const result = await fetchApi<unknown[]>("/jobs/events");
    if (result._tag === "Err") return [];
    return result.value.map(toFlowEvent);
};

export const queueLineEditJob = async (
    chapterId: string
): Promise<Result<JobQueuedResponse, ApiError>> => {
    const url = `/jobs/line-edits/${chapterId}`;
    return mapResult(await fetchApi<ApiJobQueuedResponse>(url, { method: "POST" }), toJobQueuedResponse);
};

export const queueExtractionJob = async (
    chapterId: string
): Promise<Result<JobQueuedResponse, ApiError>> => {
    const url = `/jobs/extraction/${chapterId}`;
    return mapResult(await fetchApi<ApiJobQueuedResponse>(url, { method: "POST" }), toJobQueuedResponse);
};