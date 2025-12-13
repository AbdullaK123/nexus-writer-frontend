export type JobStatusResponse = {
    jobId: string;
    status: "pending" | "started" | "success" | "failure";
}

export type JobQueuedResponse = {
    jobId: string;
    jobName: string;
    startedAt: Date;
    status: "pending" | "started" | "success" | "failure";
}