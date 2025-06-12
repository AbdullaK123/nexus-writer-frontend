'use client'
import React, { useState } from 'react';
import { DashboardToolBarProps } from '@/app/types/interfaces';
import { StoryCreateRequest } from '@/app/types/stories';
import styles from './DashboardToolbar.module.css'

export default function DashboardToolbar({ username, onCeateStory, onLayoutChange}: DashboardToolBarProps ) {

    const [story, setStory] = useState<StoryCreateRequest>({ title: "" })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStory({ title: e.target.value })
    }

    return (
        <div className={styles.toolbar}>
            <h3>{`Hello ${username}`}</h3>
            <div className={styles['flex-row-container']}>
                <input
                    id="title"
                    name="title"
                    value={story.title}
                    placeholder='Enter a title...'
                    onChange={handleOnChange}
                />
                <button
                    className='btn-primary'
                    onClick={() => handleCreateStory(story)}
                >
                    Create Story
                </button>
            </div>
            <div className={styles['flex-row-container']}>
                <button
                    className='btn-primary'
                    onClick={() => handleLayoutChange()}
                >
                    Grid View
                </button>
                <button
                     className='btn-primary'
                    onClick={() => handleLayoutChange()}
                >
                    List View
                </button>
            </div>
        </div>
    )
}