'use client'
import * as Select from '@radix-ui/react-select'
import styles from './FilterDropdown.module.css'

type FilterDropdownProps = {
    onFilterChange: (filter: string) => void;
    filterOptions: { label: string; value: string }[]
}

const ALL_VALUE = '__all__'

export default function FilterDropdown({ onFilterChange, filterOptions }: FilterDropdownProps) {
    const handleChange = (value: string) => {
        onFilterChange(value === ALL_VALUE ? '' : value)
    }

    return (
        <div className={styles.container}>
            <label htmlFor='filter' className={styles.label}>Filter by: </label>
            <Select.Root defaultValue={ALL_VALUE} onValueChange={handleChange}>
                <Select.Trigger className={styles.trigger} id="filter">
                    <Select.Value placeholder={filterOptions[0]?.label ?? 'Select...'} />
                    <Select.Icon className={styles.icon}>▾</Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content className="select-content" position="popper" sideOffset={4}>
                        <Select.Viewport className="select-viewport">
                            {filterOptions.map((option) => (
                                <Select.Item 
                                    key={option.value || ALL_VALUE} 
                                    value={option.value || ALL_VALUE} 
                                    className="select-item"
                                >
                                    <Select.ItemText>{option.label}</Select.ItemText>
                                    <Select.ItemIndicator className="select-indicator">
                                        ✓
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    )
}