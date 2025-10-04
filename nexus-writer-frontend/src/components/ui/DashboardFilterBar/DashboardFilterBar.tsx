import {DashboardFilterBarProps, Frequency} from "@/app/types";
import styles from "./DashboardFilterBar.module.css";
import {Input} from "@/components/ui/Input";

export default function DashboardFilterBar({
    filter,
    onFilterChange,
}: DashboardFilterBarProps) {
    return (
        <div className={styles.filtersContainer}>
            {/* Drop down to select frequency */}
            <select
                value={filter.frequency}
                onChange={(e) => onFilterChange({...filter, frequency: e.target.value as Frequency})}
            >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
            </select>
            {/* date picker to select from date */}
            <Input
                type="date"
                value={filter.fromDate.toISOString().split('T')[0]}
                onChange={(e) => onFilterChange({...filter, fromDate: new Date(e.target.value)})}
            />
            {/* date picker to select to date */}
            <Input
                type="date"
                value={filter.toDate.toISOString().split('T')[0]}
                onChange={(e) => onFilterChange({...filter, toDate: new Date(e.target.value)})}
            />
        </div>
    )
}