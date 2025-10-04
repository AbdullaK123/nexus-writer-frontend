

const getDurationString = (duration: number) : string => {
    if (duration < 60) {
        return `${duration} seconds`
    }
    if (duration < 3600) {
        return `${Math.floor(duration / 60)} minutes`
    }
    return `${Math.floor(duration / 3600)} hours`
}

export default function TotalDurationCard({
    totalDuration
}: {totalDuration: number}) {
    return (
        <div>
            <h2>Total Duration</h2>
            <p>{getDurationString(totalDuration)}</p>
        </div>
    )
}