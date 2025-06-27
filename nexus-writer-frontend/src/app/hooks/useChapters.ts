import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
    ApiChapterListItem, 
    CreateChapterRequest,
    ApiChapterListResponse,
    ApiChapterContentResponse,
    UpdateMutationArgs
} from '../types/interfaces'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

export function useChapters(storyId: string) {

    const queryClient = useQueryClient()

    // get query
    const {
         data: chapters, 
         isLoading, 
         isError, 
         isSuccess
    } = useQuery({
        queryKey: ['chapters'],
        queryFn:  () => fetch(`${API_URL}/${storyId}/chapters`, {
            'credentials': 'include'
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to fetch chapters.')
            return res.json()
        }).then((data: ApiChapterListResponse) => {
            const rawChapterListItems = data.chapters
            const transformedChapterListItems = rawChapterListItems?.map((item: ApiChapterListItem) => {
                return {
                    ...item,
                    wordCount: item.word_count,
                    updatedAt: new Date(item.updated_at + 'Z')
                }
            }) || []
            return {
                storyId: storyId,
                storyTitle: data.story_title,
                storyStatus: data.story_status,
                chapters: transformedChapterListItems
            }
        })
    })

    const getChapter = (chapterId: string) => useQuery({
        queryKey: ['chapters', chapterId],
        queryFn: () => fetch(`${API_URL}/chapters/${chapterId}`, {
            credentials: 'include'
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to create new chapter.')
            return res.json()
        }).then((data: ApiChapterContentResponse) => {
            const transformedChapter = {
                id: data.id,
                title: data.title,
                content: data.content,
                storyId: data.story_id,
                storyTitle: data.story_title,
                createdAt: new Date(data.created_at + 'Z'),
                updatedAt: new Date(data.updated_at + 'Z'),
                previousChapterId: data.previous_chapter_id,
                nextChapterId: data.next_chapter_id
            }
            return transformedChapter
        })
    })

    // create mutation
    const createMutation = useMutation({
        mutationFn: (chapterInfo: CreateChapterRequest) => fetch(`${API_URL}/${storyId}/chapters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(chapterInfo)
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to create new chapter.')
            return res.json()
        }).then((data: ApiChapterContentResponse) => {
            const transformedChapter = {
                id: data.id,
                title: data.title,
                content: data.content,
                storyId: data.story_id,
                storyTitle: data.story_title,
                createdAt: new Date(data.created_at + 'Z'),
                updatedAt: new Date(data.updated_at + 'Z'),
                previousChapterId: data.previous_chapter_id,
                nextChapterId: data.next_chapter_id
            }
            return transformedChapter
        }),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['chapters']})
    })

    // update mutation
    const updateMutation = useMutation({
        mutationFn: ({ chapterId, requestBody }: UpdateMutationArgs) => fetch(`${API_URL}/chapters/${chapterId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to update chapter')
            return res.json()
        }).then((data: ApiChapterContentResponse) => {
             const transformedChapter = {
                id: data.id,
                title: data.title,
                content: data.content,
                storyId: data.story_id,
                storyTitle: data.story_title,
                createdAt: new Date(data.created_at + 'Z'),
                updatedAt: new Date(data.updated_at + 'Z'),
                previousChapterId: data.previous_chapter_id,
                nextChapterId: data.next_chapter_id
            }
            return transformedChapter
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chapters']})
    })

    // delete mutation
    const deleteMutation = useMutation({
        mutationFn: (chapterId: string) => fetch(`${API_URL}/chapters/${chapterId}`, {
            method: 'DELETE',
            credentials: 'include',
        }).then((res) => {
            if (!res.ok) throw new Error('Failed to delete chapter')
            return res.json()
        }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chapters'] })
    })

    // return everything
    return {
        chapters,
        isLoading,
        isError,
        isSuccess,
        getChapter,
        create: createMutation.mutate,
        isCreating: createMutation.isPending,
        creationError: createMutation.isError,
        creationSuccess: createMutation.isSuccess,
        update: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
        updateError: updateMutation.isError,
        updateSucess: updateMutation.isSuccess,
        delete: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
        deleteError: deleteMutation.isError,
        deleteSuccess: deleteMutation.isSuccess
    }
}