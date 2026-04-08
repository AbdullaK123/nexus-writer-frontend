import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="not-found-page">
            <h1>404</h1>
            <p>
                The resource you&apos;re looking for could not be found.
            </p>
            <Link href="/dashboard" className="action-link">
                Back to dashboard
            </Link>
        </div>
    )
}
