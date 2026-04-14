import { WorldFactsTableProps } from "./types";
import styles from "./WorldFactsTable.module.css";

export default function WorldFactsTable({ entries }: WorldFactsTableProps) {
    const rows = entries.flatMap((entry) =>
        entry.facts.map((fact) => ({
            entity: entry.entity,
            attribute: fact.attribute,
            value: fact.value,
        }))
    );

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>World Facts</h3>
            {rows.length === 0 ? (
                <div className={styles.empty}>
                    <p>No world facts recorded yet.</p>
                </div>
            ) : (
                <div className={styles["table-wrapper"]}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Entity</th>
                                <th className={styles.th}>Attribute</th>
                                <th className={styles.th}>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr key={idx} className={styles.row}>
                                    <td className={styles.entity}>{row.entity}</td>
                                    <td className={styles.attribute}>{row.attribute}</td>
                                    <td className={styles.value}>{row.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
