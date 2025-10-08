import { ContextMenuProps } from "@/app/types";
import {Button} from "@/components/ui/Button";
import styles from './AnalyticsContextMenu.module.css';

export default function AnalyticsContextMenu({
    x,
    y,
    onClose,
    onAction,
}: ContextMenuProps) {
    return (
        <div className={styles.backdrop} onClick={() => onClose()}>
            <div
                className={styles.menu}
                style={{
                    position: 'fixed',
                    left: x,
                    top: y,
                    zIndex: 1000
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Button
                    variant="secondary"
                    onClick={() => onAction('Create a Target')}
                >
                    🎯 Create Target
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => onAction('Update a Target')}
                >
                    ✏️ Edit Target
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => onAction('Delete a Target')}
                >
                    🗑️ Delete Target
                </Button>
            </div>
        </div>
    )
}