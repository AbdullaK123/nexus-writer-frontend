'use client'
import { useAuth } from '@/data/hooks/useAuth';
import { useStories } from "@/data/hooks/useStories"
import { useEffect, useState } from "react"
import { useToast } from "@/shared/providers/ToastProvider";

export function useDashboard() {
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

    const storiesToShow = (() => {
        if (!stories) return []
        if (!filter) return stories
        return stories.filter((story) => story.status === filter)
    })()

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

    return {
        user,
        stories,
        storiesToShow,
        isLoading,
        isSuccess,
        create,
        isCreating,
        setFilter,
    }
}
