export interface ApiContradictingFact {
  chapter_number: number;
  chapter_id: string;
  value: string;
}

export interface ApiContradiction {
  entity: string;
  attribute: string;
  occurrences: ApiContradictingFact[];
}

export interface ApiContradictionResponse {
  contradictions: ApiContradiction[];
}

export interface ApiEntityFact {
  attribute: string;
  value: string;
}

export interface ApiEntityFactResponse {
  entity: string;
  facts: ApiEntityFact[];
}

export interface ApiChapterEntityFacts {
  chapter_number: number;
  chapter_id: string;
  facts: ApiEntityFact[];
}

export interface ApiEntityTimelineResponse {
  chapter_facts: ApiChapterEntityFacts[];
}

export interface ApiChapterFactCount {
  chapter_number: number;
  chapter_id: string;
  count: number;
}

export interface ApiStoryFactCountsResponse {
  counts: ApiChapterFactCount[];
}

export interface ApiWorldConsistencyReport {
  story_id: string;
  report: string;
}