import { ApiTargetResponse, CreateTargetRequest, Frequency, TargetResponse, UpdateTargetRequest, Result, ApiError, mapResult, Ok } from "../types";
import fetchApi from "./api";
import {transformTarget} from "@/app/lib/utils";

// get a target for a story by frequency
export const getTarget = async (storyId: string, frequency: Frequency): Promise<Result<TargetResponse | null, ApiError>> => {
    const result = await fetchApi<ApiTargetResponse>(`/stories/${storyId}/targets?frequency=${frequency}`);
    if (result._tag === "Err") {
        if (result.error.status === 404) return Ok(null);
        return result;
    }
    return Ok(result.value ? transformTarget(result.value) : null);
}

// get all targets for a story
export const getAllTargets = async (storyId: string): Promise<Result<TargetResponse[], ApiError>> => {
    const result = await fetchApi<ApiTargetResponse[] | ApiTargetResponse>(`/stories/${storyId}/targets`);
    if (result._tag === "Err") return Ok([]);
    const data = result.value;
    if (!data) return Ok([]);
    if (Array.isArray(data)) return Ok(data.map(transformTarget));
    if (typeof data === 'object') return Ok([transformTarget(data)]);
    return Ok([]);
}

// update a target
export const updateTarget = (storyId: string, targetId: string, payload: UpdateTargetRequest): Promise<Result<void, ApiError>> => {
    return fetchApi(`/stories/${storyId}/targets/${targetId}`, {
        method: "PUT",
        body: JSON.stringify(payload)
    });
}

// delete a target
export const deleteTarget = (storyId: string, targetId: string): Promise<Result<void, ApiError>> => {
    return fetchApi(`/stories/${storyId}/targets/${targetId}`, {
        method: "DELETE"
    })
}

// create a target for a story
export const createTarget = (storyId: string, payload: CreateTargetRequest): Promise<Result<void, ApiError>> => {
    return fetchApi(`/stories/${storyId}/targets`, {
        method: "POST",
        body: JSON.stringify(payload)
    });
}