import { ApiJobQueuedResponse, ApiJobStatusResponse, ApiExtractionProgress, Result, ApiError, mapResult } from "@/app/types";
import { JobQueuedResponse, JobStatusResponse, ExtractionProgress } from "../types/jobs";
import fetchApi from "./api";

const transformExtractionProgress = (
    apiProgress: ApiExtractionProgress
): ExtractionProgress => {
    return {
        current: apiProgress.current,
        total: apiProgress.total,
        chapter: apiProgress.chapter,
        percent: apiProgress.percent,
        isComplete: apiProgress.current >= apiProgress.total,
        remaining: apiProgress.total - apiProgress.current
    };
};

const transformJobStatusResponse = (
    apiResponse: ApiJobStatusResponse
): JobStatusResponse => {
    const isTerminal = apiResponse.status === "success" || apiResponse.status === "failure";
    const isRunning = apiResponse.status === "starting" || apiResponse.status === "progress";
    return {
        jobId: apiResponse.job_id,
        status: apiResponse.status,
        
        // Timestamps
        queuedAt: apiResponse.queued_at ? new Date(apiResponse.queued_at + 'Z') : undefined,
        startedAt: apiResponse.started_at ? new Date(apiResponse.started_at + 'Z') : undefined,
        completedAt: apiResponse.completed_at ? new Date(apiResponse.completed_at + 'Z') : undefined,
        
        // Result
        result: apiResponse.result,
        
        // Error info
        error: apiResponse.error,
        
        // Metadata
        message: apiResponse.message,
        
        // Computed
        isTerminal,
        isRunning
    };
};

const transformJobQueuedResponse = (
    apiResponse: ApiJobQueuedResponse
): JobQueuedResponse => {
    return {
        jobId: apiResponse.job_id,
        jobName: apiResponse.job_name,
        jobType: apiResponse.job_type,
        startedAt: new Date(apiResponse.started_at + 'Z'),
        status: apiResponse.status,
        
        // Extraction metadata
        chapterId: apiResponse.chapter_id,
        chapterNumber: apiResponse.chapter_number,
        chaptersToExtract: apiResponse.chapters_to_extract,
        estimatedDurationSeconds: apiResponse.estimated_duration_seconds
    };
};

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