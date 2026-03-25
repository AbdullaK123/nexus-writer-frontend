export interface ApiCharacter {
  name: string;
  is_new: boolean;
  role: string;
  emotional_state: string;
  goals: string[];
  knowledge_gained: string[];
}

export interface ApiCharacterResponse {
  characters: ApiCharacter[];
}

export interface ApiChapterEmotionalState {
  chapter_id: string;
  chapter_number: number;
  emotional_state: string;
}

export interface ApiChapterGoals {
  chapter_id: string;
  chapter_number: number;
  goals: string[];
}

export interface ApiChapterKnowledgeGained {
  chapter_id: string;
  chapter_number: number;
  knowledge_gained: string[];
}

export interface ApiCharacterArcResponse {
  character_name: string;
  emotional_states: ApiChapterEmotionalState[];
  goals: ApiChapterGoals[];
  knowledge_gained: ApiChapterKnowledgeGained[];
}

export interface ApiCharacterKnowledgeResponse {
  character_name: string;
  chapter_number: number;
  knowledge: string[];
}

export interface ApiCharacterInconsistencyResponse {
  character_name: string;
  report: string;
}

export interface ApiCharacterAppearance {
  chapter_number: number;
  chapter_id: string;
}

export interface ApiCharacterAppearanceMap {
  character_name: string;
  appearances: ApiCharacterAppearance[];
}

export interface ApiCharacterAppearancesResponse {
  maps: ApiCharacterAppearanceMap[];
}

export interface ApiCharacterIntroductionCount {
  chapter_number: number;
  chapter_id: string;
  characters_introduced: number;
}

export interface ApiCharacterIntroductionResponse {
  counts: ApiCharacterIntroductionCount[];
}

export interface ApiCharacterGoalsResponse {
  character_name: string;
  goals: ApiChapterGoals[];
}

export interface ApiCharacterKnowledgeMap {
  chapter_number: number;
  chapter_id: string;
  knowledge: string[];
}

export interface ApiCharacterKnowledgeMapResponse {
  character_name: string;
  maps: ApiCharacterKnowledgeMap[];
}

export interface ApiChapterCharacterDensity {
  chapter_number: number;
  chapter_id: string;
  characters_present: number;
}

export interface ApiCharacterDensityResponse {
  counts: ApiChapterCharacterDensity[];
}

export interface ApiCastManagementReportResponse {
  story_id: string;
  report: string;
}
