'use client'

import React, { useEffect, useRef } from 'react'
import { ClipLoader } from 'react-spinners'
import { useToast } from '@/shared/providers/ToastProvider'
import styles from './AsyncBoundary.module.css'

interface AsyncBoundaryProps<T> {
    data: T | undefined
    isLoading: boolean
    isError: boolean
    errorMessage?: string
    emptyMessage?: string
    children: (data: T) => React.ReactNode
}

function isEmpty(value: unknown): boolean {
    if (value == null) return true
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value as object).length === 0
    return false
}

export default function AsyncBoundary<T>({
    data,
    isLoading,
    isError,
    errorMessage = 'Something went wrong. Please try again later.',
    emptyMessage = 'No data available.',
    children,
}: AsyncBoundaryProps<T>) {
    const { showToast } = useToast()
    const hasToasted = useRef(false)

    useEffect(() => {
        if (isError && !hasToasted.current) {
            showToast(errorMessage, 'error')
            hasToasted.current = true
        }
        if (!isError) {
            hasToasted.current = false
        }
    }, [isError, errorMessage, showToast])

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <ClipLoader color="#00d4ff" size={40} />
            </div>
        )
    }

    if (isError) {
        return (
            <div className={styles.error}>
                <h3>Error</h3>
                <p>{errorMessage}</p>
            </div>
        )
    }

    if (data === undefined || isEmpty(data)) {
        return (
            <div className={styles.empty}>
                <p>{emptyMessage}</p>
            </div>
        )
    }

    return <>{children(data)}</>
}
