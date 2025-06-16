import StoryInfoCard from "../StoryInfoCard/StoryInfoCard";
import ChapterListItem from "../ChapterListItem/ChapterListItem";
import { StoryDetailSideBarProps } from "@/app/types/interfaces";


export default function StoryDetailSidebar({ 
    storyInfo,
    chapters,
 }: StoryDetailSideBarProps) {
    return (
        <aside className="story-sidebar-container">
            <StoryInfoCard {...storyInfo}/>
            <div className="chapter-items-container">
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