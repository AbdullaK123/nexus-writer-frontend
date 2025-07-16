'use client'
import DashboardToolbar from "@/components/ui/DashboardToolbar/DashboardToolbar"
import styles from '@/app/(app)/AppLayout.module.css'
import { useAuth } from '@/app/hooks/useAuth';
import { useStories } from "@/app/hooks/useStories"
import StoryCard from "@/components/ui/StoryCard/StoryCard"
import { StoryCardProps } from "@/app/types/interfaces"
import { useState, useEffect } from "react";

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

    const [filteredStories, setFilteredStories] = useState<StoryCardProps[]>([])

    // Update filtered stories when stories data changes
    useEffect(() => {
        if (stories) {
            setFilteredStories(stories)
        }
    }, [stories])

    const onFilterChange = (filter: string) => {
        console.log('Filter changed to:', filter)
        console.log('Available stories:', JSON.stringify(stories))
        
        if (!stories) {
            console.log('No stories available')
            return
        }

        if (!filter || filter === '') {
            // Show all stories
            setFilteredStories(stories)
        } else {
            // Filter by status
            const filtered = stories.filter((story) => story.status === filter)
            console.log('Filtered stories:', JSON.stringify(filtered))
            setFilteredStories(filtered)
        }
    }

    return (
        <>
            <DashboardToolbar
                username={user.username}
                onCreateStory={create}
                onFilterChange={onFilterChange}
            />
            {isCreating && (<h2>Creating new story...</h2>)}
            <div className={styles['flex-wrap-container']}>
                {isError && (<h1>Failed to fetch stories. There might be an issue with the server.</h1>) }
                {isLoading && (<h1>Loading your stories...</h1>)}
                {isSuccess && filteredStories && filteredStories.map((story: StoryCardProps) => {
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
                {isSuccess && stories && stories.length > 0 && filteredStories.length === 0 && (
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