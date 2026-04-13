import { CharacterKnowledgeSnapshotProps } from './types'
import styles from './CharacterKnowledgeSnapshot.module.css'


export default function CharacterKnowledgeSnapshot({ data }: CharacterKnowledgeSnapshotProps) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{data.characterName}</h3>
            <span className={styles.subtitle}>Knowledge as of Chapter {data.chapterNumber}</span>
            {data.knowledge.length === 0 ? (
                <p className={styles.empty}>No knowledge recorded yet.</p>
            ) : (
                <div className={styles['tag-list']}>
                    {data.knowledge.map((item, idx) => (
                        <span key={idx} className={styles.tag}>{item}</span>
                    ))}
                </div>
            )}
        </div>
    )
}
