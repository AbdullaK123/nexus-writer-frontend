import { transformTarget } from '../lib/utils';
import fetchApi from './api';
import { ApiStory, ApiStoryListItemResponse, ApiTargetResponse, StoryCreateRequest, StoryListItemResponse, StoryUpdateRequest } from '@/app/types';

// This function will handle the transformation
const transformStory = (story: ApiStory) => ({
    ...story,
    latestChapterId: story.latest_chapter_id,
    createdAt: new Date(story.created_at + 'Z'),
    updatedAt: new Date(story.updated_at + 'Z'),
    totalChapters: story.total_chapters,
    wordCount: story.word_count,
});

const transformStoryListItemResponse = (storyListItem: ApiStoryListItemResponse): StoryListItemResponse => ({
    storyId: storyListItem.id,
    title: storyListItem.title,
    wordCount: storyListItem.word_count,
    targets: storyListItem.targets.map((targetResponse: ApiTargetResponse) => transformTarget(targetResponse))
})

export const getStories = async () => {
    const data = await fetchApi('/stories');
    // Transform the data before returning it
    return data.stories ? data.stories.map(transformStory) : [];
};

export const getStoriesWithTargets = async () => {
    const data = await fetchApi('/stories/targets');
    return data ? data.map(transformStoryListItemResponse) : [];
}

export const getStory = async (storyId: string) => {
    const data = await fetchApi(`/stories/${storyId}`);
    // Also transform single story responses if needed
    return data ? transformStory(data) : null;
};

export const createStory = (storyInfo: StoryCreateRequest) => {
    return fetchApi('/stories', {
        method: 'POST',
        body: JSON.stringify(storyInfo),
    });
};

export const updateStory = ({ storyId, body }: StoryUpdateRequest) => {
    return fetchApi(`/stories/${storyId}`, {
        method: 'PUT',
        body: JSON.stringify(body),
    });
};

export const deleteStory = (storyId: string) => {
    return fetchApi(`/stories/${storyId}`, {
        method: 'DELETE',
    });
};