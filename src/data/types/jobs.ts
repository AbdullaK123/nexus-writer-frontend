export type {
    JobStatus,
    ExtractionProgress,
    JobStatusResponse,
    JobQueuedResponse,
} from "@/compatability/transformers/job";

export type QueuedJob = {
    jobId: string;
    chapterId: string;
    jobName: string;
    jobType: string;
    startedAt: Date;
}