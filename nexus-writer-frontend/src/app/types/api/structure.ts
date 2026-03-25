export type ApiSceneType = "action" | "dialogue" | "introspection" | "exposition" | "transition";

export type ApiPace = "fast" | "moderate" | "slow" | "varied";

export type ApiStructuralRole =
  | "exposition"
  | "inciting_incident"
  | "rising_action"
  | "climax"
  | "falling_action"
  | "resolution"
  | "transition"
  | "flashback";

export type ApiEffectiveness = "strong" | "moderate" | "weak";

export interface ApiScene {
  type: ApiSceneType;
  location: string;
  pov: string | null;
  goal: string;
  conflict: string;
  outcome: string;
  word_count: number;
}

export interface ApiSceneWithContext extends ApiScene {
  chapter_number: number;
  chapter_id: string;
}

export interface ApiSceneIndexResponse {
  scenes: ApiSceneWithContext[];
}

export interface ApiChapterScenes {
  chapter_number: number;
  chapter_id: string;
  scenes: ApiScene[];
}

export interface ApiWeakScenesResponse {
  weak_scenes: ApiChapterScenes[];
}

export interface ApiSceneDistribution {
  type: ApiSceneType;
  scene_count: number;
  pct: number;
}

export interface ApiChapterSceneDistribution {
  chapter_number: number;
  chapter_id: string;
  distributions: ApiSceneDistribution[];
}

export interface ApiSceneTypeDistributionResponse {
  chapter_distributions: ApiChapterSceneDistribution[];
}

export interface ApiPOVDistribution {
  pov: string;
  scene_count: number;
  estimated_word_count: number;
  pct: number;
}

export interface ApiChapterPOVBalance {
  chapter_number: number;
  chapter_id: string;
  distributions: ApiPOVDistribution[];
}

export interface ApiPOVBalanceResponse {
  chapter_distributions: ApiChapterPOVBalance[];
}

export interface ApiChapterPacingDistribution {
  chapter_number: number;
  chapter_id: string;
  action_pct: number;
  dialogue_pct: number;
  introspection_pct: number;
  exposition_pct: number;
  pace: ApiPace;
  tension: number;
}

export interface ApiPacingCurveResponse {
  chapter_distributions: ApiChapterPacingDistribution[];
}

export interface ApiChapterRole {
  chapter_number: number;
  chapter_id: string;
  structural_role: ApiStructuralRole;
}

export interface ApiStructuralArcResponse {
  roles: ApiChapterRole[];
}

export interface ApiThemeDistribution {
  chapter_ids: string[];
  theme: string;
  count: number;
  perc: number;
}

export interface ApiThemeDistributionResponse {
  theme_distributions: ApiThemeDistribution[];
}

export interface ApiChapterEmotionalBeats {
  chapter_number: number;
  chapter_id: string;
  strong: number;
  moderate: number;
  weak: number;
  strong_perc: number;
  moderate_perc: number;
  weak_perc: number;
}

export interface ApiEmotionalBeatsResponse {
  chapter_distributions: ApiChapterEmotionalBeats[];
}

export interface ApiDevelopmentalReportResponse {
  story_id: string;
  report: string;
}