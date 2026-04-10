export type Frequency = "Daily" | "Weekly" | "Monthly";

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

export type TargetResponse = {
    quota: number;
    frequency: Frequency;
    fromDate: Date;
    toDate: Date;
    storyId: string;
    targetId: string;
}
