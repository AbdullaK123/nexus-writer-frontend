import DashboardToolbar from "@/components/ui/DashboardToolbar/DashboardToolbar"
import { StoryCreateRequest } from "@/app/types/stories"


export default function Dashboard() {
    return (
        <div>
            <DashboardToolbar
                username="placeholder"
                handleCreateStory={(story : StoryCreateRequest) => {}}
                handleLayoutChange={() => {}}
            />
        </div>
    )
}