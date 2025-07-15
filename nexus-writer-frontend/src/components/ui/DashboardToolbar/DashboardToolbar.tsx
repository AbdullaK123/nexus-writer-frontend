'use client'
import React, { useState } from 'react';
import { DashboardToolBarProps } from '@/app/types/interfaces';
import { StoryCreateRequest } from '@/app/types/stories';
import styles from './DashboardToolbar.module.css'

const filterOptions = [
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
    const [filter, setFilter] = useState(undefined)
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

    const handleOnFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFilter = e.target.value
        console.info(newFilter)
        setFilter(newFilter)
        onFilterChange(filter)
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
                    onClick={handleOnClick}
                >
                    Create Story
                </button>
                <div>
                    <label htmlFor='filter'>Filter by: </label>
                    <select
                        id='filter'
                        name='filter'
                        onChange={handleOnFilterChange}
                        value={filter}
                    >
                        {filterOptions.map((item) => {
                            return (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}