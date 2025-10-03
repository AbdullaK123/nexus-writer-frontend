import { CreateTargetRequest, Frequency, TargetResponse, UpdateTargetRequest } from "../types";
import fetchApi from "./api";
import {transformTarget} from "@/app/lib/utils";

// transformation helper


// get a target for a story
export const getTarget = async (storyId: string, frequency: Frequency) : Promise<TargetResponse | null> => {
    const target = await fetchApi(`/stories/${storyId}/targets?frequency=${frequency}`);
    return target ? transformTarget(target) : null
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