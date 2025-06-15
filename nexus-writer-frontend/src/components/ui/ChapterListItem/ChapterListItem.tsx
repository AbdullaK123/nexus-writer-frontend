import { ChapterListItemProps } from "@/app/types/interfaces";
import styles from './ChapterListItem.module.css'

export default function ChapterListItem({
    chapterNumber,
    title,
    wordCount,
    status
}: ChapterListItemProps) {

    const getBadgeCss = (status: string) => {
        if (status.toLowerCase() === 'published') return 'published-chapter-number-badge';
        if (status.toLowerCase() === 'draft') return 'draft-chapter-number-badge';
        return 'outline-chapter-number-badge';
    }

    const getChapterNumberBadge = (chapterNumber: number, status: string) => {

        const css = getBadgeCss(status)

        return (
            <span className={styles[css]}>
                {chapterNumber}
            </span>
        )
    }

    return (
        <div className="chapter-list-item-container">
            <div className="chapter-metadata-container">
                {getChapterNumberBadge(chapterNumber, status)}
                <div className={styles['flex-col-container']}>
                    <h3>{title}</h3>
                    <span>{wordCount} words - {status}</span>
                </div>
            </div>
            <div>
                {/* where the right arrow icon will go */}
            </div>
        </div>
    )
}