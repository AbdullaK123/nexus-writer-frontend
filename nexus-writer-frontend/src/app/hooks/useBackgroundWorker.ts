import { useQuery, useMutation } from "@tanstack/react-query";
import * as jobService from "../services/jobService";
import { useToast } from "./useToast";


export const useJobStatus = (jobId: string) => useQuery({
    queryKey: ['jobs', jobId],
    queryFn: () => jobService.getJobStatus(jobId),
    refetchInterval: (query) => {
        const status = query.state.data?.status
        return status === "success" || status === "failure" ? false : 2000
    },
    refetchIntervalInBackground: true
})

export const useBackgroundJobs = () => {

    const { showToast } = useToast()

    const queueLineEditJobMutation = useMutation({
        mutationFn: ({ chapterId, force = false }: { chapterId: string, force?: boolean }) => jobService.queueLineEditJob(chapterId, force),
        onError: () => {
            showToast("Failed to queue line edit job. The server might be experiencing issues.", "error")
        },
        onSuccess: (data) => {
            showToast(`Started ${data.jobName}`, "info")
        }
    })

    const queueExtractionJobMutation = useMutation({
        mutationFn: ({ chapterId, force = false }: { chapterId: string, force?: boolean }) => jobService.queueExtractionJob(chapterId, force),
        onError: () => {
            showToast("Failed to start background line edits. The server might be experiencing issues.", "error")
        },
        onSuccess: (data) => {
            showToast(`Started ${data.jobName}`, "info")
        }
    })

    return {
        queueBackgroundEdits: queueLineEditJobMutation,
        queueExtraction: queueExtractionJobMutation
    }
    
}