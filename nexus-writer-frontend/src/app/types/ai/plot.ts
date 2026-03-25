import { ApiChapterEventCounts, ApiChapterPlotDistribution, ApiContrivanceRisk, ApiDeusExMachinaResponse, ApiDormantThread, ApiDormantThreadsResponse, ApiEventDensityResponse, ApiPayoffState, ApiPlotDensityResponse, ApiPlotRhythmReportResponse, ApiPlotStructuralReportResponse, ApiPlotThread, ApiPlotThreadsResponse, ApiSetup, ApiSetupPayoffMap, ApiSetupResponse, ApiStoryQuestion, ApiStoryQuestionsResponse, ApiThreadState, ApiThreadTimelineResponse } from "../api/plot";


export type ThreadStatus = "introduced" | "active" | "resolved" | "dormant";

export type PayoffResolution = "full" | "partial" | "reminder";

export type QuestionStatus = "raised" | "answered";

export interface PlotThread {
  name: string;
  status: ThreadStatus;
  importance: number;
  mustResolve: boolean;
}

export interface StoryQuestion {
  question: string;
  status: QuestionStatus;
  importance: number;
}

export interface Setup {
  element: string;
  emphasis: number;
  mustPayOff: boolean;
}

export interface ContrivanceRisk {
  solution: string;
  problem: string;
  risk: number;
  hasPriorSetup: boolean;
}

export interface PlotThreadsResponse {
  plotThreads: PlotThread[];
}

export interface StoryQuestionsResponse {
  questions: StoryQuestion[];
}

export interface SetupResponse {
  setups: Setup[];
}

export interface DeusExMachinaResponse {
  problems: ContrivanceRisk[];
}

export interface PlotStructuralReportResponse {
  storyId: string;
  report: string;
}

export interface ThreadState {
  chapterId: string;
  chapterNumber: number;
  status: ThreadStatus;
  importance: number;
  mustResolve: boolean;
}

export interface ThreadTimelineResponse {
  name: string;
  states: ThreadState[];
}

export interface DormantThread {
  name: string;
  importance: number;
  mustResolve: boolean;
  chaptersDormant: number;
  wentDormantChapterId: string;
  reappearedChapterId: string;
}

export interface DormantThreadsResponse {
  threads: DormantThread[];
}

export interface ChapterEventCounts {
  chapterNumber: number;
  chapterId: string;
  numEvents: number;
}

export interface EventDensityResponse {
  chapterCounts: ChapterEventCounts[];
}

export interface PayoffState {
  chapterNumber: number;
  chapterId: string;
  resolution: PayoffResolution;
}

export interface SetupPayoffMap {
  element: string;
  emphasis: number;
  mustPayOff: boolean;
  payoffs: PayoffState[];
}

export interface ChapterPlotDistribution {
  chapterNumber: number;
  chapterId: string;
  eventCount: number;
  setupCount: number;
  payoffCount: number;
  questionCount: number;
}

export interface PlotDensityResponse {
  distributions: ChapterPlotDistribution[];
}

export interface PlotRhythmReportResponse {
  storyId: string;
  report: string;
}

export const toPlotThread = (dto: ApiPlotThread): PlotThread => ({
  name: dto.name,
  status: dto.status,
  importance: dto.importance,
  mustResolve: dto.must_resolve,
});

export const toStoryQuestion = (dto: ApiStoryQuestion): StoryQuestion => ({
  question: dto.question,
  status: dto.status,
  importance: dto.importance,
});

export const toSetup = (dto: ApiSetup): Setup => ({
  element: dto.element,
  emphasis: dto.emphasis,
  mustPayOff: dto.must_pay_off,
});

export const toContrivanceRisk = (dto: ApiContrivanceRisk): ContrivanceRisk => ({
  solution: dto.solution,
  problem: dto.problem,
  risk: dto.risk,
  hasPriorSetup: dto.has_prior_setup,
});

export const toPlotThreadsResponse = (dto: ApiPlotThreadsResponse): PlotThreadsResponse => ({
  plotThreads: dto.plot_threads.map(toPlotThread),
});

export const toStoryQuestionsResponse = (dto: ApiStoryQuestionsResponse): StoryQuestionsResponse => ({
  questions: dto.questions.map(toStoryQuestion),
});

export const toSetupResponse = (dto: ApiSetupResponse): SetupResponse => ({
  setups: dto.setups.map(toSetup),
});

export const toDeusExMachinaResponse = (dto: ApiDeusExMachinaResponse): DeusExMachinaResponse => ({
  problems: dto.problems.map(toContrivanceRisk),
});

export const toPlotStructuralReportResponse = (dto: ApiPlotStructuralReportResponse): PlotStructuralReportResponse => ({
  storyId: dto.story_id,
  report: dto.report,
});

export const toThreadState = (dto: ApiThreadState): ThreadState => ({
  chapterId: dto.chapter_id,
  chapterNumber: dto.chapter_number,
  status: dto.status,
  importance: dto.importance,
  mustResolve: dto.must_resolve,
});

export const toThreadTimelineResponse = (dto: ApiThreadTimelineResponse): ThreadTimelineResponse => ({
  name: dto.name,
  states: dto.states.map(toThreadState),
});

export const toDormantThread = (dto: ApiDormantThread): DormantThread => ({
  name: dto.name,
  importance: dto.importance,
  mustResolve: dto.must_resolve,
  chaptersDormant: dto.chapters_dormant,
  wentDormantChapterId: dto.went_dormant_chapter_id,
  reappearedChapterId: dto.reappeared_chapter_id,
});

export const toDormantThreadsResponse = (dto: ApiDormantThreadsResponse): DormantThreadsResponse => ({
  threads: dto.threads.map(toDormantThread),
});

export const toChapterEventCounts = (dto: ApiChapterEventCounts): ChapterEventCounts => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  numEvents: dto.num_events,
});

export const toEventDensityResponse = (dto: ApiEventDensityResponse): EventDensityResponse => ({
  chapterCounts: dto.chapter_counts.map(toChapterEventCounts),
});

export const toPayoffState = (dto: ApiPayoffState): PayoffState => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  resolution: dto.resolution,
});

export const toSetupPayoffMap = (dto: ApiSetupPayoffMap): SetupPayoffMap => ({
  element: dto.element,
  emphasis: dto.emphasis,
  mustPayOff: dto.must_pay_off,
  payoffs: dto.payoffs.map(toPayoffState),
});

export const toChapterPlotDistribution = (dto: ApiChapterPlotDistribution): ChapterPlotDistribution => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  eventCount: dto.event_count,
  setupCount: dto.setup_count,
  payoffCount: dto.payoff_count,
  questionCount: dto.question_count,
});

export const toPlotDensityResponse = (dto: ApiPlotDensityResponse): PlotDensityResponse => ({
  distributions: dto.distributions.map(toChapterPlotDistribution),
});

export const toPlotRhythmReportResponse = (dto: ApiPlotRhythmReportResponse): PlotRhythmReportResponse => ({
  storyId: dto.story_id,
  report: dto.report,
});