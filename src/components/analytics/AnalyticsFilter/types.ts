import { Frequency } from "@/data/types/targets";

export type DashboardFilter = {
    frequency: Frequency;
    fromDate: Date;
    toDate: Date;
}

export type DashboardFilterBarProps = {
    filter: DashboardFilter;
    onFilterChange: (filter: DashboardFilter) => void;
}
