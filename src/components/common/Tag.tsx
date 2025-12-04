import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  color?: "green" | "orange" | "red" | "gray";
  children: ReactNode;
}

function Tag({ color = "green", children }: Props) {
  return (
    <span
      className={clsx("tag", {
        "status-success": color === "green",
        "status-warning": color === "orange",
        "status-error": color === "red",
      })}
      style={color === "gray" ? { background: "#eef0ea", color: "var(--color-forest)" } : undefined}
    >
      {children}
    </span>
  );
}

export default Tag;
