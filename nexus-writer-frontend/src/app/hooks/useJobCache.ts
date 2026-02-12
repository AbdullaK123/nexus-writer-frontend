import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueuedJob } from "../types/jobs";


export function useJobCache() {

    const queryClient = useQueryClient()

    const {data: activeJobs = []} = useQuery({
        queryKey: ['active-jobs'],
        queryFn: () => queryClient.getQueryData<QueuedJob[]>(['active-jobs']) || [],
        // Re-check frequently for new jobs
        refetchInterval: 1000,
    })

    return activeJobs
}