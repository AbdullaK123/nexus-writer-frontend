import { z } from "zod";

// ─── Enum Schemas ────────────────────────────────────────────

const JobStatusSchema = z.enum(["pending", "queued", "progress", "success", "failure"]);

const FlowEventTypeSchema = z.enum([
    "task_started",
    "task_failed",
    "task_complete",
    "flow_started",
    "flow_failed",
    "flow_complete",
]);

const JobTypeSchema = z.enum(["extraction", "reextraction", "line-edit"]);

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
    queued_at: z.string().nullable().optional(),
    started_at: z.string().nullable().optional(),
    completed_at: z.string().nullable().optional(),
    result: z.record(z.any()).nullable().optional(),
    error: z.string().nullable().optional(),
    message: z.string().nullable().optional(),
}).transform((dto) => {
    const isTerminal = dto.status === "success" || dto.status === "failure";
    const isRunning = dto.status === "progress";
    return {
        jobId: dto.job_id,
        status: dto.status,
        queuedAt: dto.queued_at ? new Date(dto.queued_at) : undefined,
        startedAt: dto.started_at ? new Date(dto.started_at) : undefined,
        completedAt: dto.completed_at ? new Date(dto.completed_at) : undefined,
        result: dto.result ?? undefined,
        error: dto.error ?? undefined,
        message: dto.message ?? undefined,
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
    chapter_id: z.string().nullable(),
    chapter_number: z.number().nullable(),
    chapters_to_extract: z.number().nullable(),
    estimated_duration_seconds: z.number().nullable(),
}).transform((dto) => ({
    jobId: dto.job_id,
    jobName: dto.job_name,
    jobType: dto.job_type,
    startedAt: new Date(dto.started_at),
    status: dto.status,
    chapterId: dto.chapter_id,
    chapterNumber: dto.chapter_number,
    chaptersToExtract: dto.chapters_to_extract,
    estimatedDurationSeconds: dto.estimated_duration_seconds,
}));


// ─── Flow Event Data Payload Schemas ─────────────────────────

export const ChapterStartedDataSchema = z.object({
    chapter_id: z.string(),
    chapter_number: z.number(),
}).transform((dto) => ({
    chapterId: dto.chapter_id,
    chapterNumber: dto.chapter_number,
}));

export const EditsGeneratedDataSchema = z.object({
    edits_count: z.number(),
}).transform((dto) => ({
    editsCount: dto.edits_count,
}));

export const LineEditsCompleteDataSchema = z.object({
    chapter_id: z.string(),
    chapter_number: z.number(),
    edits_count: z.number(),
}).transform((dto) => ({
    chapterId: dto.chapter_id,
    chapterNumber: dto.chapter_number,
    editsCount: dto.edits_count,
}));

export const ExtractionCompleteDataSchema = z.object({
    chapter_id: z.string(),
    chapter_number: z.number(),
    is_partial: z.boolean().default(false),
    failed_extractions: z.array(z.string()).default([]),
}).transform((dto) => ({
    chapterId: dto.chapter_id,
    chapterNumber: dto.chapter_number,
    isPartial: dto.is_partial,
    failedExtractions: dto.failed_extractions,
}));

export const ExtractionCountDataSchema = z.object({
    count: z.number(),
}).transform((dto) => ({
    count: dto.count,
}));

export const ReextractionProgressDataSchema = z.object({
    chapter_id: z.string(),
    chapter_number: z.number(),
    is_partial: z.boolean().default(false),
}).transform((dto) => ({
    chapterId: dto.chapter_id,
    chapterNumber: dto.chapter_number,
    isPartial: dto.is_partial,
}));

export const ReextractionCompleteDataSchema = z.object({
    chapters_processed: z.number(),
}).transform((dto) => ({
    chaptersProcessed: dto.chapters_processed,
}));

// ─── Flow Event Schema ───────────────────────────────────────

export const FlowEventSchema = z.object({
    job_run_id: z.string(),
    user_id: z.string(),
    story_id: z.string(),
    event_type: FlowEventTypeSchema,
    job_type: JobTypeSchema,
    trace_id: z.string().optional().nullable(),
    task: z.string().optional().nullable(),
    data: z.unknown().optional().nullable(),
    message: z.string().optional().nullable(),
    step: z.number().optional().nullable(),
    total_steps: z.number().optional().nullable(),
    duration_ms: z.number().optional().nullable(),
    timestamp: z.string().optional().nullable(),
}).transform((dto) => ({
    jobRunId: dto.job_run_id,
    userId: dto.user_id,
    storyId: dto.story_id,
    eventType: dto.event_type,
    jobType: dto.job_type,
    traceId: dto.trace_id ?? undefined,
    task: dto.task ?? undefined,
    data: dto.data ?? undefined,
    message: dto.message ?? undefined,
    step: dto.step ?? undefined,
    totalSteps: dto.total_steps ?? undefined,
    durationMs: dto.duration_ms ?? undefined,
    timestamp: dto.timestamp ? new Date(dto.timestamp) : undefined,
}));

// ─── Input Types (API snake_case) ────────────────────────────

export type ApiJobStatus = z.input<typeof JobStatusSchema>;
export type ApiExtractionProgress = z.input<typeof ExtractionProgressSchema>;
export type ApiJobStatusResponse = z.input<typeof JobStatusResponseSchema>;
export type ApiJobQueuedResponse = z.input<typeof JobQueuedResponseSchema>;
export type ApiFlowEvent = z.input<typeof FlowEventSchema>;

// ─── Output Types (frontend camelCase) ───────────────────────

export type JobStatus = z.output<typeof JobStatusSchema>;
export type FlowEventType = z.output<typeof FlowEventTypeSchema>;
export type JobType = z.output<typeof JobTypeSchema>;
export type ExtractionProgress = z.output<typeof ExtractionProgressSchema>;
export type JobStatusResponse = z.output<typeof JobStatusResponseSchema>;
export type JobQueuedResponse = z.output<typeof JobQueuedResponseSchema>;
export type FlowEvent = z.output<typeof FlowEventSchema>;

export type ChapterStartedData = z.output<typeof ChapterStartedDataSchema>;
export type EditsGeneratedData = z.output<typeof EditsGeneratedDataSchema>;
export type LineEditsCompleteData = z.output<typeof LineEditsCompleteDataSchema>;
export type ExtractionCompleteData = z.output<typeof ExtractionCompleteDataSchema>;
export type ExtractionCountData = z.output<typeof ExtractionCountDataSchema>;
export type ReextractionProgressData = z.output<typeof ReextractionProgressDataSchema>;
export type ReextractionCompleteData = z.output<typeof ReextractionCompleteDataSchema>;

export type LineEditsEventData = ChapterStartedData | EditsGeneratedData | LineEditsCompleteData;
export type ExtractionEventData = ChapterStartedData | ExtractionCompleteData | ExtractionCountData;
export type ReextractionEventData = ChapterStartedData | ReextractionProgressData | ReextractionCompleteData;

// ─── Transform Functions ─────────────────────────────────────

export const toExtractionProgress = (data: ApiExtractionProgress) => ExtractionProgressSchema.parse(data);
export const toJobStatusResponse = (data: ApiJobStatusResponse) => JobStatusResponseSchema.parse(data);
export const toJobQueuedResponse = (data: ApiJobQueuedResponse) => JobQueuedResponseSchema.parse(data);
export const toFlowEvent = (data: ApiFlowEvent) => FlowEventSchema.parse(data);
