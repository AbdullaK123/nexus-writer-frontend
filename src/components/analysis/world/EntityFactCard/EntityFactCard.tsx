import { EntityFactCardProps } from "./types";
import styles from "./EntityFactCard.module.css";

export default function EntityFactCard({ entity, facts }: EntityFactCardProps) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{entity}</h3>
            {facts.length === 0 ? (
                <p className={styles.empty}>No facts recorded.</p>
            ) : (
                <div className={styles.facts}>
                    {facts.map((fact, idx) => (
                        <div key={idx} className={styles.fact}>
                            <span className={styles['fact-attribute']}>{fact.attribute}</span>
                            <span className={styles['fact-value']}>{fact.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
