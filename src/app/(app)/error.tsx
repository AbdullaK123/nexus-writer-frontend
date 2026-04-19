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
                "An unexpected error occurred. Please try again or return to the dashboard."
            </p>
            <button onClick={reset} className="action-link">
                Try again
            </button>
        </div>
    )
}
