'use client'
import { Modal } from "../Modal";
import { CreateTargetFormProps, Frequency } from "@/app/types";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTarget } from "@/app/hooks/useTarget";
import { useToast } from "@/app/hooks/useToast";
import { useEffect, useMemo } from "react";
import { Button } from "../Button";
import styles from "./CreateTargetForm.module.css"

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

// Helper function to format date as YYYY-MM-DD for input[type="date"]
const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// Calculate smart defaults based on frequency
const getSmartDefaults = (frequency: Frequency) => {
    const today = new Date();
    const fromDate = formatDateForInput(today);
    
    let quota: number;
    let toDate: string;
    
    switch (frequency) {
        case 'Daily':
            quota = 500;
            toDate = fromDate; // Same day
            break;
            
        case 'Weekly':
            quota = 3500;
            // End of week (Sunday)
            const endOfWeek = new Date(today);
            const daysUntilSunday = 7 - today.getDay();
            endOfWeek.setDate(today.getDate() + daysUntilSunday);
            toDate = formatDateForInput(endOfWeek);
            break;
            
        case 'Monthly':
            quota = 15000;
            // End of month
            const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            toDate = formatDateForInput(endOfMonth);
            break;
            
        default:
            quota = 500;
            toDate = fromDate;
    }
    
    return { quota, fromDate, toDate };
};

export default function CreateTargetForm({
    storyId,
    frequency,
    isOpen,
    onClose,
    onCancel,
    onSave
}: CreateTargetFormProps) {

    // Calculate defaults whenever frequency changes
    const defaultValues = useMemo(() => getSmartDefaults(frequency), [frequency]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues
    });

    const {
        createTarget,
        isCreating,
        createError,
        createSuccess
    } = useTarget(storyId, frequency)

    const { showToast } = useToast()

    // Reset form with smart defaults when modal opens or frequency changes
    useEffect(() => {
        if (isOpen) {
            reset(defaultValues);
        }
    }, [isOpen, defaultValues, reset]);

    useEffect(() => {
        if (createSuccess) {
            showToast(
                `Successfully created ${frequency.toLowerCase()} target!`, 
                "success"
            )
            reset(defaultValues)
            onClose()
            onSave()
        }
    }, [createSuccess, showToast, frequency, reset, defaultValues, onClose, onSave])

    useEffect(() => {
        if (createError) {
            showToast(
                "Failed to create target. Please try again.", 
                "error"
            )
        }
    }, [createError, showToast])

    const onSubmit = (data: FormData) => {
        createTarget({
            payload: {
                quota: data.quota,
                from_date: data.fromDate,
                to_date: data.toDate,
                frequency: frequency
            }
        })
    }

    return (
        <Modal  
            title={`Create ${frequency.toLowerCase()} target`}
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
                        onClick={onCancel}
                        type="button"
                        disabled={isCreating}
                    >
                        Cancel
                    </Button>
                    <Button 
                        disabled={isCreating}
                        variant="primary" 
                        type="submit"
                    >
                        {isCreating ? "Creating..." : "Create Target"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}