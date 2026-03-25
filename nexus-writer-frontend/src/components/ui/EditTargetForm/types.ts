import { TargetResponse } from "@/app/types/analytics";

export type EditTargetFormProps = {
  target: TargetResponse
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onCancel: () => void
}
