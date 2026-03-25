import { ApiContradictingFact, ApiContradiction, ApiContradictionResponse, ApiEntityFact, ApiEntityFactResponse, ApiChapterEntityFacts, ApiEntityTimelineResponse, ApiChapterFactCount, ApiStoryFactCountsResponse, ApiWorldConsistencyReport } from "../api";

export interface ContradictingFact {
  chapterNumber: number;
  chapterId: string;
  value: string;
}

export interface Contradiction {
  entity: string;
  attribute: string;
  occurrences: ContradictingFact[];
}

export interface ContradictionResponse {
  contradictions: Contradiction[];
}

export interface EntityFact {
  attribute: string;
  value: string;
}

export interface EntityFactResponse {
  entity: string;
  facts: EntityFact[];
}

export interface ChapterEntityFacts {
  chapterNumber: number;
  chapterId: string;
  facts: EntityFact[];
}

export interface EntityTimelineResponse {
  chapterFacts: ChapterEntityFacts[];
}

export interface ChapterFactCount {
  chapterNumber: number;
  chapterId: string;
  count: number;
}

export interface StoryFactCountsResponse {
  counts: ChapterFactCount[];
}

export interface WorldConsistencyReport {
  storyId: string;
  report: string;
}

export const toContradictingFact = (dto: ApiContradictingFact): ContradictingFact => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  value: dto.value,
});

export const toContradiction = (dto: ApiContradiction): Contradiction => ({
  entity: dto.entity,
  attribute: dto.attribute,
  occurrences: dto.occurrences.map(toContradictingFact),
});

export const toContradictionResponse = (dto: ApiContradictionResponse): ContradictionResponse => ({
  contradictions: dto.contradictions.map(toContradiction),
});

export const toEntityFact = (dto: ApiEntityFact): EntityFact => ({
  attribute: dto.attribute,
  value: dto.value,
});

export const toEntityFactResponse = (dto: ApiEntityFactResponse): EntityFactResponse => ({
  entity: dto.entity,
  facts: dto.facts.map(toEntityFact),
});

export const toChapterEntityFacts = (dto: ApiChapterEntityFacts): ChapterEntityFacts => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  facts: dto.facts.map(toEntityFact),
});

export const toEntityTimelineResponse = (dto: ApiEntityTimelineResponse): EntityTimelineResponse => ({
  chapterFacts: dto.chapter_facts.map(toChapterEntityFacts),
});

export const toChapterFactCount = (dto: ApiChapterFactCount): ChapterFactCount => ({
  chapterNumber: dto.chapter_number,
  chapterId: dto.chapter_id,
  count: dto.count,
});

export const toStoryFactCountsResponse = (dto: ApiStoryFactCountsResponse): StoryFactCountsResponse => ({
  counts: dto.counts.map(toChapterFactCount),
});

export const toWorldConsistencyReport = (dto: ApiWorldConsistencyReport): WorldConsistencyReport => ({
  storyId: dto.story_id,
  report: dto.report,
});