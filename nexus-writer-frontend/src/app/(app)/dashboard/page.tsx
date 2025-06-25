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
         create,
         isCreating
    } = useStories()

    return (
        <>
            <DashboardToolbar
                username={user.username}
                onCreateStory={create}
            />
            {isCreating && (<h2>Creating new story...</h2>)}
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
                {isSuccess && stories.length === 0 && (
                     <div className={styles['empty-state']}>
                        <div className={styles['empty-state-icon']}>🚀</div>
                        <h2>Ready to begin your first story?</h2>
                        <p>Create a story above to start writing your sci-fi epic. Every great universe begins with a single idea.</p>
                        <div className={styles['empty-state-cta']}>
                            <div className={styles['empty-state-hint']}>
                                Start with a compelling title - you can always change it later
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}