import { useEffect } from "react";
import Toast from "./Toast";
import { useUiStore } from "@/store/uiStore";

function ToastContainer() {
  const { toasts, removeToast } = useUiStore();

  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map((toast) => setTimeout(() => removeToast(toast.id), 2500));
    return () => timers.forEach(clearTimeout);
  }, [toasts, removeToast]);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} type={toast.type} message={toast.message} />
      ))}
    </div>
  );
}

export default ToastContainer;
