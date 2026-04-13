import { z } from "zod";

// ─── Leaf Schemas ────────────────────────────────────────────

export const CharacterSchema = z.object({
    name: z.string(),
    is_new: z.boolean(),
    role: z.string(),
    emotional_state: z.string(),
    goals: z.array(z.string()),
    knowledge_gained: z.array(z.string()),
}).transform((dto) => ({
    name: dto.name,
    isNew: dto.is_new,
    role: dto.role,
    emotionalState: dto.emotional_state,
    goals: dto.goals,
    knowledgeGained: dto.knowledge_gained,
}));

export const ChapterEmotionalStateSchema = z.object({
    chapter_id: z.string(),
    chapter_number: z.number(),
    emotional_state: z.string(),
}).transform((dto) => ({
    chapterId: dto.chapter_id,
    chapterNumber: dto.chapter_number,
    emotionalState: dto.emotional_state,
}));

export const ChapterGoalsSchema = z.object({
    chapter_id: z.string(),
    chapter_number: z.number(),
    goals: z.array(z.string()),
}).transform((dto) => ({
    chapterId: dto.chapter_id,
    chapterNumber: dto.chapter_number,
    goals: dto.goals,
}));

export const ChapterKnowledgeGainedSchema = z.object({
    chapter_id: z.string(),
    chapter_number: z.number(),
    knowledge_gained: z.array(z.string()),
}).transform((dto) => ({
    chapterId: dto.chapter_id,
    chapterNumber: dto.chapter_number,
    knowledgeGained: dto.knowledge_gained,
}));

export const CharacterAppearanceSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
}));

export const CharacterIntroductionCountSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    characters_introduced: z.number(),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    charactersIntroduced: dto.characters_introduced,
}));

export const CharacterKnowledgeMapSchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    knowledge: z.array(z.string()),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    knowledge: dto.knowledge,
}));

export const ChapterCharacterDensitySchema = z.object({
    chapter_number: z.number(),
    chapter_id: z.string(),
    characters_present: z.number(),
}).transform((dto) => ({
    chapterNumber: dto.chapter_number,
    chapterId: dto.chapter_id,
    charactersPresent: dto.characters_present,
}));

// ─── Response Schemas ────────────────────────────────────────

export const CharacterResponseSchema = z.object({
    characters: z.array(CharacterSchema),
});

export const CharacterArcResponseSchema = z.object({
    character_name: z.string(),
    emotional_states: z.array(ChapterEmotionalStateSchema),
    goals: z.array(ChapterGoalsSchema),
    knowledge_gained: z.array(ChapterKnowledgeGainedSchema),
}).transform((dto) => ({
    characterName: dto.character_name,
    emotionalStates: dto.emotional_states,
    goals: dto.goals,
    knowledgeGained: dto.knowledge_gained,
}));

export const CharacterKnowledgeResponseSchema = z.object({
    character_name: z.string(),
    chapter_number: z.number(),
    knowledge: z.array(z.string()),
}).transform((dto) => ({
    characterName: dto.character_name,
    chapterNumber: dto.chapter_number,
    knowledge: dto.knowledge,
}));

export const CharacterInconsistencyResponseSchema = z.object({
    character_name: z.string(),
    report: z.string(),
}).transform((dto) => ({
    characterName: dto.character_name,
    report: dto.report,
}));

export const CharacterAppearanceMapSchema = z.object({
    character_name: z.string(),
    appearances: z.array(CharacterAppearanceSchema),
}).transform((dto) => ({
    characterName: dto.character_name,
    appearances: dto.appearances,
}));

export const CharacterAppearancesResponseSchema = z.object({
    maps: z.array(CharacterAppearanceMapSchema),
});

export const CharacterIntroductionResponseSchema = z.object({
    counts: z.array(CharacterIntroductionCountSchema),
});

export const CharacterGoalsResponseSchema = z.object({
    character_name: z.string(),
    goals: z.array(ChapterGoalsSchema),
}).transform((dto) => ({
    characterName: dto.character_name,
    goals: dto.goals,
}));

export const CharacterKnowledgeMapResponseSchema = z.object({
    character_name: z.string(),
    maps: z.array(CharacterKnowledgeMapSchema),
}).transform((dto) => ({
    characterName: dto.character_name,
    maps: dto.maps,
}));

export const CharacterDensityResponseSchema = z.object({
    counts: z.array(ChapterCharacterDensitySchema),
});

export const CastManagementReportResponseSchema = z.object({
    story_id: z.string(),
    report: z.string(),
}).transform((dto) => ({
    storyId: dto.story_id,
    report: dto.report,
}));

// ─── Input Types (API snake_case) ────────────────────────────

