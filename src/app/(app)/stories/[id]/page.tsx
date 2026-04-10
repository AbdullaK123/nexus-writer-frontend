import { Metadata } from 'next'
import { cookies } from 'next/headers'
import StoryDetailContent from './StoryDetailContent'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    try {
        const cookieStore = await cookies()
        const sessionCookie = cookieStore.get('session_id')
        const res = await fetch(`${API_URL}/stories/${id}`, {
            headers: sessionCookie ? { Cookie: `session_id=${sessionCookie.value}` } : {},
        })
        if (res.ok) {
            const story = await res.json()
            return { title: story.title ?? 'Story' }
        }
    } catch {}
    return { title: 'Story' }
}

export default function Page() {
    return <StoryDetailContent />
}