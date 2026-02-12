'use client'
import { useToast } from "@/app/hooks/useToast";
import { QueuedJob } from "@/app/types/jobs";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import * as jobService from "@/app/services/jobService"
import { useEffect } from "react";
import { differenceInMinutes } from "date-fns";



export default function JobStatusWatcher() {


    const queryClient = useQueryClient()
    const { showToast } = useToast()

    const { data: activeJobs = [] } = useQuery({
        queryKey: ['active-jobs'],
        queryFn: () => queryClient.getQueryData<QueuedJob[]>(['active-jobs']) || [],
        // Re-check frequently for new jobs
        refetchInterval: 1000,
    })

    const jobQueries = useQueries({
        queries: activeJobs.map(job => ({
            queryKey: ['jobs', job.jobId],
            queryFn: () => jobService.getJobStatus(job.jobId),
            refetchInterval: (query: any) => {
                const status = query.state.data?.status
                return status === "success" || status === "failure" ? false : 200
            },
            refetchIntervalInBackground: true
        }))
    })

    const removeJob = (jobId: string) => {
        const currentJobs = queryClient.getQueryData<QueuedJob[]>(['active-jobs']) || []
        queryClient.setQueryData(['active-jobs'], currentJobs?.filter(job => job.jobId !== jobId))
    }

    useEffect(() => {
        jobQueries.forEach((query, idx) => {
            const activeJob = activeJobs[idx]
            const activeJobStatus = query.data?.status
            const activeJobStartedAt = activeJob.startedAt
            const activeJobEndedAt = query.data?.completedAt
            const timeElapsed = activeJobEndedAt ? differenceInMinutes(activeJobEndedAt, activeJobStartedAt).toFixed(2) : 0

            if (activeJobStatus === "success" || activeJobStatus === "failure") {
                const message = (activeJobStatus === "success") 
                    ? `${activeJob.jobName} finished! Processing time: ${timeElapsed} minutes`
                    : `${activeJob.jobName} failed! Error: ${query.data?.error}`
                
                if (activeJobStatus === "success") {
                    showToast(message, "success")
                    removeJob(activeJob.jobId)
                } else if (activeJobStatus === "failure") {
                    showToast(message, "error")
                    removeJob(activeJob.jobId)
                }
            }
        })

    }, [jobQueries.map(q => q.data?.status).join(",")])


    return null
}