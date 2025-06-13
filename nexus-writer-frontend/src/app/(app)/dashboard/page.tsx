'use client'
import DashboardToolbar from "@/components/ui/DashboardToolbar/DashboardToolbar"
import { StoryCreateRequest } from "@/app/types/stories"
import styles from '@/app/(app)/AppLayout.module.css'

export default function Dashboard() {
    return (
        <div className={styles['flex-col-container']}>
            <h1>This is content</h1>
        </div>
    )
}