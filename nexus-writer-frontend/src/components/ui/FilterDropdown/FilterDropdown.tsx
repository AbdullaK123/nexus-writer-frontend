'use client'

type FilterDropdownProps = {
    onFilterChange: (filter: string) => void;
    filterOptions: { label: string; value: string }[]
}

export default function FilterDropdown({ onFilterChange, filterOptions }: FilterDropdownProps) {
    return (
        <div>
            <label htmlFor='filter'>Filter by: </label>
            <select
                id='filter'
                name='filter'
                onChange={(e) => onFilterChange(e.target.value)}
                defaultValue="" // Start with "All Stories"
            >
                {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}