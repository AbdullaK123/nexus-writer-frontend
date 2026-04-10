import { ApiCharacter, ApiCharacterResponse, ApiChapterEmotionalState, ApiChapterGoals, ApiChapterKnowledgeGained, ApiCharacterArcResponse, ApiCharacterKnowledgeResponse, ApiCharacterInconsistencyResponse, ApiCharacterAppearance, ApiCharacterAppearanceMap, ApiCharacterAppearancesResponse, ApiCharacterIntroductionCount, ApiCharacterIntroductionResponse, ApiCharacterGoalsResponse, ApiCharacterKnowledgeMap, ApiCharacterKnowledgeMapResponse, ApiChapterCharacterDensity, ApiCharacterDensityResponse, ApiCastManagementReportResponse } from "../api";

export interface Character {
  name: string;
  isNew: boolean;
  role: string;
  emotionalState: string;
  goals: string[];
  knowledgeGained: string[];
}

export interface CharacterResponse {
  characters: Character[];
}

export interface ChapterEmotionalState {
  chapterId: string;
  chapterNumber: number;
  emotionalState: string;
}

export interface ChapterGoals {
  chapterId: string;
  chapterNumber: number;
  goals: string[];
}

export interface ChapterKnowledgeGained {
  chapterId: string;
  chapterNumber: number;
  knowledgeGained: string[];
}

export interface CharacterArcResponse {
  characterName: string;
  emotionalStates: ChapterEmotionalState[];
  goals: ChapterGoals[];
  knowledgeGained: ChapterKnowledgeGained[];
}

export interface CharacterKnowledgeResponse {
  characterName: string;
  chapterNumber: number;
  knowledge: string[];
}

export interface CharacterInconsistencyResponse {
  characterName: string;
  report: string;
}

export interface CharacterAppearance {
  chapterNumber: number;
  chapterId: string;
}

export interface CharacterAppearanceMap {
  characterName: string;
  appearances: CharacterAppearance[];
}

export interface CharacterAppearancesResponse {
  maps: CharacterAppearanceMap[];
}

export interface CharacterIntroductionCount {
  chapterNumber: number;
  chapterId: string;
  charactersIntroduced: number;
}

export interface CharacterIntroductionResponse {
  counts: CharacterIntroductionCount[];
}

export interface CharacterGoalsResponse {
  characterName: string;
  goals: ChapterGoals[];
}

export interface CharacterKnowledgeMap {
  chapterNumber: number;
  chapterId: string;
  knowledge: string[];
}

export interface CharacterKnowledgeMapResponse {
  characterName: string;
  maps: CharacterKnowledgeMap[];
}

export interface ChapterCharacterDensity {
  chapterNumber: number;
  chapterId: string;
  charactersPresent: number;
}

export interface CharacterDensityResponse {
  counts: ChapterCharacterDensity[];
}

export interface CastManagementReportResponse {
  storyId: string;
  report: string;
}

export const toCharacter = (dto: ApiCharacter): Character => ({
  name: dto.name,
  isNew: dto.is_new,
  role: dto.role,
  emotionalState: dto.emotional_state,
  goals: dto.goals,
  knowledgeGained: dto.knowledge_gained,
});

export const toCharacterResponse = (dto: ApiCharacterResponse): CharacterResponse => ({
  characters: dto.characters.map(toCharacter),
});

export const toChapterEmotionalState = (dto: ApiChapterEmotionalState): ChapterEmotionalState => ({
  chapterId: dto.chapter_id,
  chapterNumber: dto.chapter_number,
  emotionalState: dto.emotional_state,
});

export const toChapterGoals = (dto: ApiChapterGoals): ChapterGoals => ({
  chapterId: dto.chapter_id,
  chapterNumber: dto.chapter_number,
  goals: dto.goals,
});

export const toChapterKnowledgeGained = (dto: ApiChapterKnowledgeGained): ChapterKnowledgeGained => ({
  chapterId: dto.chapter_id,
  chapterNumber: dto.chapter_number,
  knowledgeGained: dto.knowledge_gained,
});

export const toCharacterArcResponse = (dto: ApiCharacterArcResponse): CharacterArcResponse => ({
  characterName: dto.character_name,
  emotionalStates: dto.emotional_states.map(toChapterEmotionalState),
  goals: dto.goals.map(toChapterGoals),
  knowledgeGained: dto.knowledge_gained.map(toChapterKnowledgeGained),
});

export const toCharacterKnowledgeResponse = (dto: ApiCharacterKnowledgeResponse): CharacterKnowledgeResponse => ({
  characterName: dto.character_name,
  chapterNumber: dto.chapter_number,
  knowledge: dto.knowledge,
});

export const toCharacterInconsistencyResponse = (dto: ApiCharacterInconsistencyResponse): CharacterInconsistencyResponse => ({
  characterName: dto.character_name,
  report: dto.report,
});

export const toCharacterAppearance = (dto: ApiCharacterAppearance): CharacterAppearance => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
});

export const toCharacterAppearanceMap = (dto: ApiCharacterAppearanceMap): CharacterAppearanceMap => ({
  characterName: dto.character_name,
  appearances: dto.appearances.map(toCharacterAppearance),
});

export const toCharacterAppearancesResponse = (dto: ApiCharacterAppearancesResponse): CharacterAppearancesResponse => ({
  maps: dto.maps.map(toCharacterAppearanceMap),
});

export const toCharacterIntroductionCount = (dto: ApiCharacterIntroductionCount): CharacterIntroductionCount => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  charactersIntroduced: dto.characters_introduced,
});

export const toCharacterIntroductionResponse = (dto: ApiCharacterIntroductionResponse): CharacterIntroductionResponse => ({
  counts: dto.counts.map(toCharacterIntroductionCount),
});

export const toCharacterGoalsResponse = (dto: ApiCharacterGoalsResponse): CharacterGoalsResponse => ({
  characterName: dto.character_name,
  goals: dto.goals.map(toChapterGoals),
});

export const toCharacterKnowledgeMap = (dto: ApiCharacterKnowledgeMap): CharacterKnowledgeMap => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  knowledge: dto.knowledge,
});

export const toCharacterKnowledgeMapResponse = (dto: ApiCharacterKnowledgeMapResponse): CharacterKnowledgeMapResponse => ({
  characterName: dto.character_name,
  maps: dto.maps.map(toCharacterKnowledgeMap),
});

export const toChapterCharacterDensity = (dto: ApiChapterCharacterDensity): ChapterCharacterDensity => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  charactersPresent: dto.characters_present,
});

export const toCharacterDensityResponse = (dto: ApiCharacterDensityResponse): CharacterDensityResponse => ({
  counts: dto.counts.map(toChapterCharacterDensity),
});

export const toCastManagementReportResponse = (dto: ApiCastManagementReportResponse): CastManagementReportResponse => ({
  storyId: dto.story_id,
  report: dto.report,
});