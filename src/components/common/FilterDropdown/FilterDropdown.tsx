'use client'
import * as Select from '@radix-ui/react-select'
import styles from './FilterDropdown.module.css'

type FilterDropdownProps = {
    onFilterChange: (filter: string) => void;
    filterOptions: { label: string; value: string }[]
}

export default function FilterDropdown({ onFilterChange, filterOptions }: FilterDropdownProps) {
    return (
        <div className={styles.container}>
            <label htmlFor='filter' className={styles.label}>Filter by: </label>
            <Select.Root defaultValue="" onValueChange={onFilterChange}>
                <Select.Trigger className={styles.trigger} id="filter">
                    <Select.Value placeholder={filterOptions[0]?.label ?? 'Select...'} />
                    <Select.Icon className={styles.icon}>▾</Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content className={styles.content} position="popper" sideOffset={4}>
                        <Select.Viewport className={styles.viewport}>
                            {filterOptions.map((option) => (
                                <Select.Item 
                                    key={option.value} 
                                    value={option.value} 
                                    className={styles.item}
                                >
                                    <Select.ItemText>{option.label}</Select.ItemText>
                                    <Select.ItemIndicator className={styles.indicator}>
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