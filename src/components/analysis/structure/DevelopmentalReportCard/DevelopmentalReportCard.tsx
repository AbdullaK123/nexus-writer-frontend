import { DevelopmentalReportCardProps } from "./types";
import styles from "./DevelopmentalReportCard.module.css";

export default function DevelopmentalReportCard({ report }: DevelopmentalReportCardProps) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Developmental Report</h3>
            <p className={styles.report}>{report.report}</p>
        </div>
    );
}
