import Button from "./Button";

interface Props {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

function EmptyState({ title, description, actionLabel, onAction }: Props) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h3>{title}</h3>
      {description && <p style={{ marginBottom: 16 }}>{description}</p>}
      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}

export default EmptyState;
