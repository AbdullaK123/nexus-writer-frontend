

export type StoryCreateRequest = {
    title: string;
}

export type StoryUpdateRequestBody = {
    title?: string;
    status?: 'Complete' | 'Ongoing' | 'On Haitus'
}

export type StoryUpdateRequest = {
    body?: StoryUpdateRequestBody;
    storyId: string;
}

