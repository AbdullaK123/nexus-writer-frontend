import { useRouter } from "next/navigation"
import { useChapters } from "./useChapters"
import { useEffect } from "react"


export function useStoryNavigation(storyId: string, latestChapterId: string) {

    const router = useRouter()

    const { 
        create, 
        createdChapter,
        creationSuccess
     } = useChapters(storyId)

    const goToStoryPage = () => {
        router.push(`/stories/${storyId}`)
    }   

    const goToLatestChapter = () => {
        if (latestChapterId) {
            router.push(`/chapters/${storyId}/${latestChapterId}`)
        } else (
             create({
                title: "Double click to change the title...",
                content: ""
            })
        )
    }

    const handlePrefetch = () => {
        if (latestChapterId) {
            router.prefetch(`/chapters/${storyId}/${latestChapterId}`)
        }
    }

    useEffect(() => {
        if (creationSuccess && createdChapter.id) {
            router.push(`/chapters/${storyId}/${createdChapter.id}`)
        }
    }, [router, creationSuccess, createdChapter, storyId])

    const getBtnProps = (status: string) => {
        switch (status) {
            case 'Complete':
                return [
                    { text: 'Read', variant: 'secondary' as const, onClick: undefined, onMouseEnter: undefined },
                    { text: 'Chapters', variant: 'primary' as const, onClick: goToStoryPage, onMouseEnter: undefined},
                    { text: 'Sequel', variant: 'secondary' as const, onClick: undefined, onMouseEnter: undefined },
                    { text: 'Publish', variant: 'secondary' as const, onClick: undefined, onMouseEnter: undefined}
                ]
            case 'On Hiatus':
                return [
                    { text: 'Resume', variant: 'primary' as const, onClick: goToLatestChapter, onMouseEnter: handlePrefetch },
                    { text: 'Outline', variant: 'secondary' as const, onClick: undefined, onMouseEnter: undefined },
                    { text: 'Research', variant: 'secondary' as const, onClick: undefined, onMouseEnter: undefined },
                    { text: 'AI', variant: 'secondary' as const, onClick: undefined, onMouseEnter: undefined }
                ]
            default:
                return [
                    { text: 'Continue', variant: 'primary' as const, onClick: goToLatestChapter, onMouseEnter: handlePrefetch },
                    { text: 'Chapters', variant: 'secondary' as const, onClick: goToStoryPage, onMouseEnter: undefined },
                    { text: 'Settings', variant: 'secondary' as const, onClick: undefined, onMouseEnter: undefined },
                    { text: 'AI', variant: 'secondary' as const, onClick: undefined, onMouseEnter: undefined  }
                ]
        }
    }

    return {
        goToStoryPage,
        goToLatestChapter,
        handlePrefetch,
        getBtnProps
    }
}