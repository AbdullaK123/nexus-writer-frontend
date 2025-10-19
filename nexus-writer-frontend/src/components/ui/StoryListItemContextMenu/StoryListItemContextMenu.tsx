'use client'
import { ContextMenu, MenuItem, MenuDivider } from '@/components/ui/ContextMenu'
import { Frequency, TargetResponse } from '@/app/types'

interface StoryListItemContextMenuProps {
  isOpen: boolean
  x: number
  y: number
  targets: TargetResponse[]
  onClose: () => void
  onCreateTarget: (frequency: Frequency) => void
  onEditTarget: (frequency: Frequency) => void
  onDeleteTarget: (frequency: Frequency) => void
}

export function StoryListItemContextMenu({
  targets,
  isOpen,
  x,
  y,
  onClose,
  onCreateTarget,
  onEditTarget,
  onDeleteTarget
}: StoryListItemContextMenuProps) {
  
  // Derive state from story data
  const hasDaily = targets?.some(t => t.frequency === 'Daily')
  const hasWeekly = targets?.some(t => t.frequency === 'Weekly')
  const hasMonthly = targets?.some(t => t.frequency === 'Monthly')
  const hasTargets = targets && targets.length > 0

  // Helper to close menu after action
  const handleAction = (action: () => void) => {
    action()
    onClose()
  }

  return (
    <ContextMenu isOpen={isOpen} x={x} y={y} onClose={onClose}>

      {/* Create Target Submenu - Shows only missing frequencies */}
      <MenuItem icon="➕" label="Create Target">
        {!hasDaily && (
          <MenuItem
            icon="📅"
            label="Daily Target"
            meta="Every day"
            onClick={() => handleAction(() => onCreateTarget('Daily'))}
          />
        )}
        {!hasWeekly && (
          <MenuItem
            icon="📅"
            label="Weekly Target"
            meta="Every week"
            onClick={() => handleAction(() => onCreateTarget('Weekly'))}
          />
        )}
        {!hasMonthly && (
          <MenuItem
            icon="📅"
            label="Monthly Target"
            meta="Every month"
            onClick={() => handleAction(() => onCreateTarget('Monthly'))}
          />
        )}
        {hasDaily && hasWeekly && hasMonthly && (
          <MenuItem
            icon="✓"
            label="All targets created"
            disabled
          />
        )}
      </MenuItem>

      {/* Edit Target Submenu - Shows existing targets */}
      {hasTargets && (
        <MenuItem icon="✏️" label="Edit Target">
          {targets!.map(target => (
            <MenuItem
              key={target.targetId}
              icon="📝"
              label={`${target.frequency} Target`}
              meta={`${target.quota} words`}
              onClick={() => handleAction(() => onEditTarget(target.frequency))}
            />
          ))}
        </MenuItem>
      )}

      {/* Delete Target Submenu - Danger style */}
      {hasTargets && (
        <>
          <MenuDivider />
          <MenuItem icon="🗑️" label="Delete Target" danger>
            {targets!.map(target => (
              <MenuItem
                key={target.targetId}
                icon="❌"
                label={`${target.frequency} Target`}
                danger
                onClick={() => handleAction(() => onDeleteTarget(target.frequency))}
              />
            ))}
          </MenuItem>
        </>
      )}
    </ContextMenu>
  )
}
