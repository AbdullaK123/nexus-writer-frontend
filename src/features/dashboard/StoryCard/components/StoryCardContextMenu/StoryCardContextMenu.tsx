import { ContextMenuContent, MenuItem, MenuDivider, SubMenu } from '@/components/common/ContextMenu'
import { insightsSections, type InsightsSection } from '@/features/stories/hooks/useStoryNavigation'

interface StoryCardContextMenuProps {
  onDelete: () => void
  onDuplicate?: () => void
  onExport?: () => void
  onArchive?: () => void
  onInsightsNavigate?: (section: InsightsSection) => void
}

export function StoryCardContextMenu({
  onDelete,
  onDuplicate,
  onExport,
  onArchive,
  onInsightsNavigate,
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

      {/* Insights Submenu */}
      {onInsightsNavigate && (
        <>
          <MenuDivider />
          <SubMenu icon="🔍" label="Insights">
            {insightsSections.map(({ key, label, icon }) => (
              <MenuItem
                key={key}
                icon={icon}
                label={label}
                onClick={() => onInsightsNavigate(key)}
              />
            ))}
          </SubMenu>
        </>
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
