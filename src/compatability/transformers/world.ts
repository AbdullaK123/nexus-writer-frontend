import { z } from "zod";

// ─── Leaf Schemas ────────────────────────────────────────────

export const ContradictingFactSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    value: z.string(),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    value: dto.value,
}));

export const ContradictionSchema = z.object({
    entity: z.string(),
    attribute: z.string(),
    occurrences: z.array(ContradictingFactSchema),
});

export const EntityFactSchema = z.object({
    attribute: z.string(),
    value: z.string(),
});

export const ChapterEntityFactsSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    facts: z.array(EntityFactSchema),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    facts: dto.facts,
}));

export const ChapterFactCountSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    count: z.number(),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    count: dto.count,
}));

// ─── Response Schemas ────────────────────────────────────────

export const ContradictionResponseSchema = z.object({
    contradictions: z.array(ContradictionSchema),
});

export const EntityFactResponseSchema = z.object({
    entity: z.string(),
    facts: z.array(EntityFactSchema),
});

export const EntityTimelineResponseSchema = z.object({
    chapter_facts: z.array(ChapterEntityFactsSchema),
}).transform((dto) => ({
    chapterFacts: dto.chapter_facts,
}));

export const StoryFactCountsResponseSchema = z.object({
    counts: z.array(ChapterFactCountSchema),
});

export const WorldConsistencyReportSchema = z.object({
    story_id: z.string(),
    report: z.string(),
}).transform((dto) => ({
    storyId: dto.story_id,
    report: dto.report,
}));

// ─── Input Types (API snake_case) ────────────────────────────

export type ApiContradictingFact = z.input<typeof ContradictingFactSchema>;
export type ApiContradiction = z.input<typeof ContradictionSchema>;
export type ApiContradictionResponse = z.input<typeof ContradictionResponseSchema>;
export type ApiEntityFact = z.input<typeof EntityFactSchema>;
export type ApiEntityFactResponse = z.input<typeof EntityFactResponseSchema>;
export type ApiChapterEntityFacts = z.input<typeof ChapterEntityFactsSchema>;
export type ApiEntityTimelineResponse = z.input<typeof EntityTimelineResponseSchema>;
export type ApiChapterFactCount = z.input<typeof ChapterFactCountSchema>;
export type ApiStoryFactCountsResponse = z.input<typeof StoryFactCountsResponseSchema>;
export type ApiWorldConsistencyReport = z.input<typeof WorldConsistencyReportSchema>;

// ─── Output Types (frontend camelCase) ───────────────────────

export type ContradictingFact = z.output<typeof ContradictingFactSchema>;
export type Contradiction = z.output<typeof ContradictionSchema>;
export type ContradictionResponse = z.output<typeof ContradictionResponseSchema>;
export type EntityFact = z.output<typeof EntityFactSchema>;
export type EntityFactResponse = z.output<typeof EntityFactResponseSchema>;
export type ChapterEntityFacts = z.output<typeof ChapterEntityFactsSchema>;
export type EntityTimelineResponse = z.output<typeof EntityTimelineResponseSchema>;
export type ChapterFactCount = z.output<typeof ChapterFactCountSchema>;
export type StoryFactCountsResponse = z.output<typeof StoryFactCountsResponseSchema>;
export type WorldConsistencyReport = z.output<typeof WorldConsistencyReportSchema>;

// ─── Transform Functions ─────────────────────────────────────

export const toContradictingFact = (data: ApiContradictingFact) => ContradictingFactSchema.parse(data);
export const toContradiction = (data: ApiContradiction) => ContradictionSchema.parse(data);
export const toContradictionResponse = (data: ApiContradictionResponse) => ContradictionResponseSchema.parse(data);
export const toEntityFact = (data: ApiEntityFact) => EntityFactSchema.parse(data);
export const toEntityFactResponse = (data: ApiEntityFactResponse) => EntityFactResponseSchema.parse(data);
export const toChapterEntityFacts = (data: ApiChapterEntityFacts) => ChapterEntityFactsSchema.parse(data);
export const toEntityTimelineResponse = (data: ApiEntityTimelineResponse) => EntityTimelineResponseSchema.parse(data);
export const toChapterFactCount = (data: ApiChapterFactCount) => ChapterFactCountSchema.parse(data);
export const toStoryFactCountsResponse = (data: ApiStoryFactCountsResponse) => StoryFactCountsResponseSchema.parse(data);
export const toWorldConsistencyReport = (data: ApiWorldConsistencyReport) => WorldConsistencyReportSchema.parse(data);
