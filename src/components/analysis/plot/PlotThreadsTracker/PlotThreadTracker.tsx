import { PlotThreadsTrackerProps } from "./types";
import styles from "./PlotThreadTracker.module.css";
import PlotThreadItem from "./components/PlotThreadItem";

export default function PlotThreadsTracker({
    storyId,
    threads
}: PlotThreadsTrackerProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Plot Threads</h3>
            <div className={styles.list}>
                {threads.map((thread) => (
                    <PlotThreadItem
                        key={thread.name}
                        storyId={storyId}
                        thread={thread}
                    />
                ))}
            </div>
        </div>
    )
}