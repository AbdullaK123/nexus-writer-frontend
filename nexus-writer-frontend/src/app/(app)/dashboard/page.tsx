'use client'
import DashboardToolbar from "@/components/ui/DashboardToolbar/DashboardToolbar"
import { StoryCreateRequest } from "@/app/types/stories"
import styles from '@/app/(app)/AppLayout.module.css'
import { mockStoryData, singleMockStory } from '@/app/lib/examples'
import { useAuth } from '@/app/hooks/useAuth';
import StoryCard from "@/components/ui/StoryCard/StoryCard"

export default function Dashboard() {

    const { user } = useAuth()


    return (
        <>
            <DashboardToolbar
                username={user.username}
                onCreateStory={(story : StoryCreateRequest) => {}}
            />
            <div className={styles['flex-wrap-container']}>
                {mockStoryData.map((story, index) => (
                    <StoryCard key={index} {...story} />
                ))}
            </div>
        </>
    )
}