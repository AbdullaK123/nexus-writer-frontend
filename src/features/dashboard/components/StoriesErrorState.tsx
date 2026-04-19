import styles from '@/app/(app)/AppLayout.module.css'

export default function StoriesErrorState() {
    return (
        <div className={styles['flex-col-container']}>
            <h2>Could not load stories</h2>
            <p>Something went wrong while fetching your stories. The server may be temporarily unavailable.</p>
        </div>
    )
}
