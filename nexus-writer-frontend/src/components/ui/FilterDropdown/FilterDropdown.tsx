'use client'
import { useState } from "react"

type FilterDropdownProps = {
    onFilterChange: (filter: string) => void;
    filterOptions: Record<string, string>[]
}

export default function FilterDropdown({
    onFilterChange,
    filterOptions
}: FilterDropdownProps) {

    const [filter, setFilter] = useState('')

    const handleOnFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newFilter = e.target.value
        console.info('New filter:', newFilter)
        setFilter(newFilter)
        onFilterChange(newFilter) 
    }


    return (
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
    )
}