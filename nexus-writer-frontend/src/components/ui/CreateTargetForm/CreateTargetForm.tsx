import {Modal} from "@/components/ui/Modal";
import {Frequency, TargetResponse} from "@/app/types";
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/Input";
import { z } from "zod";
import {useTarget} from "@/app/hooks/useTarget";
import {ChangeEvent, FormEvent, useState} from "react";

type TargetFormProps = {
    storyId: string
    isOpen: boolean
    onClose: () => void
    onSave: () => void
    onCancel: () => void
    target?: TargetResponse
}

const targetSchema = z.object({
    frequency: z.enum(['Daily', 'Weekly', 'Monthly'], {
        errorMap: () => ({ message: "Frequency must be one of Daily, Weekly, Monthly" })
    }),
    quota: z.number().gt(0, "Quota must be greater than 0"),
    from: z.string().refine((date) => {
        const parsedDate = new Date(date);
        return parsedDate >= new Date(new Date().toDateString()); // Start of today
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

export default function CreateTargetForm({
    storyId,
    isOpen,
    onClose,
    onCancel
}: TargetFormProps) {
    
    const [formState, setFormState] = useState({
        frequency:  'Daily',
        quota:  0,
        from: new Date().toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
    })
    
    const [errors, setErrors] = useState<z.ZodError[]>([])
    
    const {
        createTarget,
        isCreating,
        creationSuccess,
        creationError,
    } = useTarget(storyId, formState.frequency)

    // Fix the date input handlers
    const handleFromDateChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            from: e.target.value
        })
    }

    const handleToDateChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            to: e.target.value
        })
    }
    
    const handleFrequencyChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormState({
            ...formState,
            frequency: e.target.value as Frequency
        })
    }
    
    const handleQuotaChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            quota: Number(e.target.value)
        })
    }

    // Fix the validation error handling
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const parsedFormState = targetSchema.safeParse(formState)

        if (!parsedFormState.success) {
            const validationErrors: Record<string, string> = {}
            for (const error of parsedFormState.error.errors) { // Added 'const'
                validationErrors[error.path[0] as string] = error.message
            }
            setErrors(validationErrors)
            return
        }

        createTarget({
            quota: parsedFormState.data.quota,
            frequency: parsedFormState.data.frequency,
            fromDate: parsedFormState.data.from,
            toDate: parsedFormState.data.to
        })
        onClose()// Fixed function call
    }
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} >
                {/* title */}
                <h3>Create a target</h3>
                {/* frequency drop down */}
                <div>
                    <label htmlFor="frequency">Frequency: </label>
                    <select
                        value={formState.frequency}
                        name="frequency"
                        id="frequency"
                        onChange={handleFrequencyChanged}
                    >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                    {errors.frequency && (<span>{errors.frequency}</span>)}
                </div>
                {/* qouta */}
                <div>
                    <label htmlFor="qouta">Quota: </label>
                    <Input
                        type="number"
                        placeholder="Enter a quota..."
                        name="quota"
                        id="quota"
                        value={formState.quota}
                        onChange={handleQuotaChanged}
                        required   
                    />
                    {errors.quota && (<span>{errors.quota}</span>)}
                </div>
                {/* From date */}
                <div>
                    <label htmlFor="qouta">From: </label>
                    <Input
                        type="date"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        name="from"
                        id="from"
                        required   
                        onChange={handleFromDateChanged}
                    />
                    {errors.from && (<span>{errors.from}</span>)}
                </div>
                {/* To date */}
                <div>
                    <label htmlFor="qouta">To: </label>
                    <Input
                        type="date"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        name="to"
                        id="to"
                        required
                        onChange={handleToDateChanged}
                    />
                    {errors.to && (<span>{errors.to}</span>)}
                </div>
                {/* submit and cancel btns */}
                <div>
                    <Button
                        variant='secondary'
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='primary'
                        type='submit'
                        disabled={isCreating}
                    >
                        Submit
                    </Button>
                </div>
                {creationError && (<span>Failed to create target. The server might be experiencing issues.</span>)}
                {creationSuccess && (<span>Successfully created target.</span>)}
            </form>
        </Modal>
    )
}