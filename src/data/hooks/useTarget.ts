import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as targetService from '@/infrastructure/api/targets';
import { CreateTargetRequest, Frequency, UpdateTargetRequest, unwrapResult } from "@/data/types";

export function useTarget(storyId: string, frequency: Frequency) {

    const queryClient = useQueryClient();

    // get targets
    const {
        data: target,
        isLoading,
        isError,
        isSuccess
    } = useQuery({
        queryKey: ['stories', storyId, 'targets', frequency],
        queryFn: () => targetService.getTarget(storyId, frequency).then(unwrapResult)
    })

    const {
        data: updatedTarget,
        mutate: updateTarget,
        isPending: isUpdating,
        error: updateError,
        isSuccess: updateSuccess
    } = useMutation({
        mutationFn: (variables: { targetId: string, payload: UpdateTargetRequest }) => targetService.updateTarget(storyId, variables.targetId, variables.payload).then(unwrapResult),
        onSuccess: () => {
            // Invalidate all target queries for this story
            queryClient.invalidateQueries({ queryKey: ['stories', storyId, 'targets']})
            // Invalidate the stories list with targets
            queryClient.invalidateQueries({ queryKey: ['stories', 'targets']})
            queryClient.invalidateQueries({ queryKey: ['stories', storyId, 'analytics']})
        }
    })

    const {
        mutate: deleteTarget,
        isPending: isDeleting,
        error: deleteError,
        isSuccess: deleteSuccess
    } = useMutation({
        mutationFn: (variables: {targetId: string}) => targetService.deleteTarget(storyId, variables.targetId).then(unwrapResult),
        onSuccess: () => {
            // Invalidate all target queries for this story
            queryClient.invalidateQueries({ queryKey: ['stories', storyId, 'targets']})
            // Invalidate the stories list with targets
            queryClient.invalidateQueries({ queryKey: ['stories', 'targets']})
            queryClient.invalidateQueries({ queryKey: ['stories', storyId, 'analytics']})
        }
    })

    const {
        data: createdTarget,
        mutate: createTarget,
        isPending: isCreating,
        error: createError,
        isSuccess: createSuccess
    } = useMutation({
        mutationFn: (variables: {payload: CreateTargetRequest}) => targetService.createTarget(storyId, variables.payload).then(unwrapResult),
        onSuccess: () => {
            // Invalidate all target queries for this story
            queryClient.invalidateQueries({ queryKey: ['stories', storyId, 'targets']})
            // Invalidate the stories list with targets
            queryClient.invalidateQueries({ queryKey: ['stories', 'targets']})
            queryClient.invalidateQueries({ queryKey: ['stories', storyId, 'analytics']})
        }
    })

    return {
        target,
        isLoading,
        isError,
        isSuccess,
        createdTarget,
        createTarget,
        isCreating,
        createError,
        createSuccess,
        updatedTarget,
        updateTarget,
        isUpdating,
        updateError,
        updateSuccess,
        deleteTarget,
        isDeleting,
        deleteError,
        deleteSuccess
    }

}