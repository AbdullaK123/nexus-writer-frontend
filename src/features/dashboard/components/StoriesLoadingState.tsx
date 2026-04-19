import { ClipLoader } from 'react-spinners'
import styles from '@/app/(app)/AppLayout.module.css'

export default function StoriesLoadingState() {
    return (
        <div className={styles['flex-col-container']}>
            <ClipLoader color="#00d4ff" size={40} />
            <p>Loading your stories...</p>
        </div>
    )
}
