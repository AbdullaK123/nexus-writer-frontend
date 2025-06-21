import styles from './StoryDetailHeader.module.css'
import { StoryDetailHeaderProps } from '@/app/types/interfaces'

export default function StoryDetailHeader({ title } : StoryDetailHeaderProps) {
    return (
        <div className={styles['story-detail-header']}>
            <div className={styles['title-and-arrow-back-container']}>
                <button className={styles['back-button']} aria-label="Go back">
                    ←
                </button>
                <h2>{title}</h2>
            </div>
            <button className={`btn-primary ${styles['create-chapter-button']}`}>
                + Create Chapter
            </button>
        </div>
    )
}