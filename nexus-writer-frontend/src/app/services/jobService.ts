import { ApiJobQueuedResponse, ApiJobStatusResponse, ApiExtractionProgress } from "@/app/types";
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
    
    // Calculate estimated time remaining
    let estimatedTimeRemaining: number | undefined;
    if (apiResponse.progress && apiResponse.started_at) {
        const startedAt = new Date(apiResponse.started_at);
        const elapsed = (Date.now() - startedAt.getTime()) / 1000; // seconds
        
        if (apiResponse.progress.current > 0) {
            const avgPerChapter = elapsed / apiResponse.progress.current;
            const remaining = apiResponse.progress.total - apiResponse.progress.current;
            estimatedTimeRemaining = Math.floor(avgPerChapter * remaining);
        }
    }
    
    return {
        jobId: apiResponse.job_id,
        status: apiResponse.status,
        
        // Timestamps
        queuedAt: apiResponse.queued_at ? new Date(apiResponse.queued_at) : undefined,
        startedAt: apiResponse.started_at ? new Date(apiResponse.started_at) : undefined,
        completedAt: apiResponse.completed_at ? new Date(apiResponse.completed_at) : undefined,
        
        // Progress
        progress: apiResponse.progress 
            ? transformExtractionProgress(apiResponse.progress)
            : undefined,
        
        // Result
        result: apiResponse.result,
        
        // Error info
        error: apiResponse.error,
        errorType: apiResponse.error_type,
        
        // Retry info
        retryCount: apiResponse.retry_count,
        maxRetries: apiResponse.max_retries,
        nextRetryAt: apiResponse.next_retry_at 
            ? new Date(apiResponse.next_retry_at) 
            : undefined,
        
        // Metadata
        message: apiResponse.message,
        
        // Computed
        isTerminal,
        isRunning,
        estimatedTimeRemaining
    };
};

const transformJobQueuedResponse = (
    apiResponse: ApiJobQueuedResponse
): JobQueuedResponse => {
    return {
        jobId: apiResponse.job_id,
        jobName: apiResponse.job_name,
        startedAt: new Date(apiResponse.started_at),
        status: apiResponse.status,
        
        // Extraction metadata
        chapterId: apiResponse.chapter_id,
        chapterNumber: apiResponse.chapter_number,
        chaptersToExtract: apiResponse.chapters_to_extract,
        estimatedDurationSeconds: apiResponse.estimated_duration_seconds
    };
};

export const getJobStatus = async (jobId: string): Promise<JobStatusResponse> => {
    const data: ApiJobStatusResponse = await fetchApi(`/jobs/${jobId}`);
    return transformJobStatusResponse(data);
};

export const queueLineEditJob = async (
    chapterId: string, 
    force: boolean = false
): Promise<JobQueuedResponse> => {
    const url = `/jobs/line-edits/${chapterId}${force ? '?force=true' : ''}`;
    const data: ApiJobQueuedResponse = await fetchApi(url, {
        method: "POST"
    });
    return transformJobQueuedResponse(data);
};

export const queueExtractionJob = async (
    chapterId: string, 
    force: boolean = false
): Promise<JobQueuedResponse> => {
    const url = `/jobs/extraction/${chapterId}${force ? '?force=true' : ''}`;
    const data: ApiJobQueuedResponse = await fetchApi(url, {
        method: "POST"
    });
    return transformJobQueuedResponse(data);
};