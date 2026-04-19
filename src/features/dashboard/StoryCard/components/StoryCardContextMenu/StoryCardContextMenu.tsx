import { ContextMenuContent, MenuItem, MenuDivider, SubMenu } from '@/components/common/ContextMenu'

interface StoryCardContextMenuProps {
  onDelete: () => void
  onDuplicate?: () => void
  onExport?: () => void
  onArchive?: () => void
}

export function StoryCardContextMenu({
  onDelete,
  onDuplicate,
  onExport,
  onArchive,
}: StoryCardContextMenuProps) {
  return (
    <ContextMenuContent>
      
      {/* Story Actions */}
      {onDuplicate && (
        <MenuItem 
          icon="📋" 
          label="Duplicate Story" 
          meta="Ctrl+D"
          onClick={onDuplicate}
        />
      )}
      
      {onExport && (
        <MenuItem 
          icon="📤" 
          label="Export Story" 
          meta="Ctrl+E"
          onClick={onExport}
        />
      )}
      
      {onArchive && (
        <MenuItem 
          icon="📦" 
          label="Archive Story"
          onClick={onArchive}
        />
      )}

      {/* Danger Zone */}
      <MenuDivider />
      <MenuItem 
        icon="🗑️" 
        label="Delete Story" 
        danger
        onClick={onDelete}
      />
    </ContextMenuContent>
  )
}
