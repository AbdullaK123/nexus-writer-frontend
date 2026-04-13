'use client'
import DashboardToolbar from "@/features/dashboard/DashboardToolbar/DashboardToolbar"
import styles from '@/app/(app)/AppLayout.module.css'
import StoryCard from "@/features/dashboard/StoryCard/StoryCard"
import { StoryCardProps } from "@/features/dashboard/StoryCard/types"
import { ClipLoader } from "react-spinners";
import { useDashboard } from "./hooks/useDashboard";

export default function DashboardContent() {
    const {
        user,
        stories,
        storiesToShow,
        isLoading,
        isSuccess,
        create,
        isCreating,
        setFilter,
    } = useDashboard()

    return (
        <>
            <DashboardToolbar
                username={user.username}
                onCreateStory={create}
                onFilterChange={setFilter}
            />
            {isCreating && (
                <div className="loading-row-lg">
                    <ClipLoader size={20} color="#00d4ff" />
                    <h2>Creating new story...</h2>
                </div>
            )}
            <div className={styles['flex-wrap-container']}>
                {isLoading && (
                    <div className="loading-column">
                        <ClipLoader size={50} color="#00d4ff" />
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
