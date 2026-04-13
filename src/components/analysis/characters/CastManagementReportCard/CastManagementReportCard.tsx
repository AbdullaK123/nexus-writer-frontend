import { CastManagementReportCardProps } from './types'
import styles from './CastManagementReportCard.module.css'


export default function CastManagementReportCard({ report }: CastManagementReportCardProps) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Cast Management Report</h3>
            <div className={styles.report}>{report.report}</div>
        </div>
    )
}
