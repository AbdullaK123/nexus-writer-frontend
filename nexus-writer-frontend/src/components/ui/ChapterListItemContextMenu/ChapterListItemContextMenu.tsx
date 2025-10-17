'use client'
import { ContextMenu, MenuItem, MenuDivider } from '@/components/ui/ContextMenu'
import { ChapterStatus } from '@/app/types'

interface ChapterListItemContextMenuProps {
  isOpen: boolean
  x: number
  y: number
  status: ChapterStatus
  onClose: () => void
  onDelete: () => void
  onDuplicate?: () => void
  onChangeStatus?: (status: ChapterStatus) => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}

export function ChapterListItemContextMenu({
  isOpen,
  x,
  y,
  status,
  onClose,
  onDelete,
  onDuplicate,
  onChangeStatus,
  onMoveUp,
  onMoveDown
}: ChapterListItemContextMenuProps) {
  
  // Helper to close menu after action
  const handleAction = (action: () => void) => {
    action()
    onClose()
  }

  return (
    <ContextMenu isOpen={isOpen} x={x} y={y} onClose={onClose}>
      
      {/* Chapter Actions */}
      {onDuplicate && (
        <MenuItem 
          icon="📋" 
          label="Duplicate Chapter"
          onClick={() => handleAction(onDuplicate)}
        />
      )}
      
      {/* Reorder Actions */}
      {(onMoveUp || onMoveDown) && (
        <>
          <MenuDivider />
          {onMoveUp && (
            <MenuItem 
              icon="⬆️" 
              label="Move Up"
              onClick={() => handleAction(onMoveUp)}
            />
          )}
          {onMoveDown && (
            <MenuItem 
              icon="⬇️" 
              label="Move Down"
              onClick={() => handleAction(onMoveDown)}
            />
          )}
        </>
      )}

      {/* Status Change */}
      {onChangeStatus && (
        <>
          <MenuDivider />
          <MenuItem icon="📝" label="Change Status">
            {status !== 'outline' && (
              <MenuItem
                icon="📄"
                label="Outline"
                meta="Planning stage"
                onClick={() => handleAction(() => onChangeStatus('outline'))}
              />
            )}
            {status !== 'draft' && (
              <MenuItem
                icon="✍️"
                label="Draft"
                meta="Work in progress"
                onClick={() => handleAction(() => onChangeStatus('draft'))}
              />
            )}
            {status !== 'published' && (
              <MenuItem
                icon="✅"
                label="Published"
                meta="Completed"
                onClick={() => handleAction(() => onChangeStatus('published'))}
              />
            )}
          </MenuItem>
        </>
      )}

      {/* Danger Zone */}
      <MenuDivider />
      <MenuItem 
        icon="🗑️" 
        label="Delete Chapter" 
        danger
        onClick={() => handleAction(onDelete)}
      />
    </ContextMenu>
  )
}
