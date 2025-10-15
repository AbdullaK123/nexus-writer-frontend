'use client'
import { Modal } from "../Modal";
import { DeleteTargetFormProps } from "@/app/types";
import { useTarget } from "@/app/hooks/useTarget";
import { useToast } from "@/app/hooks/useToast";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { ClipLoader } from "react-spinners";
import styles from "./DeleteTargetForm.module.css"

// Helper function (could be shared utility)
const formatDate = (date: string | Date): string => {
    try {
        if (typeof date === 'string') {
            const parsed = new Date(date)
            if (isNaN(parsed.getTime())) {
                return 'Invalid date'
            }
            return parsed.toLocaleDateString()
        }
        return date.toLocaleDateString()
    } catch (error) {
        console.error('Date formatting error:', error)
        return 'Invalid date'
    }
}

export default function DeleteTargetForm({
    target,
    isOpen,
    onClose,
    onCancel,
    onSave
}: DeleteTargetFormProps) {
    const [confirmText, setConfirmText] = useState('')

    const {
        deleteTarget,
        isDeleting,
        deleteError,
        deleteSuccess
    } = useTarget(target.storyId, target.frequency)

    const { showToast } = useToast()

    // Reset confirmation when modal opens
    useEffect(() => {
        if (isOpen) {
            setConfirmText('')
        }
    }, [isOpen])

    useEffect(() => {
        if (deleteSuccess) {
            showToast(
                `Successfully deleted ${target.frequency.toLowerCase()} target!`, 
                "success"
            )
            onClose()
            onSave()
        }
    }, [deleteSuccess, showToast, target.frequency, onClose, onSave])

    useEffect(() => {
        if (deleteError) {
            showToast(
                "Failed to delete target. Please try again.", 
                "error"
            )
        }
    }, [deleteError, showToast])

    const handleDelete = () => {
        if (confirmText !== 'DELETE') {
            showToast('Please type DELETE to confirm', 'error')
            return
        }
        deleteTarget({ targetId: target.targetId })
    }

    const fromDate = formatDate(target.fromDate)
    const toDate = formatDate(target.toDate)

    return (
        <Modal 
            title={`Delete ${target.frequency.toLowerCase()} target?`}
            isOpen={isOpen} 
            onClose={onClose}
        >
            <div className={styles.container}>
                <div className={styles.warning}>
                    <span className={styles.warningIcon} role="img" aria-label="warning">
                        ⚠️
                    </span>
                    <p className={styles.warningText}>
                        This action cannot be undone. This will permanently delete your writing target.
                    </p>
                </div>

                <div className={styles.targetDetails}>
                    <h3 className={styles.detailsTitle}>Target Details</h3>
                    <div className={styles.detailsGrid}>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Frequency:</span>
                            <span className={styles.detailValue}>{target.frequency}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Quota:</span>
                            <span className={styles.detailValue}>
                                {target.quota.toLocaleString()} words
                            </span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>From:</span>
                            <span className={styles.detailValue}>{fromDate}</span>
                        </div>
                        <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>To:</span>
                            <span className={styles.detailValue}>{toDate}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.confirmation}>
                    <label htmlFor="confirmText" className={styles.confirmLabel}>
                        Type <strong>DELETE</strong> to confirm
                    </label>
                    <input 
                        id="confirmText"
                        type="text"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                        placeholder="Type DELETE"
                        className={styles.confirmInput}
                        disabled={isDeleting}
                        autoComplete="off"
                    />
                </div>

                <div className={styles.actions}>
                    <Button 
                        variant="secondary" 
                        onClick={onCancel}
                        type="button"
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button 
                        disabled={isDeleting || confirmText !== 'DELETE'}
                        variant="danger"
                        onClick={handleDelete}
                        type="button"
                    >
                        {isDeleting ? (
                            <>
                                <ClipLoader size={16} color="white" />
                                <span>Deleting...</span>
                            </>
                        ) : (
                            "Delete Target"
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}