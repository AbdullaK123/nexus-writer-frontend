import Link from "next/link";
import { StructuralArcTrackerProps } from "./types";
import styles from "./StructuralArcTracker.module.css";

const ROLE_CLASS: Record<string, string> = {
    exposition: styles['role-exposition'],
    inciting_incident: styles['role-inciting'],
    rising_action: styles['role-rising'],
    climax: styles['role-climax'],
    falling_action: styles['role-falling'],
    resolution: styles['role-resolution'],
    transition: styles['role-transition'],
    flashback: styles['role-flashback'],
};

export default function StructuralArcTracker({ storyId, roles }: StructuralArcTrackerProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Structural Arc</h3>
            <div className={styles.list}>
                {roles.map(role => (
                    <div key={role.chapterId} className={styles.entry}>
                        <div className={styles['entry-content']}>
                            <span className={`${styles.badge} ${ROLE_CLASS[role.structuralRole] ?? ''}`}>
                                {role.structuralRole.replace(/_/g, ' ')}
                            </span>
                        </div>
                        <Link href={`/chapters/${storyId}/${role.chapterId}`} className={styles['chapter-link']}>
                            Ch. {role.chapterNumber}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