export type ApiCharacter = z.input<typeof CharacterSchema>;
export type ApiCharacterResponse = z.input<typeof CharacterResponseSchema>;
export type ApiChapterEmotionalState = z.input<typeof ChapterEmotionalStateSchema>;
export type ApiChapterGoals = z.input<typeof ChapterGoalsSchema>;
export type ApiChapterKnowledgeGained = z.input<typeof ChapterKnowledgeGainedSchema>;
export type ApiCharacterArcResponse = z.input<typeof CharacterArcResponseSchema>;
export type ApiCharacterKnowledgeResponse = z.input<typeof CharacterKnowledgeResponseSchema>;
export type ApiCharacterInconsistencyResponse = z.input<typeof CharacterInconsistencyResponseSchema>;
export type ApiCharacterAppearance = z.input<typeof CharacterAppearanceSchema>;
export type ApiCharacterAppearanceMap = z.input<typeof CharacterAppearanceMapSchema>;
export type ApiCharacterAppearancesResponse = z.input<typeof CharacterAppearancesResponseSchema>;
export type ApiCharacterIntroductionCount = z.input<typeof CharacterIntroductionCountSchema>;
export type ApiCharacterIntroductionResponse = z.input<typeof CharacterIntroductionResponseSchema>;
export type ApiCharacterGoalsResponse = z.input<typeof CharacterGoalsResponseSchema>;
export type ApiCharacterKnowledgeMap = z.input<typeof CharacterKnowledgeMapSchema>;
export type ApiCharacterKnowledgeMapResponse = z.input<typeof CharacterKnowledgeMapResponseSchema>;
export type ApiChapterCharacterDensity = z.input<typeof ChapterCharacterDensitySchema>;
export type ApiCharacterDensityResponse = z.input<typeof CharacterDensityResponseSchema>;
export type ApiCastManagementReportResponse = z.input<typeof CastManagementReportResponseSchema>;

// ─── Output Types (frontend camelCase) ───────────────────────

export type Character = z.output<typeof CharacterSchema>;
export type CharacterResponse = z.output<typeof CharacterResponseSchema>;
export type ChapterEmotionalState = z.output<typeof ChapterEmotionalStateSchema>;
export type ChapterGoals = z.output<typeof ChapterGoalsSchema>;
export type ChapterKnowledgeGained = z.output<typeof ChapterKnowledgeGainedSchema>;
export type CharacterArcResponse = z.output<typeof CharacterArcResponseSchema>;
export type CharacterKnowledgeResponse = z.output<typeof CharacterKnowledgeResponseSchema>;
export type CharacterInconsistencyResponse = z.output<typeof CharacterInconsistencyResponseSchema>;
export type CharacterAppearance = z.output<typeof CharacterAppearanceSchema>;
export type CharacterAppearanceMap = z.output<typeof CharacterAppearanceMapSchema>;
export type CharacterAppearancesResponse = z.output<typeof CharacterAppearancesResponseSchema>;
export type CharacterIntroductionCount = z.output<typeof CharacterIntroductionCountSchema>;
export type CharacterIntroductionResponse = z.output<typeof CharacterIntroductionResponseSchema>;
export type CharacterGoalsResponse = z.output<typeof CharacterGoalsResponseSchema>;
export type CharacterKnowledgeMap = z.output<typeof CharacterKnowledgeMapSchema>;
export type CharacterKnowledgeMapResponse = z.output<typeof CharacterKnowledgeMapResponseSchema>;
export type ChapterCharacterDensity = z.output<typeof ChapterCharacterDensitySchema>;
export type CharacterDensityResponse = z.output<typeof CharacterDensityResponseSchema>;
export type CastManagementReportResponse = z.output<typeof CastManagementReportResponseSchema>;

// ─── Transform Functions ─────────────────────────────────────

export const toCharacter = (data: ApiCharacter) => CharacterSchema.parse(data);
export const toCharacterResponse = (data: ApiCharacterResponse) => CharacterResponseSchema.parse(data);
export const toChapterEmotionalState = (data: ApiChapterEmotionalState) => ChapterEmotionalStateSchema.parse(data);
export const toChapterGoals = (data: ApiChapterGoals) => ChapterGoalsSchema.parse(data);
export const toChapterKnowledgeGained = (data: ApiChapterKnowledgeGained) => ChapterKnowledgeGainedSchema.parse(data);
export const toCharacterArcResponse = (data: ApiCharacterArcResponse) => CharacterArcResponseSchema.parse(data);
export const toCharacterKnowledgeResponse = (data: ApiCharacterKnowledgeResponse) => CharacterKnowledgeResponseSchema.parse(data);
export const toCharacterInconsistencyResponse = (data: ApiCharacterInconsistencyResponse) => CharacterInconsistencyResponseSchema.parse(data);
export const toCharacterAppearancesResponse = (data: ApiCharacterAppearancesResponse) => CharacterAppearancesResponseSchema.parse(data);
export const toCharacterIntroductionResponse = (data: ApiCharacterIntroductionResponse) => CharacterIntroductionResponseSchema.parse(data);
export const toCharacterGoalsResponse = (data: ApiCharacterGoalsResponse) => CharacterGoalsResponseSchema.parse(data);
export const toCharacterKnowledgeMapResponse = (data: ApiCharacterKnowledgeMapResponse) => CharacterKnowledgeMapResponseSchema.parse(data);
export const toCharacterDensityResponse = (data: ApiCharacterDensityResponse) => CharacterDensityResponseSchema.parse(data);
export const toCastManagementReportResponse = (data: ApiCastManagementReportResponse) => CastManagementReportResponseSchema.parse(data);
