import { z } from "zod";

// ─── Enum Schemas ────────────────────────────────────────────

const SceneTypeSchema = z.enum(["action", "dialogue", "introspection", "exposition", "transition"]);
const PaceSchema = z.enum(["fast", "moderate", "slow", "varied"]);
const StructuralRoleSchema = z.enum([
    "exposition", "inciting_incident", "rising_action", "climax",
    "falling_action", "resolution", "transition", "flashback",
]);
const EffectivenessSchema = z.enum(["strong", "moderate", "weak"]);

// ─── Leaf Schemas ────────────────────────────────────────────

export const SceneSchema = z.object({
    type: SceneTypeSchema,
    location: z.string(),
    pov: z.string().nullable(),
    goal: z.string(),
    conflict: z.string(),
    outcome: z.string(),
    word_count: z.number(),
}).transform((dto) => ({
    type: dto.type,
    location: dto.location,
    pov: dto.pov,
    goal: dto.goal,
    conflict: dto.conflict,
    outcome: dto.outcome,
    wordCount: dto.word_count,
}));

export const SceneWithContextSchema = z.object({
    type: SceneTypeSchema,
    location: z.string(),
    pov: z.string().nullable(),
    goal: z.string(),
    conflict: z.string(),
    outcome: z.string(),
    word_count: z.number(),
    chapter_number: z.number(),
    chapter_id: z.string(),
}).transform((dto) => ({
    type: dto.type,
    location: dto.location,
    pov: dto.pov,
    goal: dto.goal,
    conflict: dto.conflict,
    outcome: dto.outcome,
    wordCount: dto.word_count,
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
}));

export const SceneDistributionSchema = z.object({
    type: SceneTypeSchema,
    scene_count: z.number(),
    pct: z.number(),
}).transform((dto) => ({
    type: dto.type,
    sceneCount: dto.scene_count,
    pct: dto.pct,
}));

export const POVDistributionSchema = z.object({
    pov: z.string(),
    scene_count: z.number(),
    estimated_word_count: z.number(),
    pct: z.number(),
}).transform((dto) => ({
    pov: dto.pov,
    sceneCount: dto.scene_count,
    estimatedWordCount: dto.estimated_word_count,
    pct: dto.pct,
}));

export const ChapterPacingDistributionSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    action_pct: z.number(),
    dialogue_pct: z.number(),
    introspection_pct: z.number(),
    exposition_pct: z.number(),
    pace: PaceSchema,
    tension: z.number(),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    actionPct: dto.action_pct,
    dialoguePct: dto.dialogue_pct,
    introspectionPct: dto.introspection_pct,
    expositionPct: dto.exposition_pct,
    pace: dto.pace,
    tension: dto.tension,
}));

export const ChapterRoleSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    structural_role: StructuralRoleSchema,
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    structuralRole: dto.structural_role,
}));

export const ThemeDistributionSchema = z.object({
    chapter_ids: z.array(z.string()),
    theme: z.string(),
    count: z.number(),
    perc: z.number(),
}).transform((dto) => ({
    chapterIds: dto.chapter_ids,
    theme: dto.theme,
    count: dto.count,
    perc: dto.perc,
}));

export const ChapterEmotionalBeatsSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    strong: z.number(),
    moderate: z.number(),
    weak: z.number(),
    strong_perc: z.number(),
    moderate_perc: z.number(),
    weak_perc: z.number(),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    strong: dto.strong,
    moderate: dto.moderate,
    weak: dto.weak,
    strongPerc: dto.strong_perc,
    moderatePerc: dto.moderate_perc,
    weakPerc: dto.weak_perc,
}));

// ─── Response Schemas ────────────────────────────────────────

export const SceneIndexResponseSchema = z.object({
    scenes: z.array(SceneWithContextSchema),
});

export const ChapterScenesSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    scenes: z.array(SceneSchema),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    scenes: dto.scenes,
}));

export const WeakScenesResponseSchema = z.object({
    weak_scenes: z.array(ChapterScenesSchema),
}).transform((dto) => ({
    weakScenes: dto.weak_scenes,
}));

