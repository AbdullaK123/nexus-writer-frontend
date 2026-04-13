import { ApiJobQueuedResponse, ApiJobStatusResponse, Result, ApiError, mapResult } from "@/data/types";
import { JobQueuedResponse, JobStatusResponse } from "@/data/types/jobs";
import { transformJobStatusResponse, transformJobQueuedResponse } from "@/compatability/transformers";
import fetchApi from "./client";


export const getJobStatus = async (jobId: string): Promise<Result<JobStatusResponse, ApiError>> => {
    return mapResult(await fetchApi<ApiJobStatusResponse>(`/jobs/${jobId}`), transformJobStatusResponse);
};

export const queueLineEditJob = async (
    chapterId: string
): Promise<Result<JobQueuedResponse, ApiError>> => {
    const url = `/jobs/line-edits/${chapterId}`;
    return mapResult(await fetchApi<ApiJobQueuedResponse>(url, { method: "POST" }), transformJobQueuedResponse);
};

export const queueExtractionJob = async (
    chapterId: string
): Promise<Result<JobQueuedResponse, ApiError>> => {
    const url = `/jobs/extraction/${chapterId}`;
    return mapResult(await fetchApi<ApiJobQueuedResponse>(url, { method: "POST" }), transformJobQueuedResponse);
};