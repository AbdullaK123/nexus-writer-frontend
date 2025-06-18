import StoryInfoCard from "../StoryInfoCard/StoryInfoCard";
import ChapterListItem from "../ChapterListItem/ChapterListItem";
import { StoryDetailSideBarProps } from "@/app/types/interfaces";
import styles from './StoryDetailSidebar.module.css'

export default function StoryDetailSidebar({ 
    storyInfo,
    chapters,
 }: StoryDetailSideBarProps) {
    return (
        <aside className={styles['story-sidebar-container']}> 
            <div className={styles['sidebar-section']}>
                <StoryInfoCard {...storyInfo}/>
            </div>
            
            <div className={`${styles['sidebar-section']} ${styles['chapter-items-container']}`}>
                <h2>Chapters</h2>
                {chapters && chapters.length > 0 ? (
                    chapters.map((chapter, index) => (
                        <ChapterListItem key={`chapter-${chapter.chapterNumber}-${index}`} {...chapter} />
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