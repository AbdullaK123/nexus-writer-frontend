import { TargetResponse } from "@/app/types/targets";

export type EditTargetFormProps = {
  target: TargetResponse
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}
