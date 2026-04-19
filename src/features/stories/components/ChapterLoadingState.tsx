import { ClipLoader } from 'react-spinners'
import styles from '../StoryDetailContent.module.css'

export default function ChapterLoadingState() {
    return (
        <div className={styles['centered']}>
            <ClipLoader size={50} color="#00d4ff" />
            <h1>Loading chapter...</h1>
        </div>
    )
}
