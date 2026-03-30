export default function Loading() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '40px' }}>
            <div style={{
                width: 50,
                height: 50,
                border: '4px solid rgba(0, 212, 255, 0.2)',
                borderTop: '4px solid #00d4ff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
            }} />
            <h1>Loading...</h1>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}
