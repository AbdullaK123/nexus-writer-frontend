import { CreateTargetRequest, Frequency, TargetResponse, UpdateTargetRequest } from "../types";
import fetchApi from "./api";
import {transformTarget} from "@/app/lib/utils";

// transformation helper


// get a target for a story by frequency
export const getTarget = async (storyId: string, frequency: Frequency) : Promise<TargetResponse | null> => {
    const target = await fetchApi(`/stories/${storyId}/targets?frequency=${frequency}`);
    return target ? transformTarget(target) : null
}

// get all targets for a story
export const getAllTargets = async (storyId: string): Promise<TargetResponse[]> => {
    try {
        const targets = await fetchApi(`/stories/${storyId}/targets`);
        
        // Handle different response types
        if (!targets) return [];
        if (Array.isArray(targets)) {
            return targets.map(transformTarget);
        }
        // If single target returned, wrap in array
        if (targets && typeof targets === 'object') {
            return [transformTarget(targets)];
        }
        return [];
    } catch (error) {
        console.error('Failed to fetch targets:', error);
        return [];
    }
}

// update a target
export const updateTarget = (storyId: string, targetId: string, payload: UpdateTargetRequest) => {
    return fetchApi(`/stories/${storyId}/targets/${targetId}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
}

// delete a target
export const deleteTarget = (storyId: string, targetId: string) => {
    return fetchApi(`/stories/${storyId}/targets/${targetId}`, {
        method: "DELETE"
    })
}

// create a target for a story
export const createTarget = (storyId: string, payload: CreateTargetRequest) => {
    return fetchApi(`/stories/${storyId}/targets`, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}