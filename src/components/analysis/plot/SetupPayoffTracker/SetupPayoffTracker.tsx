import Link from "next/link";
import { SetupPayoffTrackerProps } from "./types";
import styles from "./SetupPayoffTracker.module.css";

const RESOLUTION_CLASS: Record<string, string> = {
    full: styles['resolution-full'],
    partial: styles['resolution-partial'],
    reminder: styles['resolution-reminder'],
};

export default function SetupPayoffTracker({ storyId, setups }: SetupPayoffTrackerProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Setup &amp; Payoff</h3>
            <div className={styles.list}>
                {setups.map((setup, idx) => (
                    <div key={idx} className={styles.entry}>
                        <div className={styles['entry-header']}>
                            <span className={styles['entry-name']}>{setup.element}</span>
                            <div className={styles['entry-meta']}>
                                <span className={styles.detail}>Emphasis: {setup.emphasis}</span>
                                <span className={`${styles.badge} ${setup.mustPayOff ? styles['badge-required'] : styles['badge-optional']}`}>
                                    {setup.mustPayOff ? 'Must Pay Off' : 'Optional'}
                                </span>
                            </div>
                        </div>
                        {setup.payoffs.length > 0 ? (
                            <div className={styles.payoffs}>
                                {setup.payoffs.map((payoff) => (
                                    <div key={payoff.chapterId} className={styles.payoff}>
                                        <span className={`${styles.badge} ${RESOLUTION_CLASS[payoff.resolution] ?? ''}`}>
                                            {payoff.resolution}
                                        </span>
                                        <Link href={`/chapters/${storyId}/${payoff.chapterId}`} className={styles['chapter-link']}>
                                            Ch. {payoff.chapterNumber}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <span className={styles['no-payoffs']}>No payoffs yet</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
