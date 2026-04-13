import { Metadata } from 'next'
import { cookies } from 'next/headers'
import ChapterEditorContent from '@/features/editor/ChapterEditorContent'
import { env } from '@/infrastructure/config/env'

const API_URL = env.apiUrl

export async function generateMetadata({ params }: { params: Promise<{ id: string[] }> }): Promise<Metadata> {
    const { id } = await params
    const chapterId = id[1]
    if (!chapterId) return { title: 'Chapter' }
    try {
        const cookieStore = await cookies()
        const sessionCookie = cookieStore.get('session_id')
        const res = await fetch(`${API_URL}/chapters/${chapterId}/?as_html=False`, {
            headers: sessionCookie ? { Cookie: `session_id=${sessionCookie.value}` } : {},
        })
        if (res.ok) {
            const chapter = await res.json()
            return { title: chapter.title ?? 'Chapter' }
        }
    } catch {}
    return { title: 'Chapter' }
}

export default function Page() {
    return <ChapterEditorContent />
}