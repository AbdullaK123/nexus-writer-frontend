'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="error-page">
            <h1>Something went wrong</h1>
            <p>
                {error.message || 'An unexpected error occurred.'}
            </p>
            <button onClick={reset} className="action-link">
                Try again
            </button>
        </div>
    )
}
