import { PlotReportCardProps } from "./types";
import styles from "./PlotReportCard.module.css";

export default function PlotReportCard({ report }: PlotReportCardProps) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Plot Structural Report</h3>
            <p className={styles.report}>{report.report}</p>
        </div>
    );
}
