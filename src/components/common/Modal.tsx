import { createPortal } from "react-dom";
import { useUiStore } from "@/store/uiStore";
import Button from "./Button";

function Modal() {
  const { modal, closeModal } = useUiStore();
  if (!modal.open) return null;

  return createPortal(
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="flex items-center justify-between mb-3">
          <h3 style={{ margin: 0 }}>{modal.title}</h3>
          <button
            aria-label="Đóng"
            onClick={closeModal}
            className="rounded-full border border-border bg-white px-2 py-1 text-olive hover:bg-sand/60"
          >
            ×
          </button>
        </div>
        <div>{modal.content}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
