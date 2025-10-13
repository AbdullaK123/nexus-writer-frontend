'use client'
import DashboardToolbar from "@/components/ui/DashboardToolbar/DashboardToolbar"
import styles from '@/app/(app)/AppLayout.module.css'
import { useAuth } from '@/app/hooks/useAuth';
import { useStories } from "@/app/hooks/useStories"
import StoryCard from "@/components/ui/StoryCard/StoryCard"
import { StoryCardProps } from "@/app/types/components"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners";
import { useToast } from "@/app/hooks/useToast";

export default function Dashboard() {
    const { user } = useAuth()

    const {
         stories, 
         isLoading, 
         isError, 
         isSuccess, 
         create,
         isCreating,
         creationError,
         isCreated
    } = useStories()

    const { showToast } = useToast()

    const [filter, setFilter] = useState('')

    const getStoriesToShow = () => {
        if (!stories) return []
        if (!filter) return stories
        return stories.filter((story) => story.status === filter)
    }

    const storiesToShow = getStoriesToShow()

    useEffect(() => {
        if (isError) {
            showToast("Failed to fetch stories. There might be an issue with the server", "error")
        }
    }, [isError, showToast])

    useEffect(() => {
        if (creationError) {
            showToast("Failed to create story. The server might be experiencing issues", "error")
        }
    }, [creationError, showToast])

    useEffect(() => {
        if (isCreated) {
            showToast("Successfully created story! Happy writing!", "success")
        }
    }, [isCreated, showToast])


    return (
        <>
            <DashboardToolbar
                username={user.username}
                onCreateStory={create}
                onFilterChange={setFilter}
            />
            {isCreating && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '20px' }}>
                    <ClipLoader size={20} color="#666" />
                    <h2>Creating new story...</h2>
                </div>
            )}
            <div className={styles['flex-wrap-container']}>
                {isLoading && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '40px' }}>
                        <ClipLoader size={50} color="#666" />
                        <h1>Loading your stories...</h1>
                    </div>
                )}
                {isSuccess && storiesToShow && storiesToShow.map((story: StoryCardProps) => {
                        return (
                            <StoryCard 
                                key={story.id} 
                                {...story} 
                            />
                        )
                    })
                }
                {isSuccess && stories && stories.length === 0 && (
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
                {isSuccess && stories && stories.length > 0 && storiesToShow.length === 0 && (
                    <div className={styles['empty-state']}>
                        <div className={styles['empty-state-icon']}>🔍</div>
                        <h2>No stories match your filter</h2>
                        <p>Try selecting a different status or clear the filter to see all stories.</p>
                    </div>
                )}
            </div>
        </>
    )
}