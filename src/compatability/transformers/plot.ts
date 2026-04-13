import { z } from "zod";

// ─── Enum Schemas ────────────────────────────────────────────

const ThreadStatusSchema = z.enum(["introduced", "active", "resolved", "dormant"]);
const PayoffResolutionSchema = z.enum(["full", "partial", "reminder"]);
const QuestionStatusSchema = z.enum(["raised", "answered"]);

// ─── Leaf Schemas ────────────────────────────────────────────

export const PlotThreadSchema = z.object({
    name: z.string(),
    status: ThreadStatusSchema,
    importance: z.number(),
    must_resolve: z.boolean(),
}).transform((dto) => ({
    name: dto.name,
    status: dto.status,
    importance: dto.importance,
    mustResolve: dto.must_resolve,
}));

export const StoryQuestionSchema = z.object({
    question: z.string(),
    status: QuestionStatusSchema,
    importance: z.number(),
});

export const SetupSchema = z.object({
    element: z.string(),
    emphasis: z.number(),
    must_pay_off: z.boolean(),
}).transform((dto) => ({
    element: dto.element,
    emphasis: dto.emphasis,
    mustPayOff: dto.must_pay_off,
}));

export const ContrivanceRiskSchema = z.object({
    solution: z.string(),
    problem: z.string(),
    risk: z.number(),
    has_prior_setup: z.boolean(),
}).transform((dto) => ({
    solution: dto.solution,
    problem: dto.problem,
    risk: dto.risk,
    hasPriorSetup: dto.has_prior_setup,
}));

export const ThreadStateSchema = z.object({
    chapter_id: z.string(),
    chapter_number: z.number(),
    status: ThreadStatusSchema,
    importance: z.number(),
    must_resolve: z.boolean(),
}).transform((dto) => ({
    chapterId: dto.chapter_id,
    chapterNumber: dto.chapter_number,
    status: dto.status,
    importance: dto.importance,
    mustResolve: dto.must_resolve,
}));

export const DormantThreadSchema = z.object({
    name: z.string(),
    importance: z.number(),
    must_resolve: z.boolean(),
    chapters_dormant: z.number(),
    went_dormant_chapter_id: z.string(),
    reappeared_chapter_id: z.string(),
}).transform((dto) => ({
    name: dto.name,
    importance: dto.importance,
    mustResolve: dto.must_resolve,
    chaptersDormant: dto.chapters_dormant,
    wentDormantChapterId: dto.went_dormant_chapter_id,
    reappearedChapterId: dto.reappeared_chapter_id,
}));

export const ChapterEventCountsSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    num_events: z.number(),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    numEvents: dto.num_events,
}));

export const PayoffStateSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    resolution: PayoffResolutionSchema,
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    resolution: dto.resolution,
}));

export const SetupPayoffMapSchema = z.object({
    element: z.string(),
    emphasis: z.number(),
    must_pay_off: z.boolean(),
    payoffs: z.array(PayoffStateSchema),
}).transform((dto) => ({
    element: dto.element,
    emphasis: dto.emphasis,
    mustPayOff: dto.must_pay_off,
    payoffs: dto.payoffs,
}));

export const ChapterPlotDistributionSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    event_count: z.number(),
    setup_count: z.number(),
    payoff_count: z.number(),
    question_count: z.number(),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    eventCount: dto.event_count,
    setupCount: dto.setup_count,
    payoffCount: dto.payoff_count,
    questionCount: dto.question_count,
}));

// ─── Response Schemas ────────────────────────────────────────

export const PlotThreadsResponseSchema = z.object({
    plot_threads: z.array(PlotThreadSchema),
}).transform((dto) => ({
    plotThreads: dto.plot_threads,
}));

export const StoryQuestionsResponseSchema = z.object({
    questions: z.array(StoryQuestionSchema),
});

export const SetupResponseSchema = z.object({
    setups: z.array(SetupSchema),
});

export const DeusExMachinaResponseSchema = z.object({
    problems: z.array(ContrivanceRiskSchema),
});

export const PlotStructuralReportResponseSchema = z.object({
    story_id: z.string(),
    report: z.string(),
}).transform((dto) => ({
    storyId: dto.story_id,
    report: dto.report,
}));

export const ThreadTimelineResponseSchema = z.object({
    name: z.string(),
    states: z.array(ThreadStateSchema),
});

export const DormantThreadsResponseSchema = z.object({
    threads: z.array(DormantThreadSchema),
});

export const EventDensityResponseSchema = z.object({
    chapter_counts: z.array(ChapterEventCountsSchema),
}).transform((dto) => ({
    chapterCounts: dto.chapter_counts,
}));

export const PlotDensityResponseSchema = z.object({
    distributions: z.array(ChapterPlotDistributionSchema),
});

export const PlotRhythmReportResponseSchema = z.object({
    story_id: z.string(),
    report: z.string(),
}).transform((dto) => ({
    storyId: dto.story_id,
    report: dto.report,
}));

// ─── Input Types (API snake_case) ────────────────────────────

