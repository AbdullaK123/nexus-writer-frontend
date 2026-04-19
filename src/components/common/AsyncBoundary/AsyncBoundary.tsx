'use client'

import React, { useEffect, useRef } from 'react'
import { ClipLoader } from 'react-spinners'
import { useToast } from '@/shared/providers/ToastProvider'
import styles from './AsyncBoundary.module.css'

interface AsyncBoundaryProps<T> {
    data: T | undefined
    isLoading: boolean
    isError: boolean
    errorState?: React.ReactNode
    emptyState?: React.ReactNode
    loadingState?: React.ReactNode
    errorMessage?: string
    children: (data: T) => React.ReactNode
}

function isEmpty(value: unknown): boolean {
    if (value == null) return true
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value as object).length === 0
    return false
}

const DefaultErrorState = () => {
    return (
        <div className={styles.error}>
            <h3>Error</h3>
            <p>Something went wrong. Please try again later.</p>
        </div>
    )
}

const DefaultEmptyState = () => {
    return (
        <div className={styles.empty}>
            <p>No data available.</p>
        </div>
    )
}

const DefaultLoadingState = () => {
    return (
        <div className={styles.loading}>
            <ClipLoader color="#00d4ff" size={40} />
        </div>
    )
}

export default function AsyncBoundary<T>({
    data,
    isLoading,
    isError,
    errorState = <DefaultErrorState/>,
    emptyState = <DefaultEmptyState/>,
    loadingState = <DefaultLoadingState/>,
    errorMessage = "Something went wrong. Please try again later.",
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

    if (isError) {
        return errorState
    }

    if (isLoading) {
        return loadingState
    }

    if (data === undefined || isEmpty(data)) {
        return emptyState
    }

    return <>{children(data)}</>
}
