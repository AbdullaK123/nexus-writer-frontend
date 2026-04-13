import { z } from "zod";

// ─── Enum Schema ─────────────────────────────────────────────

const JobStatusSchema = z.enum(["pending", "queued", "starting", "progress", "success", "failure", "retry"]);

// ─── Schemas ─────────────────────────────────────────────────

export const ExtractionProgressSchema = z.object({
    current: z.number(),
    total: z.number(),
    chapter: z.number(),
    percent: z.number(),
}).transform((dto) => ({
    current: dto.current,
    total: dto.total,
    chapter: dto.chapter,
    percent: dto.percent,
    isComplete: dto.current >= dto.total,
    remaining: dto.total - dto.current,
}));

export const JobStatusResponseSchema = z.object({
    job_id: z.string(),
    status: JobStatusSchema,
    queued_at: z.string().optional(),
    started_at: z.string().optional(),
    completed_at: z.string().optional(),
    progress: ExtractionProgressSchema.optional(),
    result: z.record(z.any()).optional(),
    error: z.string().optional(),
    message: z.string().optional(),
}).transform((dto) => {
    const isTerminal = dto.status === "success" || dto.status === "failure";
    const isRunning = dto.status === "starting" || dto.status === "progress";
    return {
        jobId: dto.job_id,
        status: dto.status,
        queuedAt: dto.queued_at ? new Date(dto.queued_at + 'Z') : undefined,
        startedAt: dto.started_at ? new Date(dto.started_at + 'Z') : undefined,
        completedAt: dto.completed_at ? new Date(dto.completed_at + 'Z') : undefined,
        progress: dto.progress,
        result: dto.result,
        error: dto.error,
        message: dto.message,
        isTerminal,
        isRunning,
    };
});

export const JobQueuedResponseSchema = z.object({
    job_id: z.string(),
    job_name: z.string(),
    job_type: z.string(),
    started_at: z.string(),
    status: JobStatusSchema,
    chapter_id: z.string().optional(),
    chapter_number: z.number().optional(),
    chapters_to_extract: z.number().optional(),
    estimated_duration_seconds: z.number().optional(),
}).transform((dto) => ({
    jobId: dto.job_id,
    jobName: dto.job_name,
    jobType: dto.job_type,
    startedAt: new Date(dto.started_at + 'Z'),
    status: dto.status,
    chapterId: dto.chapter_id,
    chapterNumber: dto.chapter_number,
    chaptersToExtract: dto.chapters_to_extract,
    estimatedDurationSeconds: dto.estimated_duration_seconds,
}));

// ─── Input Types (API snake_case) ────────────────────────────

export type ApiJobStatus = z.input<typeof JobStatusSchema>;
export type ApiExtractionProgress = z.input<typeof ExtractionProgressSchema>;
export type ApiJobStatusResponse = z.input<typeof JobStatusResponseSchema>;
export type ApiJobQueuedResponse = z.input<typeof JobQueuedResponseSchema>;

// ─── Output Types (frontend camelCase) ───────────────────────

export type JobStatus = z.output<typeof JobStatusSchema>;
export type ExtractionProgress = z.output<typeof ExtractionProgressSchema>;
export type JobStatusResponse = z.output<typeof JobStatusResponseSchema>;
export type JobQueuedResponse = z.output<typeof JobQueuedResponseSchema>;

// ─── Transform Functions ─────────────────────────────────────

export const transformExtractionProgress = (data: ApiExtractionProgress) => ExtractionProgressSchema.parse(data);
export const transformJobStatusResponse = (data: ApiJobStatusResponse) => JobStatusResponseSchema.parse(data);
export const transformJobQueuedResponse = (data: ApiJobQueuedResponse) => JobQueuedResponseSchema.parse(data);
