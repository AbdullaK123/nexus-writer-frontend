import { useQueries } from "@tanstack/react-query"
import * as jobService from "@/infrastructure/api/jobs"
import { unwrapResult } from "@/data/types"

export const useJobStatus = (jobIds: string[]) => useQueries({
    queries: jobIds.map((jobId) => ({
        queryKey: ['jobs', jobId],
        queryFn: () => jobService.getJobStatus(jobId).then(unwrapResult),
        refetchInterval: (query) => {
            const status = query.state.data?.status
            return status === "success" || status === "failure" ? false : 2000
        },
        refetchIntervalInBackground: true
    }))
})