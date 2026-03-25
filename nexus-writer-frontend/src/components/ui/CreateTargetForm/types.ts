import { Frequency } from "@/app/types/analytics";

export type CreateTargetFormProps = {
  storyId: string
  isOpen: boolean
  frequency: Frequency
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}
