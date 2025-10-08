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

    const applyPreset = (days: number) => {
        const today = new Date()
        const fromDate = new Date(today)
        fromDate.setDate(today.getDate() - days)
        onFilterChange({
            ...filter,
            fromDate,
            toDate: new Date()
        })
    }

    return (
        <div className={styles['filters-wrapper']}>
            <div className={styles['filters-header']}>
                <h3 className={styles['filters-title']}>📊 Filter Analytics</h3>
            </div>
            <div className={styles['filters-content']}>
                <div className={styles['filter-group']}>
                    <label className={styles['filter-label']}>Frequency</label>
                    <select
                        className={styles['filter-select']}
                        value={filter.frequency}
                        onChange={(e) => onFilterChange({...filter, frequency: e.target.value as Frequency})}
                    >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>
                <div className={styles['filter-group']}>
                    <label className={styles['filter-label']}>From Date</label>
                    <Input
                        type="date"
                        value={formatDateLocal(filter.fromDate)}
                        onChange={(e) => onFilterChange({...filter, fromDate: parseLocalDate(e.target.value)})}
                    />
                </div>
                <div className={styles['filter-group']}>
                    <label className={styles['filter-label']}>To Date</label>
                    <Input
                        type="date"
                        value={formatDateLocal(filter.toDate)}
                        onChange={(e) => onFilterChange({...filter, toDate: parseLocalDate(e.target.value)})}
                    />
                </div>
            </div>
            <div className={styles['filter-presets']}>
                <span className={styles['presets-label']}>Quick Filters:</span>
                <button 
                    className={styles['preset-button']}
                    onClick={() => applyPreset(7)}
                >
                    Last 7 days
                </button>
                <button 
                    className={styles['preset-button']}
                    onClick={() => applyPreset(30)}
                >
                    Last 30 days
                </button>
                <button 
                    className={styles['preset-button']}
                    onClick={() => applyPreset(90)}
                >
                    Last 90 days
                </button>
            </div>
        </div>
    )
}