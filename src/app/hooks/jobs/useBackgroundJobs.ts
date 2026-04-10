import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import * as jobService from "@/app/services/jobService";
import { useToast } from "@/app/hooks/common/useToast";
import { QueuedJob } from "@/app/types/jobs";

type JobType = "extraction" | "line-edit"

function addJobToCache(queryClient: QueryClient, jobId: string, jobName: string, chapterId: string, jobType: JobType) {
    const currentJobs: QueuedJob[] = queryClient.getQueryData<QueuedJob[]>(['active-jobs']);
    const newJob: QueuedJob = {
        jobId: jobId,
        chapterId: chapterId,
        jobName: jobName,
        jobType: jobType,
        startedAt: new Date()
    }
    queryClient.setQueryData(
        ['active-jobs'],
        [
            ...currentJobs,
            newJob
        ]
    )
}


export const useBackgroundJobs = () => {

    const { showToast } = useToast()
    const queryClient = useQueryClient()

    const queueLineEditJobMutation = useMutation({
        mutationFn: ({ chapterId }: { chapterId: string }) => jobService.queueLineEditJob(chapterId),
        onError: (error) => {
             showToast(`Failed to start line edit job job: ${error.message}`, "error")
        },
        onSuccess: (data) => {
            addJobToCache(queryClient, data.jobId, data.jobName, data.chapterId, "line-edit")
            showToast(`Started ${data.jobName}`, "info")
        }
    })

    const queueExtractionJobMutation = useMutation({
        mutationFn: ({ chapterId }: { chapterId: string }) => jobService.queueExtractionJob(chapterId),
        onError: (error) => {
            showToast(`Failed to start extraction job: ${error.message}`, "error")
        },
        onSuccess: (data) => {
            addJobToCache(queryClient, data.jobId, data.jobName, data.chapterId, "extraction")
            showToast(`Started ${data.jobName}`, "info")
        }
    })

    return {
        queueBackgroundEdits: queueLineEditJobMutation,
        queueExtraction: queueExtractionJobMutation
    }
    
}