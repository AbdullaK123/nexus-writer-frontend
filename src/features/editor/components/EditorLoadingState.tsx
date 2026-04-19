import { ClipLoader } from 'react-spinners'

export default function EditorLoadingState() {
    return (
        <div className="loading-center">
            <ClipLoader size={50} color="#00d4ff" />
            <p>Loading chapter...</p>
        </div>
    )
}
