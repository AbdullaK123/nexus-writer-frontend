import { ContextMenuProps } from "@/app/types";
import {Button} from "@/components/ui/Button";

export default function AnalyticsContextMenu({
    x,
    y,
    onClose,
    onAction,
}: ContextMenuProps) {
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
                    variant="secondary"
                    onClick={() => onAction('Create a Target')}
                >
                    Create a Target
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => onAction('Update a Target')}
                >
                    Update a Target
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => onAction('Delete a Target')}
                >
                    Delete a Target
                </Button>
            </div>
        </div>
    )
}