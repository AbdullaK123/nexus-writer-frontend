import {DashboardFilterBarProps, Frequency} from "@/app/types";
import styles from "./DashboardFilterBar.module.css";
import {Input} from "@/components/ui/Input";

export default function DashboardFilterBar({
    filter,
    onFilterChange,
}: DashboardFilterBarProps) {
    const formatDateLocal = (date: Date) => {
        const pad = (n: number) => String(n).padStart(2, '0')
        const yyyy = date.getFullYear()
        const mm = pad(date.getMonth() + 1)
        const dd = pad(date.getDate())
        return `${yyyy}-${mm}-${dd}`
    }

    const parseLocalDate = (value: string) => {
        // value is in YYYY-MM-DD; construct a Date in local time
        const [y, m, d] = value.split('-').map(Number)
        return new Date(y, (m as number) - 1, d as number)
    }

    return (
        <div className={styles['filters-container']}>
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
                value={formatDateLocal(filter.fromDate)}
                onChange={(e) => onFilterChange({...filter, fromDate: parseLocalDate(e.target.value)})}
            />
            {/* date picker to select to date */}
            <Input
                type="date"
                value={formatDateLocal(filter.toDate)}
                onChange={(e) => onFilterChange({...filter, toDate: parseLocalDate(e.target.value)})}
            />
        </div>
    )
}