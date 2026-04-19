import { ClipLoader } from 'react-spinners'
import styles from '@/app/(app)/AppLayout.module.css'

export default function AuthLoadingState() {
    return (
        <div className={styles['flex-col-container']}>
            <ClipLoader color="#00d4ff" size={50} />
            <p>Loading your dashboard...</p>
        </div>
    )
}
