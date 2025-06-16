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
            <StoryInfoCard {...storyInfo}/>
            <div className={styles['chapter-items-container']}>
                <h2>Chapters</h2>
                {chapters.map((chapter, index) => {
                    return (
                        <ChapterListItem key={index} {...chapter} />
                    )
                })}
            </div>
        </aside>
    )
}