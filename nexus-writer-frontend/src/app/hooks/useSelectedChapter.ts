import { useState, useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { ChapterPreviewProps } from "@/app/types"
import { transformChapterResponse } from "../lib/utils"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useSelectedChapter(storyId: string) {
    const [selectedChapter, setSelectedChapter] = useState<ChapterPreviewProps>()
    const [isLoadingChapter, setIsLoadingChapter] = useState(false)
    const queryClient = useQueryClient()

    const selectChapter = useCallback(async (chapterId: string) => {
        setIsLoadingChapter(true)
        try {
            // ✅ Fetch raw snake_case data from API
            const apiResponse = await queryClient.fetchQuery({
                queryKey: ['chapters', chapterId, 'False'],
                queryFn: () => fetch(`${API_URL}/chapters/${chapterId}/?as_html=False`, {
                    credentials: 'include' // Don't forget auth cookies!
                }).then(res => {
                    if (!res.ok) throw new Error('Failed to fetch chapter')
                    return res.json()
                }),
                staleTime: 5 * 60 * 1000
            })

            if (apiResponse) {
                setSelectedChapter({
                    ...transformChapterResponse(apiResponse),
                    onStatusUpdate: () => {},
                    onShowErrorToast: () => {},
                    onShowSuccessToast: () => {}
                })
            }
        } catch (error) {
            console.error('Failed to fetch chapter:', error)
            setSelectedChapter(undefined)
        } finally {
            setIsLoadingChapter(false)
        }
    }, [queryClient])

    return {
        selectedChapter,
        selectChapter,
        isLoadingChapter,
        clearSelection: () => setSelectedChapter(undefined)
    }
}