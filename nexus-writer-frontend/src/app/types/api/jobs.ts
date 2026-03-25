export type ApiJobStatus = 
    | "pending" 
    | "queued" 
    | "starting" 
    | "progress" 
    | "success" 
    | "failure" 
    | "retry";

export type ApiExtractionProgress = {
    current: number;
    total: number;
    chapter: number;
    percent: number;
}

export type ApiJobStatusResponse = {
    job_id: string;
    status: ApiJobStatus;
    
    // Timestamps
    queued_at?: string;
    started_at?: string;
    completed_at?: string;

    // Result data
    result?: Record<string, any>;
    
    // Error info
    error?: string;
    // Metadata
    message?: string;
}

export type ApiJobQueuedResponse = {
    job_id: string;
    job_name: string;
    job_type: string;
    started_at: string;
    status: ApiJobStatus;
    
    // Extraction-specific metadata
    chapter_id?: string;
    chapter_number?: number;
    chapters_to_extract?: number;
    estimated_duration_seconds?: number;
}
