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
    target_id: z.string(),
}).transform((dto) => ({
    quota: dto.quota,
    frequency: dto.frequency,
    fromDate: new Date(dto.from_date + 'Z'),
    toDate: new Date(dto.to_date + 'Z'),
    storyId: dto.story_id,
    targetId: dto.target_id,
}));

// ─── Story Schema ────────────────────────────────────────────

export const StorySchema = z.object({
    id: z.string(),
    latest_chapter_id: z.string().optional(),
    title: z.string(),
    status: StoryStatusSchema,
    total_chapters: z.number(),
    word_count: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
}).transform((dto) => ({
    id: dto.id,
    title: dto.title,
    status: dto.status,
    latestChapterId: dto.latest_chapter_id,
    createdAt: new Date(dto.created_at + 'Z'),
    updatedAt: new Date(dto.updated_at + 'Z'),
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

// ─── Analytics Schemas ───────────────────────────────────────

const KpisResponseSchema = z.object({
    total_words: z.number(),
    total_duration: z.number(),
    avg_words_per_minute: z.number(),
}).transform((dto) => ({
    totalWords: dto.total_words,
    totalDuration: Math.round(100 * dto.total_duration) / 100,
    avgWordsPerMinute: Math.round(100 * dto.avg_words_per_minute) / 100,
}));

const DailyWordsWrittenRecordSchema = z.object({
    date: z.string(),
    total_words: z.number(),
}).transform((dto) => ({
    date: new Date(dto.date + 'Z'),
    totalWords: dto.total_words,
}));

const WeeklyWordsWrittenRecordSchema = z.object({
    week_start: z.string(),
    week_num: z.number(),
    total_words: z.number(),
}).transform((dto) => ({
    weekStart: new Date(dto.week_start + 'Z'),
    weekNum: dto.week_num,
    totalWords: dto.total_words,
}));

const MonthlyWordsWrittenRecordSchema = z.object({
    month_start: z.string(),
    month_name: z.string(),
    total_words: z.number(),
}).transform((dto) => ({
    monthStart: new Date(dto.month_start + 'Z'),
    monthName: dto.month_name,
    totalWords: dto.total_words,
}));

export const StoryAnalyticsResponseSchema = z.object({
    kpis: KpisResponseSchema,
    words_over_time: z.array(z.any()),
    target: TargetResponseSchema,
});

// ─── Input Types (API snake_case) ────────────────────────────

export type ApiTargetResponse = z.input<typeof TargetResponseSchema>;
export type ApiStory = z.input<typeof StorySchema>;
export type ApiStoryListItemResponse = z.input<typeof StoryListItemResponseSchema>;
export type ApiKpisResponse = z.input<typeof KpisResponseSchema>;
export type ApiDailyWordsWrittenRecord = z.input<typeof DailyWordsWrittenRecordSchema>;
export type ApiWeeklyWordsWrittenRecord = z.input<typeof WeeklyWordsWrittenRecordSchema>;
export type ApiMonthlyWordsWrittenRecord = z.input<typeof MonthlyWordsWrittenRecordSchema>;
export type ApiStoryAnalyticsResponse = z.input<typeof StoryAnalyticsResponseSchema>;

// ─── Output Types (frontend camelCase) ───────────────────────

export type Frequency = z.infer<typeof FrequencySchema>;
export type StoryStatus = z.infer<typeof StoryStatusSchema>;
export type TargetResponse = z.output<typeof TargetResponseSchema>;
export type TransformedStory = z.output<typeof StorySchema>;
export type StoryListItemResponse = z.output<typeof StoryListItemResponseSchema>;
export type KpisResponse = z.output<typeof KpisResponseSchema>;
export type DailyWordsWrittenRecord = z.output<typeof DailyWordsWrittenRecordSchema>;
export type WeeklyWordsWrittenRecord = z.output<typeof WeeklyWordsWrittenRecordSchema>;
export type MonthlyWordsWrittenRecord = z.output<typeof MonthlyWordsWrittenRecordSchema>;
export type WordsWrittenTimeSeries = DailyWordsWrittenRecord[] | WeeklyWordsWrittenRecord[] | MonthlyWordsWrittenRecord[];
export type StoryAnalytics = {
    kpis: KpisResponse;
    wordsOverTime: WordsWrittenTimeSeries;
    target: TargetResponse;
};

// ─── Transform Functions ─────────────────────────────────────

export const transformTarget = (data: ApiTargetResponse) => TargetResponseSchema.parse(data);
export const transformStory = (data: ApiStory) => StorySchema.parse(data);
export const transformStoryListItemResponse = (data: ApiStoryListItemResponse) => StoryListItemResponseSchema.parse(data);

export function transformStoryAnalyticResponse(apiResponse: ApiStoryAnalyticsResponse) {
    const kpis = KpisResponseSchema.parse(apiResponse.kpis);

    let wordsOverTime: DailyWordsWrittenRecord[] | WeeklyWordsWrittenRecord[] | MonthlyWordsWrittenRecord[] = [];

    if (apiResponse.target && apiResponse.target.frequency === "Daily") {
        wordsOverTime = z.array(DailyWordsWrittenRecordSchema).parse(apiResponse.words_over_time);
    }

    if (apiResponse.target && apiResponse.target.frequency === "Weekly") {
        wordsOverTime = z.array(WeeklyWordsWrittenRecordSchema).parse(apiResponse.words_over_time);
    }

    if (apiResponse.target && apiResponse.target.frequency === "Monthly") {
        wordsOverTime = z.array(MonthlyWordsWrittenRecordSchema).parse(apiResponse.words_over_time);
    }

    console.log("Raw api response was, ", JSON.stringify(apiResponse.words_over_time, null, 2));
    console.log("Words over time is now, ", JSON.stringify(wordsOverTime, null, 2));

    return {
        kpis,
        wordsOverTime,
        target: transformTarget(apiResponse.target),
    };
}
