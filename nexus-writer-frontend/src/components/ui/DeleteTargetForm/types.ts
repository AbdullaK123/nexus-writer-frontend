import { TargetResponse } from "@/app/types/analytics";

export type DeleteTargetFormProps = {
  target: TargetResponse
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}
