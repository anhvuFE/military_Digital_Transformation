import Button from "./Button";

interface Props {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({ title, message, onConfirm, onCancel }: Props) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{message}</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 14 }}>
        <Button variant="secondary" onClick={onCancel}>
          Hủy
        </Button>
        <Button onClick={onConfirm}>Đồng ý</Button>
      </div>
    </div>
  );
}

export default ConfirmDialog;
