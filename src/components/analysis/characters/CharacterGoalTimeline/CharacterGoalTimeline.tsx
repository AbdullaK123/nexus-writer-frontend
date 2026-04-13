import Link from 'next/link'
import { CharacterGoalTimelineProps } from './types'
import styles from './CharacterGoalTimeline.module.css'


export default function CharacterGoalTimeline({ storyId, data }: CharacterGoalTimelineProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{data.characterName}&apos;s Goals</h3>
            <div className={styles.list}>
                {data.goals.map((entry) => (
                    <div key={entry.chapterId} className={styles.entry}>
                        <div className={styles['entry-content']}>
                            {entry.goals.map((goal, idx) => (
                                <span key={idx} className={styles.tag}>{goal}</span>
                            ))}
                        </div>
                        <Link
                            href={`/chapters/${storyId}/${entry.chapterId}`}
                            className={styles['chapter-link']}
                        >
                            Ch. {entry.chapterNumber}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
