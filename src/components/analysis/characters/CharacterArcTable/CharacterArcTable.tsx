import CharacterEmotionalStateTracker from "./components/CharacterEmotionalStateTracker/CharacterEmotionalStateTracker";
import CharacterGoalTracker from "./components/CharacterGoalTracker/CharacterGoalTracker";
import CharacterKnowledgeGainedTracker from "./components/CharacterKnowledgeGainedTracker/CharacterKnowledgeGainedTracker";
import { CharacterArcTableProps } from "./types";
import styles from "./CharacterArcTable.module.css";



export default function CharacterArcTable({
    storyId,
    arc
}: CharacterArcTableProps) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{arc.characterName}</h2>
            <div className={styles.trackers}>
                <CharacterEmotionalStateTracker 
                    storyId={storyId}
                    states={arc.emotionalStates}
                />
                <CharacterGoalTracker 
                    storyId={storyId}
                    goals={arc.goals}
                />
                <CharacterKnowledgeGainedTracker 
                    storyId={storyId}
                    knowledgeGained={arc.knowledgeGained}
                />
            </div>
        </div>
    )
}