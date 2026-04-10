import { TargetResponse } from "@/app/types/targets";

export type DeleteTargetFormProps = {
  target: TargetResponse
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}
