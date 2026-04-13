import { Frequency } from "@/data/types";
import styles from './TotalWordsKpiCard.module.css'


type TotalWordsKpiCardProps = {
    totalWords: number;
    target: number;
    frequency: Frequency
}

export default function TotalWordsKpiCard({
    totalWords,
    target,
    frequency
}: TotalWordsKpiCardProps) {

    const isAboveTarget = totalWords > target
    const percTarget = (target > 0) ? Math.round(100*(totalWords / target))/100: undefined
    
    const getDisplayedFrequency = (frequency: Frequency) : string => {
        if (frequency === "Daily") return "today"
        if (frequency === "Weekly") return "this week"
        if (frequency === "Monthly") return "this month"
    }


    return (
        <div className="kpi-card">
            <h3 className="kpi-title">Total Words</h3>
            <div className="kpi-metrics">
                <span className="kpi-value">{totalWords}</span>
                <span className="kpi-label">{`words written ${getDisplayedFrequency(frequency)}`}</span>
                {(target > 0) && (
                    <span className={isAboveTarget ? styles['above-target'] : styles['below-target']}>
                        {isAboveTarget ? `+${percTarget}% of target` : `${percTarget}% of target`}
                    </span>
                )}
            </div>
        </div>
    )
}