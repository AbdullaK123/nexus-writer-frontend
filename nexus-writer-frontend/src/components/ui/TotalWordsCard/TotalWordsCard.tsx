import {TotalWordsCardProps} from "@/app/types";
import {formatWordCount} from "@/app/lib/utils";
import styles from './TotalWordsCard.module.css'

const getTargetAnnotation = (totalWords: number, quota: number) => (
    (totalWords >= quota) ? `+ ${ 100*(Math.round(totalWords / quota) - 1)}% above quota`
        : `Reached ${100*Math.round(totalWords / quota)}% of quota`
)

export default function TotalWordsCard({
    totalWords,
    quota
}: TotalWordsCardProps) {
    return (
        <div className={styles['kpi-card-container']}>
            <h3>Total Words</h3>
            <p>{`${formatWordCount(totalWords)} words`}</p>
            <p>{ getTargetAnnotation(totalWords, quota) }</p>
        </div>
    )
}