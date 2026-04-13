import { useQuery } from "@tanstack/react-query";
import * as worldService from "@/infrastructure/api/world";
import { unwrapResult } from "@/data/types"


export function useWorld(storyId: string) {

    const {
        data: contradictions,
        isLoading: contradictionsLoading,
        isError: contradictionsError,
        isSuccess: contradictionsSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'world', 'contradictions'],
        queryFn: () => worldService.getContradictions(storyId).then(unwrapResult)
    })

    const {
        data: factDensity,
        isLoading: factDensityLoading,
        isError: factDensityError,
        isSuccess: factDensitySuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'world', 'fact-density'],
        queryFn: () => worldService.getFactDensity(storyId).then(unwrapResult)
    })

    const {
        data: worldConsistencyReport,
        isLoading: worldConsistencyReportLoading,
        isError: worldConsistencyReportError,
        isSuccess: worldConsistencyReportSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'world', 'report'],
        queryFn: () => worldService.getWorldConsistencyReport(storyId).then(unwrapResult)
    })

    return {
        // contradictions
        contradictions,
        contradictionsLoading,
        contradictionsError,
        contradictionsSuccess,
        // fact density
        factDensity,
        factDensityLoading,
        factDensityError,
        factDensitySuccess,
        // world consistency report
        worldConsistencyReport,
        worldConsistencyReportLoading,
        worldConsistencyReportError,
        worldConsistencyReportSuccess,
    }
}


export function useEntityRegistry(storyId: string, entities?: string[]) {

    const {
        data: entityRegistry,
        isLoading: entityRegistryLoading,
        isError: entityRegistryError,
        isSuccess: entityRegistrySuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'world', 'entities', { entities }],
        queryFn: () => worldService.getEntityRegistry(storyId, entities).then(unwrapResult)
    })

    return {
        entityRegistry,
        entityRegistryLoading,
        entityRegistryError,
        entityRegistrySuccess,
    }
}


export function useEntityTimeline(storyId: string, entity: string) {

    const {
        data: entityTimeline,
        isLoading: entityTimelineLoading,
        isError: entityTimelineError,
        isSuccess: entityTimelineSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'world', 'entities', entity, 'timeline'],
        queryFn: () => worldService.getEntityTimeline(storyId, entity).then(unwrapResult)
    })

    return {
        entityTimeline,
        entityTimelineLoading,
        entityTimelineError,
        entityTimelineSuccess,
    }
}
