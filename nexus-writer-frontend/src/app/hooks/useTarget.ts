import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as targetService from '../services/targetService';
import { CreateTargetRequest, Frequency, UpdateTargetRequest } from "../types";

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
        queryFn: () => targetService.getTarget(storyId, frequency)
    })

    const {
        data: updatedTarget,
        mutate: updateTarget,
        isPending: isUpdating,
        error: updateError,
        isSuccess: updateSuccess
    } = useMutation({
        mutationFn: (variables: { targetId: string, payload: UpdateTargetRequest }) => targetService.updateTarget(storyId, variables.targetId, variables.payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories', storyId, 'targets', frequency]})
    })

    const {
        mutate: deleteTarget,
        isPending: isDeleting,
        error: deleteError,
        isSuccess: deleteSuccess
    } = useMutation({
        mutationFn: (variables: {targetId: string}) => targetService.deleteTarget(storyId, variables.targetId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories', storyId, 'targets', frequency]})
    })

    const {
        data: createdTarget,
        mutate: createTarget,
        isPending: isCreating,
        error: createError,
        isSuccess: createSuccess
    } = useMutation({
        mutationFn: (variables: {payload: CreateTargetRequest}) => targetService.createTarget(storyId, variables.payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories', storyId, 'targets', frequency]})
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