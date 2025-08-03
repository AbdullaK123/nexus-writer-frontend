import StoryInfoCard from "../StoryInfoCard/StoryInfoCard";
import ChapterListItem from "../ChapterListItem/ChapterListItem";
import { StoryDetailSideBarProps } from "@/app/types/misc";
import styles from './StoryDetailSidebar.module.css'

export default function StoryDetailSidebar({ 
    storyInfo,
    chapters,
 }: StoryDetailSideBarProps) {
    return (
        <aside className={styles['story-sidebar-container']}> 
            <h2 className={styles['chapters-sidebar-header']}>Story Status</h2>
            <div className={styles['sidebar-section']}>
                <StoryInfoCard {...storyInfo}/>
            </div>
            <h2 className={styles['chapters-sidebar-header']}>Chapters</h2>
            <div className={`${styles['sidebar-section']} ${styles['chapter-items-container']}`}>
                {chapters && chapters.length > 0 ? (
                    chapters.map((chapter, index) => (
                        <ChapterListItem 
                            key={`chapter-${chapter.chapterNumber}-${index}`} 
                            {...chapter} 
                        />
                    ))
                ) : (
                    <div className={styles['empty-chapters']}>
                        No chapters yet
                    </div>
                )}
            </div>
        </aside>
    )
}