import { useQuery } from "@tanstack/react-query";
import * as characterService from "@/infrastructure/api/characters"
import { unwrapResult } from "@/data/types"


export function useCharacter(
    storyId: string, 
    characterName: string, 
    chapterNumber?: number
) {

    const {
        data: characterArc,
        isLoading: characterArcLoading,
        isError: characterArcError,
        isSuccess: characterArcSuccess
    } = useQuery({
        queryKey:  ['stories', storyId, 'characters', characterName, 'arc'],
        queryFn: () => characterService.getCharacterArc(storyId, characterName).then(unwrapResult)
    })


    const {
        data: characterKnowledge,
        isLoading: characterKnowledgeLoading,
        isError: characterKnowledgeError,
        isSuccess: characterKnowledgeSuccess
    } = useQuery({
        queryKey: chapterNumber ? 
            ['stories', storyId, 'characters', characterName, 'knowledge', chapterNumber] : 
            ['stories', storyId, 'characters', characterName, 'knowledge'],
        queryFn: () => characterService.getCharacterKnowledge(storyId, characterName, chapterNumber).then(unwrapResult)
    })

    const {
        data: characterInconsistencies,
        isLoading: characterInconsistenciesLoading,
        isError: characterInconsistenciesError,
        isSuccess: characterInconsistenciesSuccess
    } = useQuery({
        queryKey:  ['stories', storyId, 'characters', characterName, 'inconsistencies'],
        queryFn: () => characterService.getCharacterInconsistencies(storyId, characterName).then(unwrapResult)
    })

    const {
        data: characterGoals,
        isLoading: characterGoalsLoading,
        isError: characterGoalsError,
        isSuccess: characterGoalsSuccess
    } = useQuery({
        queryKey:  ['stories', storyId, 'characters', characterName, 'goals'],
        queryFn: () => characterService.getGoalEvolution(storyId, characterName).then(unwrapResult)
    })

    const {
        data: characterKnowledgeMap,
        isLoading: characterKnowledgeMapLoading,
        isError: characterKnowledgeMapError,
        isSuccess: characterKnowledgeMapSuccess
    } = useQuery({
        queryKey: chapterNumber ? 
            ['stories', storyId, 'characters', characterName, 'knowledge-map', chapterNumber] : 
            ['stories', storyId, 'characters', characterName, 'knowledge-map'],
        queryFn: () => characterService.getKnowledgeAsymmetry(storyId, characterName, chapterNumber).then(unwrapResult)
    })

    return {
        // character arc
        characterArc,
        characterArcLoading,
        characterArcError,
        characterArcSuccess,
        // character knowledge
        characterKnowledge,
        characterKnowledgeLoading,
        characterKnowledgeError,
        characterKnowledgeSuccess,
        // character inconsistencies
        characterInconsistencies,
        characterInconsistenciesLoading,
        characterInconsistenciesError,
        characterInconsistenciesSuccess,
        // character goals
        characterGoals,
        characterGoalsLoading,
        characterGoalsError,
        characterGoalsSuccess,
        // character knowledge map
        characterKnowledgeMap,
        characterKnowledgeMapLoading,
        characterKnowledgeMapError,
        characterKnowledgeMapSuccess,
    }
}



export function useCharacters(storyId: string) {

    const {
        data: characters,
        isLoading: charactersLoading,
        isError: charactersLoadingError,
        isSuccess: charactersLoadingSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'characters'],
        queryFn: () => characterService.getCharacters(storyId).then(unwrapResult)
    })

    const {
        data: characterPresenceMap,
        isLoading: characterPresenceMapLoading,
        isError: characterPresenceMapError,
        isSuccess: characterPresenceMapSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'characters', 'presence-map'],
        queryFn: () => characterService.getCharacterPresenceMap(storyId).then(unwrapResult)
    })

    const {
        data: characterIntroductionRate,
        isLoading: characterIntroductionRateLoading,
        isError: characterIntroductionRateError,
        isSuccess: characterIntroductionRateSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'characters', 'introduction-rate'],
        queryFn: () => characterService.getCharacterIntroductionRate(storyId).then(unwrapResult)
    })

    const {
        data: castDensity,
        isLoading: castDensityLoading,
        isError: castDensityError,
        isSuccess: castDensitySuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'characters', 'density'],
        queryFn: () => characterService.getCastDensity(storyId).then(unwrapResult)
    })

    const {
        data: castReport,
        isLoading: castReportLoading,
        isError: castReportError,
        isSuccess: castReportSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'characters', 'cast-report'],
        queryFn: () => characterService.getCastManagementReport(storyId).then(unwrapResult)
    })

    return {
        // characters
        characters,
        charactersLoading,
        charactersLoadingError,
        charactersLoadingSuccess,
        // character presence map
        characterPresenceMap,
        characterPresenceMapLoading,
        characterPresenceMapError,
        characterPresenceMapSuccess,
        // character introduction rate
        characterIntroductionRate,
        characterIntroductionRateLoading,
        characterIntroductionRateError,
        characterIntroductionRateSuccess,
        // cast density
        castDensity,
        castDensityLoading,
        castDensityError,
        castDensitySuccess,
        // cast Report
        castReport,
        castReportLoading,
        castReportError,
        castReportSuccess
    }

}