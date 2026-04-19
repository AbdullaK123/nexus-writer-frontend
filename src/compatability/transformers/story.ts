import { z } from "zod";

// ─── Shared Schemas ──────────────────────────────────────────

export const FrequencySchema = z.enum(["Daily", "Weekly", "Monthly"]);
export const StoryStatusSchema = z.enum(["Complete", "On Hiatus", "Ongoing"]);

// ─── Target Schema ───────────────────────────────────────────

export const TargetResponseSchema = z.object({
    quota: z.number(),
    frequency: FrequencySchema,
    from_date: z.string(),
    to_date: z.string(),
    story_id: z.string(),
    target_id: z.string().nullable(),
}).transform((dto) => ({
    quota: dto.quota,
    frequency: dto.frequency,
    fromDate: new Date(dto.from_date),
    toDate: new Date(dto.to_date),
    storyId: dto.story_id,
    targetId: dto.target_id,
}));

// ─── Story Schema ────────────────────────────────────────────

export const StorySchema = z.object({
    id: z.string(),
    latest_chapter_id: z.string().nullable().optional(),
    title: z.string(),
    status: StoryStatusSchema,
    total_chapters: z.number(),
    word_count: z.number(),
    created_at: z.string(),
    updated_at: z.string().nullable(),
}).transform((dto) => ({
    id: dto.id,
    title: dto.title,
    status: dto.status,
    latestChapterId: dto.latest_chapter_id,
    createdAt: new Date(dto.created_at),
    updatedAt: dto.updated_at ? new Date(dto.updated_at) : new Date(dto.created_at),
    totalChapters: dto.total_chapters,
    wordCount: dto.word_count,
}));

export const StoryListItemResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    word_count: z.number(),
    targets: z.array(TargetResponseSchema),
}).transform((dto) => ({
    storyId: dto.id,
    title: dto.title,
    wordCount: dto.word_count,
    targets: dto.targets,
}));

// ─── Input Types (API snake_case) ────────────────────────────

export type ApiTargetResponse = z.input<typeof TargetResponseSchema>;
export type ApiStory = z.input<typeof StorySchema>;
export type ApiStoryListItemResponse = z.input<typeof StoryListItemResponseSchema>;

// ─── Output Types (frontend camelCase) ───────────────────────

export type Frequency = z.infer<typeof FrequencySchema>;
export type StoryStatus = z.infer<typeof StoryStatusSchema>;
export type TargetResponse = z.output<typeof TargetResponseSchema>;
export type TransformedStory = z.output<typeof StorySchema>;
export type StoryListItemResponse = z.output<typeof StoryListItemResponseSchema>;

// ─── Transform Functions ─────────────────────────────────────

export const transformTarget = (data: ApiTargetResponse) => TargetResponseSchema.parse(data);
export const transformStory = (data: ApiStory) => StorySchema.parse(data);
export const transformStoryListItemResponse = (data: ApiStoryListItemResponse) => StoryListItemResponseSchema.parse(data);
