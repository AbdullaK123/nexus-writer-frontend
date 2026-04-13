import { CharacterReportCardProps } from "./types";
import styles from "./CharacterReportCard.module.css";


export default function CharacterReportCard({
    report
}: CharacterReportCardProps) {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{report.characterName}&apos;s Consistency Report</h2>
            <div className={styles.report}>
                {report.report}
            </div>
        </div>
    )
}