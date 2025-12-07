import Button from "./Button";
import { AlertTriangle, Trash2 } from "lucide-react";

interface Props {
  title: string;
  message: string;
  itemName?: string;
  warningMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirmModal({
  title,
  message,
  itemName,
  warningMessage,
  onConfirm,
  onCancel
}: Props) {
  return (
    <div className="space-y-6">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="rounded-full bg-red-100 p-3">
          <div className="rounded-full bg-red-200 p-3">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-3">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>

        {itemName && (
          <div className="rounded-lg bg-gray-100 p-3">
            <p className="font-medium text-gray-800">{itemName}</p>
          </div>
        )}

        <p className="text-gray-600">{message}</p>

        {warningMessage && (
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700 font-medium">
              ⚠️ {warningMessage}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={onCancel}
        >
          Hủy
        </Button>
        <Button
          variant="danger"
          className="flex-1 bg-red-600 hover:bg-red-700"
          onClick={onConfirm}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Xóa
        </Button>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;