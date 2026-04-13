import { CharacterCard } from "@/components/analysis"
import { CharacterGridProps } from "./types";
import styles from "./CharacterGrid.module.css";


export default function CharacterGrid({ props }: CharacterGridProps ) {
    return (
        <div className={styles.grid}>
            {props.map((prop) => (
                <CharacterCard  
                    storyId={prop.storyId}
                    character={prop.character}
                    appearances={prop.appearances}
                />
            ))}
        </div>
    )
}