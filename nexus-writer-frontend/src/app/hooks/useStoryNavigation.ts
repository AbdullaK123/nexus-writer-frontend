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
                    { text: 'Read', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined },
                    { text: 'Chapters', css: 'btn-primary', onClick: goToStoryPage, onMouseEnter: undefined},
                    { text: 'Sequel', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined },
                    { text: 'Publish', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined}
                ]
            case 'On Hiatus':
                return [
                    { text: 'Resume', css: 'btn-primary', onClick: goToLatestChapter, onMouseEnter: handlePrefetch },
                    { text: 'Outline', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined },
                    { text: 'Research', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined },
                    { text: 'AI', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined }
                ]
            default:
                return [
                    { text: 'Continue', css: 'btn-primary', onClick: goToLatestChapter, onMouseEnter: handlePrefetch },
                    { text: 'Chapters', css: 'btn-secondary', onClick: goToStoryPage, onMouseEnter: undefined },
                    { text: 'Settings', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined },
                    { text: 'AI', css: 'btn-secondary', onClick: undefined, onMouseEnter: undefined  }
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