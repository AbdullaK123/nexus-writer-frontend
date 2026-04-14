'use client'
import styles from './StoryDetailHeader.module.css'
import { StoryDetailHeaderProps } from './types'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'
import { ClipLoader } from 'react-spinners'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { insightsSections, type InsightsSection } from '@/features/stories/hooks/useStoryNavigation'


export default function StoryDetailHeader({
     storyId, 
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

    const handleInsightsNavigate = (section: InsightsSection) => {
        router.push(`/stories/${storyId}/insights/${section}`)
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
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <Button 
                            variant="secondary" 
                            className={styles['insights-button']}
                            aria-label="Story Insights"
                        >
                            🔍 Insights
                        </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content 
                            className={styles['insights-dropdown']} 
                            sideOffset={8}
                            align="start"
                        >
                            {insightsSections.map(({ key, label, icon }) => (
                                <DropdownMenu.Item
                                    key={key}
                                    className={styles['insights-item']}
                                    onSelect={() => handleInsightsNavigate(key)}
                                >
                                    <span className={styles['insights-icon']}>{icon}</span>
                                    <span className={styles['insights-label']}>{label}</span>
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
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
                        <div className="loading-row">
                            <ClipLoader size={16} color="#fff" />
                            <span>Creating Chapter...</span>
                        </div>
                     ) : '+ Create Chapter'}
                 </Button>
            </div>
        </div>
    )
}