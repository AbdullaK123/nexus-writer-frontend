'use client'
import { ContextMenuContent, MenuItem, MenuDivider, SubMenu } from '@/components/ui/ContextMenu'
import { ChapterStatus } from '@/app/types'

interface ChapterListItemContextMenuProps {
  status: ChapterStatus
  onDelete: () => void
  onDuplicate?: () => void
  onChangeStatus?: (status: ChapterStatus) => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}

export function ChapterListItemContextMenu({
  status,
  onDelete,
  onDuplicate,
  onChangeStatus,
  onMoveUp,
  onMoveDown
}: ChapterListItemContextMenuProps) {
  return (
    <ContextMenuContent>
      
      {/* Chapter Actions */}
      {onDuplicate && (
        <MenuItem 
          icon="📋" 
          label="Duplicate Chapter"
          onClick={onDuplicate}
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
              onClick={onMoveUp}
            />
          )}
          {onMoveDown && (
            <MenuItem 
              icon="⬇️" 
              label="Move Down"
              onClick={onMoveDown}
            />
          )}
        </>
      )}

      {/* Status Change */}
      {onChangeStatus && (
        <>
          <MenuDivider />
          <SubMenu icon="📝" label="Change Status">
            {status !== 'outline' && (
              <MenuItem
                icon="📄"
                label="Outline"
                meta="Planning stage"
                onClick={() => onChangeStatus('outline')}
              />
            )}
            {status !== 'draft' && (
              <MenuItem
                icon="✍️"
                label="Draft"
                meta="Work in progress"
                onClick={() => onChangeStatus('draft')}
              />
            )}
            {status !== 'published' && (
              <MenuItem
                icon="✅"
                label="Published"
                meta="Completed"
                onClick={() => onChangeStatus('published')}
              />
            )}
          </SubMenu>
        </>
      )}

      {/* Danger Zone */}
      <MenuDivider />
      <MenuItem 
        icon="🗑️" 
        label="Delete Chapter" 
        danger
        onClick={onDelete}
      />
    </ContextMenuContent>
  )
}
