import { z } from "zod";

// ─── Enum Schemas ────────────────────────────────────────────

const ChapterStatusSchema = z.enum(["published", "draft", "outline"]);
const StoryStatusSchema = z.enum(["Complete", "On Hiatus", "Ongoing"]);

// ─── Helper ──────────────────────────────────────────────────

export function getChapterStatus(published: boolean, hasContent: boolean): z.infer<typeof ChapterStatusSchema> {
    if (published) return "published";
    if (hasContent && !published) return "draft";
    return "outline";
}

// ─── Chapter List Schemas ────────────────────────────────────

const ChapterListItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    published: z.boolean(),
    word_count: z.number(),
    updated_at: z.string(),
}).transform((dto) => ({
    id: dto.id,
    title: dto.title,
    published: dto.published,
    wordCount: dto.word_count,
    updatedAt: new Date(dto.updated_at + 'Z'),
}));

export const ChapterListResponseSchema = z.object({
    story_id: z.string(),
    story_title: z.string(),
    story_status: StoryStatusSchema,
    story_last_updated: z.string(),
    chapters: z.array(ChapterListItemSchema),
}).transform((dto) => ({
    storyId: dto.story_id,
    storyTitle: dto.story_title,
    storyStatus: dto.story_status,
    storyLastUpdated: new Date(dto.story_last_updated + 'Z'),
    chapters: dto.chapters,
}));

// ─── Chapter Content Schema ──────────────────────────────────

export const ChapterContentResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    published: z.boolean(),
    story_id: z.string(),
    story_title: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    previous_chapter_id: z.string(),
    next_chapter_id: z.string(),
}).transform((dto) => ({
    id: dto.id,
    title: dto.title,
    content: dto.content,
    published: dto.published,
    storyId: dto.story_id,
    storyTitle: dto.story_title,
    createdAt: new Date(dto.created_at + 'Z'),
    updatedAt: new Date(dto.updated_at + 'Z'),
    previousChapterId: dto.previous_chapter_id,
    nextChapterId: dto.next_chapter_id,
}));

// ─── Chapter Edit Schemas ────────────────────────────────────

const LineEditSchema = z.object({
    paragraph_idx: z.number(),
    original_paragraph: z.string(),
    edited_paragraph: z.string(),
    justification: z.string(),
}).transform((dto) => ({
    paragraphIdx: dto.paragraph_idx,
    originalParagraph: dto.original_paragraph,
    editedParagraph: dto.edited_paragraph,
    justification: dto.justification,
}));

export const ChapterEditSchema = z.object({
    edits: z.array(LineEditSchema),
    last_generated_at: z.string(),
    is_stale: z.boolean(),
}).transform((dto) => ({
    edits: dto.edits,
    lastGeneratedAt: new Date(dto.last_generated_at + 'Z'),
    isStale: dto.is_stale,
}));

// ─── Chapter Preview Transform ───────────────────────────────

export const ChapterPreviewSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    published: z.boolean(),
    story_id: z.string(),
    story_title: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    previous_chapter_id: z.string(),
    next_chapter_id: z.string(),
}).transform((dto) => {
    const wordCount = dto.content ? dto.content.split(' ').length : 0;
    return {
        id: dto.id,
        title: dto.title,
        status: getChapterStatus(dto.published, wordCount > 0),
        wordCount,
        updatedAt: new Date(dto.updated_at + 'Z'),
        previewContent: dto.content,
        storyId: dto.story_id,
        storyTitle: dto.story_title,
        previousChapterId: dto.previous_chapter_id,
        nextChapterId: dto.next_chapter_id,
    };
});

// ─── Input Types (API snake_case) ────────────────────────────

export type ApiChapterListItem = z.input<typeof ChapterListItemSchema>;
export type ApiChapterListResponse = z.input<typeof ChapterListResponseSchema>;
export type ApiChapterContentResponse = z.input<typeof ChapterContentResponseSchema>;
export type ApiLineEdit = z.input<typeof LineEditSchema>;
export type ApiChapterEdit = z.input<typeof ChapterEditSchema>;

// ─── Output Types (frontend camelCase) ───────────────────────

export type TransformedChapterList = z.output<typeof ChapterListResponseSchema>;
export type TransformedChapterContent = z.output<typeof ChapterContentResponseSchema>;
export type LineEdit = z.output<typeof LineEditSchema>;
export type ChapterEdit = z.output<typeof ChapterEditSchema>;

// ─── Transform Functions ─────────────────────────────────────

export const transformChapterList = (data: ApiChapterListResponse) => ChapterListResponseSchema.parse(data);
export const transformChapterContent = (data: ApiChapterContentResponse) => ChapterContentResponseSchema.parse(data);
export const transformChapterEdit = (data: ApiChapterEdit) => ChapterEditSchema.parse(data);
export const transformChapterResponse = (data: ApiChapterContentResponse) => ChapterPreviewSchema.parse(data);
