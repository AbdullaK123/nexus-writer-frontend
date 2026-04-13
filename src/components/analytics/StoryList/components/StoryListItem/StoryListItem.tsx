'use client'
import { StoryListItemProps } from "./types";
import { Frequency, TargetResponse } from "@/data/types";
import styles from "./StoryListItem.module.css";
import { formatWordCount } from "@/compatability/formatters";
import { ContextMenuRoot, ContextMenuTrigger } from "@/components/common/ContextMenu";
import { StoryListItemContextMenu } from "./components/StoryListItemContextMenu/StoryListItemContextMenu";
import CreateTargetForm from "./components/CreateTargetForm/CreateTargetForm";
import { useState } from "react";
import EditTargetForm from "./components/EditTargetForm/EditTargetForm";
import DeleteTargetForm from "./components/DeleteTargetForm/DeleteTargetForm";

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
            <ContextMenuRoot>
                <ContextMenuTrigger asChild>
                    <div
                        className={`${styles['story-list-item-container']} ${isSelected ? styles['selected'] : ''}`}
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
                </ContextMenuTrigger>
                <StoryListItemContextMenu 
                    targets={targets}
                    onCreateTarget={handleCreateTarget}
                    onEditTarget={handleEditTarget}
                    onDeleteTarget={handleDeleteTarget}
                />
            </ContextMenuRoot>
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