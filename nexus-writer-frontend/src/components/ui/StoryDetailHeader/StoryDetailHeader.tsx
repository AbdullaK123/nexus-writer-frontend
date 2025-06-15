import styles from './StoryDetailHeader.module.css'
import { StoryDetailHeaderProps } from '@/app/types/interfaces'


export default function StoryDetailHeader({ title } : StoryDetailHeaderProps) {
    return (
        <div className={styles['story-detail-header']}>
            <div className={styles['title-and-arrow-back-container']}>
                {/*where the arrow back icon will go */}
                <h2>{title}</h2>
            </div>
            <button className='btn-primary'>
                + Create Chapter
            </button>
        </div>
    )
}