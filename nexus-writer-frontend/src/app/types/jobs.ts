export type JobStatus = 
    | "pending" 
    | "queued" 
    | "starting" 
    | "progress" 
    | "success" 
    | "failure" 
    | "retry";

export type ExtractionProgress = {
    current: number;
    total: number;
    chapter: number;
    percent: number;
    isComplete: boolean;
    remaining: number;
}

export type JobStatusResponse = {
    jobId: string;
    status: JobStatus;
    
    // Timestamps
    queuedAt?: Date;
    startedAt?: Date;
    completedAt?: Date;
    
    // Progress tracking
    progress?: ExtractionProgress;
    
    // Result data
    result?: Record<string, any>;
    
    // Error info
    error?: string;
    errorType?: string;
    
    // Retry info
    retryCount?: number;
    maxRetries?: number;
    nextRetryAt?: Date;
    
    // Metadata
    message?: string;
    
    // Computed properties
    isTerminal: boolean;
    isRunning: boolean;
    estimatedTimeRemaining?: number;
}

export type JobQueuedResponse = {
    jobId: string;
    jobName: string;
    jobType: string;
    startedAt: Date;
    status: JobStatus;
    
    // Extraction-specific metadata
    chapterId?: string;
    chapterNumber?: number;
    chaptersToExtract?: number;
    estimatedDurationSeconds?: number;
}

export type QueuedJob = {
    jobId: string;
    chapterId: string;
    jobName: string;
    jobType: string;
    startedAt: Date;
}