import React, {ChangeEvent, FormEvent, useState, useEffect} from "react";
import {Modal} from "@/components/ui/Modal";
import {Frequency, TargetFormProps, TargetResponse} from "@/app/types";
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/Input";
import {z} from "zod";
import {useTarget} from "@/app/hooks/useTarget";
import styles from './TargetForm.module.css';

type FormState = {
    frequency: string;
    quota: number;
    from: string;
    to: string;
};

const targetSchema = z.object({
    frequency: z.enum(['Daily', 'Weekly', 'Monthly'], {
        errorMap: () => ({message: "Frequency must be one of Daily, Weekly, Monthly"})
    }),
    quota: z.number().gt(0, "Quota must be greater than 0"),
    from: z.string().refine((date) => {
        const parsedDate = new Date(date);
        return parsedDate >= new Date(new Date().toDateString());
    }, "From date must be today or later"),
    to: z.string().refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }, "To date must be a valid date")
}).refine((data) => {
    const fromDate = new Date(data.from);
    const toDate = new Date(data.to);
    return toDate >= fromDate;
}, {
    message: "To date must be after or equal to from date",
    path: ["to"]
});

const getInitialFormState = (target?: TargetResponse): FormState => {
    const today = new Date().toISOString().split('T')[0];

    return {
        frequency: target?.frequency || 'Daily',
        quota: target?.quota || 0,
        from: target?.fromDate ? new Date(target.fromDate).toISOString().split('T')[0] : today,
        to: target?.toDate ? new Date(target.toDate).toISOString().split('T')[0] : today,
    };
};

const validateForm = (formState: FormState, setErrors: (errors: Record<string, string>) => void) => {
    const parsedFormState = targetSchema.safeParse(formState);
    if (!parsedFormState.success) {
        const validationErrors: Record<string, string> = {};
        for (const error of parsedFormState.error.errors) {
            validationErrors[error.path[0] as string] = error.message;
        }
        setErrors(validationErrors);
        return null;
    }
    return {
        quota: parsedFormState.data.quota,
        frequency: parsedFormState.data.frequency,
        fromDate: parsedFormState.data.from,
        toDate: parsedFormState.data.to
    };
};

const getFormTitle = (mode: 'creating' | 'editing' | 'deleting') => {
    switch (mode) {
        case 'creating':
            return 'Create a target';
        case 'editing':
            return 'Edit target';
        case 'deleting':
            return 'Delete target';
        default:
            return '';
    }
};

const renderFormField = (
    id: string,
    label: string,
    children: React.ReactNode,
    error?: string
) => (
    <div key={id}>
        <label htmlFor={id}>{label}: </label>
        {children}
        {error && <span className={styles['error-badge']}>{error}</span>}
    </div>
);

const renderStatusMessages = (
    isCreating: boolean,
    isUpdating: boolean,
    isError: boolean,
    isSuccess: boolean,
    updateError: Error | undefined,
    updateSuccess: boolean
) => (
    <>
        {isCreating && <span className={styles['info-badge']}>Creating target...</span>}
        {isUpdating && <span className={styles['info-badge']}>Updating target...</span>}
        {isError && <span className={styles['error-badge']}>Failed to create target. The server might be experiencing issues.</span>}
        {isSuccess && <span className={styles['success-badge']}>Successfully created target.</span>}
        {updateError && <span className={styles['error-badge']}>Failed to update target. The server might be experiencing issues.</span>}
        {updateSuccess && <span className={styles['success-badge']}>Successfully updated target.</span>}
    </>
);

export default function TargetForm({storyId, isOpen, onClose, onCancel, onSave, mode = 'creating', target}: TargetFormProps) {

    const [formState, setFormState] = useState<FormState>(() => getInitialFormState(target));
    const [errors, setErrors] = useState<Record<string, string>>({});

    const {
        createTarget,
        isCreating,
        isSuccess,
        isError,
        updateTarget,
        isUpdating,
        updateSuccess,
        updateError,
        deleteTarget,
        isDeleting: isDeletingTarget,
    } = useTarget(storyId, formState.frequency as Frequency);

    const isDeletingMode = mode === 'deleting';

    useEffect(() => {
        setFormState(getInitialFormState(target));
        setErrors({});
    }, [target, mode, isOpen]);

    const handleInputChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [field]: field === 'quota' ? Number(e.target.value) : e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (isDeletingMode) {
            if (target?.targetId) {
                deleteTarget({targetId: target.targetId});
                onSave();
                onClose();
            }
            return;
        }

        const payload = validateForm(formState, setErrors);
        if (!payload) return;

        try {
            if (mode === 'creating') {
                createTarget({payload});
            } else if (target?.targetId) {
                updateTarget({targetId: target.targetId, payload});
            }
            onSave();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            title={getFormTitle(mode)}
            isOpen={isOpen}
            onClose={() => onClose()}
        >
            <form className={styles['card']} onSubmit={handleSubmit}>

                {isDeletingMode && (
                    <h2>Are you sure you want to delete this target?</h2>
                )}

                {!isDeletingMode && (
                    <>
                        {renderFormField('frequency', 'Frequency',
                            <select
                                value={formState.frequency}
                                name="frequency"
                                id="frequency"
                                onChange={handleInputChange('frequency')}
                            >
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>,
                            errors.frequency
                        )}

                        {renderFormField('quota', 'Quota',
                            <Input
                                type="number"
                                placeholder="Enter a quota..."
                                name="quota"
                                id="quota"
                                value={formState.quota}
                                onChange={handleInputChange('quota')}
                                required
                            />,
                            errors.quota
                        )}

                        {renderFormField('from', 'From',
                            <Input
                                type="date"
                                value={formState.from}
                                name="from"
                                id="from"
                                required
                                onChange={handleInputChange('from')}
                            />,
                            errors.from
                        )}

                        {renderFormField('to', 'To',
                            <Input
                                type="date"
                                value={formState.to}
                                name="to"
                                id="to"
                                required
                                onChange={handleInputChange('to')}
                            />,
                            errors.to
                        )}
                    </>
                )}

                <div>
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={onCancel}
                    >
                        {isDeletingMode ? 'No' : 'Cancel'}
                    </Button>
                    <Button
                        variant='primary'
                        type='submit'
                        disabled={isCreating || isUpdating || isDeletingTarget}
                    >
                        {mode === 'creating' ? 'Create' : mode === 'editing' ? 'Update' : 'Yes'}
                    </Button>
                </div>

                {renderStatusMessages(isCreating, isUpdating, isError, isSuccess, updateError, updateSuccess)}
            </form>
        </Modal>
    );
}