import { ContextMenuContent, MenuItem, MenuDivider, SubMenu } from '@/components/common/ContextMenu'
import { Frequency, TargetResponse } from '@/data/types'

interface StoryListItemContextMenuProps {
  targets: TargetResponse[]
  onCreateTarget: (frequency: Frequency) => void
  onEditTarget: (frequency: Frequency) => void
  onDeleteTarget: (frequency: Frequency) => void
}

export function StoryListItemContextMenu({
  targets,
  onCreateTarget,
  onEditTarget,
  onDeleteTarget
}: StoryListItemContextMenuProps) {
  
  // Derive state from story data
  const hasDaily = targets?.some(t => t.frequency === 'Daily')
  const hasWeekly = targets?.some(t => t.frequency === 'Weekly')
  const hasMonthly = targets?.some(t => t.frequency === 'Monthly')
  const hasTargets = targets && targets.length > 0

  return (
    <ContextMenuContent>

      {/* Create Target Submenu - Shows only missing frequencies */}
      <SubMenu icon="➕" label="Create Target">
        {!hasDaily && (
          <MenuItem
            icon="📅"
            label="Daily Target"
            meta="Every day"
            onClick={() => onCreateTarget('Daily')}
          />
        )}
        {!hasWeekly && (
          <MenuItem
            icon="📅"
            label="Weekly Target"
            meta="Every week"
            onClick={() => onCreateTarget('Weekly')}
          />
        )}
        {!hasMonthly && (
          <MenuItem
            icon="📅"
            label="Monthly Target"
            meta="Every month"
            onClick={() => onCreateTarget('Monthly')}
          />
        )}
        {hasDaily && hasWeekly && hasMonthly && (
          <MenuItem
            icon="✓"
            label="All targets created"
            disabled
          />
        )}
      </SubMenu>

      {/* Edit Target Submenu - Shows existing targets */}
      {hasTargets && (
        <SubMenu icon="✏️" label="Edit Target">
          {targets!.map(target => (
            <MenuItem
              key={target.targetId}
              icon="📝"
              label={`${target.frequency} Target`}
              meta={`${target.quota} words`}
              onClick={() => onEditTarget(target.frequency)}
            />
          ))}
        </SubMenu>
      )}

      {/* Delete Target Submenu - Danger style */}
      {hasTargets && (
        <>
          <MenuDivider />
          <SubMenu icon="🗑️" label="Delete Target">
            {targets!.map(target => (
              <MenuItem
                key={target.targetId}
                icon="❌"
                label={`${target.frequency} Target`}
                danger
                onClick={() => onDeleteTarget(target.frequency)}
              />
            ))}
          </SubMenu>
        </>
      )}
    </ContextMenuContent>
  )
}
