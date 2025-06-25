'use client'
import DashboardToolbar from "@/components/ui/DashboardToolbar/DashboardToolbar"
import { StoryCreateRequest } from "@/app/types/stories"
import styles from '@/app/(app)/AppLayout.module.css'
import { mockStoryData, singleMockStory } from '@/app/lib/examples'
import { useAuth } from '@/app/hooks/useAuth';
import { useStories } from "@/app/hooks/useStories"
import StoryCard from "@/components/ui/StoryCard/StoryCard"
import { StoryCardProps } from "@/app/types/interfaces"

export default function Dashboard() {

    const { user } = useAuth()

    const { stories, create } = useStories()

    return (
        <>
            <DashboardToolbar
                username={user.username}
                onCreateStory={create}
            />
            <div className={styles['flex-wrap-container']}>
                {stories? (
                    stories.stories.map((story: StoryCardProps, index: number) => (
                        <StoryCard 
                            key={index} 
                            {...story} 
                        />
                    ))
                ): (
                    <h1>No stories yet.</h1>
                )}
            </div>
        </>
    )
}