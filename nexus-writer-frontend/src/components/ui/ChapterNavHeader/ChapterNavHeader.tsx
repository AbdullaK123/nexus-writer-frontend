import { useRouter } from "next/navigation";
import { ChapterNavHeaderProps } from "@/app/types/interfaces";
import styles from './ChapterNavHeader.module.css'

export default function ChapterNavHeader({
    storyId,
    chapterTitle,
    prevChapterId,
    nextChapterId,
}: ChapterNavHeaderProps) {
    const router = useRouter()

    return (
        <div className={styles['chapter-nav-container']}>
            {prevChapterId && (
                <button
                    className={styles['nav-button']}
                    onClick={() => router.push(`/chapters/${storyId}/${prevChapterId}`)}
                >
                    ←
                </button>
            )}
            <h2>{chapterTitle}</h2>
            {nextChapterId && (
                <button
                    className={styles['nav-button']}
                    onClick={() => router.push(`/chapters/${storyId}/${nextChapterId}`)}
                >
                    →
                </button>
            )}
        </div>
    )
}