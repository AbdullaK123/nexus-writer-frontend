'use client'
import React, { useState } from 'react';
import { DashboardToolBarProps } from '@/app/types/interfaces';
import { StoryCreateRequest } from '@/app/types/stories';
import styles from './DashboardToolbar.module.css'
import FilterDropdown from '../FilterDropdown/FilterDropdown';

const filterOptions = [
    {label: 'All Stories', value: ''},
    {label: 'Ongoing', value: 'Ongoing'},
    {label: 'On Hiatus', value: 'On Hiatus'},
    {label: 'Complete', value: 'Complete'}
]

export default function DashboardToolbar({
    username, 
    onCreateStory,
    onFilterChange
}: DashboardToolBarProps ) {

    const [story, setStory] = useState<StoryCreateRequest>({ title: "" })
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStory({ title: e.target.value })
    }

    const handleOnClick = () => {
        if (!story.title.trim()) {
            return // it can't be empty
        }
        onCreateStory(story)
        setStory({ title: ""})
    }

    return (
        <div className={styles.toolbar}>
            <h3>{`Hello ${username}`}</h3>
             <FilterDropdown 
                onFilterChange={onFilterChange}
                filterOptions={filterOptions}
            />
            <div className={styles['story-create-bar-container']}>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={story.title}
                    placeholder='Enter a title...'
                    onChange={handleOnChange}
                    onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            handleOnClick()
                        }
                    }}
                />
                <button
                    className='btn-primary'
                    onClick={handleOnClick}
                >
                    Create Story
                </button>
            </div>
        </div>
    )
}