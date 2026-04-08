import * as RadixContextMenu from '@radix-ui/react-context-menu'
import styles from './ContextMenu.module.css'

export default function MenuDivider() {
    return (
        <RadixContextMenu.Separator className={styles['divider']}/>
    )
}