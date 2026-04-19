'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/data/hooks/useAuth'
import { useStories } from '@/data/hooks/useStories'
import { useToast } from '@/shared/providers/ToastProvider'
import { AsyncBoundary } from '@/components/common'
import DashboardToolbar from '@/features/dashboard/DashboardToolbar/DashboardToolbar'
import StoryCard from '@/features/dashboard/StoryCard/StoryCard'
import { StoryCardProps } from '@/features/dashboard/StoryCard/types'
import { ClipLoader } from 'react-spinners'
import styles from '@/app/(app)/AppLayout.module.css'
import AuthLoadingState from './components/AuthLoadingState'
import AuthErrorState from './components/AuthErrorState'
import StoriesLoadingState from './components/StoriesLoadingState'
import StoriesErrorState from './components/StoriesErrorState'
import StoriesEmptyState from './components/StoriesEmptyState'

export default function DashboardContent() {
    const { user, isLoading: authLoading, isError: authError } = useAuth()
    const {
        stories,
        isLoading: storiesLoading,
        isError: storiesError,
        create,
        isCreating,
        creationError,
        isCreated,
    } = useStories()

    const { showToast } = useToast()
    const [filter, setFilter] = useState('')

    const storiesToShow = (() => {
        if (!stories) return []
        if (!filter) return stories
        return stories.filter((story) => story.status === filter)
    })()

    useEffect(() => {
        if (creationError) {
            showToast('Failed to create story. The server might be experiencing issues', 'error')
        }
    }, [creationError, showToast])

    useEffect(() => {
        if (isCreated) {
            showToast('Successfully created story! Happy writing!', 'success')
        }
    }, [isCreated, showToast])

    return (
        <AsyncBoundary
            data={user}
            isLoading={authLoading}
            isError={authError}
            errorMessage="Unable to load your session. Please try refreshing the page or logging in again."
            loadingState={<AuthLoadingState />}
            errorState={<AuthErrorState />}
        >
            {(userData) => (
                <>
                    <DashboardToolbar
                        username={userData.username}
                        onCreateStory={create}
                        onFilterChange={setFilter}
                    />
                    {isCreating && (
                        <div className="loading-row-lg">
                            <ClipLoader size={20} color="#00d4ff" />
                            <h2>Creating new story...</h2>
                        </div>
                    )}
                    <AsyncBoundary
                        data={storiesToShow}
                        isLoading={storiesLoading}
                        isError={storiesError}
                        errorMessage="Failed to load your stories. Please check your connection and try again."
                        loadingState={<StoriesLoadingState />}
                        errorState={<StoriesErrorState />}
                        emptyState={<StoriesEmptyState hasStories={!!(stories && stories.length > 0)} />}
                    >
                        {(items) => (
                            <div className={styles['flex-wrap-container']}>
                                {items.map((story: StoryCardProps) => (
                                    <StoryCard key={story.id} {...story} />
                                ))}
                            </div>
                        )}
                    </AsyncBoundary>
                </>
            )}
        </AsyncBoundary>
    )
}
