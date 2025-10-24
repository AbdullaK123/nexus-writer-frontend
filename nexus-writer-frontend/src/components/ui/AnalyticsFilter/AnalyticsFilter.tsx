'use client'
import { ChangeEvent } from 'react'
import { Frequency } from '@/app/types'
import styles from './AnalyticsFilter.module.css'

interface AnalyticsFilterProps {
  frequency: Frequency
  fromDate: string
  toDate: string
  onFrequencyChange: (frequency: Frequency) => void
  onFromDateChange: (date: string) => void
  onToDateChange: (date: string) => void
}

export default function AnalyticsFilter({
  frequency,
  fromDate,
  toDate,
  onFrequencyChange,
  onFromDateChange,
  onToDateChange
}: AnalyticsFilterProps) {

  const handleFrequencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onFrequencyChange(e.target.value as Frequency)
  }

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
        <label htmlFor="frequency" className={styles.label}>
          Frequency
        </label>
        <select
          id="frequency"
          className={styles.select}
          value={frequency}
          onChange={handleFrequencyChange}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
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
