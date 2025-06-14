'use client'
import React, { useState } from 'react';
import { DashboardToolBarProps } from '@/app/types/interfaces';
import { StoryCreateRequest } from '@/app/types/stories';
import styles from './DashboardToolbar.module.css'

export default function DashboardToolbar({ username, onCreateStory}: DashboardToolBarProps ) {

    const [story, setStory] = useState<StoryCreateRequest>({ title: "" })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStory({ title: e.target.value })
    }

    return (
        <div className={styles.toolbar}>
            <h3>{`Hello ${username}`}</h3>
            <div className={styles['story-create-bar-container']}>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={story.title}
                    placeholder='Enter a title...'
                    onChange={handleOnChange}
                />
                <button
                    className='btn-primary'
                    onClick={() => onCreateStory(story)}
                >
                    Create Story
                </button>
            </div>
        </div>
    )
}