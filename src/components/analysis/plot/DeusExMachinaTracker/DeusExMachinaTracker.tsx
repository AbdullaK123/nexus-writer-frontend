import { DeusExMachinaTrackerProps } from "./types";
import styles from "./DeusExMachinaTracker.module.css";

export default function DeusExMachinaTracker({ problems }: DeusExMachinaTrackerProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Contrivance Risks</h3>
            <div className={styles.list}>
                {problems.map((problem, idx) => (
                    <div key={idx} className={styles.entry}>
                        <div className={styles["entry-content"]}>
                            <span className={styles["entry-name"]}>{problem.solution}</span>
                            <p className={styles.problem}>{problem.problem}</p>
                            <div className={styles["entry-meta"]}>
                                <span className={`${styles.badge} ${problem.risk >= 7 ? styles["risk-high"] : problem.risk >= 4 ? styles["risk-medium"] : styles["risk-low"]}`}>
                                    Risk: {problem.risk}/10
                                </span>
                                <span className={`${styles.badge} ${problem.hasPriorSetup ? styles["setup-yes"] : styles["setup-no"]}`}>
                                    {problem.hasPriorSetup ? "Has Setup" : "No Setup"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
