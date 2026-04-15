'use client'
import { toCharacterArcTableProps, toCharacterGoalTimelineProps, toCharacterKnowledgeSnapshotProps, toCharacterKnowledgeTimelineProps, toCharacterReportCardProps } from "@/compatability/transformers";
import { CharacterArcTable, CharacterGoalTimeline, CharacterKnowledgeSnapshot, CharacterKnowledgeTimeline, CharacterReportCard } from "@/components/analysis";
import { AsyncBoundary } from "@/components/common";
import { useCharacter } from "@/data/hooks";
import { useParams } from "next/navigation";
import styles from "../AnalysisPage.module.css";


export default function CharacterPageContent() {
    const params = useParams()
    const storyId = params.id as string
    const characterName = decodeURIComponent(params.characterName as string)

    const {
         // character arc
        characterArc,
        characterArcLoading,
        characterArcError,
        // character knowledge
        characterKnowledge,
        characterKnowledgeLoading,
        characterKnowledgeError,
        // character inconsistencies
        characterInconsistencies,
        characterInconsistenciesLoading,
        characterInconsistenciesError,
        // character goals
        characterGoals,
        characterGoalsLoading,
        characterGoalsError,
        // character knowledge map
        characterKnowledgeMap,
        characterKnowledgeMapLoading,
        characterKnowledgeMapError,
    } = useCharacter(storyId, characterName)

    return (
        <div className={styles.page}>
            <h2>{characterName}</h2>
            <div className={styles.section}>
                <h3>Character Arc</h3>
                <AsyncBoundary
                    data={characterArc}
                    isLoading={characterArcLoading}
                    isError={characterArcError}
                    errorMessage="Failed to load character arc."
                >   
                    {(data) => (
                        <CharacterArcTable {...toCharacterArcTableProps(storyId, data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Goals and Knowledge</h3>
                <AsyncBoundary
                    data={characterGoals}
                    isLoading={characterGoalsLoading}
                    isError={characterGoalsError}
                    errorMessage="Failed to load character goals."
                >
                    {(data) => (
                        <CharacterGoalTimeline {...toCharacterGoalTimelineProps(storyId, data)} />
                    )}
                </AsyncBoundary>
                <AsyncBoundary
                    data={characterKnowledgeMap}
                    isLoading={characterKnowledgeMapLoading}
                    isError={characterKnowledgeMapError}
                    errorMessage="Failed to load character knowledge timeline."
                >
                    {(data) => (
                        <CharacterKnowledgeTimeline {...toCharacterKnowledgeTimelineProps(storyId, data)} />
                    )}
                </AsyncBoundary>
                <AsyncBoundary
                    data={characterKnowledge}
                    isLoading={characterKnowledgeLoading}
                    isError={characterKnowledgeError}
                    errorMessage="Failed to load character knowledge."
                >
                    {(data) => (
                        <CharacterKnowledgeSnapshot {...toCharacterKnowledgeSnapshotProps(data)} />
                    )}
                </AsyncBoundary>
            </div>
            <div className={styles.section}>
                <h3>Character Report</h3>
                <AsyncBoundary
                    data={characterInconsistencies}
                    isLoading={characterInconsistenciesLoading}
                    isError={characterInconsistenciesError}
                    errorMessage="Failed to load character inconsistencies."
                >
                    {(data) => (
                        <CharacterReportCard {...toCharacterReportCardProps(data)} />
                    )}
                </AsyncBoundary>
            </div>
        </div>
    )

}