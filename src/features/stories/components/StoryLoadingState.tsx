import { ClipLoader } from 'react-spinners'
import styles from '../StoryDetailContent.module.css'

export default function StoryLoadingState() {
    return (
        <div className={styles['centered']}>
            <ClipLoader size={50} color="#00d4ff" />
            <h1>Loading story...</h1>
        </div>
    )
}
