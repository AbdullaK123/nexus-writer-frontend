import styles from '@/app/(app)/AppLayout.module.css'

export default function AuthErrorState() {
    return (
        <div className={styles['flex-col-container']}>
            <h2>Unable to load your session</h2>
            <p>We couldn&apos;t verify your login. Please try refreshing the page or logging in again.</p>
        </div>
    )
}
