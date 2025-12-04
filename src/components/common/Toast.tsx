import type { ToastType } from "@/store/uiStore";

interface Props {
  type: ToastType;
  message: string;
}

function Toast({ type, message }: Props) {
  return <div className={`toast ${type}`}>{message}</div>;
}

export default Toast;
