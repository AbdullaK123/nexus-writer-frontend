import { CharacterCardProps } from "./types";
import Link from "next/link";
import styles from "./CharacterCard.module.css";



export default function CharacterCard({
    storyId,
    character,
    appearances
}: CharacterCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.name}>{character.name}</h3>
                <span className={`${styles.badge} ${character.isNew ? styles['badge-new'] : styles['badge-returning']}`}>
                    {character.isNew ? "New" : "Returning"}
                </span>
            </div>

            <div className={styles.details}>
                <div className={styles['detail-row']}>
                    <span className={styles['detail-label']}>Role</span>
                    <span className={styles['detail-value']}>{character.role}</span>
                </div>
                <div className={styles['detail-row']}>
                    <span className={styles['detail-label']}>State</span>
                    <span className={styles['detail-value']}>{character.emotionalState}</span>
                </div>
            </div>

            {character.goals.length > 0 && (
                <div className={styles.section}>
                    <span className={styles['section-label']}>Goals</span>
                    <div className={styles['tag-list']}>
                        {character.goals.map((goal, idx) => (
                            <span key={idx} className={styles.tag}>{goal}</span>
                        ))}
                    </div>
                </div>
            )}

            {character.knowledgeGained.length > 0 && (
                <div className={styles.section}>
                    <span className={styles['section-label']}>Knowledge Gained</span>
                    <div className={styles['tag-list']}>
                        {character.knowledgeGained.map((knowledge, idx) => (
                            <span key={idx} className={`${styles.tag} ${styles['tag-knowledge']}`}>{knowledge}</span>
                        ))}
                    </div>
                </div>
            )}

            {appearances.length > 0 && (
                <div className={styles.appearances}>
                    <span className={styles['section-label']}>Appearances</span>
                    <div className={styles['chapter-links']}>
                        {appearances.map((appearance) => (
                            <Link
                                key={appearance.chapterId}
                                href={`/chapters/${storyId}/${appearance.chapterId}`}
                                className={styles['chapter-link']}
                            >
                                Ch. {appearance.chapterNumber}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}