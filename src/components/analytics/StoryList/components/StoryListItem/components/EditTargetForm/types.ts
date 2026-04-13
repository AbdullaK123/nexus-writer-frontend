import { TargetResponse } from "@/data/types/targets";

export type EditTargetFormProps = {
  target: TargetResponse
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}
