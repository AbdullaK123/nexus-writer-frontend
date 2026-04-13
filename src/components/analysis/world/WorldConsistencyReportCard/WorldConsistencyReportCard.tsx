import { WorldConsistencyReportCardProps } from "./types";
import styles from "./WorldConsistencyReportCard.module.css";

export default function WorldConsistencyReportCard({ report }: WorldConsistencyReportCardProps) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>World Consistency Report</h3>
            <p className={styles.report}>{report.report}</p>
        </div>
    );
}
