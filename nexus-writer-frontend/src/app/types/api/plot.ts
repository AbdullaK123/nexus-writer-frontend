export type ApiThreadStatus = "introduced" | "active" | "resolved" | "dormant";

export type ApiPayoffResolution = "full" | "partial" | "reminder";

export type ApiQuestionStatus = "raised" | "answered";

export interface ApiPlotThread {
  name: string;
  status: ApiThreadStatus;
  importance: number;
  must_resolve: boolean;
}

export interface ApiStoryQuestion {
  question: string;
  status: ApiQuestionStatus;
  importance: number;
}

export interface ApiSetup {
  element: string;
  emphasis: number;
  must_pay_off: boolean;
}

export interface ApiContrivanceRisk {
  solution: string;
  problem: string;
  risk: number;
  has_prior_setup: boolean;
}

export interface ApiPlotThreadsResponse {
  plot_threads: ApiPlotThread[];
}

export interface ApiStoryQuestionsResponse {
  questions: ApiStoryQuestion[];
}

export interface ApiSetupResponse {
  setups: ApiSetup[];
}

export interface ApiDeusExMachinaResponse {
  problems: ApiContrivanceRisk[];
}

export interface ApiPlotStructuralReportResponse {
  story_id: string;
  report: string;
}

export interface ApiThreadState {
  chapter_id: string;
  chapter_number: number;
  status: ApiThreadStatus;
  importance: number;
  must_resolve: boolean;
}

export interface ApiThreadTimelineResponse {
  name: string;
  states: ApiThreadState[];
}

export interface ApiDormantThread {
  name: string;
  importance: number;
  must_resolve: boolean;
  chapters_dormant: number;
  went_dormant_chapter_id: string;
  reappeared_chapter_id: string;
}

export interface ApiDormantThreadsResponse {
  threads: ApiDormantThread[];
}

export interface ApiChapterEventCounts {
  chapter_number: number;
  chapter_id: string;
  num_events: number;
}

export interface ApiEventDensityResponse {
  chapter_counts: ApiChapterEventCounts[];
}

export interface ApiPayoffState {
  chapter_number: number;
  chapter_id: string;
  resolution: ApiPayoffResolution;
}

export interface ApiSetupPayoffMap {
  element: string;
  emphasis: number;
  must_pay_off: boolean;
  payoffs: ApiPayoffState[];
}

export interface ApiChapterPlotDistribution {
  chapter_number: number;
  chapter_id: string;
  event_count: number;
  setup_count: number;
  payoff_count: number;
  question_count: number;
}

export interface ApiPlotDensityResponse {
  distributions: ApiChapterPlotDistribution[];
}

export interface ApiPlotRhythmReportResponse {
  story_id: string;
  report: string;
}