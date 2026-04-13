type TotalDurationKpiCard = {
    duration: number;
}

export default function TotalDurationKpiCard({
    duration
}: TotalDurationKpiCard) {

    const displayedDuration = Math.round(100*duration)/100

    return (
        <div className="kpi-card">
            <h3 className="kpi-title">Total Duration</h3>
            <div className="kpi-metrics">
                <span className="kpi-value">{displayedDuration}</span>
                <span className="kpi-label">minutes</span>
            </div>
        </div>
    )
}