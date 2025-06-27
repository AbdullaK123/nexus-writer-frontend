// src/components/ui/ChapterListItem/ChapterListItem.tsx
import { ChapterListItemProps } from "@/app/types/interfaces";
import styles from './ChapterListItem.module.css'

export default function ChapterListItem({
    chapterNumber,
    title,
    wordCount,
    getChapterFn,
    status
}: ChapterListItemProps) {

    const getBadgeCss = (status: string) => {
        const normalizedStatus = status.toLowerCase();
        if (normalizedStatus === 'published') return 'published-chapter-number-badge';
        if (normalizedStatus === 'draft') return 'draft-chapter-number-badge';
        return 'outline-chapter-number-badge';
    }

    const getStatusIndicatorClass = (status: string) => {
        const normalizedStatus = status.toLowerCase();
        if (normalizedStatus === 'published') return 'published';
        if (normalizedStatus === 'draft') return 'draft';
        return 'outline';
    }

    const formatWordCount = (count: number) => {
        if (count === 0) return '0 words';
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k words`;
        return `${count} words`;
    }

    return (
        <div className={styles['chapter-list-item-container']}> 
            <div className={`${styles['status-indicator']} ${styles[getStatusIndicatorClass(status)]}`} />
            <div className={styles['chapter-metadata-container']}> 
                <span className={`${styles['chapter-number-badge']} ${styles[getBadgeCss(status)]}`}>
                    {chapterNumber}
                </span>
                <div className={styles['flex-col-container']}>
                    <h3>{title}</h3>
                    <div className={styles['chapter-stats']}>
                        <span>{formatWordCount(wordCount)}</span>
                        <span>{status}</span>
                    </div>
                </div>
            </div>
            <div className={styles['arrow-icon']}>
                →
            </div>
        </div>
    )
}