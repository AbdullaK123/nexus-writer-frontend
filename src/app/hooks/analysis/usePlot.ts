import { useQuery } from "@tanstack/react-query";
import * as plotService from "@/app/services/plotService";
import { unwrapResult } from "@/app/types"


export function usePlot(storyId: string) {

    const {
        data: plotThreads,
        isLoading: plotThreadsLoading,
        isError: plotThreadsError,
        isSuccess: plotThreadsSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'plot', 'threads'],
        queryFn: () => plotService.getUnresolvedPlotThreads(storyId).then(unwrapResult)
    })

    const {
        data: unansweredQuestions,
        isLoading: unansweredQuestionsLoading,
        isError: unansweredQuestionsError,
        isSuccess: unansweredQuestionsSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'plot', 'questions'],
        queryFn: () => plotService.getUnansweredQuestions(storyId).then(unwrapResult)
    })

    const {
        data: setupsWithNoPayoff,
        isLoading: setupsWithNoPayoffLoading,
        isError: setupsWithNoPayoffError,
        isSuccess: setupsWithNoPayoffSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'plot', 'setups'],
        queryFn: () => plotService.getSetupsWithNoPayoff(storyId).then(unwrapResult)
    })

    const {
        data: deusExMachinas,
        isLoading: deusExMachinasLoading,
        isError: deusExMachinasError,
        isSuccess: deusExMachinasSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'plot', 'deus-ex-machinas'],
        queryFn: () => plotService.getDeusExMachinas(storyId).then(unwrapResult)
    })

    const {
        data: plotReport,
        isLoading: plotReportLoading,
        isError: plotReportError,
        isSuccess: plotReportSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'plot', 'report'],
        queryFn: () => plotService.getPlotReport(storyId).then(unwrapResult)
    })

    const {
        data: eventDensity,
        isLoading: eventDensityLoading,
        isError: eventDensityError,
        isSuccess: eventDensitySuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'plot', 'event-density'],
        queryFn: () => plotService.getEventDensity(storyId).then(unwrapResult)
    })

    const {
        data: setupPayoffMap,
        isLoading: setupPayoffMapLoading,
        isError: setupPayoffMapError,
        isSuccess: setupPayoffMapSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'plot', 'setup-payoff-map'],
        queryFn: () => plotService.getSetupPayoffMap(storyId).then(unwrapResult)
    })

    const {
        data: plotDensity,
        isLoading: plotDensityLoading,
        isError: plotDensityError,
        isSuccess: plotDensitySuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'plot', 'density'],
        queryFn: () => plotService.getPlotDensity(storyId).then(unwrapResult)
    })

    const {
        data: plotRhythmReport,
        isLoading: plotRhythmReportLoading,
        isError: plotRhythmReportError,
        isSuccess: plotRhythmReportSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'plot', 'rhythm-report'],
        queryFn: () => plotService.getPlotRhythmReport(storyId).then(unwrapResult)
    })

    return {
        // plot threads
        plotThreads,
        plotThreadsLoading,
        plotThreadsError,
        plotThreadsSuccess,
        // unanswered questions
        unansweredQuestions,
        unansweredQuestionsLoading,
        unansweredQuestionsError,
        unansweredQuestionsSuccess,
        // setups with no payoff
        setupsWithNoPayoff,
        setupsWithNoPayoffLoading,
        setupsWithNoPayoffError,
        setupsWithNoPayoffSuccess,
        // deus ex machinas
        deusExMachinas,
        deusExMachinasLoading,
        deusExMachinasError,
        deusExMachinasSuccess,
        // plot report
        plotReport,
        plotReportLoading,
        plotReportError,
        plotReportSuccess,
        // event density
        eventDensity,
        eventDensityLoading,
        eventDensityError,
        eventDensitySuccess,
        // setup payoff map
        setupPayoffMap,
        setupPayoffMapLoading,
        setupPayoffMapError,
        setupPayoffMapSuccess,
        // plot density
        plotDensity,
        plotDensityLoading,
        plotDensityError,
        plotDensitySuccess,
        // plot rhythm report
        plotRhythmReport,
        plotRhythmReportLoading,
        plotRhythmReportError,
        plotRhythmReportSuccess,
    }
}


export function usePlotThreadTimeline(storyId: string, threadName: string) {

    const {
        data: threadTimeline,
        isLoading: threadTimelineLoading,
        isError: threadTimelineError,
        isSuccess: threadTimelineSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'plot', 'thread-timeline', threadName],
        queryFn: () => plotService.getThreadTimeline(storyId, threadName).then(unwrapResult)
    })

    return {
        threadTimeline,
        threadTimelineLoading,
        threadTimelineError,
        threadTimelineSuccess,
    }
}


export function useDormantThreads(storyId: string, minGap: number = 3) {

    const {
        data: dormantThreads,
        isLoading: dormantThreadsLoading,
        isError: dormantThreadsError,
        isSuccess: dormantThreadsSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'plot', 'dormant-threads', minGap],
        queryFn: () => plotService.getDormantThreads(storyId, minGap).then(unwrapResult)
    })

    return {
        dormantThreads,
        dormantThreadsLoading,
        dormantThreadsError,
        dormantThreadsSuccess,
    }
}
