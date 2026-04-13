import { PlotRhythmReportCardProps } from "./types";
import styles from "./PlotRhythmReportCard.module.css";

export default function PlotRhythmReportCard({ report }: PlotRhythmReportCardProps) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Plot Rhythm Report</h3>
            <p className={styles.report}>{report.report}</p>
        </div>
    );
}
