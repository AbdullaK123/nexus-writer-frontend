import Link from 'next/link'
import { CharacterKnowledgeTimelineProps } from './types'
import styles from './CharacterKnowledgeTimeline.module.css'


export default function CharacterKnowledgeTimeline({ storyId, data }: CharacterKnowledgeTimelineProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{data.characterName}&apos;s Knowledge</h3>
            <div className={styles.list}>
                {data.maps.map((entry) => (
                    <div key={entry.chapterId} className={styles.entry}>
                        <div className={styles['entry-content']}>
                            {entry.knowledge.map((item, idx) => (
                                <span key={idx} className={styles.tag}>{item}</span>
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
