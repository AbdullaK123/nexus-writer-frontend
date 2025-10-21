'use client'
import { Frequency, StoryListItemProps, TargetResponse } from "@/app/types";
import styles from "./StoryListItem.module.css";
import { formatWordCount } from "@/app/lib/utils";
import { useContextMenu } from "@/app/hooks/useContextMenu";
import { StoryListItemContextMenu } from "../StoryListItemContextMenu/StoryListItemContextMenu";
import CreateTargetForm from "../CreateTargetForm/CreateTargetForm";
import { useState } from "react";
import EditTargetForm from "../EditTargetForm/EditTargetForm";
import DeleteTargetForm from "../DeleteTargetForm/DeleteTargetForm";

interface ModalState {
  type: 'create' | 'edit' | 'delete' | null
  frequency: Frequency | null
  targetData: TargetResponse | null
}


export default function StoryListItem({
    storyId,
    title,
    wordCount,
    targets,
    isSelected,
    ...divProps
}: StoryListItemProps) {

    console.log(`StoryListItem ${storyId} - isSelected:`, isSelected, 'title:', title);

    const {menu, openMenu, closeMenu} = useContextMenu()
    const [modalState, setModalState] = useState<ModalState>({
        type: null,
        frequency: null,
        targetData: null
    })

    const handleCreateTarget = (frequency: Frequency) => {
        setModalState({ type: 'create', frequency, targetData: null})
    }

    const handleEditTarget = (frequency: Frequency) => {
        const target = targets.find(t => t.frequency === frequency)
        setModalState({ type: 'edit', frequency, targetData: target})
    }

    const handleDeleteTarget = (frequency: Frequency) => {
        const target = targets.find(t => t.frequency === frequency)
        setModalState({ type: 'delete', frequency, targetData: target})
    }

    const handleCloseModal = () => {
        setModalState({ type: null, frequency: null, targetData: null })
    }

    return (
        <>
            <div
                className={`${styles['story-list-item-container']} ${isSelected ? styles['selected'] : ''}`}
                onContextMenu={(e) => {
                    e.preventDefault()
                    openMenu(e)
                }}
                {...divProps}
            >
                <div className={styles['flex-col-container']}>
                    <div className={styles['story-title']}>{title}</div>
                    <div className={styles['story-metadata-container']}>
                        <span>{formatWordCount(wordCount)}</span>
                    </div>
                    <div className={styles['story-target-badges-container']}>
                        {targets && targets.length > 0 && targets.map((target: TargetResponse) => (
                            <span key={target.targetId} className={styles['target-badge']}>
                                {`${target.frequency}: ${target.quota}`}
                            </span>
                        ))}
                    </div>
                </div>
                <div className={styles['arrow-icon']}>
                    →
                </div>
            </div>
            {menu.visible && (
                <StoryListItemContextMenu 
                    isOpen={menu.visible}
                    x={menu.x}
                    y={menu.y}
                    targets={targets}
                    onClose={closeMenu}
                    onCreateTarget={handleCreateTarget}
                    onEditTarget={handleEditTarget}
                    onDeleteTarget={handleDeleteTarget}
                />
            )}
            {modalState.type === 'create' && modalState.frequency && (
                <CreateTargetForm 
                    storyId={storyId}
                    frequency={modalState.frequency}
                    isOpen={true}
                    onClose={handleCloseModal}
                    onCancel={handleCloseModal}
                    onSave={handleCloseModal}
                />
            )}

            {modalState.type === 'edit' && modalState.targetData && (
                <EditTargetForm 
                    target={modalState.targetData}
                    isOpen={true}
                    onClose={handleCloseModal}
                    onCancel={handleCloseModal}
                    onSave={handleCloseModal}
                />
            )}

            {modalState.type === 'delete' && modalState.targetData && (
                <DeleteTargetForm 
                    target={modalState.targetData}
                    isOpen={true}
                    onClose={handleCloseModal}
                    onCancel={handleCloseModal}
                    onSave={handleCloseModal}
                />
            )}
        </>
    )
}