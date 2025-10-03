import { ContextMenuProps } from "@/app/types";
import {Button} from "@/components/ui/Button";

export default function ChapterContextMenu( {
    x,
    y,
    onAction,
    onClose
}: ContextMenuProps ) {
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
                <Button
                    className='btn-secondary'
                    onClick={() => onAction('delete')}
                >
                    Delete
                </Button>
                 <Button>
                     Test
                 </Button>
            </div>
        </div>
    )
}