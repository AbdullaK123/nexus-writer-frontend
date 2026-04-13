import { useQuery } from "@tanstack/react-query";
import * as structureService from "@/infrastructure/api/structure";
import { unwrapResult } from "@/data/types"


export function useStructure(storyId: string) {

    const {
        data: weakScenes,
        isLoading: weakScenesLoading,
        isError: weakScenesError,
        isSuccess: weakScenesSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'scenes', 'weak'],
        queryFn: () => structureService.getWeakScenes(storyId).then(unwrapResult)
    })

    const {
        data: sceneTypeDistribution,
        isLoading: sceneTypeDistributionLoading,
        isError: sceneTypeDistributionError,
        isSuccess: sceneTypeDistributionSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'scenes', 'distribution'],
        queryFn: () => structureService.getSceneTypeDistribution(storyId).then(unwrapResult)
    })

    const {
        data: povBalance,
        isLoading: povBalanceLoading,
        isError: povBalanceError,
        isSuccess: povBalanceSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'pov-balance'],
        queryFn: () => structureService.getPOVBalance(storyId).then(unwrapResult)
    })

    const {
        data: pacingCurve,
        isLoading: pacingCurveLoading,
        isError: pacingCurveError,
        isSuccess: pacingCurveSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'pacing'],
        queryFn: () => structureService.getPacingCurve(storyId).then(unwrapResult)
    })

    const {
        data: structuralArc,
        isLoading: structuralArcLoading,
        isError: structuralArcError,
        isSuccess: structuralArcSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'arc'],
        queryFn: () => structureService.getStructuralArc(storyId).then(unwrapResult)
    })

    const {
        data: themeDistribution,
        isLoading: themeDistributionLoading,
        isError: themeDistributionError,
        isSuccess: themeDistributionSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'themes'],
        queryFn: () => structureService.getThemeDistribution(storyId).then(unwrapResult)
    })

    const {
        data: emotionalBeats,
        isLoading: emotionalBeatsLoading,
        isError: emotionalBeatsError,
        isSuccess: emotionalBeatsSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'emotional-beats'],
        queryFn: () => structureService.getEmotionalBeats(storyId).then(unwrapResult)
    })

    const {
        data: developmentalReport,
        isLoading: developmentalReportLoading,
        isError: developmentalReportError,
        isSuccess: developmentalReportSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'report'],
        queryFn: () => structureService.getDevelopmentalReport(storyId).then(unwrapResult)
    })

    return {
        // weak scenes
        weakScenes,
        weakScenesLoading,
        weakScenesError,
        weakScenesSuccess,
        // scene type distribution
        sceneTypeDistribution,
        sceneTypeDistributionLoading,
        sceneTypeDistributionError,
        sceneTypeDistributionSuccess,
        // pov balance
        povBalance,
        povBalanceLoading,
        povBalanceError,
        povBalanceSuccess,
        // pacing curve
        pacingCurve,
        pacingCurveLoading,
        pacingCurveError,
        pacingCurveSuccess,
        // structural arc
        structuralArc,
        structuralArcLoading,
        structuralArcError,
        structuralArcSuccess,
        // theme distribution
        themeDistribution,
        themeDistributionLoading,
        themeDistributionError,
        themeDistributionSuccess,
        // emotional beats
        emotionalBeats,
        emotionalBeatsLoading,
        emotionalBeatsError,
        emotionalBeatsSuccess,
        // developmental report
        developmentalReport,
        developmentalReportLoading,
        developmentalReportError,
        developmentalReportSuccess,
    }
}


export function useSceneIndex(
    storyId: string,
    sceneType?: string,
    pov?: string,
    location?: string
) {

    const {
        data: sceneIndex,
        isLoading: sceneIndexLoading,
        isError: sceneIndexError,
        isSuccess: sceneIndexSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'scenes', { sceneType, pov, location }],
        queryFn: () => structureService.getSceneIndex(storyId, sceneType, pov, location).then(unwrapResult)
    })

    return {
        sceneIndex,
        sceneIndexLoading,
        sceneIndexError,
        sceneIndexSuccess,
    }
}
