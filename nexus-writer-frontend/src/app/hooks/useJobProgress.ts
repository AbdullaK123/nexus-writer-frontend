import { useState, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import * as jobService from "@/app/services/jobService"
import { JobStatusResponse } from "../types/jobs"


export const useJobProgress = (jobId: string | null | undefined) => {

    const [progressPercent, setProgressPercent] = useState(0)
    const [statusMessage, setStatusMessage] = useState("")

    const { data: jobStatus } = useQuery<JobStatusResponse>({
        queryKey: ['jobs', jobId],
        enabled: false, 
    })

    useEffect(() => {
        if (!jobStatus) return

        setProgressPercent(jobStatus.progress?.percent ?? 0)

        // Update status message (simplified)
        if (jobStatus.message) {
            setStatusMessage(jobStatus.message)
        } else {
            switch (jobStatus.status) {
                case "queued":
                    setStatusMessage("Queued...")
                    break
                case "progress":
                    setStatusMessage("Processing...")
                    break
                case "success":
                    setStatusMessage("Complete!")
                    setProgressPercent(100)
                    break
                case "failure":
                    setStatusMessage(`Failed: ${jobStatus.error || "Unknown error"}`)
                    break
                default:
                    setStatusMessage("Pending...")
            }
        }
    }, [jobStatus])

    return {
        jobStatus,
        progressPercent,
        statusMessage,
        isComplete: jobStatus?.isTerminal ?? false,
        isRunning: jobStatus?.isRunning ?? false
    }
}