export type ApiThreadStatus = z.input<typeof ThreadStatusSchema>;
export type ApiPayoffResolution = z.input<typeof PayoffResolutionSchema>;
export type ApiQuestionStatus = z.input<typeof QuestionStatusSchema>;
export type ApiPlotThread = z.input<typeof PlotThreadSchema>;
export type ApiStoryQuestion = z.input<typeof StoryQuestionSchema>;
export type ApiSetup = z.input<typeof SetupSchema>;
export type ApiContrivanceRisk = z.input<typeof ContrivanceRiskSchema>;
export type ApiPlotThreadsResponse = z.input<typeof PlotThreadsResponseSchema>;
export type ApiStoryQuestionsResponse = z.input<typeof StoryQuestionsResponseSchema>;
export type ApiSetupResponse = z.input<typeof SetupResponseSchema>;
export type ApiDeusExMachinaResponse = z.input<typeof DeusExMachinaResponseSchema>;
export type ApiPlotStructuralReportResponse = z.input<typeof PlotStructuralReportResponseSchema>;
export type ApiThreadState = z.input<typeof ThreadStateSchema>;
export type ApiThreadTimelineResponse = z.input<typeof ThreadTimelineResponseSchema>;
export type ApiDormantThread = z.input<typeof DormantThreadSchema>;
export type ApiDormantThreadsResponse = z.input<typeof DormantThreadsResponseSchema>;
export type ApiChapterEventCounts = z.input<typeof ChapterEventCountsSchema>;
export type ApiEventDensityResponse = z.input<typeof EventDensityResponseSchema>;
export type ApiPayoffState = z.input<typeof PayoffStateSchema>;
export type ApiSetupPayoffMap = z.input<typeof SetupPayoffMapSchema>;
export type ApiChapterPlotDistribution = z.input<typeof ChapterPlotDistributionSchema>;
export type ApiPlotDensityResponse = z.input<typeof PlotDensityResponseSchema>;
export type ApiPlotRhythmReportResponse = z.input<typeof PlotRhythmReportResponseSchema>;

// ─── Output Types (frontend camelCase) ───────────────────────

export type ThreadStatus = z.output<typeof ThreadStatusSchema>;
export type PayoffResolution = z.output<typeof PayoffResolutionSchema>;
export type QuestionStatus = z.output<typeof QuestionStatusSchema>;
export type PlotThread = z.output<typeof PlotThreadSchema>;
export type StoryQuestion = z.output<typeof StoryQuestionSchema>;
export type Setup = z.output<typeof SetupSchema>;
export type ContrivanceRisk = z.output<typeof ContrivanceRiskSchema>;
export type PlotThreadsResponse = z.output<typeof PlotThreadsResponseSchema>;
export type StoryQuestionsResponse = z.output<typeof StoryQuestionsResponseSchema>;
export type SetupResponse = z.output<typeof SetupResponseSchema>;
export type DeusExMachinaResponse = z.output<typeof DeusExMachinaResponseSchema>;
export type PlotStructuralReportResponse = z.output<typeof PlotStructuralReportResponseSchema>;
export type ThreadState = z.output<typeof ThreadStateSchema>;
export type ThreadTimelineResponse = z.output<typeof ThreadTimelineResponseSchema>;
export type DormantThread = z.output<typeof DormantThreadSchema>;
export type DormantThreadsResponse = z.output<typeof DormantThreadsResponseSchema>;
export type ChapterEventCounts = z.output<typeof ChapterEventCountsSchema>;
export type EventDensityResponse = z.output<typeof EventDensityResponseSchema>;
export type PayoffState = z.output<typeof PayoffStateSchema>;
export type SetupPayoffMap = z.output<typeof SetupPayoffMapSchema>;
export type ChapterPlotDistribution = z.output<typeof ChapterPlotDistributionSchema>;
export type PlotDensityResponse = z.output<typeof PlotDensityResponseSchema>;
export type PlotRhythmReportResponse = z.output<typeof PlotRhythmReportResponseSchema>;

// ─── Transform Functions ─────────────────────────────────────

export const toPlotThread = (data: ApiPlotThread) => PlotThreadSchema.parse(data);
export const toStoryQuestion = (data: ApiStoryQuestion) => StoryQuestionSchema.parse(data);
export const toSetup = (data: ApiSetup) => SetupSchema.parse(data);
export const toContrivanceRisk = (data: ApiContrivanceRisk) => ContrivanceRiskSchema.parse(data);
export const toPlotThreadsResponse = (data: ApiPlotThreadsResponse) => PlotThreadsResponseSchema.parse(data);
export const toStoryQuestionsResponse = (data: ApiStoryQuestionsResponse) => StoryQuestionsResponseSchema.parse(data);
export const toSetupResponse = (data: ApiSetupResponse) => SetupResponseSchema.parse(data);
export const toDeusExMachinaResponse = (data: ApiDeusExMachinaResponse) => DeusExMachinaResponseSchema.parse(data);
export const toPlotStructuralReportResponse = (data: ApiPlotStructuralReportResponse) => PlotStructuralReportResponseSchema.parse(data);
export const toThreadState = (data: ApiThreadState) => ThreadStateSchema.parse(data);
export const toThreadTimelineResponse = (data: ApiThreadTimelineResponse) => ThreadTimelineResponseSchema.parse(data);
export const toDormantThread = (data: ApiDormantThread) => DormantThreadSchema.parse(data);
export const toDormantThreadsResponse = (data: ApiDormantThreadsResponse) => DormantThreadsResponseSchema.parse(data);
export const toChapterEventCounts = (data: ApiChapterEventCounts) => ChapterEventCountsSchema.parse(data);
export const toEventDensityResponse = (data: ApiEventDensityResponse) => EventDensityResponseSchema.parse(data);
export const toPayoffState = (data: ApiPayoffState) => PayoffStateSchema.parse(data);
export const toSetupPayoffMap = (data: ApiSetupPayoffMap) => SetupPayoffMapSchema.parse(data);
export const toChapterPlotDistribution = (data: ApiChapterPlotDistribution) => ChapterPlotDistributionSchema.parse(data);
export const toPlotDensityResponse = (data: ApiPlotDensityResponse) => PlotDensityResponseSchema.parse(data);
export const toPlotRhythmReportResponse = (data: ApiPlotRhythmReportResponse) => PlotRhythmReportResponseSchema.parse(data);
