

export type StoryCreateRequest = {
    title: string;
}

export type StoryUpdateRequestBody = {
    title?: string;
    status?:  "Complete" | "Ongoing" | "On Hiatus"
}

export type StoryUpdateRequest = {
    body?: StoryUpdateRequestBody;
    storyId: string;
}

