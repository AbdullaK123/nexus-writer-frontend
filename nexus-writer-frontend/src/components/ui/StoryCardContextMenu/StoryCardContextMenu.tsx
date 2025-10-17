'use client'
import { ContextMenu, MenuItem, MenuDivider } from '@/components/ui/ContextMenu'

interface StoryCardContextMenuProps {
  isOpen: boolean
  x: number
  y: number
  onClose: () => void
  onDelete: () => void
  onDuplicate?: () => void
  onExport?: () => void
  onArchive?: () => void
}

export function StoryCardContextMenu({
  isOpen,
  x,
  y,
  onClose,
  onDelete,
  onDuplicate,
  onExport,
  onArchive
}: StoryCardContextMenuProps) {
  
  // Helper to close menu after action
  const handleAction = (action: () => void) => {
    action()
    onClose()
  }

  return (
    <ContextMenu isOpen={isOpen} x={x} y={y} onClose={onClose}>
      
      {/* Story Actions */}
      {onDuplicate && (
        <MenuItem 
          icon="📋" 
          label="Duplicate Story" 
          meta="Ctrl+D"
          onClick={() => handleAction(onDuplicate)}
        />
      )}
      
      {onExport && (
        <MenuItem 
          icon="📤" 
          label="Export Story" 
          meta="Ctrl+E"
          onClick={() => handleAction(onExport)}
        />
      )}
      
      {onArchive && (
        <MenuItem 
          icon="📦" 
          label="Archive Story"
          onClick={() => handleAction(onArchive)}
        />
      )}

      {/* Danger Zone */}
      <MenuDivider />
      <MenuItem 
        icon="🗑️" 
        label="Delete Story" 
        danger
        onClick={() => handleAction(onDelete)}
      />
    </ContextMenu>
  )
}
