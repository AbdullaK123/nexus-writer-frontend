import Link from 'next/link'

export default function NotFound() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '60px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '4rem', margin: 0, color: '#00d4ff' }}>404</h1>
            <p style={{ color: '#a0a0b8', fontSize: '1.1rem', maxWidth: '400px' }}>
                The resource you&apos;re looking for could not be found.
            </p>
            <Link
                href="/dashboard"
                style={{
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(0, 212, 255, 0.15)',
                    border: '1px solid #00d4ff',
                    borderRadius: '8px',
                    color: '#00d4ff',
                    textDecoration: 'none',
                    fontSize: '1rem',
                }}
            >
                Back to dashboard
            </Link>
        </div>
    )
}
