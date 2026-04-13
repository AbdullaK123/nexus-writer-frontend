import SceneCard from "../SceneCard/SceneCard";
import { SceneIndexProps } from "./types";
import styles from "./SceneIndex.module.css";

export default function SceneIndex({ storyId, scenes }: SceneIndexProps) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Scene Index</h3>
            {scenes.length === 0 ? (
                <div className={styles.empty}><p>No scenes yet.</p></div>
            ) : (
                <div className={styles.grid}>
                    {scenes.map((scene, idx) => (
                        <SceneCard key={idx} storyId={storyId} scene={scene} />
                    ))}
                </div>
            )}
        </div>
    );
}
