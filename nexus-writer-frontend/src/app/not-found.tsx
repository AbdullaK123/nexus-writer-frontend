import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="not-found-page">
            <h1>404</h1>
            <p>
                This page doesn&apos;t exist in any known universe.
            </p>
            <Link href="/" className="action-link">
                Return home
            </Link>
        </div>
    )
}
