'use client'
import DashboardToolbar from "@/components/ui/DashboardToolbar/DashboardToolbar"
import { StoryCreateRequest } from "@/app/types/stories"
import styles from '@/app/(app)/AppLayout.module.css'

export default function Dashboard() {
    return (
        <>
            <DashboardToolbar
                username="placeholder"
                onCreateStory={(story : StoryCreateRequest) => {}}
                onLayoutChange={() => {}}
            />
        </>
    )
}