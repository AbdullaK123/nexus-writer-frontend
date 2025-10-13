import StoryInfoCard from "../StoryInfoCard/StoryInfoCard";
import ChapterListItem from "../ChapterListItem/ChapterListItem";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { StoryDetailSideBarProps } from "@/app/types";
import styles from './StoryDetailSidebar.module.css'

const filterOptions = [
    {label: 'All Chapters', value: ''},
    {label: 'Draft', value: 'draft'},
    {label: 'Outline', value: 'outline'},
    {label: 'Published', value: 'published'}
]

export default function StoryDetailSidebar({ 
    storyInfo,
    chapters,
    onFilterChange
 }: StoryDetailSideBarProps) {
    return (
        <aside className={styles['story-sidebar-container']}> 
            <h2 className={styles['chapters-sidebar-header']}>Story Status</h2>
            <div className={styles['sidebar-section']}>
                <StoryInfoCard {...storyInfo}/>
            </div>
            <div className={styles['chapters-header-with-filter']}>
                <h2 className={styles['chapters-sidebar-header']}>Chapters</h2>
                <FilterDropdown 
                    onFilterChange={onFilterChange}
                    filterOptions={filterOptions}
                />
            </div>
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