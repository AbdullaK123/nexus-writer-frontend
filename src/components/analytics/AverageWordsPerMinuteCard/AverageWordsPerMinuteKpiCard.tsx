type AverageWordsPerMinuteCardProps = {
    avgWordsPerMinute: number
}

export default function AverageWordsPerMinuteCard({
    avgWordsPerMinute
}: AverageWordsPerMinuteCardProps) {

    const displayedAverageWordsPerMinute = Math.round(100*avgWordsPerMinute) / 100

    return (
        <div className="kpi-card">
            <h3 className="kpi-title">Average Words Per Minute</h3>
            <div className="kpi-metrics">
                <span className="kpi-value">{displayedAverageWordsPerMinute}</span>
                <span className="kpi-label">words per minute</span>
            </div>
        </div>
    )
}