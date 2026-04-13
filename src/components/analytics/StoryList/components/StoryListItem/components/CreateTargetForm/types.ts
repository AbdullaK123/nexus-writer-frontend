import { Frequency } from "@/data/types/targets";

export type CreateTargetFormProps = {
  storyId: string
  isOpen: boolean
  frequency: Frequency
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}
