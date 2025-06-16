import StoryDetailSidebar from "@/components/ui/StoryDetailSidebar/StoryDetailSidebar";
import StoryDetailHeader from "@/components/ui/StoryDetailHeader/StoryDetailHeader";
import ChapterPreview from "@/components/ui/ChapterPreview/ChapterPreview";
import styles from './page.module.css';


export default function Page() {
    return (
        <>
            <StoryDetailHeader />
            <div className={styles['flex-container']}>
                <StoryDetailSidebar />
                <ChapterPreview />
            </div>
        </>
    )
}