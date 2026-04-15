'use client'
import { EntityFactResponse } from "@/data/types"
import { useEntityTimeline } from "@/data/hooks/useWorld"
import { toEntityFactCardProps, toEntityTimelineProps } from "@/compatability/transformers"
import EntityFactCard from "@/components/analysis/world/EntityFactCard/EntityFactCard"
import EntityTimeline from "@/components/analysis/world/EntityTimeline/EntityTimeline"
import { Tooltip } from "@/components/common"
import styles from "../WorldFactsTable.module.css"

interface WorldFactRowProps {
    storyId: string
    entry: EntityFactResponse
}

export default function WorldFactRow({ storyId, entry }: WorldFactRowProps) {
    const { entityTimeline } = useEntityTimeline(storyId, entry.entity)

    const tooltipContent = (
        <div>
            <EntityFactCard {...toEntityFactCardProps(entry)} />
            {entityTimeline
                ? <EntityTimeline {...toEntityTimelineProps(storyId, entityTimeline)} />
                : <span>Loading timeline...</span>
            }
        </div>
    )

    return (
        <>
            {entry.facts.map((fact, idx) => (
                <tr key={idx} className={styles.row}>
                    {idx === 0 ? (
                        <td className={styles.entity} rowSpan={entry.facts.length}>
                            <Tooltip content={tooltipContent} side="right" delayDuration={300} maxWidth={400}>
                                <span className={styles['entity-name']}>{entry.entity}</span>
                            </Tooltip>
                        </td>
                    ) : null}
                    <td className={styles.attribute}>{fact.attribute}</td>
                    <td className={styles.value}>{fact.value}</td>
                </tr>
            ))}
        </>
    )
}
