'use client'
import styles from './StoryDetailHeader.module.css'
import { StoryDetailHeaderProps, CreateChapterRequest } from '@/app/types/interfaces'
import { useRouter } from 'next/navigation'
import { useChapters } from '@/app/hooks/useChapters'
import React, { useState, useEffect } from 'react'

export default function StoryDetailHeader({
     storyId, 
     title, 
     onCreateChapter, 
     isCreating, 
     creationSuccess
 } : StoryDetailHeaderProps) {

    const [chapterTitle, setChapterTitle] = useState<string>("");

    const router = useRouter()

    useEffect(() => {
        if (creationSuccess) {
            alert('Successfully created chapter! Happy writing!')
            setChapterTitle("")
        }
    }, [creationSuccess])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapterTitle(e.target.value)
    }

    const handleOnCreateChapter = () => {
        onCreateChapter({ title: chapterTitle, content: "" })
    }

    return (
        <div className={styles['story-detail-header']}>
            <div className={styles['title-and-arrow-back-container']}>
                <button 
                    onClick={() => router.push('/dashboard')}
                    className={styles['back-button']} 
                    aria-label="Go back"
                >
                    ←
                </button>
                <h2>{title}</h2>
            </div>
            <div className={styles['chapter-create-container']}>
                <input 
                     name="title"
                     id="title"
                     type="text"
                     onChange={handleOnChange}
                     placeholder='Enter a chapter title...'
                     value={chapterTitle}
                 />
                 <button 
                     onClick={handleOnCreateChapter}
                     disabled={isCreating}
                     className={`btn-primary ${styles['create-chapter-button']}`}
                 >
                     {isCreating ? 'Creating Chapter...': '+ Create Chapter'}
                 </button>
            </div>
        </div>
    )
}