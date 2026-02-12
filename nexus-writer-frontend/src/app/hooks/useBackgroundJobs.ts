import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import * as jobService from "../services/jobService";
import { useToast } from "./useToast";
import { QueuedJob } from "../types/jobs";

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
        mutationFn: ({ chapterId, force = false }: { chapterId: string, force?: boolean }) => jobService.queueLineEditJob(chapterId, force),
        onError: (error) => {
             showToast(`Failed to start line edit job job: ${error.message}`, "error")
        },
        onSuccess: (data) => {
            addJobToCache(queryClient, data.jobId, data.jobName, data.chapterId, "line-edit")
            showToast(`Started ${data.jobName}`, "info")
        }
    })

    const queueExtractionJobMutation = useMutation({
        mutationFn: ({ chapterId, force = false }: { chapterId: string, force?: boolean }) => jobService.queueExtractionJob(chapterId, force),
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