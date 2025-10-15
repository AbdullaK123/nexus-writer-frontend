'use client'
import { Modal } from "../Modal";
import { EditTargetFormProps } from "@/app/types";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTarget } from "@/app/hooks/useTarget";
import { useToast } from "@/app/hooks/useToast";
import { useEffect, useMemo } from "react";
import { Button } from "../Button";
import styles from "./EditTargetForm.module.css"

const schema = z.object({
    quota: z.coerce.number().positive("Quota must be greater than 0"),
    fromDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Please enter a valid date"
    }),
    toDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Please enter a valid date"
    })
}).refine(data => {
    const from = new Date(data.fromDate)
    const to = new Date(data.toDate)
    return from <= to
}, {
    message: "From date cannot be after to date",
    path: ['fromDate']
})

type FormData = z.infer<typeof schema>;

// Helper function
const formatDateForInput = (date: string | Date): string => {
    if (typeof date === 'string') {
        return date.split('T')[0]
    }
    return date.toISOString().split('T')[0]
}

export default function EditTargetForm({
    target,
    isOpen,
    onCancel,
    onClose,
    onSave
}: EditTargetFormProps) {

    const defaultValues = useMemo(() => ({
        quota: target.quota,
        fromDate: formatDateForInput(target.fromDate),
        toDate: formatDateForInput(target.toDate)
    }), [target])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty }  // Track if form changed
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues
    })

    const {
        updateTarget,
        isUpdating,
        updateError,
        updateSuccess
    } = useTarget(target.storyId, target.frequency)

    const { showToast } = useToast()
    
    // Reset form when modal opens or target changes
    useEffect(() => {
        if (isOpen) {
            reset(defaultValues)
        }
    }, [isOpen, defaultValues, reset])
    
    // Handle success
    useEffect(() => {
        if (updateSuccess) {
            showToast(
                `Successfully updated ${target.frequency.toLowerCase()} target!`, 
                "success"
            )
            onClose()
            onSave()
        }
    }, [updateSuccess, showToast, target.frequency, onClose, onSave])
    
    // Handle error
    useEffect(() => {
        if (updateError) {
            showToast(
                "Failed to update target. Please try again.", 
                "error"
            )
        }
    }, [updateError, showToast])

    const onSubmit = (data: FormData) => {
        updateTarget({
            targetId: target.targetId,
            payload: {
                quota: data.quota,
                from_date: data.fromDate,
                to_date: data.toDate
            }
        })
    }

    // Warn about unsaved changes
    const handleCancel = () => {
        if (isDirty) {
            const confirmed = window.confirm('You have unsaved changes. Are you sure you want to cancel?')
            if (!confirmed) return
        }
        onCancel()
    }

    return (
        <Modal 
            title={`Edit ${target.frequency.toLowerCase()} target`}
            isOpen={isOpen} 
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="quota" className={styles.label}>
                        Word Count Quota
                    </label>
                    <input 
                        id="quota"
                        {...register("quota")} 
                        type="number" 
                        min="1"
                        step="1"
                        placeholder="Enter word count quota"
                        className={styles.input}
                        aria-invalid={!!errors.quota}
                    />
                    {errors.quota && (
                        <span className={styles.error} role="alert">
                            {errors.quota.message}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label htmlFor="fromDate" className={styles.label}>
                        From Date
                    </label>
                    <input 
                        id="fromDate"
                        {...register("fromDate")} 
                        type="date"
                        className={styles.input}
                        aria-invalid={!!errors.fromDate}
                    />
                    {errors.fromDate && (
                        <span className={styles.error} role="alert">
                            {errors.fromDate.message}
                        </span>
                    )}
                </div>

                <div className={styles.field}>
                    <label htmlFor="toDate" className={styles.label}>
                        To Date
                    </label>
                    <input 
                        id="toDate"
                        {...register("toDate")} 
                        type="date"
                        className={styles.input}
                        aria-invalid={!!errors.toDate}
                    />
                    {errors.toDate && (
                        <span className={styles.error} role="alert">
                            {errors.toDate.message}
                        </span>
                    )}
                </div>

                <div className={styles.actions}>
                    <Button 
                        variant="secondary" 
                        onClick={handleCancel}
                        type="button"
                        disabled={isUpdating}
                    >
                        Cancel
                    </Button>
                    <Button 
                        disabled={isUpdating || !isDirty}  // Disable if no changes
                        variant="primary" 
                        type="submit"
                    >
                        {isUpdating ? "Updating..." : "Update Target"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}