'use client'
import { ChangeEvent } from 'react'
import * as Select from '@radix-ui/react-select'
import { Frequency } from '@/data/types'
import styles from './AnalyticsFilter.module.css'

interface AnalyticsFilterProps {
  frequency: Frequency
  fromDate: string
  toDate: string
  onFrequencyChange: (frequency: Frequency) => void
  onFromDateChange: (date: string) => void
  onToDateChange: (date: string) => void
}

const frequencyOptions = [
  { value: 'Daily', label: 'Daily' },
  { value: 'Weekly', label: 'Weekly' },
  { value: 'Monthly', label: 'Monthly' },
]

export default function AnalyticsFilter({
  frequency,
  fromDate,
  toDate,
  onFrequencyChange,
  onFromDateChange,
  onToDateChange
}: AnalyticsFilterProps) {

  const handleFromDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.valueAsDate) {
      onFromDateChange(e.target.valueAsDate.toISOString())
    }
  }

  const handleToDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.valueAsDate) {
      onToDateChange(e.target.valueAsDate.toISOString())
    }
  }

  // Format ISO string to YYYY-MM-DD for input value
  const formatDateForInput = (isoString: string): string => {
    try {
      return isoString.split('T')[0]
    } catch {
      return new Date().toISOString().split('T')[0]
    }
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label className={styles.label}>
          Frequency
        </label>
        <Select.Root value={frequency} onValueChange={(val) => onFrequencyChange(val as Frequency)}>
          <Select.Trigger className={styles.select} id="frequency">
            <Select.Value />
            <Select.Icon className={styles.selectIcon}>▾</Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="select-content" position="popper" sideOffset={4}>
              <Select.Viewport className="select-viewport">
                {frequencyOptions.map((opt) => (
                  <Select.Item key={opt.value} value={opt.value} className="select-item">
                    <Select.ItemText>{opt.label}</Select.ItemText>
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

      <div className={styles.filterGroup}>
        <label htmlFor="fromDate" className={styles.label}>
          From
        </label>
        <input
          id="fromDate"
          name="fromDate"
          type="date"
          className={styles.dateInput}
          value={formatDateForInput(fromDate)}
          onChange={handleFromDateChange}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="toDate" className={styles.label}>
          To
        </label>
        <input
          id="toDate"
          name="toDate"
          type="date"
          className={styles.dateInput}
          value={formatDateForInput(toDate)}
          onChange={handleToDateChange}
        />
      </div>
    </div>
  )
}
