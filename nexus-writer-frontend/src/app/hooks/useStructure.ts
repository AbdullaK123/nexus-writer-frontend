import { useQuery } from "@tanstack/react-query";
import * as structureService from "../services/structureService";


export function useStructure(storyId: string) {

    const {
        data: weakScenes,
        isLoading: weakScenesLoading,
        isError: weakScenesError,
        isSuccess: weakScenesSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'scenes', 'weak'],
        queryFn: () => structureService.getWeakScenes(storyId)
    })

    const {
        data: sceneTypeDistribution,
        isLoading: sceneTypeDistributionLoading,
        isError: sceneTypeDistributionError,
        isSuccess: sceneTypeDistributionSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'scenes', 'distribution'],
        queryFn: () => structureService.getSceneTypeDistribution(storyId)
    })

    const {
        data: povBalance,
        isLoading: povBalanceLoading,
        isError: povBalanceError,
        isSuccess: povBalanceSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'pov-balance'],
        queryFn: () => structureService.getPOVBalance(storyId)
    })

    const {
        data: pacingCurve,
        isLoading: pacingCurveLoading,
        isError: pacingCurveError,
        isSuccess: pacingCurveSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'pacing'],
        queryFn: () => structureService.getPacingCurve(storyId)
    })

    const {
        data: structuralArc,
        isLoading: structuralArcLoading,
        isError: structuralArcError,
        isSuccess: structuralArcSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'arc'],
        queryFn: () => structureService.getStructuralArc(storyId)
    })

    const {
        data: themeDistribution,
        isLoading: themeDistributionLoading,
        isError: themeDistributionError,
        isSuccess: themeDistributionSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'themes'],
        queryFn: () => structureService.getThemeDistribution(storyId)
    })

    const {
        data: emotionalBeats,
        isLoading: emotionalBeatsLoading,
        isError: emotionalBeatsError,
        isSuccess: emotionalBeatsSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'emotional-beats'],
        queryFn: () => structureService.getEmotionalBeats(storyId)
    })

    const {
        data: developmentalReport,
        isLoading: developmentalReportLoading,
        isError: developmentalReportError,
        isSuccess: developmentalReportSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'structure', 'report'],
        queryFn: () => structureService.getDevelopmentalReport(storyId)
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
        queryFn: () => structureService.getSceneIndex(storyId, sceneType, pov, location)
    })

    return {
        sceneIndex,
        sceneIndexLoading,
        sceneIndexError,
        sceneIndexSuccess,
    }
}