export const ChapterSceneDistributionSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    distributions: z.array(SceneDistributionSchema),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    distributions: dto.distributions,
}));

export const SceneTypeDistributionResponseSchema = z.object({
    chapter_distributions: z.array(ChapterSceneDistributionSchema),
}).transform((dto) => ({
    chapterDistributions: dto.chapter_distributions,
}));

export const ChapterPOVBalanceSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    distributions: z.array(POVDistributionSchema),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    distributions: dto.distributions,
}));

export const POVBalanceResponseSchema = z.object({
    chapter_distributions: z.array(ChapterPOVBalanceSchema),
}).transform((dto) => ({
    chapterDistributions: dto.chapter_distributions,
}));

export const PacingCurveResponseSchema = z.object({
    chapter_distributions: z.array(ChapterPacingDistributionSchema),
}).transform((dto) => ({
    chapterDistributions: dto.chapter_distributions,
}));

export const StructuralArcResponseSchema = z.object({
    roles: z.array(ChapterRoleSchema),
});

export const ThemeDistributionResponseSchema = z.object({
    theme_distributions: z.array(ThemeDistributionSchema),
}).transform((dto) => ({
    themeDistributions: dto.theme_distributions,
}));

export const EmotionalBeatsResponseSchema = z.object({
    chapter_distributions: z.array(ChapterEmotionalBeatsSchema),
}).transform((dto) => ({
    chapterDistributions: dto.chapter_distributions,
}));

export const DevelopmentalReportResponseSchema = z.object({
    story_id: z.string(),
    report: z.string(),
}).transform((dto) => ({
    storyId: dto.story_id,
    report: dto.report,
}));

// ─── Input Types (API snake_case) ────────────────────────────

export type ApiSceneType = z.input<typeof SceneTypeSchema>;
export type ApiPace = z.input<typeof PaceSchema>;
export type ApiStructuralRole = z.input<typeof StructuralRoleSchema>;
export type ApiEffectiveness = z.input<typeof EffectivenessSchema>;
export type ApiScene = z.input<typeof SceneSchema>;
export type ApiSceneWithContext = z.input<typeof SceneWithContextSchema>;
export type ApiSceneIndexResponse = z.input<typeof SceneIndexResponseSchema>;
export type ApiChapterScenes = z.input<typeof ChapterScenesSchema>;
export type ApiWeakScenesResponse = z.input<typeof WeakScenesResponseSchema>;
export type ApiSceneDistribution = z.input<typeof SceneDistributionSchema>;
export type ApiChapterSceneDistribution = z.input<typeof ChapterSceneDistributionSchema>;
export type ApiSceneTypeDistributionResponse = z.input<typeof SceneTypeDistributionResponseSchema>;
export type ApiPOVDistribution = z.input<typeof POVDistributionSchema>;
export type ApiChapterPOVBalance = z.input<typeof ChapterPOVBalanceSchema>;
export type ApiPOVBalanceResponse = z.input<typeof POVBalanceResponseSchema>;
export type ApiChapterPacingDistribution = z.input<typeof ChapterPacingDistributionSchema>;
export type ApiPacingCurveResponse = z.input<typeof PacingCurveResponseSchema>;
export type ApiChapterRole = z.input<typeof ChapterRoleSchema>;
export type ApiStructuralArcResponse = z.input<typeof StructuralArcResponseSchema>;
export type ApiThemeDistribution = z.input<typeof ThemeDistributionSchema>;
export type ApiThemeDistributionResponse = z.input<typeof ThemeDistributionResponseSchema>;
export type ApiChapterEmotionalBeats = z.input<typeof ChapterEmotionalBeatsSchema>;
export type ApiEmotionalBeatsResponse = z.input<typeof EmotionalBeatsResponseSchema>;
export type ApiDevelopmentalReportResponse = z.input<typeof DevelopmentalReportResponseSchema>;

// ─── Output Types (frontend camelCase) ───────────────────────

