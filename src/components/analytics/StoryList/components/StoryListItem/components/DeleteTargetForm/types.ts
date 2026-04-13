import { TargetResponse } from "@/data/types/targets";

export type DeleteTargetFormProps = {
  target: TargetResponse
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}
