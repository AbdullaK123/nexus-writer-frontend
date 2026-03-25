import { ApiScene, ApiSceneWithContext, ApiSceneIndexResponse, ApiChapterScenes, ApiWeakScenesResponse, ApiSceneDistribution, ApiChapterSceneDistribution, ApiSceneTypeDistributionResponse, ApiPOVDistribution, ApiChapterPOVBalance, ApiPOVBalanceResponse, ApiChapterPacingDistribution, ApiPacingCurveResponse, ApiChapterRole, ApiStructuralArcResponse, ApiThemeDistribution, ApiThemeDistributionResponse, ApiChapterEmotionalBeats, ApiEmotionalBeatsResponse, ApiDevelopmentalReportResponse } from "../api";

export type SceneType = "action" | "dialogue" | "introspection" | "exposition" | "transition";

export type Pace = "fast" | "moderate" | "slow" | "varied";

export type StructuralRole =
  | "exposition"
  | "inciting_incident"
  | "rising_action"
  | "climax"
  | "falling_action"
  | "resolution"
  | "transition"
  | "flashback";

export type Effectiveness = "strong" | "moderate" | "weak";

export interface Scene {
  type: SceneType;
  location: string;
  pov: string | null;
  goal: string;
  conflict: string;
  outcome: string;
  wordCount: number;
}

export interface SceneWithContext extends Scene {
  chapterNumber: number;
  chapterId: string;
}

export interface SceneIndexResponse {
  scenes: SceneWithContext[];
}

export interface ChapterScenes {
  chapterNumber: number;
  chapterId: string;
  scenes: Scene[];
}

export interface WeakScenesResponse {
  weakScenes: ChapterScenes[];
}

export interface SceneDistribution {
  type: SceneType;
  sceneCount: number;
  pct: number;
}

export interface ChapterSceneDistribution {
  chapterNumber: number;
  chapterId: string;
  distributions: SceneDistribution[];
}

export interface SceneTypeDistributionResponse {
  chapterDistributions: ChapterSceneDistribution[];
}

export interface POVDistribution {
  pov: string;
  sceneCount: number;
  estimatedWordCount: number;
  pct: number;
}

export interface ChapterPOVBalance {
  chapterNumber: number;
  chapterId: string;
  distributions: POVDistribution[];
}

export interface POVBalanceResponse {
  chapterDistributions: ChapterPOVBalance[];
}

export interface ChapterPacingDistribution {
  chapterNumber: number;
  chapterId: string;
  actionPct: number;
  dialoguePct: number;
  introspectionPct: number;
  expositionPct: number;
  pace: Pace;
  tension: number;
}

export interface PacingCurveResponse {
  chapterDistributions: ChapterPacingDistribution[];
}

export interface ChapterRole {
  chapterNumber: number;
  chapterId: string;
  structuralRole: StructuralRole;
}

export interface StructuralArcResponse {
  roles: ChapterRole[];
}

export interface ThemeDistribution {
  chapterIds: string[];
  theme: string;
  count: number;
  perc: number;
}

export interface ThemeDistributionResponse {
  themeDistributions: ThemeDistribution[];
}

export interface ChapterEmotionalBeats {
  chapterNumber: number;
  chapterId: string;
  strong: number;
  moderate: number;
  weak: number;
  strongPerc: number;
  moderatePerc: number;
  weakPerc: number;
}

export interface EmotionalBeatsResponse {
  chapterDistributions: ChapterEmotionalBeats[];
}

export interface DevelopmentalReportResponse {
  storyId: string;
  report: string;
}

export const toScene = (dto: ApiScene): Scene => ({
  type: dto.type,
  location: dto.location,
  pov: dto.pov,
  goal: dto.goal,
  conflict: dto.conflict,
  outcome: dto.outcome,
  wordCount: dto.word_count,
});

export const toSceneWithContext = (dto: ApiSceneWithContext): SceneWithContext => ({
  ...toScene(dto),
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
});

export const toSceneIndexResponse = (dto: ApiSceneIndexResponse): SceneIndexResponse => ({
  scenes: dto.scenes.map(toSceneWithContext),
});

export const toChapterScenes = (dto: ApiChapterScenes): ChapterScenes => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  scenes: dto.scenes.map(toScene),
});

export const toWeakScenesResponse = (dto: ApiWeakScenesResponse): WeakScenesResponse => ({
  weakScenes: dto.weak_scenes.map(toChapterScenes),
});

export const toSceneDistribution = (dto: ApiSceneDistribution): SceneDistribution => ({
  type: dto.type,
  sceneCount: dto.scene_count,
  pct: dto.pct,
});

export const toChapterSceneDistribution = (dto: ApiChapterSceneDistribution): ChapterSceneDistribution => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  distributions: dto.distributions.map(toSceneDistribution),
});

export const toSceneTypeDistributionResponse = (dto: ApiSceneTypeDistributionResponse): SceneTypeDistributionResponse => ({
  chapterDistributions: dto.chapter_distributions.map(toChapterSceneDistribution),
});

export const toPOVDistribution = (dto: ApiPOVDistribution): POVDistribution => ({
  pov: dto.pov,
  sceneCount: dto.scene_count,
  estimatedWordCount: dto.estimated_word_count,
  pct: dto.pct,
});

export const toChapterPOVBalance = (dto: ApiChapterPOVBalance): ChapterPOVBalance => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  distributions: dto.distributions.map(toPOVDistribution),
});

export const toPOVBalanceResponse = (dto: ApiPOVBalanceResponse): POVBalanceResponse => ({
  chapterDistributions: dto.chapter_distributions.map(toChapterPOVBalance),
});

export const toChapterPacingDistribution = (dto: ApiChapterPacingDistribution): ChapterPacingDistribution => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  actionPct: dto.action_pct,
  dialoguePct: dto.dialogue_pct,
  introspectionPct: dto.introspection_pct,
  expositionPct: dto.exposition_pct,
  pace: dto.pace,
  tension: dto.tension,
});

export const toPacingCurveResponse = (dto: ApiPacingCurveResponse): PacingCurveResponse => ({
  chapterDistributions: dto.chapter_distributions.map(toChapterPacingDistribution),
});

export const toChapterRole = (dto: ApiChapterRole): ChapterRole => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  structuralRole: dto.structural_role,
});

export const toStructuralArcResponse = (dto: ApiStructuralArcResponse): StructuralArcResponse => ({
  roles: dto.roles.map(toChapterRole),
});

export const toThemeDistribution = (dto: ApiThemeDistribution): ThemeDistribution => ({
  chapterIds: dto.chapter_ids,
  theme: dto.theme,
  count: dto.count,
  perc: dto.perc,
});

export const toThemeDistributionResponse = (dto: ApiThemeDistributionResponse): ThemeDistributionResponse => ({
  themeDistributions: dto.theme_distributions.map(toThemeDistribution),
});

export const toChapterEmotionalBeats = (dto: ApiChapterEmotionalBeats): ChapterEmotionalBeats => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  strong: dto.strong,
  moderate: dto.moderate,
  weak: dto.weak,
  strongPerc: dto.strong_perc,
  moderatePerc: dto.moderate_perc,
  weakPerc: dto.weak_perc,
});

export const toEmotionalBeatsResponse = (dto: ApiEmotionalBeatsResponse): EmotionalBeatsResponse => ({
  chapterDistributions: dto.chapter_distributions.map(toChapterEmotionalBeats),
});

export const toDevelopmentalReportResponse = (dto: ApiDevelopmentalReportResponse): DevelopmentalReportResponse => ({
  storyId: dto.story_id,
  report: dto.report,
});