export type SceneType = z.output<typeof SceneTypeSchema>;
export type Pace = z.output<typeof PaceSchema>;
export type StructuralRole = z.output<typeof StructuralRoleSchema>;
export type Effectiveness = z.output<typeof EffectivenessSchema>;
export type Scene = z.output<typeof SceneSchema>;
export type SceneWithContext = z.output<typeof SceneWithContextSchema>;
export type SceneIndexResponse = z.output<typeof SceneIndexResponseSchema>;
export type ChapterScenes = z.output<typeof ChapterScenesSchema>;
export type WeakScenesResponse = z.output<typeof WeakScenesResponseSchema>;
export type SceneDistribution = z.output<typeof SceneDistributionSchema>;
export type ChapterSceneDistribution = z.output<typeof ChapterSceneDistributionSchema>;
export type SceneTypeDistributionResponse = z.output<typeof SceneTypeDistributionResponseSchema>;
export type POVDistribution = z.output<typeof POVDistributionSchema>;
export type ChapterPOVBalance = z.output<typeof ChapterPOVBalanceSchema>;
export type POVBalanceResponse = z.output<typeof POVBalanceResponseSchema>;
export type ChapterPacingDistribution = z.output<typeof ChapterPacingDistributionSchema>;
export type PacingCurveResponse = z.output<typeof PacingCurveResponseSchema>;
export type ChapterRole = z.output<typeof ChapterRoleSchema>;
export type StructuralArcResponse = z.output<typeof StructuralArcResponseSchema>;
export type ThemeDistribution = z.output<typeof ThemeDistributionSchema>;
export type ThemeDistributionResponse = z.output<typeof ThemeDistributionResponseSchema>;
export type ChapterEmotionalBeats = z.output<typeof ChapterEmotionalBeatsSchema>;
export type EmotionalBeatsResponse = z.output<typeof EmotionalBeatsResponseSchema>;
export type DevelopmentalReportResponse = z.output<typeof DevelopmentalReportResponseSchema>;

// ─── Transform Functions ─────────────────────────────────────

export const toScene = (data: ApiScene) => SceneSchema.parse(data);
export const toSceneWithContext = (data: ApiSceneWithContext) => SceneWithContextSchema.parse(data);
export const toSceneIndexResponse = (data: ApiSceneIndexResponse) => SceneIndexResponseSchema.parse(data);
export const toChapterScenes = (data: ApiChapterScenes) => ChapterScenesSchema.parse(data);
export const toWeakScenesResponse = (data: ApiWeakScenesResponse) => WeakScenesResponseSchema.parse(data);
export const toSceneDistribution = (data: ApiSceneDistribution) => SceneDistributionSchema.parse(data);
export const toSceneTypeDistributionResponse = (data: ApiSceneTypeDistributionResponse) => SceneTypeDistributionResponseSchema.parse(data);
export const toPOVDistribution = (data: ApiPOVDistribution) => POVDistributionSchema.parse(data);
export const toChapterPOVBalance = (data: ApiChapterPOVBalance) => ChapterPOVBalanceSchema.parse(data);
export const toPOVBalanceResponse = (data: ApiPOVBalanceResponse) => POVBalanceResponseSchema.parse(data);
export const toChapterPacingDistribution = (data: ApiChapterPacingDistribution) => ChapterPacingDistributionSchema.parse(data);
export const toPacingCurveResponse = (data: ApiPacingCurveResponse) => PacingCurveResponseSchema.parse(data);
export const toChapterRole = (data: ApiChapterRole) => ChapterRoleSchema.parse(data);
export const toStructuralArcResponse = (data: ApiStructuralArcResponse) => StructuralArcResponseSchema.parse(data);
export const toThemeDistribution = (data: ApiThemeDistribution) => ThemeDistributionSchema.parse(data);
export const toThemeDistributionResponse = (data: ApiThemeDistributionResponse) => ThemeDistributionResponseSchema.parse(data);
export const toChapterEmotionalBeats = (data: ApiChapterEmotionalBeats) => ChapterEmotionalBeatsSchema.parse(data);
export const toEmotionalBeatsResponse = (data: ApiEmotionalBeatsResponse) => EmotionalBeatsResponseSchema.parse(data);
export const toDevelopmentalReportResponse = (data: ApiDevelopmentalReportResponse) => DevelopmentalReportResponseSchema.parse(data);
