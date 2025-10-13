'use client'
import styles from './StoryDetailHeader.module.css'
import { StoryDetailHeaderProps } from '@/app/types'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { ClipLoader } from 'react-spinners'


export default function StoryDetailHeader({
    //  storyId, 
     title, 
     onCreateChapter, 
     isCreating, 
     creationSuccess,
     onShowSuccessToast
 } : StoryDetailHeaderProps) {

    const [chapterTitle, setChapterTitle] = useState<string>("");

    const router = useRouter()

    useEffect(() => {
        if (creationSuccess) {
            onShowSuccessToast('Successfully created chapter! Happy writing!')
            setChapterTitle("")
        }
    }, [creationSuccess, onShowSuccessToast])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChapterTitle(e.target.value)
    }

    const handleOnCreateChapter = () => {
        onCreateChapter({ title: chapterTitle, content: "" })
    }

    return (
        <div className={styles['story-detail-header']}>
            <div className={styles['title-and-arrow-back-container']}>
                <Button 
                    onClick={() => router.push('/dashboard')}
                    className={styles['back-button']} 
                    aria-label="Go back"
                    variant="secondary"
                >
                    ←
                </Button>
                <h2>{title}</h2>
            </div>
            <div className={styles['chapter-create-container']}>
                <Input 
                     name="title"
                     id="title"
                     type="text"
                     onChange={handleOnChange}
                     onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            handleOnCreateChapter()
                        }
                     }}
                     placeholder='Enter a chapter title...'
                     value={chapterTitle}
                 />
                 <Button 
                     onClick={handleOnCreateChapter}
                     disabled={isCreating}
                     variant="primary"
                     className={styles['create-chapter-button']}
                 >
                     {isCreating ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ClipLoader size={16} color="#fff" />
                            <span>Creating Chapter...</span>
                        </div>
                     ) : '+ Create Chapter'}
                 </Button>
            </div>
        </div>
    )
}