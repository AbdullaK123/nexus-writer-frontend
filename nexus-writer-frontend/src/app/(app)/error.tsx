'use client'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '40px' }}>
            <h1 style={{ color: '#ff4d6a' }}>Something went wrong</h1>
            <p style={{ color: '#a0a0b8', maxWidth: '400px', textAlign: 'center' }}>
                {error.message || 'An unexpected error occurred.'}
            </p>
            <button
                onClick={reset}
                style={{
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(0, 212, 255, 0.15)',
                    border: '1px solid #00d4ff',
                    borderRadius: '8px',
                    color: '#00d4ff',
                    cursor: 'pointer',
                    fontSize: '1rem',
                }}
            >
                Try again
            </button>
        </div>
    )
}
