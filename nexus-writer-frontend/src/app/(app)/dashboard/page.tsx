'use client'
import DashboardToolbar from "@/components/ui/DashboardToolbar/DashboardToolbar"
import styles from '@/app/(app)/AppLayout.module.css'
import { useAuth } from '@/app/hooks/useAuth';
import { useStories } from "@/app/hooks/useStories"
import StoryCard from "@/components/ui/StoryCard/StoryCard"
import { StoryCardProps } from "@/app/types/interfaces"

export default function Dashboard() {

    const { user } = useAuth()

    const {
         stories, 
         isLoading, 
         isError, 
         isSuccess, 
         create
    } = useStories()

    return (
        <>
            <DashboardToolbar
                username={user.username}
                onCreateStory={create}
            />
            <div className={styles['flex-wrap-container']}>
                {isError && (<h1>Failed to fetch stories. There might be an issue with the server.</h1>) }
                {isLoading && (<h1>Loading your stories...</h1>)}
                {isSuccess && stories && stories.map((story: StoryCardProps) => {
                        return (
                            <StoryCard 
                                key={story.id} 
                                {...story} 
                            />
                        )
                    })
                }
            </div>
        </>
    )
}