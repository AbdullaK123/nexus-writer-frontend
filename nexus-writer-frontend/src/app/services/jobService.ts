import { ApiJobQueuedResponse, ApiJobStatusResponse } from "@/app/types";
import { JobQueuedResponse, JobStatusResponse } from "../types/jobs";
import fetchApi from "./api";

const transformJobStatusResponse = (apiResponse: ApiJobStatusResponse) : JobStatusResponse => {
    return {
        jobId: apiResponse.job_id,
        status: apiResponse.status
    }
}

const transformJobQueuedResponse = (apiResponse: ApiJobQueuedResponse) : JobQueuedResponse => {
    return {
        jobId: apiResponse.job_id,
        jobName: apiResponse.job_name,
        startedAt: new Date(apiResponse.started_at),
        status: apiResponse.status
    }
}


export const getJobStatus = async (jobId: string) : Promise<JobStatusResponse> => {
    const data: ApiJobStatusResponse = await fetchApi(`/jobs/status/${jobId}`)
    return transformJobStatusResponse(data)
}

export const queueLineEditJob = async (chapterId: string, force: boolean): Promise<JobQueuedResponse> => {
    let url = `/jobs/line-edits/${chapterId}`
    if (force) {
        url += '?force=True'
    }
    const data: ApiJobQueuedResponse = await fetchApi(url, {
        method: "POST"
    })
    return transformJobQueuedResponse(data)
}

export const queueExtractionJob = async (chapterId: string, force: boolean): Promise<JobQueuedResponse> => {
    let url = `/jobs/extraction/${chapterId}`
    if (force) {
        url += '?force=True'
    }
    const data: ApiJobQueuedResponse = await fetchApi(url, {
        method: "POST"
    })
    return transformJobQueuedResponse(data)
}