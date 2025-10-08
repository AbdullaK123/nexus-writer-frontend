import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as targetService from '../services/targetService';

export function useAllTargets(storyId?: string) {
    const queryClient = useQueryClient();

    const {
        data: targets,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['stories', storyId, 'targets', 'all'],
        queryFn: () => targetService.getAllTargets(storyId!),
        enabled: !!storyId,
    });

    const invalidateTargets = () => {
        if (storyId) {
            queryClient.invalidateQueries({ queryKey: ['stories', storyId, 'targets'] });
        }
    };

    return {
        targets: targets || [],
        isLoading,
        isError,
        error,
        invalidateTargets
    };
}
