'use client'
import { PlotThread } from "@/data/types"
import { usePlotThreadTimeline } from "@/data/hooks/usePlot"
import { toThreadTimelineTrackerProps } from "@/compatability/transformers"
import ThreadTimelineTracker from "@/components/analysis/plot/ThreadTimelineTracker/ThreadTimelineTracker"
import { Tooltip } from "@/components/common"
import styles from "../PlotThreadTracker.module.css"

const STATUS_CLASS: Record<string, string> = {
    introduced: styles['status-introduced'],
    active: styles['status-active'],
    resolved: styles['status-resolved'],
    dormant: styles['status-dormant'],
}

interface PlotThreadItemProps {
    storyId: string
    thread: PlotThread
}

export default function PlotThreadItem({ storyId, thread }: PlotThreadItemProps) {
    const { threadTimeline } = usePlotThreadTimeline(storyId, thread.name)

    const tooltipContent = threadTimeline
        ? <ThreadTimelineTracker {...toThreadTimelineTrackerProps(storyId, threadTimeline)} />
        : <span>Loading timeline...</span>

    return (
        <Tooltip content={tooltipContent} side="right" delayDuration={300} maxWidth={360}>
            <div className={styles.entry}>
                <div className={styles['entry-content']}>
                    <span className={styles['entry-name']}>{thread.name}</span>
                    <div className={styles['entry-meta']}>
                        <span className={`${styles.badge} ${STATUS_CLASS[thread.status] ?? ''}`}>{thread.status}</span>
                        <span className={styles.detail}>Importance: {thread.importance}</span>
                        {thread.mustResolve && <span className={`${styles.badge} ${styles['priority-badge']}`}>Must Resolve</span>}
                    </div>
                </div>
            </div>
        </Tooltip>
    )
}
