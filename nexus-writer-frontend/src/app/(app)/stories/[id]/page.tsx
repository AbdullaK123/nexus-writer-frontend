import StoryDetailSidebar from "@/components/ui/StoryDetailSidebar/StoryDetailSidebar";
import StoryDetailHeader from "@/components/ui/StoryDetailHeader/StoryDetailHeader";
import ChapterPreview from "@/components/ui/ChapterPreview/ChapterPreview";
import styles from './page.module.css';
import { mockStoryDetailSidebar, mockChapterPreview } from "@/app/lib/examples";

// In stories/[id]/page.tsx - replace your current structure with:
export default async function Page({ params }) {
    const {id} = await params

    return (
        <div className={styles['story-detail-page']}>
            <StoryDetailHeader title={`Mock Story ${id}`} />
            <div className={styles['story-content-layout']}>
                <StoryDetailSidebar {...mockStoryDetailSidebar}/>
                <div className={styles['main-content-area']}>
                    <ChapterPreview {...mockChapterPreview} />
                </div>
            </div>
        </div>
    )
}