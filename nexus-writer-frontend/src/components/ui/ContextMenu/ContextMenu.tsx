import { ChapterContextMenuProps } from "@/app/types/interfaces";

export default function ChapterContextMenu( {
    x,
    y,
    onAction,
    onClose
}: ChapterContextMenuProps ) {
    return (
        <div onClick={() => onClose()}>
             <div
                style={{
                    position: 'fixed',
                    left: x,
                    top: y,
                    zIndex: 1000 
                }}  
            >
                <button 
                    className='btn-secondary'
                    onClick={() => onAction('delete')}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}