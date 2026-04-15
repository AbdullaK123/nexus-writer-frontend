import { WorldFactsTableProps } from "./types";
import styles from "./WorldFactsTable.module.css";
import WorldFactRow from "./components/WorldFactRow";

export default function WorldFactsTable({ storyId, entries }: WorldFactsTableProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>World Facts</h3>
            {entries.length === 0 ? (
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
                            {entries.map((entry) => (
                                <WorldFactRow
                                    key={entry.entity}
                                    storyId={storyId}
                                    entry={entry}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
