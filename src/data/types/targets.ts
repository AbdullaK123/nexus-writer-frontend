export type {
    Frequency,
    TargetResponse,
} from "@/compatability/transformers/story";

export type CreateTargetRequest = {
    quota: number;
    frequency: "Daily" | "Weekly" | "Monthly";
    from_date: string;
    to_date: string;
}

export type UpdateTargetRequest = {
    quota?: number;
    frequency?: "Daily" | "Weekly" | "Monthly";
    from_date?: string;
    to_date?: string;
}
