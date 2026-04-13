import { SetupTrackerProps } from "./types";
import styles from "./SetupTracker.module.css";

export default function SetupTracker({
    setups
}: SetupTrackerProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Setups</h3>
            <div className={styles.list}>
                {setups.map((setup, idx) => (
                    <div key={idx} className={styles.entry}>
                        <div className={styles['entry-content']}>
                            <span className={styles['entry-name']}>{setup.element}</span>
                            <div className={styles['entry-meta']}>
                                <span className={styles.detail}>Emphasis: {setup.emphasis}</span>
                                <span className={`${styles.badge} ${setup.mustPayOff ? styles['badge-required'] : styles['badge-optional']}`}>
                                    {setup.mustPayOff ? 'Must Pay Off' : 'Optional'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}