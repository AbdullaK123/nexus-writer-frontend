import { useEffect } from "react";
import { useJobCache } from "./useJobCache";
import { useJobProgress } from "./useJobProgress";
import { useQueryClient } from "@tanstack/react-query";


export function useChapterJobs(chapterId: string) {
    const activeJobs = useJobCache()
    const queryClient = useQueryClient()

    const chapterJobs = activeJobs.filter((job) => job.chapterId === chapterId)
    const isExtracting = chapterJobs.some((job) => job.jobType === "extraction")
    const isEditing = chapterJobs.some((job) => job.jobType === "line-edit")

    const activeEditJob = chapterJobs.find((job) => job.jobType === "line-edit")
    const activeEditJobStatus = useJobProgress(activeEditJob?.jobId)

    useEffect(() => {
        if (activeEditJobStatus?.isComplete) {
            queryClient.invalidateQueries({ queryKey: ['chapters', 'edits', chapterId]})
        }
    }, [activeEditJobStatus, queryClient, chapterId])

    return {
        chapterJobs,
        isExtracting,
        isEditing,
        hasActiveJobs: chapterJobs.length > 0
    }
}