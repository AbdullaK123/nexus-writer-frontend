'use client'
import { useStories } from "@/app/hooks/useStories";
import styles from './page.module.css'
import StoryList from "@/components/ui/StoryList/StoryList";
import { useToast } from "@/app/hooks/useToast";
import { useEffect } from "react";

export default function AnalyticsPage() {
    
    const {
        storyListItems,
        isLoadingListItems,
        listItemsError
    } = useStories()

    const { showToast } = useToast()

    useEffect(() => {
        if (listItemsError) {
            showToast("Failed to load stories. The server might be experiencing issues.", "error")
        }
    }, [listItemsError, showToast])

    return (
        <div className={styles['analytics-page-content']}>
            <div className={styles['story-sidebar']}>
                <h2>My Stories</h2>
                <StoryList 
                    storiesLoading={isLoadingListItems}
                    stories={storyListItems}
                />
            </div>
            <div>
                This is content!
            </div>
        </div>
    );
}
