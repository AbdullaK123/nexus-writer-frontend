export type {
    JobStatus,
    FlowEventType,
    JobType,
    ExtractionProgress,
    JobStatusResponse,
    JobQueuedResponse,
    FlowEvent,
    ChapterStartedData,
    EditsGeneratedData,
    LineEditsCompleteData,
    ExtractionCompleteData,
    ExtractionCountData,
    ReextractionProgressData,
    ReextractionCompleteData,
    LineEditsEventData,
    ExtractionEventData,
    ReextractionEventData,
} from "@/compatability/transformers/job";

export type QueuedJob = {
    jobId: string;
    chapterId: string;
    jobName: string;
    jobType: string;
    startedAt: Date;
}